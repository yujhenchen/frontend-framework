import { destroyDOM } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDOM } from "./mount-dom";
import type { VirtualNodeType } from "./types";

export function createApp({ state, view, reducers }: {
    state: unknown,
    view: (state: unknown) => VirtualNodeType, // NOTE: the top-component of the application
    reducers: Record<string, (state: unknown, payload: unknown) => unknown>
}) {
    let parentEl: Element | null = null;
    let vdom: VirtualNodeType | null = null;

    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)];
    for (const actionName in reducers) {
        const reducer = reducers[actionName];
        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(subs);
    }

    function renderApp() {
        if (vdom) {
            destroyDOM(vdom);
        }

        if (!parentEl) {
            console.error("Error, parentEl not found")
            return;
        }

        vdom = view(state);
        mountDOM(vdom, parentEl);
    }

    return {
        mount(_parentEl: Element) {
            parentEl = _parentEl;
            renderApp();
        }
    }
}
