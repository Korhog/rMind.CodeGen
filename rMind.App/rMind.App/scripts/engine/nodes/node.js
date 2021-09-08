import { CornerRadius, Vector2D } from '../types.js';
import * as render from '../render/render.js';
import * as consts from '../consts.js';
export const BORDER = 2;
export var InteractiveNodeType;
(function (InteractiveNodeType) {
    InteractiveNodeType[InteractiveNodeType["Node"] = 0] = "Node";
    InteractiveNodeType[InteractiveNodeType["Pin"] = 1] = "Pin";
    InteractiveNodeType[InteractiveNodeType["Dot"] = 2] = "Dot";
})(InteractiveNodeType || (InteractiveNodeType = {}));
export class Node {
    /** base constructor */
    constructor(x, y, parent, config) {
        this._guid = config.guid;
        this._parent = parent;
        this.nodeType = InteractiveNodeType.Node;
        this._isMouseOver = false;
        // visual settings
        this.cornerRadius = new CornerRadius(6, 6, 6, 6);
        this._rect = new DOMRect(x, y);
        this._borderRect = new DOMRect(x - BORDER, y - BORDER);
        this.height = 100;
        this.width = 150;
        this._position = new Vector2D(x, y);
        this._borderColor = '#1d1d1d';
        this._fill = '#f0f0f0';
    }
    get isSelected() { return this._isSelected; }
    set isSelected(value) { this._isSelected = value; }
    get parent() { return this._parent; }
    get guid() { return this._guid; }
    get position() { return this._position; }
    get width() { return this._width; }
    set width(value) {
        this._width = Math.max(0, value);
        this._rect.width = this._width;
        this._borderRect.width = this._width + BORDER * 2;
    }
    get height() { return this._height; }
    set height(value) {
        this._height = Math.max(0, value);
        this._rect.height = this._height;
        this._borderRect.height = this._height + BORDER * 2;
    }
    get borderRadius() { return this._borderRadius; }
    get cornerRadius() { return this._cornerRadius; }
    set cornerRadius(value) {
        this._cornerRadius = value;
        this.onCornerRadiusChanged(value);
    }
    onCornerRadiusChanged(value) {
        var m = 2;
        this._borderRadius = new CornerRadius(value.topLeft === 0 ? 0 : value.topLeft + m, value.topRight === 0 ? 0 : value.topRight + m, value.bottomLeft === 0 ? 0 : value.bottomLeft + m, value.bottomRight === 0 ? 0 : value.bottomRight + m);
    }
    translate(x, y) {
        this._position.x += x;
        this._position.y += y;
        this._rect.x = this._position.x;
        this._rect.y = this._position.y;
        this._borderRect.x = this._position.x - BORDER;
        this._borderRect.y = this._position.y - BORDER;
    }
    draw(ctx) {
        //ctx.save();
        let rect = this._rect;
        if (this._isMouseOver || this._isSelected) {
            if (this._isSelected) {
                ctx.shadowColor = '#ff9b0033';
                render.drawRect(ctx, rect, '#ff9b00', this.cornerRadius, 4);
            }
            else {
                ctx.shadowColor = '#00ff7d33';
                render.drawRect(ctx, rect, '#00ff7d', this.cornerRadius, 4);
            }
        }
        ctx.shadowColor = consts.SHADOW_COLOR;
        ctx.shadowBlur = consts.SHADOW_BLUR;
        ctx.shadowOffsetY = consts.SHADOW_OFFSET;
        render.drawRect(ctx, rect, this._borderColor, this.cornerRadius, 2);
        ctx.shadowColor = "transparent black";
        render.drawRect(ctx, rect, this._fill, this.cornerRadius);
        //ctx.restore();
    }
    overed(x, y) {
        this._isMouseOver = false;
        if (x < this._position.x || x > this._position.x + this._width)
            return null;
        if (y < this._position.y || y > this._position.y + this._height)
            return null;
        this._isMouseOver = true;
        return this;
    }
    unselect() {
        this._isMouseOver = false;
    }
}
