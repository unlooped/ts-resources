import currencies from "../data/currencies";

export function getCurrencySymbolForCurrency(currency: string): string {
    if (currency in currencies) {
        return currencies[currency];
    }

    return currency;
}