export class Dispatcher {
    private subs = new Map<string, Array<() => void>>();

    public subscribe(commandName: string, handler: () => void) {
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
}
