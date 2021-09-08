import { CornerRadius, Vector2D } from '../types.js'
import { INodeController } from './nodeController.js'
import * as render from '../render/render.js'
import * as consts from '../consts.js'

export const BORDER = 2;

export enum InteractiveNodeType {
    Node,
    Pin,
    Dot
}

export interface IDrawningNode {
    position: Vector2D;
    draw(ctx: CanvasRenderingContext2D): void;
}

export interface IInteractiveNode {
    nodeType: InteractiveNodeType;
    overed(x: number, y: number): IInteractiveNode;
}

export interface INode extends IDrawningNode {
    guid: string;
    parent: INodeController;
    translate(x: number, y: number): void;
}

export class Node implements INode, IInteractiveNode {
    nodeType: InteractiveNodeType;

    // system
    protected _isMouseOver: boolean;

    // visual
    protected _rect: DOMRect;
    protected _borderRect: DOMRect;
    protected _borderColor: string;
    protected _fill: string;

   
    protected _isSelected: boolean;
    get isSelected(): boolean { return this._isSelected; }
    set isSelected(value: boolean) { this._isSelected = value; }

    private _parent: INodeController;
    get parent(): INodeController { return this._parent; }

    protected _guid: string;
    get guid(): string { return this._guid; }

    protected _position: Vector2D;
    get position(): Vector2D { return this._position; }

    private _width: number;
    get width(): number { return this._width; }
    set width(value: number) {
        this._width = Math.max(0, value);
        this._rect.width = this._width;
        this._borderRect.width = this._width + BORDER * 2;
    }

    private _height: number;
    get height(): number { return this._height; }
    set height(value: number) {
        this._height = Math.max(0, value);
        this._rect.height = this._height;
        this._borderRect.height = this._height + BORDER * 2;
    }

    private _borderRadius: CornerRadius;
    get borderRadius(): CornerRadius { return this._borderRadius; }

    private _cornerRadius: CornerRadius;    
    get cornerRadius(): CornerRadius { return this._cornerRadius; }
    set cornerRadius(value: CornerRadius) {
        this._cornerRadius = value;
        this.onCornerRadiusChanged(value);
    }

    protected onCornerRadiusChanged(value: CornerRadius): void {
        var m = 2;
        this._borderRadius = new CornerRadius(
            value.topLeft === 0 ? 0 : value.topLeft + m,
            value.topRight === 0 ? 0 : value.topRight + m,
            value.bottomLeft === 0 ? 0 : value.bottomLeft + m,
            value.bottomRight === 0 ? 0 : value.bottomRight + m,
        );
    }

    /** base constructor */
    constructor(x: number, y: number, parent: INodeController, config: any) {
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

    translate(x: number, y: number): void {
        this._position.x += x;
        this._position.y += y;

        this._rect.x = this._position.x;
        this._rect.y = this._position.y;

        this._borderRect.x = this._position.x - BORDER;
        this._borderRect.y = this._position.y - BORDER;
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
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

    overed(x: number, y: number): IInteractiveNode {
        this._isMouseOver = false;

        if (x < this._position.x || x > this._position.x + this._width) return null;
        if (y < this._position.y || y > this._position.y + this._height) return null;

        this._isMouseOver = true;
        return this;
    }

    unselect(): void {
        this._isMouseOver = false;
    }
}