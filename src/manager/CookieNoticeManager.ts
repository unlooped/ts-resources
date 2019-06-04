import * as Cookies from 'es-cookie';

export interface CookieNoticeManagerOptions {
    cookieName: string,
    cookieElSelector: string,
    expiresInDays: number,
}

export class CookieNoticeManager {

    private options: CookieNoticeManagerOptions;

    private cookieEl: JQuery;
    private okBtn: JQuery;

    public constructor(options: CookieNoticeManagerOptions) {
        this.options = options;

        this.loadElements();
        this.loadEvents();
        this.init();
    }

    protected loadElements() {
        this.cookieEl = jQuery(this.options.cookieElSelector);
        this.okBtn = this.cookieEl.find('button');
    }

    protected loadEvents() {
        this.okBtn.on('click', this.hideCookieNotice.bind(this));
    }

    protected init() {
        if (!Cookies.get(this.options.cookieName)) {
            this.cookieEl.removeClass('d-none');
        }
    }

    protected hideCookieNotice() {
        this.cookieEl.addClass('d-none');
        Cookies.set(this.options.cookieName, 'true', {'expires': this.options.expiresInDays});
    }
}
