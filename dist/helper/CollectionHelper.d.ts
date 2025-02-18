export declare class CollectionHelper {
    private collectionRowRole;
    private container;
    private readonly allowAdd;
    private readonly allowDelete;
    private prototype;
    private currentCnt;
    private addButton;
    private deleteButtons;
    constructor(element: JQuery | any);
    protected loadElements(): void;
    protected updateDeleteBtns(): void;
    protected loadEvents(): void;
    protected loadDeleteBtnEvents(): void;
    protected init(): void;
    addRow(): JQuery;
    deleteRow(target: HTMLElement | JQuery): void;
    getCurrentCount(): number;
}
export declare function initCollectionHelpers(): void;
