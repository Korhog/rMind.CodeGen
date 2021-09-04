import { Vector2D } from "../../types.js";
import { INode, IInteractiveNode, IDrawningNode, InteractiveNodeType } from "../node.js";

export enum rMindPinDirection {
    None,
    Input,
    Output
}

export class Pin implements IInteractiveNode, IDrawningNode {
    rowSpan: number;

    position: Vector2D;
    nodeType: InteractiveNodeType;

    protected _parent: INode;

    overed(x: number, y: number): IInteractiveNode {
        throw new Error("Method not implemented.");
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
}
