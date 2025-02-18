import { Controller } from '@hotwired/stimulus';
type DispatchOptions = Partial<{
    target: Element | Window | Document;
    detail: Object;
    prefix: string;
    bubbles: boolean;
    cancelable: boolean;
}>;
export declare class BaseStimulusController<ElementType extends Element = Element> extends Controller<ElementType> {
    private _registeredEvents;
    disconnect(): void;
    protected addEventListener<K extends keyof HTMLElementEventMap | string>(element: Element | Window | Document, type: K, listener: (this: HTMLFormElement, ev: K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event) => any, options?: boolean | AddEventListenerOptions): void;
    dispatch(eventName: string, { target, detail, prefix, bubbles, cancelable, }?: DispatchOptions): CustomEvent<Object>;
}
export {};
