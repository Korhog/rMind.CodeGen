import { CornerRadius } from '../types.js';
import * as render from '../render/render.js';
export var InteractiveNodeType;
(function (InteractiveNodeType) {
    InteractiveNodeType[InteractiveNodeType["Node"] = 0] = "Node";
    InteractiveNodeType[InteractiveNodeType["Pin"] = 1] = "Pin";
    InteractiveNodeType[InteractiveNodeType["Dot"] = 2] = "Dot";
})(InteractiveNodeType || (InteractiveNodeType = {}));
export class Node {
    translate(x, y) {
        throw new Error('Method not implemented.');
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = '#00000033';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;
        let rect = new DOMRect(100, 100, 200, 100);
        let cr = new CornerRadius(3, 3, 3, 3);
        render.drawRect(ctx, rect, '#1d1d1d', cr, 2);
        render.drawRect(ctx, rect, '#1d1d1d', cr);
        ctx.restore();
    }
    overed(x, y) {
        throw new Error('Method not implemented.');
    }
}
