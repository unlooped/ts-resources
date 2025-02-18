"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLoad = onLoad;
exports.mainLoaded = mainLoaded;
function onLoad(cb) {
    if (typeof window.unl_isMainLoaded !== 'undefined' && window.unl_isMainLoaded) {
        cb();
    }
    else {
        if (typeof window.unl_mainLoaded == 'undefined') {
            window.unl_mainLoaded = [];
        }
        window.unl_mainLoaded.push(cb);
    }
}
function mainLoaded() {
    window.unl_isMainLoaded = true;
    if (typeof window.unl_mainLoaded !== 'undefined') {
        for (let fn of window.unl_mainLoaded) {
            fn();
        }
    }
}
