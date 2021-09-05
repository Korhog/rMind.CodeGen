export interface IEvent<T> {
    on(handler: { (data?: T): void }): void;
}

export class Event<T> implements IEvent<T> {
    private handlers: { (data?: T): void; }[] = [];

    public on(handler: { (data?: T): void }): void {
        this.handlers.push(handler);
    }

    public emit(data?: T) {
        this.handlers.slice(0).forEach(h => h(data));
    }
}
