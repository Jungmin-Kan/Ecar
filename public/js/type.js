const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;


var getHtml = async() => {
    try {
        return await axios.get("https://ev.or.kr/portal/buyersGuide/incenTive?pMENUMST_ID=21549");
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("table.table_02_2_1 tbody").eq(0).children("tr");
        for (var row = 0; row < $bodyList.length; row++) {
            var cells = $bodyList.eq(row).children();
            var cols = [];
            array[row] = new Array(cells);
            for (var column = 0; column < cells.length; column++) {
                var hero = cells.eq(column).text();
                array[row][column] = hero;
                console.log(array[row][column]);
                cols.push(hero);
            }
            ulList.push(cols);
        }
        return array;
}).then(res=> log(res));
