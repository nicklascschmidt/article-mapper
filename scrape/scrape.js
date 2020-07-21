const axios = require('axios');
const cheerio = require('cheerio');

const testLink = 'https://www.thecrazytourist.com/15-best-things-to-do-in-cape-elizabeth-maine/';

const fetchArticleHtml = () => {
  return axios
    .get(testLink)
    .then((resp) => (resp.status === 200 ? resp.data : null))
    .catch(err => console.log(err));
}

const scrapeArticleHtml = (html) => {
  const $ = cheerio.load(html);
  
  return html;
  
  // $(`article#list-item-${id}`).each(function(i, element) {
    
  //   // Get artist and album names (can only be extracted as one text string), then year and img URL.
  //   const artistAndAlbum = $(this).attr('data-list-title');

  //   return album.push(albumObj);
  // });
}

/** TODO: add in throw/catch to handle err */
module.exports = async (params) => {
  console.log('scraping w these params', params);
  
  const articleHtml = await fetchArticleHtml(params.url);

  const articleData = scrapeArticleHtml(articleHtml);

  return articleData;
}
