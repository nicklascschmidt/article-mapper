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

/** Use when debugging in node */
// fetchArticleData({
//   url: 'https://vacationidea.com/california/best-places-to-visit-in-the-bay-area.html',
//   firstTitleText: 'Sonoma County',
//   elType: 'h2',
//   numOfTitles: '25',
// });


/**
 * TODO: organize this doc!!!
 *    - break out helper funcs
 *    - split up into sections for each step of the process
 *    - eventually clear out console.logs
 *    - first check h2, then h3, then h1, h4 - then ask for the element if error
 * 
 * Helpful info for scraping:
  * how many elements we're looking for
  * what an incrementer looks like if any (i.e. '1. ', '1)', etc.)
  * what type of element it is
  * if the element has a class or ID
  * what the text is for the first title
*/


/** Possible title element types, ordered by most likely */
const elTypes = [
  'h2',
  'h3',
  'h1',
  'h4',
  'h5',
  'h6',
];

/**
 * @summary - find the firstTitleText within the HTML
 *          - if the text in the HTML is NOT the firstTitleText, then return that to use later
 *          - in some cases, the HTML text looks the same but doesn't match, so getCleanString first
 * @returns {object} { el, firstTitleHtmlText }
 *          - el - just the element
 *          - firstTitleHtmlText - the text found in the HTML, which we reference later
*/
const grabFirstEl = ($, firstTitleText) => {
  let el = null;
  let els = [];

  /**
   * Loop through common title element types (ie. elTypes)
   * Check for exact match-- if yes, break both loops and return that element
   * Check for string exists match (ie. indexOf())-- if yes, add to els array, then handle below
   */
  for (let i=0; i < elTypes.length; i++) {
    const elType = elTypes[i];
    console.log('checking elType', elType);

    $(elType).each(function(i, element) {
      console.log('mapping', getCleanString($(element).text().trim()));
      const title = getCleanString($(element).text().trim());
      console.log('vs title', title, 'firstTitleText', getCleanString(firstTitleText));

      /** Break loop if exact match */
      if (title === getCleanString(firstTitleText)) {
        console.log('\n\nbreaking the each loop\n\n');
        el = $(element);
        return false; // breaks
      }
      if (title.indexOf(getCleanString(firstTitleText)) > -1) {
        els.push($(element));
      }
      return true; // continues
    });

    /** If found exact match, exit loop */
    if (!!el) {
      console.log('\n\nbreaking the for loop\n\n');
      break;
    }

    console.log('loop end, els', els);
  }

  
  /**
   * If no el found yet, map thru array and look for the shortest text bc we want the closest
   *    to the string we're searching for (which still includes the string in it)
   * 
   * Note: not using reduce bc jquery
   */
  if (!el && els.length > 0) {
    console.log('no el found, checking els array now');
    let chosen = null;
    let prevText = '';

    $(els).each((i, element) => {
      console.log(1, 'this is the jquery element', $(element));
      console.log('element nodeName: ', $(element).prop('nodeName'));

      const text = getCleanString($(element).text().trim());
      console.log('text', text);
      if (prevText === '' || text.length < prevText.length) {
        chosen = element;
      }

      prevText = getCleanString($(element).text().trim());
    });

    console.log('~~~~ chosen', getCleanString($(chosen).text().trim()));

    el = chosen;
  }

  /** TODO: If still no el found, throw an error */
  if (!el) {
    console.log('ERRROOOOORRRRR');
  }

  return el;
}


/**
 * @summary - Gather relevant information from the first element DOM node
 *          - look for classes, part of an ID, etc.
 * @param {*} $ - cheerio HTML
 * @param {*} el - DOM node
 * @returns {object} - object with fields relevant to finding other titles
 */
const getRelevantInfoFromEl = ($, el) => {
  return {
    classes: $(el).attr('class'),
    elType: $(el).prop('nodeName'),
    titleText: getCleanString($(el).text().trim()),
  };
}

/** Find other elements with the same class */
const findSameClassEls = ($, elType, classes) => {
  return $(elType).attr('class', classes);
}

/** Make sure all whitespace is plain single spaces for comparison */
const getCleanString = (str) => {
  return str.toLowerCase().replace(/\s/g, " ");
}

/**
 * @summary - trim text list to proper size with the correct titles
 * @returns {string[]} - list of titles the same length as numOfTitles
 */
const getTitleTextList = (titleTexts, numOfTitles, firstTitleHtmlText) => {
  const firstIndex = getIndexOfSubstringInArray(titleTexts, firstTitleHtmlText);
  const firstTextStartList = titleTexts.slice(firstIndex);
  
  return firstTextStartList.slice(0, numOfTitles)
}

/**
 * @summary - check if the substr exists within any of the words in the array
 *          - some chars that look the same aren't, so get a clean, lowercased version of the word
 */
const getIndexOfSubstringInArray = (arr, substr) => {
  return arr.findIndex(item => {
    const substrClean = getCleanString(substr);
    const itemClean = getCleanString(item);
    return itemClean.indexOf(substrClean) > -1
  })
};

const isSubstringInArray = (arr, substr) => {
  return (getIndexOfSubstringInArray(arr, substr) > -1);
}

/**
 * @summary - if the list of texts includes the first title,
 *            or if the first title is within the first text,
 *            then assume the list has the correct titles in it
 */
const trimSimilarElList = ($, elList, firstTitleHtmlText, numOfTitles) => {
  let titleTexts = [];
  elList.each((idx, el) => {
    console.log(idx, $(el).text().trim());
    titleTexts.push($(el).text().trim());
  });

  if (isSubstringInArray(titleTexts, firstTitleHtmlText)) {
    // list is probably correct, now trim to find the right ones
    return getTitleTextList(titleTexts, numOfTitles, firstTitleHtmlText);
  }

  return [];
}

/**
 * @summary - checks if all the titles start w a number, if yes-- it's incrementing
 * @param {string[]} textList - list of found locations, could include increment within text
*/
const trimIncrementsFromText = (textList) => {
  const isIncrementing = _.every(textList, (title) => {
    const first = title.split(' ')[0];
    const startsWithNum = /^\d/.test(first);
    return startsWithNum;
  });

  return (isIncrementing
    ? getTitlesWithoutIncrements(textList)
    : textList)
}

/**
 * @summary - removes non-alpha chars (including digits) in the increment word
 *          - some titles have the incrementer attached to the first word (eg. 2.San Francisco)
 * @param {string[]} titles - titles scraped
 */
const getTitlesWithoutIncrements = (titles) => {
  return titles.map((title) => {
    const newTitle = title.split(' ');
    newTitle[0] = newTitle[0].replace(/[^a-zA-Z\s]/g, '').trim();
    return newTitle.join(' ').trim();
  });
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
  const { firstTitleText, numOfTitles } = params;
  console.log('scraping w these params: ', params);
  
  const $ = cheerio.load(html, { decodeEntities: true });

  let returnData = {
    titles: [],
  };

  const element = grabFirstEl($, firstTitleText);
  console.log('\n\n\n\n', element, '\n\n\n\n');
  
  const relevantInfo = getRelevantInfoFromEl($, element);
  
  const {
    classes = '',
    elType = '',
    titleText = '',
  } = relevantInfo;

  const sameClassEls = findSameClassEls($, elType, classes);
  
  const textList = trimSimilarElList($, sameClassEls, titleText, numOfTitles);
  console.log('textList', textList);
  
  const textListWithoutIncrements = trimIncrementsFromText(textList);
  console.log('textListWithoutIncrements', textListWithoutIncrements);
  
  returnData.titles = textListWithoutIncrements;

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

 */
