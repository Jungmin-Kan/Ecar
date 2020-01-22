const axios = require("axios");
const cheerio = require("cheerio");

let data_connect;
const log = console.log;

var conngetHtml = async () => {
    try {return await axios.get("https://www.ev.or.kr/portal/chargerkind?pMENUMST_ID=21629");} 
    catch (error) {console.error(error);}
};

conngetHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $mainbody = $("table").eq(2);

        const $bodyList = $mainbody.children("tbody").children("tr");
        // 태그.class 안에 ul태그  안에  li태그.class이름
        for (var row = 0; row < $bodyList.length; row++) {
            var cells = $bodyList.eq(row).children();
            var cols = [];
            for (var column = 0; column < cells.length; column++) {
                var hero;
                if((row==1 || row==2) && (column >=1 && column<=4)){
                    hero = "https://www.ev.or.kr"+cells.eq(column).children().attr('src');
                }
                else{hero = cells.eq(column).text();}
                cols.push(hero);
            }
            ulList.push(cols);
        }
        data_connect = ulList;
        return data_connect;
    }).then(res => log(res));
