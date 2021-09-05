import * as render from './render/render.js';
import { InputSystem } from './input.js';
import { Node } from './nodes/node.js';
export class Engine {
    constructor(container) {
        this._inputSystem = new InputSystem();
        this._inputSystem.onMouseDown.on((pos) => console.log(pos));
        this._inputSystem.onScroll.on((pos) => {
            this.draw();
        });
        this._canvasBG = this.createCanvas(container);
        this._ctxBG = this._canvasBG.getContext("2d");
        this._canvas = this.createCanvas(container);
        this._ctx = this._canvas.getContext("2d");
        console.log('engine created');
        window.addEventListener('resize', this.resize.bind(this));
        this._rect = this._canvas.getBoundingClientRect();
        this._inputSystem.setRect(this._rect);
        // To Delete
        this._node = new Node();
    }
    draw() {
        this.clear();
        render.drawGrid(this._ctxBG, this._inputSystem.offset);
        this._ctx.setTransform();
        this._ctx.translate(this._inputSystem.offset.x, this._inputSystem.offset.y);
        this._node.draw(this._ctx);
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
}
