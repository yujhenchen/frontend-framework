import type { DOM_TYPES } from "../h";
import type { VirtualNodeType } from "./types";

// export type PropsType = Record<string | number | symbol, unknown>;
export interface Props {
    on?: Record<string, (event?: Event | undefined) => void>
    [key: string]: string | Record<string, (event?: Event | undefined) => void> | undefined; // Allow for additional properties
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

export interface Attrs {
    class: string;
    style: Partial<CSSStyleDeclaration>;
    [key: string]: string | Partial<CSSStyleDeclaration>;
}
