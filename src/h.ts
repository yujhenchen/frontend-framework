import { withoutNulls } from "./utils/arrays"

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
} as const;

type DomType = typeof DOM_TYPES[keyof typeof DOM_TYPES];

type PropsType = Record<string | number | symbol, unknown>;

export type ElementNodeType = {
    tag: DomType,
    props: PropsType,
    children: Array<null | ElementNodeType| string>
};

// return a virtual node object
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

export function hFragment(children: Array<null | ElementNodeType | string>) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(children))
    }
}
