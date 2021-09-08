import { Vector2D } from './types.js';
import { Node, IInteractiveNode, InteractiveNodeType } from './nodes/node.js';
import { Pin } from './nodes/pins/pin.js';
import { Event } from './events/event.js'

export enum MouseAction {
    None,
    Drag,
    Wire,
    Scroll
}

export class MouseState {
    action: MouseAction;
    startPos: Vector2D;
    startMousePos: Vector2D;
    node: Node;
    pin: Pin;

    constructor() {
        this.action = MouseAction.None;
    }
}

export class MouseEventArgs {
    _action: MouseAction;
    get action(): MouseAction { return this._action; }

    _position: Vector2D;
    get position(): Vector2D { return this._position; }

    constructor(act: MouseAction, pos: Vector2D) {
        this._action = act;
        this._position = pos;
    }
}

export class InputSystem {
    private _rect: DOMRect | ClientRect;

    protected _mouseState: MouseState;
    get state(): MouseState { return this._mouseState; }

    onMouseDown: Event<Vector2D>;
    onMouseMove: Event<Vector2D>;
    onMouseUp: Event<MouseEventArgs>;
    onWire: Event<Vector2D>;

    onScroll: Event<void>;
    onDrag: Event<void>;

    offset: Vector2D;
    scale: number;

    constructor() {
        this._mouseState = new MouseState();

        document.addEventListener("mousemove", this.onMouseMoveHandler.bind(this));
        document.addEventListener("mousedown", this.onMouseDownHandler.bind(this));
        document.addEventListener("mouseup", this.onMouseUpHandler.bind(this));

        this.offset = new Vector2D();
        this.scale = 1;

        this.onMouseDown = new Event<Vector2D>();
        this.onMouseUp = new Event<MouseEventArgs>();
        this.onMouseMove = new Event<Vector2D>();
        this.onWire = new Event<Vector2D>();
        this.onScroll = new Event<void>();
        this.onDrag = new Event<void>();
    }

    setRect(rect: DOMRect) {
        this._rect = rect;
    }

    grab(interactiveNode: IInteractiveNode, pos: Vector2D) {
        if (interactiveNode) {
            if (interactiveNode.nodeType === InteractiveNodeType.Node) {
                const n = interactiveNode as Node;
                if (n) {
                    this._mouseState.startMousePos = pos;
                    this._mouseState.action = MouseAction.Drag;
                    this._mouseState.node = n;
                }
            }

            if (interactiveNode.nodeType === InteractiveNodeType.Pin) {
                const n = interactiveNode as Pin;
                if (n) {
                    this._mouseState.startMousePos = n.center;
                    this._mouseState.action = MouseAction.Wire;
                    this._mouseState.pin = n;
                }
            }
        }
    }

    protected onMouseMoveHandler(event: MouseEvent) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;

        if (this._mouseState.action === MouseAction.Scroll) {
            const dx = event.clientX - this._rect.left - this._mouseState.startMousePos.x;
            const dy = event.clientY - this._rect.top - this._mouseState.startMousePos.y;

            this.offset = new Vector2D(dx, dy);
            this.onScroll.emit();
            return;
        }

        if (this._mouseState.action === MouseAction.Drag) {
            const dx = x - this._mouseState.startMousePos.x;
            const dy = y - this._mouseState.startMousePos.y;

            this._mouseState.node.translate(dx, dy);
            this._mouseState.startMousePos = new Vector2D(x, y);
            this.onDrag.emit();
            return;
        }

        if (this._mouseState.action === MouseAction.Wire) {
            this.onWire.emit(new Vector2D(x, y));
            return;
        }

        this.onMouseMove.emit(new Vector2D(x, y));
    }

    protected onMouseDownHandler(event: MouseEvent) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;

        this._mouseState.node = null;

        if (event.button && event.altKey) {
            this._mouseState.startMousePos = new Vector2D(x, y);
            this._mouseState.action = MouseAction.Scroll;
            return;
        }

        this.onMouseDown.emit(new Vector2D(x, y));
    }

    protected onMouseUpHandler(event: MouseEvent) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;

        this.onMouseUp.emit(new MouseEventArgs(
            this._mouseState.action,
            new Vector2D(x, y)));

        this._mouseState.action = MouseAction.None;
        this._mouseState.node = null;
    }    
}