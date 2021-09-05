import { Vector2D } from './types.js';
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
    constructor(act) {
        this.action = act;
    }
}
export class InputSystem {
    constructor() {
        this._mouseState = new MouseState();
        document.addEventListener("mousemove", this.onMouseMoveHandler.bind(this));
        document.addEventListener("mousedown", this.onMouseDownHandler.bind(this));
        document.addEventListener("mouseup", this.onMouseUpHandler.bind(this));
        this.offset = new Vector2D();
        this.onMouseDown = new Event();
        this.onMouseUp = new Event();
        this.onScroll = new Event();
    }
    setRect(rect) {
        this._rect = rect;
    }
    onMouseMoveHandler(event) {
        const x = event.clientX - this._rect.left - this.offset.x;
        const y = event.clientY - this._rect.top - this.offset.y;
        if (this._mouseState.action === MouseAction.Scroll) {
            const dx = event.clientX - this._rect.left - this._mouseState.startMousePos.x;
            const dy = event.clientY - this._rect.top - this._mouseState.startMousePos.y;
            this.offset = new Vector2D(dx, dy);
            this.onScroll.emit(new Vector2D(dx, dy));
            return;
        }
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
        this.onMouseUp.emit(new MouseEventArgs(this._mouseState.action));
        this._mouseState.action = MouseAction.None;
    }
}
