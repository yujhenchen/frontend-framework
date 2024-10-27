import { DOM_TYPES } from "./h";
import { setAttributes } from "./utils/attributes";
import { addEventListeners } from "./utils/events";
import type { ElementNode, FragmentNode, Props, TextNode } from "./utils/interfaces";
import type { VirtualNodeType } from "./utils/types";

/**
 * 
 * @param vdom 
 * @param parentEl https://developer.mozilla.org/en-US/docs/Web/API/Element
 */
// TODO: Node vs Element vs HTMLElement
export function mountDOM(vdom: VirtualNodeType, parentEl: Element) {
    const vdomType = vdom.type
    switch (vdomType) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl);
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNodes(vdom, parentEl);
            break;
        default:
            throw new Error(`Cannot mount DOM of tyoe: ${vdomType}`);
    }
}

function createTextNode(vdom: TextNode, parentEl: Element) {
    const { value } = vdom;

    const textNode = document.createTextNode(value);
    vdom.el = textNode;
    parentEl.append(textNode)
}

function createFragmentNodes(vdom: FragmentNode, parentEl: Element) {
    const { children } = vdom;
    vdom.el = parentEl;

    children.forEach(child => {
        if (child) {
            mountDOM(child, parentEl);
        }
    })
}

function createElementNode(vdom: ElementNode, parentEl: Element) {
    const { tag, props, children } = vdom;

    const element = document.createElement(tag);
    addProps(element, props, vdom);
    vdom.el = element;

    children.forEach(child => mountDOM(child, element));
    parentEl.append(element);
}

function addProps(el: Element, props: Props, vdom: ElementNode) {
    const { on: events, ...attrs } = props;

    vdom.listeners = addEventListeners(events, el);
    setAttributes(el, attrs);
}
