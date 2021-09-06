import { Vector2D } from "../../types.js";
import { INode, IInteractiveNode, IDrawningNode, InteractiveNodeType } from "../node.js";

export enum PinDirection {
    None,
    Input,
    Output
}

/** Wire connection */
export class Pin implements IInteractiveNode, IDrawningNode {
    protected _isOvered: boolean;
    protected _rect: DOMRect;

    rowSpan: number;
    nodeType: InteractiveNodeType;
    pinDirection: PinDirection;

    protected _parent: INode;
    get parent(): INode { return this._parent; }

    get position(): Vector2D {
        return new Vector2D(
            this._rect.x,
            this._rect.y
        );
    }

    center: Vector2D;

    constructor(parent: INode, direction?: PinDirection) {
        this.rowSpan = 1;
        this.nodeType = InteractiveNodeType.Pin;
        this.pinDirection = direction || PinDirection.None;
        this._parent = parent;
        this._rect = new DOMRect();
        this.center = new Vector2D();
    }

    overed(x: number, y: number): IInteractiveNode | null {
        if (x >= this._rect.x && x <= this._rect.x + this._rect.width) {
            if (y >= this._rect.y && y <= this._rect.y + this._rect.height) {
                this._isOvered = true;
                return this;
            }
        }

        this._isOvered = false;
        return null;
    }

    clear(): void {
        this._isOvered = false;
    }

    setRect(rect: DOMRect): void {
        this._rect = rect;

        switch (this.pinDirection) {
            case PinDirection.None:
                this.center.x = rect.x + rect.width / 2;
                break;
            case PinDirection.Input:
                this.center.x = rect.x + 2;
                break;
            case PinDirection.Output:
                this.center.x = rect.x + rect.width - 2;
                break;
        }

        this.center.y = rect.y + rect.width / 2;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const r1 = this._rect.width / 2;
        const r2 = r1 - 1;
        const x = this._rect.x + r1;
        const y = this._rect.y + r1;

        //ctx.strokeStyle = this._isOvered ? 'rgb(0,255,125)' : (this.isConnected ? 'rgb(0,255,125)' : '#d2d2d2');
        ctx.strokeStyle = this._isOvered ? 'rgb(0,255,125)' : '#d2d2d2';
        ctx.fillStyle = '#2d2d2d';

        ctx.beginPath();
        ctx.ellipse(x, y, r2, r2, 0, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    unselect(): void {
        this._isOvered = false; // this.isConnected;
    }
}
