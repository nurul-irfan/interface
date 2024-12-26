export var FiatCurrency;
(function (FiatCurrency) {
    FiatCurrency["AustralianDollar"] = "AUD";
    FiatCurrency["BrazilianReal"] = "BRL";
    FiatCurrency["CanadianDollar"] = "CAD";
    FiatCurrency["ChineseYuan"] = "CNY";
    FiatCurrency["Euro"] = "EUR";
    FiatCurrency["BritishPound"] = "GBP";
    FiatCurrency["HongKongDollar"] = "HKD";
    FiatCurrency["IndonesianRupiah"] = "IDR";
    FiatCurrency["IndianRupee"] = "INR";
    FiatCurrency["JapaneseYen"] = "JPY";
    FiatCurrency["NigerianNaira"] = "NGN";
    FiatCurrency["PakistaniRupee"] = "PKR";
    FiatCurrency["RussianRuble"] = "RUB";
    FiatCurrency["SingaporeDollar"] = "SGD";
    FiatCurrency["SouthKoreanWon"] = "KRW";
    FiatCurrency["ThaiBaht"] = "THB";
    FiatCurrency["TurkishLira"] = "TRY";
    FiatCurrency["UkrainianHryvnia"] = "UAH";
    FiatCurrency["UnitedStatesDollar"] = "USD";
    FiatCurrency["VietnameseDong"] = "VND";
})(FiatCurrency || (FiatCurrency = {}));
export const DEFAULT_LOCAL_CURRENCY = FiatCurrency.UnitedStatesDollar;
export const ORDERED_CURRENCIES = [
    FiatCurrency.UnitedStatesDollar,
    FiatCurrency.AustralianDollar,
    FiatCurrency.BrazilianReal,
    FiatCurrency.CanadianDollar,
    FiatCurrency.ChineseYuan,
    FiatCurrency.Euro,
    FiatCurrency.BritishPound,
    FiatCurrency.HongKongDollar,
    FiatCurrency.IndonesianRupiah,
    FiatCurrency.IndianRupee,
    FiatCurrency.JapaneseYen,
    FiatCurrency.SouthKoreanWon,
    FiatCurrency.NigerianNaira,
    FiatCurrency.PakistaniRupee,
    FiatCurrency.RussianRuble,
    FiatCurrency.SingaporeDollar,
    FiatCurrency.ThaiBaht,
    FiatCurrency.TurkishLira,
    FiatCurrency.UkrainianHryvnia,
];
//# sourceMappingURL=constants.js.map