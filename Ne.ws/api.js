export const BASE_URL = "https://api.currentsapi.services/v1";
export const KEY = "7yVfJqcqsh1Mba0eBKq9X26k4D6eEnWLwt9bAgSkFyzB5xhH";
// const KEY = "Y0A0tcFSmbc4rXn1aGlPFatuaRypY_iPszlJ_qM4AmTSCtnx"; // old Key

const domBody = $("body");
const newsResults = $("#news-results");

/**
 * @param {String} url
 * @return {Array} A list of news items
 */

export async function fetchData(url) {
  let newsData;

  // add a loading screen
  domBody.addClass("is-loading");

  // if (localStorage.getItem(url)) {
  //     newsData = JSON.parse(localStorage.getItem(url));

  //     // remove the loading screen
  //     domBody.removeClass('is-loading');
  //     return newsData;
  // }

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      newsData = data;
      // localStorage.setItem(url, JSON.stringify(data));
    } else {
      newsResults.html(
        '<h2 style="text-align: center">Something went wrong with the server.</h2>'
      );
    }
  } catch (error) {
    console.error(error);
  }
  // remove the loading screen
  domBody.removeClass("is-loading");
  return newsData;
}

/**
 * generalized fetch function to get DropDown menu data
 * @param {String} name name of drop down to fetch
 * @returns {Array | Object} dropdown values
 */

export async function fetchDropDown(name = "") {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name));
  }
  // from Currents API Endpoint docs
  const url = `${BASE_URL}/available/${name}?apiKey=${KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const dropDownType = data[name];
    localStorage.setItem(name, JSON.stringify(dropDownType));
    return dropDownType;
  } catch (error) {
    console.error(error);
  }
}

/**
 * create a url with query paramenters ... default parameters are also set
 * @param {String} keywordsVal
 * @param {String} languageVal
 * @param {String} regionsVal
 * @param {String} categoryVal
 * @param {String} startDateVal
 * @param {String} endDateVal
 * @return {String} A url with query parameters
 */

export function buildUrl({
  keywordsVal = "",
  languageVal = "any",
  regionsVal = "any",
  categoryVal = "any",
  startDateVal = "",
  endDateVal = "",
} = {}) {
  // check if the inputs have any user value
  const isKeyword = keywordsVal !== "";
  const isLanguage = languageVal !== "any";
  const isCountry = regionsVal !== "any";
  const isCategory = categoryVal !== "any";
  const isStartDate = startDateVal !== "";
  const isEndDate = endDateVal !== "";
  const isAllBlank =
    !isKeyword &&
    !isLanguage &&
    !isCountry &&
    !isCategory &&
    !isStartDate &&
    !isEndDate;

  // contruct the base url
  let searchUrl = `${BASE_URL}/search?&apiKey=${KEY}`;

  if (isKeyword) {
    searchUrl += `&keywords=${keywordsVal}`;
  }
  if (isLanguage) {
    searchUrl += `&language=${languageVal}`;
  }
  if (isCountry) {
    searchUrl += `&country=${regionsVal}`;
  }
  if (isCategory) {
    searchUrl += `&category=${categoryVal}`;
  }
  if (isStartDate) {
    searchUrl += `&start_date=${startDateVal}`;
  }
  if (isEndDate) {
    searchUrl += `&end_date=${endDateVal}`;
  }
  if (isAllBlank) {
    // if they are all blank, use default search string
    searchUrl = `${BASE_URL}/latest-news?apiKey=${KEY}`;
  }

  return searchUrl;
}
