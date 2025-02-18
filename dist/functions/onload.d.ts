declare global {
    interface Window {
        unl_isMainLoaded: boolean;
        unl_mainLoaded: Array<Function>;
    }
}
export declare function onLoad(cb: Function): void;
export declare function mainLoaded(): void;
