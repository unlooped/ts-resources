export interface CookieNoticeManagerOptions {
    cookieName: string;
    cookieElSelector: string;
    expiresInDays: number;
}
export declare class CookieNoticeManager {
    private options;
    private cookieEl;
    private okBtn;
    constructor(options: CookieNoticeManagerOptions);
    protected loadElements(): void;
    protected loadEvents(): void;
    protected init(): void;
    protected hideCookieNotice(): void;
}
