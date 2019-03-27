const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const domainRegistrar = {
  getDomainsByRegistrar: async function(registrar) {
    const HTML = await domainRegistrar.getHTML(registrar);
    const domains = await domainRegistrar.scrapeHTML(HTML);
    return Promise.resolve(domains);
  },
  getHTML: async function(registrar) {
    if (!registrar) throw "ERROR: No registrar provided.";
    const instance = axios.create({
      baseURL: "https://viewdns.info/reversewhois/",
      timeout: 5000
    });
    const response = await instance.get(`?q=${encodeURI(registrar)}`);
    return response.data;
  },

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
        registrar: e.querySelectorAll("td")[2].innerHTML
      };
    });
    // The first element needs to be removed as it's the header of the table
    scrapedData.shift();
    return scrapedData;
  }
};

module.exports = domainRegistrar;
