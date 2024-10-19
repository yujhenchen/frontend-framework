import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

// TODO: make these types and interfaces consistency
type PropsType = Record<string | number | symbol, unknown>;

type VirtualNodeType = ReturnType<typeof h>;

interface VirtualFragmentNode {
    children: Array<VirtualNodeType | VirtualFragmentNode>;
    type: typeof DOM_TYPES.FRAGMENT;
}

export type ElementNodeType = {
    tag: string,
    props: PropsType,
    children: Array<null | ElementNodeType| string>,
};

// return a virtual node object
// TODO: what should be the data type of children
export function h(tag: string, props: PropsType = {}, children: Array<null | ElementNodeType | string>) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT
    }
}

function mapTextNodes(children: Array<null | ElementNodeType | string>) {
    return children.map(child => typeof child === "string" ? hString(child) : child);
}

function hString(str: string) {
    return { type: DOM_TYPES.TEXT, value: str }
}

export function hFragment(children: Array<VirtualNodeType | VirtualFragmentNode>) {
    return {
        children,
        type: DOM_TYPES.FRAGMENT
    }
}
