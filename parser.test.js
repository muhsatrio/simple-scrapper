const listUrl = require('./parser');

test('url should be https://www.bankmega.com/promolainnya.php', () => {
    expect(listUrl.urlGlobal).toBe('https://www.bankmega.com/promolainnya.php');
});