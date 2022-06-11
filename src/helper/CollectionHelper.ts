import * as jQuery from 'jquery';
import htmlString = JQuery.htmlString;

export class CollectionHelper {

    private collectionRowRole: string = 'collection-row';

    private container: JQuery;
    private readonly allowAdd: boolean;
    private readonly allowDelete: boolean;
    private prototype: htmlString;
    private currentCnt: number;

    private addButton: JQuery;
    private deleteButtons: JQuery;

    constructor(element: JQuery|any) {
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

    protected loadElements() {
        if (this.allowAdd) this.addButton = jQuery(this.container.data('add-btn-sel'));
        this.updateDeleteBtns();
    }

    protected updateDeleteBtns() {
        if (this.allowDelete) this.deleteButtons = jQuery(this.container.data('delete-btn-sel'));
    }

    protected loadEvents() {
        if (this.allowAdd) this.addButton.on('click', (e) => {
            e.preventDefault();
            this.addRow();
        });
        this.loadDeleteBtnEvents();
    }

    protected loadDeleteBtnEvents() {
        if (this.allowDelete) this.deleteButtons.on('click', e => {
            e.preventDefault();
            this.deleteRow(e.target);
        });
    }

    protected init() {
    }

    public addRow(): JQuery {
        let row:string = this.prototype.replace(/__name__label__/g, this.currentCnt.toString());
        row = row.replace(/__name__/g, this.currentCnt.toString());

        let el: JQuery = jQuery(row).attr('role', this.collectionRowRole);
        this.container.append(el);

        this.updateDeleteBtns();
        this.loadDeleteBtnEvents();

        this.container.trigger('unl.row_added', el);
        this.currentCnt++;

        return el;
    }

    public deleteRow(target: HTMLElement|JQuery) {
        target = jQuery(target);
        target.parents('[role="' + this.collectionRowRole + '"]').first().remove();
        this.container.trigger('unl.row_deleted', target);
    }

    public getCurrentCount(): number {
        return this.currentCnt;
    }
}

export function initCollectionHelpers() {
    jQuery('*[data-collection="form-collection"]').each((index, el) => {
        new CollectionHelper(el);
    });
}
