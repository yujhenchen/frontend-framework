export function addEventListener(eventName: string, handler: (event?: Event) => void, el: Element) {
    el.addEventListener(eventName, handler);
    return handler;
}

export function addEventListeners(listeners: Record<string, (event?: Event) => void> = {}, el: Element) {
    // const addListeners: Record<string, (event?: Event) => void> = {}// new Map<string, (event?: Event) => void>;

    // Object.entries(listeners).forEach(([eventName, handler]) => {
    //     const listener = addEventListener(eventName, handler, el);
    //     addListeners[eventName] = listener;
    // });
    // return addListeners;
    Object.entries(listeners).forEach(([eventName, handler]) => {
        addEventListener(eventName, handler, el);
    });
    return listeners;
}
