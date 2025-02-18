"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkboxHelper = void 0;
const jQuery = require("jquery");
class CheckboxHelper {
    constructor() {
        this.loadElements();
        this.loadEvents();
        this.init();
    }
    loadElements() {
    }
    loadEvents() {
        jQuery(document.body).on('click', 'button[data-action^="checkbox:select-all"]', this.selectAll.bind(this));
        jQuery(document.body).on('click', 'button[data-action^="checkbox:select-none"]', this.selectNone.bind(this));
        jQuery(document.body).on('click', 'button[data-action^="checkbox:toggle"]', this.toggle.bind(this));
        jQuery(document.body).on('change', CheckboxHelper.toggleCheckboxSelector, this.toggleCheckboxChanged.bind(this));
        jQuery(document.body).on('change', 'input[type="checkbox"]', this.generalCheckboxChanged.bind(this));
    }
    init() {
        document.querySelectorAll(CheckboxHelper.toggleCheckboxSelector).forEach((el) => {
            this.updateToggleCheckboxStatus(el);
        });
    }
    selectAll(e) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = true;
        });
        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }
    selectNone(e) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = false;
        });
        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }
    toggle(e) {
        e.preventDefault();
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = !(cb.checked === true);
        });
        if (checkboxes.length > 0) {
            this.updateRelatedToggleCheckboxes(checkboxes[0]);
        }
    }
    toggleCheckboxChanged(e) {
        let currentTarget = e.currentTarget;
        let checkboxes = this.getCheckboxesForEvent(e);
        checkboxes.forEach((cb) => {
            cb.checked = currentTarget.checked;
        });
    }
    getCheckboxesForEvent(e) {
        let source = e.currentTarget;
        return document.querySelectorAll('input[type="checkbox"]' + source.dataset.checkboxToggleTarget);
    }
    generalCheckboxChanged(e) {
        let currentTarget = e.currentTarget;
        this.updateRelatedToggleCheckboxes(currentTarget);
    }
    updateRelatedToggleCheckboxes(cb) {
        let matches = [];
        document.querySelectorAll(CheckboxHelper.toggleCheckboxSelector).forEach((el) => {
            if (cb.matches(el.dataset.checkboxToggleTarget)) {
                matches.push(el);
            }
        });
        if (matches.length === 0) {
            return;
        }
        matches.forEach((match) => {
            this.updateToggleCheckboxStatus(match);
        });
    }
    updateToggleCheckboxStatus(toggleCheckbox) {
        let totalTargets = document.querySelectorAll('input[type="checkbox"]' + toggleCheckbox.dataset.checkboxToggleTarget);
        let checkedTargets = document.querySelectorAll('input[type="checkbox"]' + toggleCheckbox.dataset.checkboxToggleTarget + ':checked');
        if (checkedTargets.length === 0) {
            toggleCheckbox.indeterminate = false;
            toggleCheckbox.checked = false;
        }
        else if (checkedTargets.length < totalTargets.length) {
            toggleCheckbox.indeterminate = true;
            toggleCheckbox.checked = false;
        }
        else if (checkedTargets.length === totalTargets.length) {
            toggleCheckbox.indeterminate = false;
            toggleCheckbox.checked = true;
        }
    }
}
CheckboxHelper.toggleCheckboxSelector = 'input[type="checkbox"][data-action^="checkbox:toggle"]';
exports.checkboxHelper = new CheckboxHelper();
