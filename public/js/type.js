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
        const $ = cheerio.load(html.data); //html 문자열을 받아 cheerio 객체를 반환합니다.
        const $bodyList = $("table.table_02_2_1 tbody").eq(0).children("tr");
        // 태그.class 안에 ul태그  안에  li태그.class이름
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
}).then(/*res=> log(res)*/); // return된 data는 res가 된다

// http://magic.wickedmiso.com/142
//   https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1m