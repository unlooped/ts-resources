export class FormValidationHelper {
    private form: JQuery<HTMLElement>;

    constructor(form: JQuery) {
        this.form = form;

        this.loadElements();
        this.loadEvents();
        this.init();
    }

    private loadElements() {

    }

    private loadEvents() {
        this.form.on('submit', this.formSubmit.bind(this));
    }

    private init() {

    }

    private formSubmit(e: JQuery.Event) {
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
