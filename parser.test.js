const parser = require('./parser');

test('url should be https://www.bankmega.com/promolainnya.php', async () => {
    const value = await parser.urlGlobal;
    expect(value).toBe('https://www.bankmega.com/promolainnya.php');
});
test('rawCategories should be list type', async () => {
    const value = await parser.rawCategories;
    expect(Array.isArray(value)).toBe(true);
});
test('maxPage should be in range from 1 to 14', async () => {
    const value = await parser.maxPage;
    expect(value >= 1 && value <= 14).toBe(true);
});
test('parsingData() should not return null', async () => {
    const result = await parser.parsingData(1, 1);
    expect(result).not.toBeNull();
});
test('parsingData() should return list', async () => {
    const result = await parser.parsingData(1, 1);
    expect(Array.isArray(result)).toBe(true);
});