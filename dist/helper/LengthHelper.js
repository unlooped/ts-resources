"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LengthHelper = void 0;
class LengthHelper {
    constructor(input) {
        this.input = input;
        this.form = input.parents('form');
        this.loadEvents();
        this.insertSpan();
    }
    insertSpan() {
        let label = jQuery('label[for="' + this.input.attr('id') + '"]');
        let container = jQuery('<div class="d-flex justify-content-between align-items-center"></div>').insertBefore(label);
        label.appendTo(container);
        this.cntSpan = jQuery('<span class="badge badge-pill badge-light"></span>').insertAfter(label);
        this.inputChanged();
    }
    loadEvents() {
        this.form.on('reset', () => {
            setTimeout(this.inputChanged.bind(this), 0);
        });
        this.input.on('input change ph-change', this.inputChanged.bind(this));
    }
    inputChanged() {
        this.cntSpan.text(this.getInputVal().length + ' / ' + this.input.attr('maxlength'));
        if (this.input.val().toString() === '') {
            this.cntSpan.addClass('text-muted');
        }
        else {
            this.cntSpan.removeClass('text-muted');
        }
    }
    getInputVal() {
        return this.input.val().toString() || this.input.attr('placeholder') || '';
    }
}
exports.LengthHelper = LengthHelper;
