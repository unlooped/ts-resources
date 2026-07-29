import {Controller} from '@hotwired/stimulus';

type DispatchOptions = Partial<{
    target: Element | Window | Document
    detail: Object
    prefix: string
    bubbles: boolean
    cancelable: boolean
}>

interface RegisteredEvent {
    element: Element | Window | Document;
    type: string;
    listener: EventListener;
    options?: boolean | AddEventListenerOptions;
}

export class BaseStimulusController<ElementType extends Element = Element> extends Controller<ElementType> {

    private _registeredEvents: RegisteredEvent[] = [];

    disconnect() {
        super.disconnect();

        this._registeredEvents.forEach((entry) => {
            entry.element.removeEventListener(entry.type, entry.listener, entry.options);
        });
        this._registeredEvents = [];
    }

    protected addEventListener<K extends keyof HTMLElementEventMap | string>(
        element: Element | Window | Document,
        type: K,
        listener: (this: EventTarget | null, ev: K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        const wrapped: EventListener = (event: Event) => {
            if (this.application.debug) {
                this.application.logger.groupCollapsed(this.context.identifier + ' #event_received ' + event.type);
                this.application.logger.log("details:", {'element': this.element, 'event': event});
                this.application.logger.groupEnd();
            }

            listener.call(event.currentTarget, event as any);
        };

        element.addEventListener(type as string, wrapped, options);
        this._registeredEvents.push({ element, type: type as string, listener: wrapped, options });
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
        const event = super.dispatch(eventName, {
            target: target,
            detail: detail,
            prefix: prefix,
            bubbles: bubbles,
            cancelable: cancelable,
        });

        if (this.application.debug) {
            const type = prefix ? `${prefix}:${eventName}` : eventName;
            this.application.logger.groupCollapsed(this.context.identifier + ' #event_dispatched ' + type);
            this.application.logger.log("details:", {'element': this.element, 'event': event});
            this.application.logger.groupEnd();
        }

        return event;
    }
}
