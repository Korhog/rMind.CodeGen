import { Vector2D } from '../types.js'
import { INodeController} from './nodeController.js'

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

export abstract class Node implements INode, IInteractiveNode {
    position: Vector2D;
    parent: INodeController;
    nodeType: InteractiveNodeType;

    translate(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
   
    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }  

    overed(x: number, y: number): IInteractiveNode {
        throw new Error('Method not implemented.');
    }
}