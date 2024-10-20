import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

type PropsType = Record<string | number | symbol, unknown>;

export interface ElementNode {
    tag: string,
    props: PropsType,
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.ELEMENT
}

export interface FragmentNode {
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.FRAGMENT;
}

export interface TextNode {
    type: typeof DOM_TYPES.TEXT,
    value: string
}

export type VirtualNodeType = ElementNode | TextNode | FragmentNode;

// NOTE: return a virtual node object
export function h(tag: string, props: PropsType = {}, children: Array<VirtualNodeType | null | string>) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT
    }
}

function mapTextNodes(children: Array<VirtualNodeType | string>) {
    return children.map(child => typeof child === "string" ? hString(child) : child);
}

function hString(str: string) {
    return { type: DOM_TYPES.TEXT, value: str }
}

export function hFragment(children: Array<VirtualNodeType | null | string>) {
    return {
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.FRAGMENT
    }
}
