import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

// export type PropsType = Record<string | number | symbol, unknown>;
export interface Props {
    on?: Record<string, (event?: Event | undefined) => void>
};

export interface ElementNode {
    tag: string,
    props: Props,
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.ELEMENT,
    el: Element | null,
    listeners: Record<string, (event?: Event | undefined) => void>
}

export interface FragmentNode {
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.FRAGMENT,
    el: Element | null
}

export interface TextNode {
    type: typeof DOM_TYPES.TEXT,
    value: string,
    el: Text | null
}

export type VirtualNodeType = ElementNode | TextNode | FragmentNode;

// NOTE: return a virtual node object
export function h(tag: string, props: Props | {} = {}, children: Array<VirtualNodeType | null | string>) {
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
