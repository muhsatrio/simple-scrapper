const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let parsingResult = [];
let page;
let count = 0;

for (let i=0;i<6;i++) {
    for (let j=0;j<15;j++) {
        parsingResult[count] = new Promise((resolve, reject) => {
            request(`https://www.bankmega.com/promolainnya.php?product=0&subcat=${i+1}&page=${j+1}`, (err, res, html) => {        
               if (!err) {
                    let dataList = []
                    const $ = cheerio.load(html);
                    const resultData = $('#imgClass');
                    if (resultData.length>0) {
                        resultData.each(function(i, val) {
                            const dataTemp = {
                                title: $(this).attr('title'),
                                imgurl: $(this).attr('src'),
                            };
                            dataList.push(dataTemp);
                        });
                    }
                    resolve(dataList);
                }
            });
        });
    count++;
    }
}
Promise.all(parsingResult).then(values => {
    let data_result = {
        travel_and_entertainment: [],
        lifestyle_and_wellness: [],
        food_and_baverage: [],
        gadget_and_electronics: [],
        daily_needs_and_home_appliances: [],
        other: []
    };
    let count = 0;
    for (let i=0;i<6;i++) {
        for (let j=0;j<15;j++) {
            if (i==0) {
                data_result.travel_and_entertainment.push(values[count]);
            }
            else if (i==1) {
                data_result.lifestyle_and_wellness.push(values[count]);
            }
            else if (i==2) {
                data_result.food_and_baverage.push(values[count]);
            }
            else if (i==3) {
                data_result.gadget_and_electronics.push(values[count]);
            }
            else if (i==4) {
                data_result.daily_needs_and_home_appliances.push(values[count]);
            }
            else if (i==5) {
                data_result.other.push(values[count]);
            }
            count++;
        }
    }
    const result = JSON.stringify(data_result);
    fs.writeFile ("solution.json", result, function(err) {
        if (err) throw err;
        console.log('solution.json created');
        }
    );
});