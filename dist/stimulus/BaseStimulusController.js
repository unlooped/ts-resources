"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStimulusController = void 0;
const stimulus_1 = require("@hotwired/stimulus");
class BaseStimulusController extends stimulus_1.Controller {
    constructor() {
        super(...arguments);
        this._registeredEvents = [];
    }
    disconnect() {
        super.disconnect();
        this._registeredEvents.forEach((entry) => {
            entry.element.removeEventListener(entry.type, entry.listener);
        });
    }
    addEventListener(element, type, listener, options) {
        element.addEventListener(type, (event) => {
            this.application.logger.groupCollapsed(this.context.identifier + ' #event_received ' + event.type);
            this.application.logger.log("details:", { 'element': this.element, 'event': event });
            this.application.logger.groupEnd();
            listener.call(event.currentTarget, event);
        }, options);
        this._registeredEvents.push({ element, type, listener });
    }
    dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true, } = {}) {
        const type = prefix ? `${prefix}:${eventName}` : eventName;
        this.application.logger.groupCollapsed(this.context.identifier + ' #event_dispatched ' + type);
        const event = super.dispatch(eventName, {
            target: target,
            detail: detail,
            prefix: prefix,
            bubbles: bubbles,
            cancelable: cancelable,
        });
        this.application.logger.log("details:", { 'element': this.element, 'event': event });
        this.application.logger.groupEnd();
        return event;
    }
}
exports.BaseStimulusController = BaseStimulusController;
