export function opacify(amount, hexColor) {
    return opacifyRaw(amount, hexColor);
}
export function opacifyRaw(amount, hexColor) {
    'worklet';
    if (!hexColor.startsWith('#')) {
        return hexColor;
    }
    if (hexColor.length !== 7) {
        throw new Error(`opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`);
    }
    if (amount < 0 || amount > 100) {
        throw new Error('opacify: provided amount should be between 0 and 100');
    }
    const validHexColor = /^#[0-9A-Fa-f]{6}$/.test(hexColor);
    if (!validHexColor) {
        throw new Error(`opacify: provided color ${hexColor} contains invalid characters, should be a valid hex (e.g. #000000)`);
    }
    const opacityHex = Math.round((amount / 100) * 255).toString(16);
    const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex;
    return `${hexColor.slice(0, 7)}${opacifySuffix}`;
}
//# sourceMappingURL=utils.js.map