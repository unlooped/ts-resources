import {Controller} from '@hotwired/stimulus';

type DispatchOptions = Partial<{
    target: Element | Window | Document
    detail: Object
    prefix: string
    bubbles: boolean
    cancelable: boolean
}>

export class BaseStimulusController<ElementType extends Element = Element> extends Controller<ElementType> {

    private _registeredEvents: any[] = [];

    disconnect() {
        super.disconnect();

        this._registeredEvents.forEach((entry) => {
            entry.element.removeEventListener(entry.type, entry.listener);
        })
    }

    protected addEventListener<K extends keyof HTMLElementEventMap | string>(
        element: Element | Window | Document,
        type: K,
        listener: (this: HTMLFormElement, ev: K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        element.addEventListener(type as string, (event: Event) => {
            this.application.logger.groupCollapsed(this.context.identifier + ' #event_received ' + event.type);
            this.application.logger.log("details:", {'element': this.element, 'event': event});
            this.application.logger.groupEnd();

            listener.call(event.currentTarget, event);
        }, options);

        this._registeredEvents.push({ element, type, listener });
    }

    public dispatch(
        eventName: string,
        {
            target = this.element,
            detail = {},
            prefix = this.identifier,
            bubbles = true,
            cancelable = true,
        }: DispatchOptions = {}
    ) {
        const type = prefix ? `${prefix}:${eventName}` : eventName
        this.application.logger.groupCollapsed(this.context.identifier + ' #event_dispatched ' + type);

        const event = super.dispatch(eventName, {
            target: target,
            detail: detail,
            prefix: prefix,
            bubbles: bubbles,
            cancelable: cancelable,
        });

        this.application.logger.log("details:", {'element': this.element, 'event': event});
        this.application.logger.groupEnd();

        return event;
    }
}
