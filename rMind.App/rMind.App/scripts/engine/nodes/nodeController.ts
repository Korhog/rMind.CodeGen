import { Engine } from "../engine.js";
import { Node, IInteractiveNode, InteractiveNodeType } from "./node.js";
import { Pin } from "./pins/pin.js";

export interface INodeController {
    engine: Engine;
    draw(ctx: CanvasRenderingContext2D): void;
    create<T extends Node>(type: { new(x, y, p, c): T }, x: number, y: number, config?: object): T;
    getNodeByPosition(x: number, y: number): IInteractiveNode;

    //addWire(a: Pin, b: Pin): void;
    //selectNode(node: IInteractiveNode): void;
    //delete(): void;
    //serialize(): object;
}

export class NodeController implements INodeController {
    protected _nodes: Array<Node>;

    private _engine: Engine;
    get engine(): Engine {
        return this._engine;
    }

    constructor(engine: Engine) {
        this._engine = engine;
        this._nodes = new Array<Node>();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // drawning nodes
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].draw(ctx);
        }
    }

    create<T extends Node>(type: { new(x, y, parent, config): T }, x: number, y: number, config: any): T {
        const node = new type(x, y, this, config);
        this._nodes.push(node);
        return node;
    }

    getNodeByPosition(x: number, y: number): IInteractiveNode {
        let node = null;
        for (let i = this._nodes.length - 1; i >= 0; i--) {
            this._nodes[i].unselect();
            if (!node) {
                node = this._nodes[i].overed(x, y);
            }
        }
        return node;
    }
}