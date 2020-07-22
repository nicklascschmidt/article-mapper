const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');


const fetchArticleData = ({ url, ...params }) => {
  return axios
    .get(url)
    .then((resp) => (resp.status === 200
      ? scrapeArticleHtml(resp.data, params)
      : null))
    .catch(err => console.log(err));
}

/** Helpful info for scraping:
 * how many elements we're looking for
 * what an incrementer looks like if any (i.e. '1. ', '1)', etc.)
 * what type of element it is
 * if the element has a class or ID
 * what the text is for the first item
*/

/**
 * @summary - creates a list of the possible terms we're looking for within the HTML
 *          - sometimes the HTML text doesn't exactly match what's copied from the site
 * @param {string} text - firstTitleText, which we'll manipulate to test other possible options
 * @returns {string[]} - all possible texts we're trying to match
 */
const generatePossibleMatchList = (text) => {
  const doubleSpaced = text.replace(' ', '  ');
  return [
    text,
    doubleSpaced,
  ];
}

/**
 * @summary - find the firstTitleText within the HTML
 *          - if the text in the HTML is NOT the firstTitleText, then return that to use later
 * @returns {object} { el, firstTitleHtmlText }
 *          - el - just the element
 *          - firstTitleHtmlText - the text found in the HTML, which we reference later
*/
const grabFirstEl = ($, firstTitleText, elType) => {
  let el = null;
  let elText = '';
  let testCase = '';
  
  el = $(`${elType}:contains("${firstTitleText}")`);
  elText = el.text().trim();

  if (firstTitleText === elText) return { el };

  testCase = firstTitleText.replace(' ', '  ');
  el = $(`${elType}:contains("${testCase}")`);
  elText = el.text().trim();

  if (testCase === elText) return { el, firstTitleHtmlText: testCase };

  console.log('nothing found, el: ', el);
  
  return { el };
}


/**
 * @summary - Gather relevant information from the first element DOM node
 *          - look for classes, part of an ID, etc.
 * @param {*} $ - cheerio HTML
 * @param {*} el - DOM node
 * @returns {object} - object with fields relevant to finding other items
 */
const getRelevantInfoFromEl = ($, el) => {
  console.log('el', el);

  // const element = $(`${elType}[attr*=${commonAttribute}]")`);
  // const element = $(`${elType}.${commonClass}`);
  const classes = el.attr('class');
  console.log('classes', classes);

  return {
    classes,
  };
}

/** Find other elements with the same class */
const findSameClassEls = ($, elType, classes) => {
  return $(elType).attr('class', classes);
}

/**
 * @summary - trim text list to proper size with the correct titles
 * @returns {string[]} - list of titles the same length as numOfTitles
 */
const getTitleTextList = (elTexts, numOfTitles, firstTitleHtmlText) => {
  const firstTextStartList = elTexts.slice(elTexts.indexOf(firstTitleHtmlText));
  
  return firstTextStartList.slice(0, numOfTitles)
}

/**
 * @summary - if the list of texts includes the first title, then assume the list has the correct titles in it
 */
const trimSimilarElList = ($, elList, firstTitleHtmlText, numOfTitles) => {
  let elTexts = [];
  elList.each((idx, el) => {
    console.log(idx, $(el).text().trim());
    elTexts.push($(el).text().trim());
  });

  if (elTexts.includes(firstTitleHtmlText)) {
    // list is probably correct, now trim to find the right ones
    return getTitleTextList(elTexts, numOfTitles, firstTitleHtmlText);
  }

  return [];
}

/**
 * @summary - checks if all the titles start w a number, if yes-- it's incrementing
*/
const trimIncrementsFromText = (textList) => {
  const isIncrementing = _.every(textList, (title) => {
    const first = title.split(' ')[0];
    const startsWithNum = /^\d/.test(first);
    return startsWithNum;
  });

  return (isIncrementing
    ? textList.map((title) => title.split(' ').splice(1).join(' ').trim())
    : textList)
}

/**
 * Find the element using given info
 * Get other attributes/info from that element to use to help find the other elements
 * Get a list of possible elements
 * Add to / subtract from that list of elements to get to the given ## (i.e. numOfTitles)
 * 
 * @returns {string[]} final list of titles
*/
const scrapeArticleHtml = (html, params) => {
  const { firstTitleText, elType, numOfTitles } = params;
  
  const $ = cheerio.load(html);

  let returnData = {
    items: [],
  };

  const {
    el: firstEl,
    firstTitleHtmlText = firstTitleText,
  } = grabFirstEl($, firstTitleText, elType );
  console.log('\nfirstEl', firstEl, '\n');
  
  const relevantInfo = getRelevantInfoFromEl($, firstEl);
  console.log('\nrelevantInfo', relevantInfo, '\n');
  
  const { classes = '' } = relevantInfo;

  const sameClassEls = findSameClassEls($, elType, classes);
  console.log('sameClassEls', sameClassEls);
  
  const textList = trimSimilarElList($, sameClassEls, firstTitleHtmlText, numOfTitles);
  console.log('textList', textList);
  
  const textListWithoutIncrements = trimIncrementsFromText(textList);
  console.log('textListWithoutIncrements', textListWithoutIncrements);
  

  // return JSON.stringify(returnData);
  return returnData;
}

/** TODO: add in throw/catch to handle err */
module.exports = async (params) => {
  return fetchArticleData(params);
}




/**


  $('html *').contents().map((idx, el) => {
    return (this.type === 'text') ? $(this).text()+' ' : '';
  })

  const text = $('h2').filter((idx, el) => {
    const test = $(this);
    return $(this).text().trim() === firstTitleText;
  }).next().text();


 */
