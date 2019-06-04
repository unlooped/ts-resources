let currencyFormatters: {[currency: string]: Intl.NumberFormat} = {};
let numberFormatter = new Intl.NumberFormat('de-DE');

export class NumberFormatter {

    public static formatCurrency(number: number, currency: string = 'EUR') {
        return formatCurrency(number);
    }

    public static formatNumber(number: number) {
        return formatNumber(number);
    }

}

function getFormatterForCurrency(currency: string): Intl.NumberFormat {
    if (!currencyFormatters.hasOwnProperty(currency)) {
        currencyFormatters[currency] = new Intl.NumberFormat('de-DE', {style: 'currency', currency: currency});
    }

    return currencyFormatters[currency];
}

export function formatCurrency(number: number, currency: string = 'EUR') {
    let currencyFormatter = getFormatterForCurrency(currency);

    return currencyFormatter.format(number);
}

export function formatNumber(number: number) {
    return numberFormatter.format(number);
}