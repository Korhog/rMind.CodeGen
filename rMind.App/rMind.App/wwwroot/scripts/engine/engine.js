import * as render from './render/render.js';
import { InputSystem } from './input.js';
import { RowNode } from './nodes/rowNode.js';
import { NodeController } from './nodes/nodeController.js';
export class Engine {
    constructor(container) {
        this.createInputSystem();
        this._canvasBG = this.createCanvas(container);
        this._ctxBG = this._canvasBG.getContext("2d");
        this._canvas = this.createCanvas(container);
        this._ctx = this._canvas.getContext("2d");
        console.log('engine created');
        window.addEventListener('resize', this.resize.bind(this));
        this._rect = this._canvas.getBoundingClientRect();
        this._rootController = new NodeController(this);
        // test data
        let node = this._rootController.create(RowNode, 100, 100, {});
        node.addRow();
        node.addRow();
        node = this._rootController.create(RowNode, 150, 150, {});
        node.addRow();
        node.addRow();
        node.addRow();
        this.resize();
    }
    draw() {
        this.clear();
        render.drawGrid(this._ctxBG, this._inputSystem.offset);
        //this._ctx.save();
        this._ctx.setTransform();
        this._ctx.translate(this._inputSystem.offset.x, this._inputSystem.offset.y);
        this._ctx.scale(this._inputSystem.scale, this._inputSystem.scale);
        this._rootController.draw(this._ctx);
        //this._ctx.restore();
    }
    resize() {
        this._canvas.width = window.innerWidth - 40;
        this._canvas.height = window.innerHeight - 200;
        this._canvasBG.width = window.innerWidth - 40;
        this._canvasBG.height = window.innerHeight - 200;
        this._rect = this._canvas.getBoundingClientRect();
        this._inputSystem.setRect(this._rect);
        this.draw();
    }
    clear() {
        this._ctxBG.fillStyle = '#3d3d3d';
        this._ctxBG.fillRect(0, 0, this._canvasBG.width, this._canvasBG.height);
        this._ctx.clearRect(-this._inputSystem.offset.x - 5, -this._inputSystem.offset.y - 5, this._canvas.width + 10, this._canvas.height + 10);
    }
    createCanvas(container) {
        const canvas = document.createElement('canvas');
        canvas.className = "canva";
        container.appendChild(canvas);
        return canvas;
    }
    createInputSystem() {
        this._inputSystem = new InputSystem();
        this._inputSystem.onMouseDown.on(this.onMouseDown.bind(this));
        this._inputSystem.onMouseMove.on((pos) => {
            this._rootController.getNodeByPosition(pos.x, pos.y);
            this.draw();
        });
        this._inputSystem.onWire.on((pos) => {
            this.draw();
            render.drawCurve(this._ctx, this._inputSystem.state.startMousePos, pos);
        });
        this._inputSystem.onScroll.on(() => { this.draw(); });
        this._inputSystem.onDrag.on(() => { this.draw(); });
        this._inputSystem.setRect(this._rect);
    }
    onMouseDown(pos) {
        let interactiveNode = this._rootController.getNodeByPosition(pos.x, pos.y);
        if (interactiveNode) {
            this._inputSystem.grab(interactiveNode, pos);
        }
    }
}
