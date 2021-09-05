export class Event {
    constructor() {
        this.handlers = [];
    }
    on(handler) {
        this.handlers.push(handler);
    }
    emit(data) {
        this.handlers.slice(0).forEach(h => h(data));
    }
}
