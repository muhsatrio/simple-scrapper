const listUrl = require('./parser');

const urlReturn = url => {
    return url;
}

test('url should be https://www.bankmega.com/promolainnya.php', () => {
    expect(urlReturn(listUrl.urlGlobal)).toBe('https://www.bankmega.com/promolainnya');
});