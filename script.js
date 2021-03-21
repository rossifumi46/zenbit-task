const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Ad = require('./models/ad');
const { JSDOM } = require("jsdom")

mongoose.connect('mongodb://localhost:27017/olxdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

axios
  .get('https://www.olx.kz/')
  .then((response) => response.data)
  .then((data) => {
    const dom = new JSDOM(data, {
      runScripts: "dangerously",
      resources: "usable"
    });

    const { document } = dom.window;
    const ads = document.querySelectorAll('section.mainpage-gallery > ul > li');
    const p = [];
    ads.forEach((el, idx) => {
      if (idx !== 100) {
        const price = el.querySelector('div.price').textContent;
        const a = el.querySelector('div.inner > h4 > a');
        const title = a.getAttribute('title')
        const url = a.getAttribute('href');
        const image = el.querySelector('img') ? el.querySelector('img').getAttribute('src') : '';
        const olxId = el.getAttribute('data-id');
        const data = el.querySelectorAll('ul.date-location > li');
        const location = data[0].textContent;
        const date = data[1].textContent;
        const [ city, disctrict='' ] = location.split(', ');

        p.push(Ad.create({
              title,
              price,
              url,
              image,
              olxId,
              city,
              disctrict,
              country: 'Kazakhstan'
        }))
      }
    });
    return Promise.all(p);
  })
  .then(() => {
    process.kill(0);
  })
  .catch((error) => {
    throw error;
  });
