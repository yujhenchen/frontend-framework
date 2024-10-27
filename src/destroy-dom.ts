import { DOM_TYPES } from "./h";
import type { ElementNode, FragmentNode, TextNode } from "./utils/interfaces";
import type { VirtualNodeType } from "./utils/types";

export function destroyDOM(vdom: VirtualNodeType) {
    const { type } = vdom;

    switch (type) {
        case DOM_TYPES.TEXT:
            removeTextNode(vdom);
            break;
        case DOM_TYPES.ELEMENT:
            removeElementNode(vdom);
            break;
        case DOM_TYPES.FRAGMENT:
            removeFragmentNode(vdom);
            break;
        default:
            throw new Error(`cannot destroy DOM of type: ${type}`);
    }
    delete vdom.el;
}

function removeTextNode(vdom: TextNode) {
    const { el } = vdom;
    el?.remove();
}

function removeElementNode(vdom: ElementNode) {
    const { el, children, listeners } = vdom;

    if (!el) {
        // TODO: may not need this
        console.log("cannot find the element")
        return;
    }

    el?.remove();
    children.forEach(destroyDOM);

    if (listeners) {
        removeEventListeners(listeners, el);
        delete vdom.listeners;
    }
}

function removeFragmentNode(vdom: FragmentNode) {
    const { children } = vdom;
    children.forEach(destroyDOM);
}

function removeEventListeners(listeners: Record<string, (event?: Event | undefined) => void>, el: Element) {
    Object.entries(listeners).forEach(([eventName, handler]) => {
        el.removeEventListener(eventName, handler);
    });
}
