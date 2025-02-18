"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
class UploadController {
    constructor(form = null, options) {
        this.existingFileCount = 0;
        this.form = form;
        this.options = options;
        this.loadElements();
        this.loadEvents();
        this.init();
    }
    loadElements() {
        this.fileUploadEl = jQuery(this.options.fileUploadSelector);
        this.files = jQuery(this.options.fileTargetSelector);
        this.progressBar = jQuery(this.options.progressbarSelector);
        this.progressRow = this.progressBar.parents('.row').first();
    }
    loadEvents() {
        this.fileUploadEl
            .on('fileuploadadd', this.fileUploadAdd.bind(this))
            .on('fileuploadprocessalways', this.fileUploadProcessAlways.bind(this))
            .on('fileuploadprogressall', this.fileUploadProgressAll.bind(this))
            .on('fileuploaddone', this.fileUploadDone.bind(this))
            .on('fileuploadfail', this.fileUploadFail.bind(this));
    }
    init() {
        this.existingFileCount = this.files.children().length;
        // @ts-ignore
        this.fileUploadEl.fileupload({
            dataType: 'json',
            autoUpload: true,
            // @ts-ignore
            previewMaxWidth: 250,
            previewMaxHeight: 250,
            previewCanvas: false,
        });
    }
    fileUploadAdd(e, data) {
        console.log('fileUploadAdd', data);
        this.form.trigger('disable-submit', { 'message': 'Upload Running' });
        let protoType = this.files.data('prototype');
        this.progressRow.removeClass('invisible');
        jQuery.each(data.files, (index, file) => {
            let idx = this.existingFileCount++;
            let prefix = this.options.formSelector + idx + '_';
            let ptEl = jQuery(protoType.replace(/__name__/g, idx));
            ptEl.find(prefix + 'name').val(file.name);
            file.listEl = ptEl;
            file.index = idx;
            ptEl.appendTo(this.files);
        });
    }
    fileUploadProcessAlways(e, data) {
        console.log('fileuploadprocessalways', data);
        let index = data.index;
        let file = data.files[index];
        if (file.preview) {
            file.listEl.find('.gi_preview').append(file.preview);
        }
        if (file.error) {
            file.listEl.append($('<span class="text-danger"/>').text(file.error));
        }
    }
    fileUploadProgressAll(e, data) {
        console.log('fileuploadprogressall', data);
        let progress = Math.round(data.loaded / data.total * 100);
        this.progressBar.css('width', progress + '%');
        this.progressBar.attr('aria-valuenow', progress);
    }
    fileUploadDone(e, data) {
        console.log('fileuploaddone', data);
        jQuery.each(data.files, (index, file) => {
            let prefix = this.options.formSelector + file.index + '_';
            file.listEl.find(prefix + 'file').val(data.result.filename);
        });
        this.progressRow.addClass('invisible');
        this.form.trigger('enable-submit');
    }
    fileUploadFail(e, data) {
        console.log('fileUploadFail', data);
    }
}
exports.UploadController = UploadController;
