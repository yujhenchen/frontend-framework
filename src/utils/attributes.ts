export function setArrtibutes(el: Element, attrs) {
    const { class: className, style, ...otherAttrs } = attrs;

    if(className) {
        setClass(el, className);
    }

    if(style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value);
        });
    }

    for(const [name, value] of Object.entries(otherAttrs)) {
        setArrtibute(el, name, value);
    }
}

/**
 * 
 * @param el 
 * @param className 
 * 
 * The DOMTokenList interface represents a set of space-separated tokens. 
 * Such a set is returned by Element.classList or HTMLLinkElement.relList, and many others. 
 */
function setClass(el: Element, className: string | Array<string>) {
    el.className = "";

    if(typeof className === "string") {
        el.className = className;
    }

    if(Array.isArray(className)) {
        el.classList.add(...className);
    }
}

/**
 * 
 * @param el 
 * @param prop 
 * @param value 
 * 
 * The CSSStyleDeclaration interface represents an object that is a CSS declaration block,
 *  and exposes style information and various style-related methods and properties.
 */
function setStyle<T extends keyof CSSStyleDeclaration>(
    el: HTMLElement, 
    name: T, 
    value: CSSStyleDeclaration[T]) {
        el.style[name] = value;
}

function removeStyle<T extends keyof CSSStyleDeclaration>(el: HTMLElement, name: T) {
    el.style[name] = "" as CSSStyleDeclaration[T]; // TODO: try to find another way instead of type casting
}

function setArrtibute(el: Element, name, value) {

}
