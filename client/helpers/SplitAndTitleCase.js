export function splitAndTitleCase(input) {
    return input.length > 0 ? input.split('_')
        .map(txt => {
            if (txt[0] === '.') {
                return txt[1].toUpperCase() + txt.substr(2);
            }
            return txt[0].toUpperCase() + txt.substr(1);
        })
        .join(' ') : '';
}