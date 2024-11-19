import { destroyDOM } from "./destroy-dom";
import { mountDOM } from "./mount-dom";
import type { VirtualNodeType } from "./types";

export function createApp({ state, view }: { state: Array<unknown>, view: (...args: Array<unknown>) => VirtualNodeType }) {
    let parentEl: Element | null = null;
    let vdom: VirtualNodeType | null = null;

    function renderApp() {
        if (vdom) {
            destroyDOM(vdom);
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
