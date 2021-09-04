import { Vector2D } from "../types.js";

export class Render {
    drawGrid(ctx: CanvasRenderingContext2D, offset: Vector2D) {
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

    clear(ctx: CanvasRenderingContext2D, from: Vector2D, to: Vector2D) {
        ctx.fillStyle = '#3d3d3d';
        ctx.fillRect(
            from.x, from.y, to.x, to.y
        );
    }
}