import { Render } from "./render/render.js";
import { Vector2D } from "./types.js";

export class Engine {
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _render: Render;

    constructor(canvas: HTMLCanvasElement) {
        this._render = new Render();
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
    }

    draw() {
        this._render.clear(this._ctx, new Vector2D(0, 0), new Vector2D(this._canvas.width, this._canvas.height));
        this._render.drawGrid(this._ctx, new Vector2D(0, 0));
    }
}