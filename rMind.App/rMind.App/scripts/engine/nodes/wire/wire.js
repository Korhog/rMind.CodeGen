import { drawCurve } from '../../render/render.js';
export class Wire {
    constructor(a, b) {
        this._a = a;
        this._b = b;
        a.connect(this);
        b.connect(this);
    }
    get a() { return this._a; }
    get b() { return this._b; }
    draw(ctx) {
        drawCurve(ctx, this._a.center, this._b.center);
    }
    disconnect() {
        this._a.disconnect(this);
        this._b.disconnect(this);
        this._a = null;
        this._b = null;
    }
}
