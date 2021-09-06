import { Vector2D } from './types.js';
import { INode, Node } from './nodes/node.js';
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
    node: INode;

    n: Node;
    constructor() {
        this.action = MouseAction.None;
    }
}

export class MouseEventArgs {
    action: MouseAction;

    constructor(act: MouseAction) {
        this.action = act;
    }
}

export class InputSystem {
    private _ctx: CanvasRenderingContext2D;
    private _rect: DOMRect | ClientRect;
    protected _mouseState: MouseState;

    onMouseDown: Event<Vector2D>;
    onMouseMove: Event<Vector2D>;
    onMouseUp: Event<MouseEventArgs>;
    onScroll: Event<Vector2D>;

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
        this.onScroll = new Event<Vector2D>();
    }

    setRect(rect: DOMRect) {
        this._rect = rect;
    }

    grab(node: INode) {

    }

    protected onMouseMoveHandler(event: MouseEvent) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;

        if (this._mouseState.action === MouseAction.Scroll) {
            const dx = event.clientX - this._rect.left - this._mouseState.startMousePos.x;
            const dy = event.clientY - this._rect.top - this._mouseState.startMousePos.y;

            this.offset = new Vector2D(dx, dy);
            this.onScroll.emit(new Vector2D(dx, dy));
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

        this.onMouseUp.emit(new MouseEventArgs(this._mouseState.action));
        this._mouseState.action = MouseAction.None;
    }    
}