const parser = require('./parser');

test('url should be https://www.bankmega.com/promolainnya.php', async () => {
    const value = await parser.urlGlobal;
    expect(value).toBe('https://www.bankmega.com/promolainnya.php');
});
test('rawCategories should be list type', async () => {
    const value = await parser.rawCategories;
    expect(Array.isArray(value)).toBe(true);
});
test('pages should be list type', async () => {
    const value = await parser.pages;
    expect(Array.isArray(value)).toBe(true);
});
test('parsingData() should not return null', async () => {
    const result = await parser.parsingData(1, 1);
    expect(result).not.toBeNull();
});
test('parsingData() should return list', async () => {
    const result = await parser.parsingData(1, 1);
    expect(Array.isArray(result)).toBe(true);
});