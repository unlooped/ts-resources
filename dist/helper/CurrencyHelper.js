"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencySymbolForCurrency = getCurrencySymbolForCurrency;
const currencies_1 = require("../data/currencies");
function getCurrencySymbolForCurrency(currency) {
    if (currency in currencies_1.default) {
        return currencies_1.default[currency];
    }
    return currency;
}
