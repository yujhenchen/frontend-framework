export class Dispatcher {
    private subs = new Map<string, Array<(payload: Record<string, unknown>) => unknown>>();
    private afterHandlers: Array<((payload?: Record<string, unknown>) => unknown)> = [];

    public subscribe(commandName: string, handler: (payload: Record<string, unknown>) => unknown) {
        if (!this.subs.has(commandName)) {
            this.subs.set(commandName, []);
        }

        const handlers = this.subs.get(commandName);

        // NOTE: add this prevent compile error: 'handlers' is possibly 'undefined'
        if (!handlers) {
            return () => { };
        }

        if (handlers.includes(handler)) {
            return () => { };
        }

        handlers.push(handler);
        return () => {
            // NOTE: when idx === -1, which removes the last handler in the handlers array (silent failure)
            const idx = handlers.indexOf(handler);
            handlers.splice(idx, 1);
        }
    }

    public afterEveryCommand(handler: (payload?: Record<string, unknown>) => unknown) {
        this.afterHandlers.push(handler);

        return () => {
            const idx = this.afterHandlers.indexOf(handler);
            this.afterHandlers.splice(idx, 1);
        }
    }

    public dispatch(commandName: string, payload: Record<string, unknown>) {
        if (this.subs.has(commandName)) {
            this.subs.get(commandName)?.forEach(handler => handler(payload));
        }
        else {
            console.log(`No handlers for the command ${commandName}`);
        }
        this.afterHandlers.forEach(handler => handler());
    }
}
