import {Application} from "@hotwired/stimulus";

export function registerBundleController(app: Application, context: __WebpackModuleApi.RequireContext, namespace: string) {
    const ns = namespace.replace(/\//g, '--').toLowerCase();

    context.keys().forEach((key: any) => {
        let logicalName = (key.match(/^(?:\.\/)?(.+)(?:[/_-]controller\..+?)$/) || [])[1];
        if (logicalName) {
            logicalName = logicalName.replace(/_/g, '-');
            app.register(ns + logicalName, context(key).default);
        }
    });
}
