export interface UploadControllerOptions {
    fileUploadSelector: string;
    formSelector: string;
    fileTargetSelector: string;
    progressbarSelector: string;
}
export declare class UploadController {
    private options;
    private fileUploadEl;
    private files;
    private existingFileCount;
    private progressBar;
    private progressRow;
    private form;
    constructor(form: JQuery, options: UploadControllerOptions);
    private loadElements;
    private loadEvents;
    private init;
    private fileUploadAdd;
    private fileUploadProcessAlways;
    private fileUploadProgressAll;
    private fileUploadDone;
    private fileUploadFail;
}
