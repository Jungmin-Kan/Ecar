const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
var request = require('request');

const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './');

/*
var getHtml = async () => {
  try {
    return await axios.get("https://ev.or.kr/portal/buyersGuide/incenTive?pMENUMST_ID=21549");
  } catch (error) {
    console.error(error);
  }
};
*/
function getHtml() {
  try {
    return axios.get("https://ev.or.kr/portal/buyersGuide/incenTive?pMENUMST_ID=21549");
  } catch (error) {
    console.error(error);
  }
}

// var conngetHtml = async () => {
//   try { return await axios.get("https://www.ev.or.kr/portal/chargerkind?pMENUMST_ID=21629"); }
//   catch (error) { console.error(error); }
// };
function conngetHtml() {
  try {
    return axios.get("https://www.ev.or.kr/portal/chargerkind?pMENUMST_ID=21629");
  } catch (error) {
    console.error(error);
  }
}

app.get('/index', (req, response) => {
  let array = new Array();
  let List = new Array();  
  getHtml()
    .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("table.table_02_2_1 tbody").eq(0).children("tr");
      for (var row = 0; row < $bodyList.length; row++) {
        var cells = $bodyList.eq(row).children();
        array[row] = new Array(cells);
        for (var column = 0; column < cells.length; column++) {
          var hero = cells.eq(column).text();
          array[row][column] = hero;
        }
      }
      conngetHtml()
        .then(html => {
          const $ = cheerio.load(html.data); 
          const $mainbody = $("table").eq(2);
          const $bodyList = $mainbody.children("tbody").children("tr");
          for (var row = 0; row < $bodyList.length; row++) {
            var cells = $bodyList.eq(row).children();
            array[32 + row] = new Array(cells);
            for (var column = 0; column < cells.length; column++) {
              var hero;
              if ((32+row == 33 || 32+row == 34)&&(column==1 ||column==2 || column==3 || column==4)) {
                hero = "https://www.ev.or.kr" + cells.eq(column).children().attr('src');
              }
              else { hero = cells.eq(column).text(); }
              array[32 + row][column] = hero;
            }
          }
          return array;
        }).then(res => response.render("index", { data: res }));
    });
  });
app.get("/excel", function(req,res){

  let workbook = XLSX.readFile("./201909car.xlsx");
  let worksheet = workbook.Sheets["10.연료별_등록현황"];
  let array = new Array();

  array.push(worksheet["U"+21].v);//휘발유
  array.push(worksheet["U"+38].v);//경우
  array.push(worksheet["U"+55].v);//LPG
  array.push(worksheet["U"+89].v);//전기
  
  res.send(array)
});

app.get("*", (req, res) => { res.json("Page not found"); });

if (!module.parent) {
  app.listen(8085);
  console.log('started on port 8080');
}
