"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionHelper = void 0;
exports.initCollectionHelpers = initCollectionHelpers;
const jQuery = require("jquery");
class CollectionHelper {
    constructor(element) {
        this.collectionRowRole = 'collection-row';
        this.container = jQuery(element);
        if (this.container.data('collectionHelper') instanceof CollectionHelper) {
            throw new Error('Collection Helper already initialized for this container');
        }
        this.container.data('collectionHelper', this);
        this.allowAdd = this.container.data('allow-add');
        this.allowDelete = this.container.data('allow-delete');
        this.prototype = this.container.data('prototype');
        let children = this.container.children();
        this.currentCnt = children.length;
        children.attr('role', this.collectionRowRole);
        this.loadElements();
        this.loadEvents();
        this.init();
    }
    loadElements() {
        if (this.allowAdd)
            this.addButton = jQuery(this.container.data('add-btn-sel'));
        this.updateDeleteBtns();
    }
    updateDeleteBtns() {
        if (this.allowDelete)
            this.deleteButtons = jQuery(this.container.data('delete-btn-sel'));
    }
    loadEvents() {
        if (this.allowAdd)
            this.addButton.on('click', (e) => {
                e.preventDefault();
                this.addRow();
            });
        this.loadDeleteBtnEvents();
    }
    loadDeleteBtnEvents() {
        if (this.allowDelete)
            this.deleteButtons.on('click', e => {
                e.preventDefault();
                this.deleteRow(e.target);
            });
    }
    init() {
    }
    addRow() {
        let row = this.prototype.replace(/__name__label__/g, this.currentCnt.toString());
        row = row.replace(/__name__/g, this.currentCnt.toString());
        let el = jQuery(row).attr('role', this.collectionRowRole);
        this.container.append(el);
        this.updateDeleteBtns();
        this.loadDeleteBtnEvents();
        this.container.trigger('unl.row_added', el);
        this.currentCnt++;
        return el;
    }
    deleteRow(target) {
        target = jQuery(target);
        target.parents('[role="' + this.collectionRowRole + '"]').first().remove();
        this.container.trigger('unl.row_deleted', target);
    }
    getCurrentCount() {
        return this.currentCnt;
    }
}
exports.CollectionHelper = CollectionHelper;
function initCollectionHelpers() {
    jQuery('*[data-collection="form-collection"]').each((index, el) => {
        new CollectionHelper(el);
    });
}
