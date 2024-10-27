import type { DOM_TYPES } from "../h";
import type { VirtualNodeType } from "./types";


export interface Attrs {
    class: string;
    style: Partial<CSSStyleDeclaration>;
    [key: string]: string | Partial<CSSStyleDeclaration>;
}

export interface Props extends Attrs {
    on?: Record<string, (event?: Event | undefined) => void>
};

export interface ElementNode {
    tag: string,
    props: Props,
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.ELEMENT,
    el?: Element,
    listeners?: Record<string, (event?: Event | undefined) => void>
}

export interface FragmentNode {
    children: Array<VirtualNodeType>,
    type: typeof DOM_TYPES.FRAGMENT,
    el?: Element
}

export interface TextNode {
    type: typeof DOM_TYPES.TEXT,
    value: string,
    el?: Text
}
