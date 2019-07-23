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
                    var dataList = []
                    var $ = cheerio.load(html);
                    var resultData = $('#imgClass');
                    if (resultData.length>0) {
                        resultData.each(function(i, val) {
                            var dataTemp = {
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
Promise.all([parsingResult[0], parsingResult[1], parsingResult[2], parsingResult[3], parsingResult[4], parsingResult[5],
    parsingResult[6], parsingResult[7], parsingResult[8], parsingResult[9], parsingResult[10], parsingResult[11],
    parsingResult[12], parsingResult[13], parsingResult[14], parsingResult[15], parsingResult[16], parsingResult[17],
    parsingResult[18], parsingResult[19], parsingResult[20], parsingResult[21], parsingResult[22], parsingResult[23],
    parsingResult[24], parsingResult[25], parsingResult[26], parsingResult[27], parsingResult[28], parsingResult[29],
    parsingResult[30], parsingResult[31], parsingResult[32], parsingResult[33], parsingResult[34], parsingResult[35],
    parsingResult[36], parsingResult[37], parsingResult[38], parsingResult[39], parsingResult[40], parsingResult[41],
    parsingResult[42], parsingResult[43], parsingResult[44], parsingResult[45], parsingResult[46], parsingResult[47],
    parsingResult[48], parsingResult[49], parsingResult[50], parsingResult[51], parsingResult[52], parsingResult[53],
    parsingResult[54], parsingResult[55], parsingResult[56], parsingResult[57], parsingResult[58], parsingResult[59],
    parsingResult[24], parsingResult[60], parsingResult[61], parsingResult[62], parsingResult[63], parsingResult[64],
    parsingResult[65], parsingResult[66], parsingResult[67], parsingResult[68], parsingResult[69], parsingResult[70],
    parsingResult[71], parsingResult[72], parsingResult[73], parsingResult[74], parsingResult[75], parsingResult[76],
    parsingResult[77], parsingResult[78], parsingResult[79], parsingResult[80], parsingResult[81], parsingResult[82],
    parsingResult[83], parsingResult[84], parsingResult[85], parsingResult[86], parsingResult[87], parsingResult[88],
    parsingResult[89]
            ]).then(values => {
    let list_data = [[], [], [], [], [], []];
    let count = 0;
    for (let i=0;i<6;i++) {
        list_data[i].push([])
        for (let j=0;j<15;j++) {
            list_data[i].push.apply(list_data[i], values[count]);
            count++;
        }
    }
    const result = JSON.stringify({
        travel_and_entertainment: list_data[0], 
        lifestyle_and_wellness: list_data[1],
        food_and_baverage: list_data[2],
        gadget_and_electronics: list_data[3],
        daily_needs_and_home_appliances: list_data[4],
        other: list_data[5], 
    });
    fs.writeFile ("solution.json", result, function(err) {
        if (err) throw err;
        console.log('solution.json created');
        }
    );
});