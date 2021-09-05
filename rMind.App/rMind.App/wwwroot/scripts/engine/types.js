// vector
export class Vector2D {
    constructor(_x = 0, _y = 0) {
        this.x = _x || 0;
        this.y = _y || 0;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
}
export class CornerRadius {
    constructor(topleft, topright, bottomleft, bottomright) {
        this.topLeft = topleft !== null && topleft !== void 0 ? topleft : 0;
        this.topRight = topright !== null && topright !== void 0 ? topright : 0;
        this.bottomLeft = bottomleft !== null && bottomleft !== void 0 ? bottomleft : 0;
        this.bottomRight = bottomright !== null && bottomright !== void 0 ? bottomright : 0;
    }
}
