export function setAttributes(el: HTMLElement, attrs: { class: string, style: Partial<CSSStyleDeclaration>, otherAttrs }) {
    const { class: className, style, ...otherAttrs } = attrs;

    if (className) {
        setClass(el, className);
    }

    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            const cssProp = prop as keyof CSSStyleDeclaration;
            const cssValue = value as CSSStyleDeclaration[typeof cssProp];
            setStyle(el, cssProp, cssValue);
        });
    }

    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(el, name, value);
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

// function removeStyle<T extends keyof CSSStyleDeclaration>(el: HTMLElement, prop: T) {
//     el.style[prop] = "" as CSSStyleDeclaration[T]; // NOTE: Type assertion to allow empty string
// }
function removeStyle(el: HTMLElement, prop: string) {
    el.style.removeProperty(prop);
}

function setAttribute(el: HTMLElement, name: string, value: string) {
    // value is null or undefined
    if (value == null) {
        removeAttribute(el, name);
    }
    else if (name.startsWith("data-")) {
        el.setAttribute(name, value);
    }
    else {
        el.setAttribute(name, "")
    }
}

function removeAttribute(el: HTMLElement, name: string) {
    // el[name] = null;  // TODO: may not need this. Get error "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'HTMLElement'. No index signature with a parameter of type 'string' was found on type 'HTMLElement'"
    el.removeAttribute(name);
}
