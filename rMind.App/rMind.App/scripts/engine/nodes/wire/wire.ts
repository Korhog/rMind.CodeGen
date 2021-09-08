import { Pin } from '../pins/pin.js'
import { drawCurve } from '../../render/render.js'

export class Wire {
    protected _a: Pin;
    get a(): Pin { return this._a; }

    protected _b: Pin;
    get b(): Pin { return this._b; }

    constructor(a: Pin, b: Pin) {
        this._a = a;
        this._b = b;

        a.connect(this);
        b.connect(this);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        drawCurve(ctx, this._a.center, this._b.center);
    }

    disconnect(): void {
        this._a.disconnect(this);
        this._b.disconnect(this);

        this._a = null;
        this._b = null;
    }
}