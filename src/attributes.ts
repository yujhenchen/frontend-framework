import type { Attrs } from "./interfaces";

export function setAttributes(el: Element, attrs: Attrs) {
    const { class: className, style, ...otherAttrs } = attrs;

    if (className) {
        setClass(el, className);
    }

    const isHTMLEl = el instanceof HTMLElement; // NOTE: the style property belongs to HTMLElement
    if (style && isHTMLEl) {
        Object.entries(style).forEach(([prop, value]) => {
            const cssProp = prop as keyof CSSStyleDeclaration;
            const cssValue = value as CSSStyleDeclaration[typeof cssProp];
            setStyle(el, cssProp, cssValue);
        });
    }

    /**
     * NOTE
     * although typeof `value` is unknown, after assigning value to `value`, `value` holds a string data type (at the runtime)
     */
    for (const [name, value] of Object.entries(otherAttrs)) {
        if (typeof value === "string") {
            setAttribute(el, name, value);
        }
    }
}

/**
 * Note
 * The DOMTokenList interface represents a set of space-separated tokens. 
 * Such a set is returned by Element.classList or HTMLLinkElement.relList, and many others. 
 */
function setClass(el: Element, className: string | Array<string>) {
    el.className = "";

    if (typeof className === "string") {
        el.className = className;
    }

    if (Array.isArray(className)) {
        el.classList.add(...className);
    }
}

/**
 * NOTE
 * - The CSSStyleDeclaration interface represents an object that is a CSS declaration block,
 *  and exposes style information and various style-related methods and properties.
 */
function setStyle<T extends keyof CSSStyleDeclaration>(
    el: HTMLElement,
    prop: T,
    value: CSSStyleDeclaration[T]) {
    el.style[prop] = value;
}

function removeStyle(el: HTMLElement, prop: string) {
    // el.style[prop] = null; // TODO: this get error: Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
    el.style.removeProperty(prop);
}

function setAttribute(el: Element, name: string, value: string) {
    // value is null or undefined
    if (value == null) {
        removeAttribute(el, name);
    }
    // else if (name.startsWith("data-")) {
    //     el.setAttribute(name, value);
    // }
    // else {
    //     el[name] = value; // TODO: get error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'HTMLElement'.
    // }
    el.setAttribute(name, value);
}

function removeAttribute(el: Element, name: string) {
    // el[name] = null;  // TODO: may not need this. Get error "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'HTMLElement'. No index signature with a parameter of type 'string' was found on type 'HTMLElement'"
    el.removeAttribute(name);
}
