const parser = require('./parser');

test('url should be https://www.bankmega.com/promolainnya.php', () => {
    expect(parser.urlGlobal).toBe('https://www.bankmega.com/promolainnya.php');
});
test('parsingData() should not return null', async () => {
    const result = await parser.parsingData(1, 1);
    expect(result).not.toBeNull();
});