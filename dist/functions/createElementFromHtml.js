"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createElementFromHtml;
function createElementFromHtml(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstElementChild;
}
