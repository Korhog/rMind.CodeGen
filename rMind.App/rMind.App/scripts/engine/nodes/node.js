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
        throw new Error('Method not implemented.');
    }
    overed(x, y) {
        throw new Error('Method not implemented.');
    }
}
