import JSBI from 'jsbi';
import { logger } from 'utilities/src/logger/logger';
export function convertScientificNotationToNumber(value) {
    var _a, _b;
    let convertedValue = value;
    // Convert scientific notation into number format so it can be parsed by BigInt properly
    // Ignore if value is a valid hex value
    if (value.includes('e') && !value.startsWith('0x')) {
        const [xStr, eStr] = value.split('e');
        let x = Number(xStr);
        let e = Number(eStr);
        if (xStr === null || xStr === void 0 ? void 0 : xStr.includes('.')) {
            const splitX = xStr.split('.');
            const decimalPlaces = (_b = (_a = splitX[1]) === null || _a === void 0 ? void 0 : _a.split('').length) !== null && _b !== void 0 ? _b : 0;
            e -= decimalPlaces;
            x *= Math.pow(10, decimalPlaces);
        }
        try {
            convertedValue = JSBI.multiply(JSBI.BigInt(x), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(e))).toString();
        }
        catch (error) {
            // If the numbers can't be converted to BigInts then just do regular arithmetic (i.e. when the exponent is negative)
            logger.debug('convertScientificNotation', 'convertScientificNotationToNumber', 'BigInt arithmetic unsuccessful', e);
            convertedValue = (x * Math.pow(10, e)).toString();
        }
    }
    return convertedValue;
}
//# sourceMappingURL=convertScientificNotation.js.map