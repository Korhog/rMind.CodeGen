import { Engine } from '../engine.js';
import { Node, IInteractiveNode, InteractiveNodeType } from './node.js';
import { Pin } from './pins/pin.js';
import { Wire } from './wire/wire.js';

export interface INodeController {
    engine: Engine;
    draw(ctx: CanvasRenderingContext2D): void;
    create<T extends Node>(type: { new(x, y, p, c): T }, x: number, y: number, config?: object): T;
    createWire(a: Pin, b: Pin): void;
    getNodeByPosition(x: number, y: number): IInteractiveNode;

    //addWire(a: Pin, b: Pin): void;
    //selectNode(node: IInteractiveNode): void;
    //delete(): void;
    //serialize(): object;
}

export class NodeController implements INodeController {
    protected _nodes: Array<Node>;
    protected _wires: Array<Wire>;

    private _engine: Engine;
    get engine(): Engine {
        return this._engine;
    }

    constructor(engine: Engine) {
        this._engine = engine;
        this._nodes = new Array<Node>();
        this._wires = new Array<Wire>();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // drawning nodes
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].draw(ctx);
        }

        // drawning wires
        for (let i = 0; i < this._wires.length; i++) {
            this._wires[i].draw(ctx);
        }
    }

    create<T extends Node>(type: { new(x, y, parent, config): T }, x: number, y: number, config: any): T {
        const node = new type(x, y, this, config);
        this._nodes.push(node);
        return node;
    }

    createWire(a: Pin, b: Pin): void {
        if (b.validateConnection(a)) {
            const wire = new Wire(a, b);
            this._wires.push(wire);    
        }
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