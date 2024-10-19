import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

type PropsType = Record<string | number | symbol, unknown>;

export interface VirtualNode {
    tag: string,
    props: PropsType,
    children: Array<null | string | VirtualNode | VirtualTextNode | VirtualFragmentNode>,
    type: typeof DOM_TYPES.ELEMENT
}

export interface VirtualFragmentNode {
    children: Array<null | string | VirtualNode | VirtualTextNode | VirtualFragmentNode>,
    type: typeof DOM_TYPES.FRAGMENT;
}

export interface VirtualTextNode {
    type: typeof DOM_TYPES.TEXT,
    value: string
}

// NOTE: return a virtual node object
export function h(tag: string, props: PropsType = {}, 
    children: Array<null | string | VirtualNode | VirtualTextNode | VirtualFragmentNode>) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT
    }
}

function mapTextNodes(children: Array<null | string | VirtualNode | VirtualTextNode | VirtualFragmentNode>) {
    return children.map(child => typeof child === "string" ? hString(child) : child);
}

function hString(str: string) {
    return { type: DOM_TYPES.TEXT, value: str }
}

export function hFragment(children: Array<null | string | VirtualNode | VirtualTextNode | VirtualFragmentNode>) {
    return {
        children,
        type: DOM_TYPES.FRAGMENT
    }
}
