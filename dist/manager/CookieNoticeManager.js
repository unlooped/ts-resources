"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieNoticeManager = void 0;
const Cookies = require("es-cookie");
class CookieNoticeManager {
    constructor(options) {
        this.options = options;
        this.loadElements();
        this.loadEvents();
        this.init();
    }
    loadElements() {
        this.cookieEl = jQuery(this.options.cookieElSelector);
        this.okBtn = this.cookieEl.find('button');
    }
    loadEvents() {
        this.okBtn.on('click', this.hideCookieNotice.bind(this));
    }
    init() {
        if (!Cookies.get(this.options.cookieName)) {
            this.cookieEl.removeClass('d-none');
        }
    }
    hideCookieNotice() {
        this.cookieEl.addClass('d-none');
        Cookies.set(this.options.cookieName, 'true', { 'expires': this.options.expiresInDays });
    }
}
exports.CookieNoticeManager = CookieNoticeManager;
