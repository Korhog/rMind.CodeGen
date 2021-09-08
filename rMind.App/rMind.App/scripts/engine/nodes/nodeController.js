import { Wire } from './wire/wire.js';
export class NodeController {
    constructor(engine) {
        this._engine = engine;
        this._nodes = new Array();
        this._wires = new Array();
    }
    get engine() {
        return this._engine;
    }
    draw(ctx) {
        // drawning nodes
        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].draw(ctx);
        }
        // drawning wires
        for (let i = 0; i < this._wires.length; i++) {
            this._wires[i].draw(ctx);
        }
    }
    create(type, x, y, config) {
        const node = new type(x, y, this, config);
        this._nodes.push(node);
        return node;
    }
    createWire(a, b) {
        if (b.validateConnection(a)) {
            const wire = new Wire(a, b);
            this._wires.push(wire);
        }
    }
    getNodeByPosition(x, y) {
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
