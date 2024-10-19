import { DOM_TYPES, type ElementNode, type FragmentNode, type TextNode } from "./h";

/**
 * 
 * @param vdom 
 * @param parentEl https://developer.mozilla.org/en-US/docs/Web/API/Element
 */
// TODO: Node vs Element vs HTMLElement
export function mountDOM(vdom: ElementNode | FragmentNode | TextNode, parentEl: Element) {
    switch (vdom.type) {
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
            throw new Error(`Cannot mount DOM of tyoe: ${vdom.type}`);
    }
}

function createTextNode(vdom: TextNode, parentEl: Element) {
    const { value } = vdom;

    const textNode = document.createTextNode(value);
    vdom.el = textNode;
    parentEl.append(textNode)
}

function createElementNode(vdom: ElementNode, parentEl: Element) {
    
}

function createFragmentNodes(vdom: FragmentNode, parentEl: Element) {
    const { children } = vdom;
    vdom.el = parentEl;

    children.forEach(child => {
        if(child){
            mountDOM(child, parentEl);
        }
    })
}
