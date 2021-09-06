import { Pin, PinDirection } from './pins/pin.js';
import { Node } from './node.js';
export const ROW_HEIGHT = 30;
/** A row element of a RowNode */
export class Row {
}
/** A description of input or output pin. */
export class RowIODesc {
    constructor() {
        /** Rows used */
        this.rowSpan = 1;
    }
}
/** The row description. */
export class RowDesc {
}
/** The base node that can contain inputs and outputs. */
export class RowNode extends Node {
    constructor(x, y, parent, config) {
        super(x, y, parent, config);
        // visual
        this._fill = '#3d3d3d';
        this._rows = new Array();
        this._pins = new Array();
    }
    get pins() { return this._pins; }
    overed(x, y) {
        this._isMouseOver = false;
        if (x < this._position.x || x > this._position.x + this.width)
            return null;
        if (y < this._position.y || y > this._position.y + this.height)
            return null;
        for (let i = 0; i < this._pins.length; i++) {
            const node = this._pins[i].overed(x, y);
            if (node) {
                this._isMouseOver = true;
                return node;
            }
        }
        this._isMouseOver = true;
        return this;
    }
    translate(x, y) {
        super.translate(x, y);
        this.computeNodeRect();
    }
    draw(ctx) {
        super.draw(ctx);
        for (let i = 0; i < this._pins.length; i++) {
            this._pins[i].draw(ctx);
        }
    }
    unselect() {
        super.unselect();
        for (let i = 0; i < this._pins.length; i++) {
            this._pins[i].unselect();
        }
    }
    addRow(desc) {
        const row = new Row();
        if (desc) {
            // shoulr rebuild to NodeFactory
            if (desc.input) {
                //if (desc.input.label) {
                //    row.input = new PinLabel(this, desc.inputDesc.label, rMindPinDirection.Input);
                //}
                //else {
                //    row.input = new rMindPinBase(this, rMindPinDirection.Input);
                //}
                row.input = new Pin(this, PinDirection.Input);
                row.input.rowSpan = desc.input.rowSpan;
            }
            if (desc.output) {
                //if (desc.outputDesc.label) {
                //    row.output = new rMindPinLabel(this, desc.outputDesc.label, rMindPinDirection.Output);
                //}
                //else {
                //    row.output = new rMindPinBase(this, rMindPinDirection.Output);
                //}
                row.output = new Pin(this, PinDirection.Output);
                row.output.rowSpan = desc.output.rowSpan;
            }
        }
        else {
            row.input = new Pin(this, PinDirection.Input);
            row.output = new Pin(this, PinDirection.Output);
        }
        if (row.input)
            this._pins.push(row.input);
        if (row.output)
            this._pins.push(row.output);
        this._rows.push(row);
        this.computeHeight();
        this.computeNodeRect();
    }
    computeHeight() {
        this.height = this._rows.length * ROW_HEIGHT;
    }
    computeNodeRect() {
        const m = 4;
        const w = ROW_HEIGHT - m * 2;
        for (let i = 0; i < this._rows.length; i++) {
            const row = this._rows[i];
            const y = this._position.y + i * ROW_HEIGHT + m;
            if (row.input) {
                const ly = y + ((row.input.rowSpan - 1) * ROW_HEIGHT) / 2;
                const x1 = this._position.x + m;
                row.input.setRect(new DOMRect(x1, ly, w, w));
            }
            if (row.output) {
                const ly = y + ((row.output.rowSpan - 1) * ROW_HEIGHT) / 2;
                const x2 = this._position.x + this.width - ROW_HEIGHT + m;
                row.output.setRect(new DOMRect(x2, ly, w, w));
            }
        }
    }
}
