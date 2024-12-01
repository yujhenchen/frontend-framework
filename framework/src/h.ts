import type { Props } from "./interfaces";
import type { VirtualNodeType } from "./types";
import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

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
