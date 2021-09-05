// vector
export class Vector2D {
    x: number;
    y: number;

    constructor(_x: number = 0, _y: number = 0) {
        this.x = _x || 0;
        this.y = _y || 0;
    }

    add(v: Vector2D) {
        this.x += v.x;
        this.y += v.y;
    }
}

export class CornerRadius {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;

    constructor(topleft?: number, topright?: number, bottomleft?: number, bottomright?: number) {
        this.topLeft = topleft ?? 0;
        this.topRight = topright ?? 0;
        this.bottomLeft = bottomleft ?? 0;
        this.bottomRight = bottomright ?? 0;
    }
}