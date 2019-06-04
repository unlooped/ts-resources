declare global {
    interface Window {
        unl_isMainLoaded: boolean;
        unl_mainLoaded: Array<Function>;
    }
}

export function onLoad(cb: Function) {
    if (typeof window.unl_isMainLoaded !== 'undefined' && window.unl_isMainLoaded) {
        cb();
    } else {
        if (typeof window.unl_mainLoaded == 'undefined') {
            window.unl_mainLoaded = [];
        }
        window.unl_mainLoaded.push(cb);
    }
}

export function mainLoaded() {
    window.unl_isMainLoaded = true;
    if (typeof window.unl_mainLoaded !== 'undefined') {
        for (let fn of window.unl_mainLoaded) {
            fn();
        }
    }
}