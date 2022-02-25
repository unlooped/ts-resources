import * as jQuery from "jquery";
import ClickEvent = JQuery.ClickEvent;

class CheckboxHelper {
    constructor() {
        this.loadElements();
        this.loadEvents();
        this.init();
    }

    private loadElements() {

    }

    private loadEvents() {
        jQuery(document.body).on('click', '*[data-action^="checkbox:select-all"]', this.selectAll.bind(this));
        jQuery(document.body).on('click', '*[data-action^="checkbox:select-none"]', this.selectNone.bind(this));
        jQuery(document.body).on('click', '*[data-action^="checkbox:toggle"]', this.toggle.bind(this));
    }

    private init() {

    }

    private selectAll(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = true;
        });
    }

    private selectNone(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = false;
        });
    }

    private toggle(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = !cb.checked;
        });
    }

    private getCheckboxesForEvent(e: ClickEvent): NodeListOf<HTMLInputElement> {
        let btn = e.currentTarget;
        return  document.querySelectorAll('input[type="checkbox"]' + btn.dataset.checkboxToggleTarget);
    }

}

export const checkboxHelper = new CheckboxHelper();
