import { Vector2D } from './types.js';
import { InteractiveNodeType } from './nodes/node.js';
import { Event } from './events/event.js';
export var MouseAction;
(function (MouseAction) {
    MouseAction[MouseAction["None"] = 0] = "None";
    MouseAction[MouseAction["Drag"] = 1] = "Drag";
    MouseAction[MouseAction["Wire"] = 2] = "Wire";
    MouseAction[MouseAction["Scroll"] = 3] = "Scroll";
})(MouseAction || (MouseAction = {}));
export class MouseState {
    constructor() {
        this.action = MouseAction.None;
    }
}
export class MouseEventArgs {
    constructor(act, pos) {
        this._action = act;
        this._position = pos;
    }
    get action() { return this._action; }
    get position() { return this._position; }
}
export class InputSystem {
    constructor() {
        this._mouseState = new MouseState();
        document.addEventListener("mousemove", this.onMouseMoveHandler.bind(this));
        document.addEventListener("mousedown", this.onMouseDownHandler.bind(this));
        document.addEventListener("mouseup", this.onMouseUpHandler.bind(this));
        this.offset = new Vector2D();
        this.scale = 1;
        this.onMouseDown = new Event();
        this.onMouseUp = new Event();
        this.onMouseMove = new Event();
        this.onWire = new Event();
        this.onScroll = new Event();
        this.onDrag = new Event();
    }
    get state() { return this._mouseState; }
    setRect(rect) {
        this._rect = rect;
    }
    grab(interactiveNode, pos) {
        if (interactiveNode) {
            if (interactiveNode.nodeType === InteractiveNodeType.Node) {
                const n = interactiveNode;
                if (n) {
                    this._mouseState.startMousePos = pos;
                    this._mouseState.action = MouseAction.Drag;
                    this._mouseState.node = n;
                }
            }
            if (interactiveNode.nodeType === InteractiveNodeType.Pin) {
                const n = interactiveNode;
                if (n) {
                    this._mouseState.startMousePos = n.center;
                    this._mouseState.action = MouseAction.Wire;
                    this._mouseState.pin = n;
                }
            }
        }
    }
    onMouseMoveHandler(event) {
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
    onMouseDownHandler(event) {
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
    onMouseUpHandler(event) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;
        this.onMouseUp.emit(new MouseEventArgs(this._mouseState.action, new Vector2D(x, y)));
        this._mouseState.action = MouseAction.None;
        this._mouseState.node = null;
    }
}
