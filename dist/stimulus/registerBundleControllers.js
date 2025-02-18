"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBundleController = registerBundleController;
function registerBundleController(app, context, namespace) {
    const ns = namespace.replace(/\//g, '--').toLowerCase();
    context.keys().forEach((key) => {
        let logicalName = (key.match(/^(?:\.\/)?(.+)(?:[/_-]controller\..+?)$/) || [])[1];
        if (logicalName) {
            logicalName = logicalName.replace(/_/g, '-');
            app.register(ns + logicalName, context(key).default);
        }
    });
}
