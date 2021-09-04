export var rMindPinDirection;
(function (rMindPinDirection) {
    rMindPinDirection[rMindPinDirection["None"] = 0] = "None";
    rMindPinDirection[rMindPinDirection["Input"] = 1] = "Input";
    rMindPinDirection[rMindPinDirection["Output"] = 2] = "Output";
})(rMindPinDirection || (rMindPinDirection = {}));
export class Pin {
    overed(x, y) {
        throw new Error("Method not implemented.");
    }
    draw(ctx) {
        throw new Error("Method not implemented.");
    }
}
