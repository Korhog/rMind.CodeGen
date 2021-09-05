import { CornerRadius, Vector2D } from '../types.js'
import { INodeController } from './nodeController.js'
import * as render from '../render/render.js'

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
    parent: INodeController;
    translate(x: number, y: number): void;
}

export class Node implements INode, IInteractiveNode {
    position: Vector2D;
    parent: INodeController;
    nodeType: InteractiveNodeType;

    translate(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
   
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.shadowColor = '#00000033';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;

        let rect = new DOMRect(100, 100, 200, 100);
        let cr = new CornerRadius(3, 3, 3, 3);
        render.drawRect(ctx, rect, '#1d1d1d', cr, 2);
        render.drawRect(ctx, rect, '#1d1d1d', cr);

        ctx.restore();
    }  

    overed(x: number, y: number): IInteractiveNode {
        throw new Error('Method not implemented.');
    }
}