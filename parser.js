const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

// Constant definition

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const rawCategories = [
    'Travel_and Entertainment',
    'Lifestyle and Wellness',
    'Food and Baverage',
    'Gadget and Electronics',
    'Daily Needs and Home Appliances',
    'Other'
];
const urlGlobal = 'https://www.bankmega.com/promolainnya.php';

// Function definition

const parsingData = async (subcategory, page) => {
    const parseResult = await request(`${urlGlobal}?product=0&subcat=${subcategory}&page=${page}`);
    let dataList = []
    const $ = cheerio.load(parseResult);
    const resultData = $('#imgClass');
    if (resultData.length>0) {
        resultData.each(function(i, val) {
            dataList = [...dataList, {
                title: $(this).attr('title'),
                imgurl: $(this).attr('src')
            }];
        });
    }
    return dataList;
}

const mainProgram = async () => {
    const promiseParse = rawCategories.map(async (eachCategory, numCategory) => {
        const promisePages = pages.map(async (eachPage) => {
            const resultParse = await parsingData(numCategory+1, eachPage);
            return resultParse;
        });
        const resultData = await Promise.all(promisePages);
        return {
            category: eachCategory,
            data: resultData
        };
    })
    const results = await Promise.all(promiseParse);
    fs.writeFile ("solution.json", JSON.stringify(results), (err) => {
        if (err) throw err;
        console.log('solution.json created');
        }
    );
}

mainProgram();

module.exports = {
    urlGlobal,
    rawCategories,
    pages,
    parsingData
};
