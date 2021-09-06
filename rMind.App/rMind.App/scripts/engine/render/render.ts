import { Vector2D, CornerRadius } from "../types.js";


export function drawGrid(ctx: CanvasRenderingContext2D, offset: Vector2D) {
    // compute grid offset
    const ox = offset.x > 0 ? offset.x % 200 - 200 : offset.x % 200;
    const oy = offset.y > 0 ? offset.y % 200 - 200 : offset.y % 200;

    const step = 20;
    const wstep = step * 10;

    let pos = wstep;

    ctx.save();
    ctx.strokeStyle = '#a1a1a1';
    ctx.lineWidth = 0.5;

    for (let c = 0; c < 10; c++) {
        pos = ox + c * wstep + 0.5;

        ctx.strokeStyle = '#1d1d1d';

        ctx.beginPath();
        ctx.moveTo(pos + wstep, 0);
        ctx.lineTo(pos + wstep, 1000);
        ctx.stroke();

        ctx.strokeStyle = '#4d4d4d';
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.moveTo(pos + (i + 1) * step, 0);
            ctx.lineTo(pos + (i + 1) * step, 1000);
            ctx.stroke();
        }
    }

    for (let c = 0; c < 5; c++) {
        pos = oy + c * wstep + 0.5;

        ctx.strokeStyle = '#1d1d1d';

        ctx.beginPath();
        ctx.moveTo(0, pos + wstep);
        ctx.lineTo(2000, pos + wstep);
        ctx.stroke();

        ctx.strokeStyle = '#4d4d4d';
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.moveTo(0, pos + (i + 1) * step);
            ctx.lineTo(2000, pos + (i + 1) * step);
            ctx.stroke();
        }
    }

    ctx.restore();
}

export function clear(ctx: CanvasRenderingContext2D, from: Vector2D, to: Vector2D) {
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(
        from.x, from.y, to.x, to.y
    );
}

export function drawRect(ctx: CanvasRenderingContext2D, rect: DOMRect, style: string, cornerRadius?: CornerRadius, offset = 0): void {
    ctx.fillStyle = style;

    if (cornerRadius) {
        ctx.beginPath();

        ctx.moveTo(rect.x + cornerRadius.topLeft, rect.y - offset);
        ctx.lineTo(rect.right - cornerRadius.topRight, rect.y - offset);

        ctx.quadraticCurveTo(rect.right + offset, rect.y - offset, rect.right + offset, rect.y + cornerRadius.topRight + offset);

        ctx.lineTo(rect.right + offset, rect.bottom - cornerRadius.bottomRight);

        ctx.quadraticCurveTo(rect.right + offset, rect.bottom + offset, rect.right - cornerRadius.bottomRight, rect.bottom + offset);
        ctx.lineTo(rect.x + cornerRadius.bottomLeft, rect.bottom + offset);

        ctx.quadraticCurveTo(rect.x - offset, rect.bottom + offset, rect.x - offset, rect.bottom - cornerRadius.bottomLeft);
        ctx.lineTo(rect.x - offset, rect.y + cornerRadius.topLeft);
        ctx.quadraticCurveTo(rect.x - offset, rect.y - offset, rect.x + cornerRadius.topLeft, rect.y - offset);

        ctx.closePath();
        ctx.fill();
        return;
    }

    ctx.fillRect(
        rect.x - offset,
        rect.y - offset,
        rect.width + offset + offset,
        rect.height + offset + offset
    );
}

export function drawCurve(ctx: CanvasRenderingContext2D, p1: Vector2D, p2: Vector2D): void {
    const leftToRight = p1.x <= p2.x;

    ctx.strokeStyle = 'rgba(0,255,125,0.75)';
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    const w = Math.abs(p1.x - p2.x) / 3;

    if (leftToRight) {
        ctx.bezierCurveTo(p1.x + w, p1.y, p2.x - w, p2.y, p2.x, p2.y);
    }
    else {
        ctx.bezierCurveTo(p1.x - w, p1.y, p2.x + w, p2.y, p2.x, p2.y);
    }

    ctx.stroke();
}
