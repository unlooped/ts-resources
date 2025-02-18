"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormatter = void 0;
exports.formatCurrency = formatCurrency;
exports.formatNumber = formatNumber;
let currencyFormatters = {};
let numberFormatter = new Intl.NumberFormat('de-DE');
class NumberFormatter {
    static formatCurrency(number, currency = 'EUR') {
        return formatCurrency(number);
    }
    static formatNumber(number) {
        return formatNumber(number);
    }
}
exports.NumberFormatter = NumberFormatter;
function getFormatterForCurrency(currency) {
    if (!currencyFormatters.hasOwnProperty(currency)) {
        currencyFormatters[currency] = new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency });
    }
    return currencyFormatters[currency];
}
function formatCurrency(number, currency = 'EUR') {
    let currencyFormatter = getFormatterForCurrency(currency);
    return currencyFormatter.format(number);
}
function formatNumber(number) {
    return numberFormatter.format(number);
}
