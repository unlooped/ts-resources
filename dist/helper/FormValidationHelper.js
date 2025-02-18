"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormValidationHelper = void 0;
class FormValidationHelper {
    constructor(form) {
        this.form = form;
        this.loadElements();
        this.loadEvents();
        this.init();
    }
    loadElements() {
    }
    loadEvents() {
        this.form.on('submit', this.formSubmit.bind(this));
    }
    init() {
    }
    formSubmit(e) {
        this.form.addClass('was-validated');
        // @ts-ignore
        if (this.form[0].checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            let firstInvalidField = this.form.find(':invalid').first();
            $('html, body').animate({
                'scrollTop': firstInvalidField.offset().top - 20
            }, 100, () => {
                firstInvalidField.addClass('highlight');
                window.setTimeout(() => {
                    firstInvalidField.removeClass('highlight');
                }, 100);
            });
        }
    }
}
exports.FormValidationHelper = FormValidationHelper;
