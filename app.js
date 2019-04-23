const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const domainRegistrant = {
  getDomainsByRegistrant: async function(registrant) {
    // Pull HTML for registrant
    const HTML = await domainRegistrant.getHTML(registrant);
    // Pass to scraper to return object of data
    const domains = await domainRegistrant.scrapeHTML(HTML);
    return Promise.resolve(domains);
  },
  // Pull HTML based on registrant
  getHTML: async function(registrant) {
    if (!registrant) throw "ERROR: No registrant provided.";
    const instance = axios.create({
      baseURL: "https://viewdns.info/reversewhois/",
      timeout: 5000
    });
    const response = await instance.get(`?q=${encodeURI(registrant)}`);
    return response.data;
  },
  // Extract data from HTML and return object
  scrapeHTML: function(html) {
    const dom = new JSDOM(html);
    const scrapedData = Array.from(
      dom.window.document.querySelectorAll(
        "#null > tbody > tr:nth-child(3) > td > font > table > tbody tr"
      )
    ).map(e => {
      return {
        domain: e.querySelectorAll("td")[0].innerHTML,
        creation: e.querySelectorAll("td")[1].innerHTML,
        registrant: e.querySelectorAll("td")[2].innerHTML
      };
    });
    // The first element needs to be removed as it's the header of the table
    scrapedData.shift();
    return scrapedData;
  }
};

module.exports = domainRegistrant;
