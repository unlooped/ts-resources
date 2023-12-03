import * as jQuery from "jquery";
import ClickEvent = JQuery.ClickEvent;
import ChangeEvent = JQuery.ChangeEvent;

class CheckboxHelper {

    private static toggleCheckboxSelector = 'input[type="checkbox"][data-action^="checkbox:toggle"]';

    constructor() {
        this.loadElements();
        this.loadEvents();
        this.init();
    }

    private loadElements() {

    }

    private loadEvents() {
        jQuery(document.body).on('click', 'button[data-action^="checkbox:select-all"]', this.selectAll.bind(this));
        jQuery(document.body).on('click', 'button[data-action^="checkbox:select-none"]', this.selectNone.bind(this));
        jQuery(document.body).on('click', 'button[data-action^="checkbox:toggle"]', this.toggle.bind(this));
        jQuery(document.body).on('change', CheckboxHelper.toggleCheckboxSelector, this.toggleCheckboxChanged.bind(this));
        jQuery(document.body).on('change', 'input[type="checkbox"]', this.generalCheckboxChanged.bind(this));
    }

    private init() {
        document.querySelectorAll(CheckboxHelper.toggleCheckboxSelector).forEach((el: HTMLInputElement) => {
            this.updateToggleCheckboxStatus(el);
        });
    }

    private selectAll(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = true;
        });

        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }

    private selectNone(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = false;
        });

        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }

    private toggle(e: ClickEvent) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = !(cb.checked === true);
        });

        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }

    private toggleCheckboxChanged(e: ChangeEvent) {
        let currentTarget = e.currentTarget;
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = currentTarget.checked;
        });
    }

    private getCheckboxesForEvent(e: ClickEvent|ChangeEvent): NodeListOf<HTMLInputElement> {
        let source = e.currentTarget;
        return  document.querySelectorAll('input[type="checkbox"]' + source.dataset.checkboxToggleTarget);
    }

    private generalCheckboxChanged(e: ChangeEvent) {
        let currentTarget = e.currentTarget;
        this.updateRelatedToggleCheckboxes(currentTarget);
    }

    private updateRelatedToggleCheckboxes(cb: HTMLInputElement) {
        let matches = [];
        document.querySelectorAll(CheckboxHelper.toggleCheckboxSelector).forEach((el: HTMLInputElement) => {
            if (cb.matches(el.dataset.checkboxToggleTarget)) {
                matches.push(el);
            }
        });

        if (matches.length === 0) {
            return;
        }

        matches.forEach((match) => {
            this.updateToggleCheckboxStatus(match);
        })

    }

    private updateToggleCheckboxStatus(toggleCheckbox: HTMLInputElement) {
        let totalTargets = document.querySelectorAll('input[type="checkbox"]' + toggleCheckbox.dataset.checkboxToggleTarget);
        let checkedTargets = document.querySelectorAll('input[type="checkbox"]' + toggleCheckbox.dataset.checkboxToggleTarget + ':checked');

        if (checkedTargets.length === 0) {
            toggleCheckbox.indeterminate = false;
            toggleCheckbox.checked = false;
        } else if (checkedTargets.length < totalTargets.length) {
            toggleCheckbox.indeterminate = true;
            toggleCheckbox.checked = false;
        } else if (checkedTargets.length === totalTargets.length) {
            toggleCheckbox.indeterminate = false;
            toggleCheckbox.checked = true;
        }
    }

}

export const checkboxHelper = new CheckboxHelper();
