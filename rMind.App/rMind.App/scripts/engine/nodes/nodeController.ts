import { Engine } from "../engine.js";
import { Node, IInteractiveNode, InteractiveNodeType } from "./node.js";
import { Pin } from "./pins/pin.js";

export interface INodeController {
    engine: Engine;
    draw(ctx: CanvasRenderingContext2D): void;
    create<T extends Node>(type: { new(x, y, p, c): T }, x: number, y: number, config?: object): T;
    getNodeByPosition(x: number, y: number): IInteractiveNode;

    addWire(a: Pin, b: Pin): void;
    selectNode(node: IInteractiveNode): void;
    delete(): void;
    serialize(): object;
}