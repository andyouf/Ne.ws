import { createNewsCard } from "./newsCard.js";
import { updatePagination } from "./pagination.js";

const newsResults = $("#news-results");
const duration = 300;

/**
 * Updates the page when new data has been received
 * @param {Object} data The response data
 * @param {String} url The URL that was fetched
 */

export function updatePageUI(data, url) {
  newsResults.animate(
    { opacity: 0 },
    duration,
    onAnimationComplete.bind(null, { data, url })
  );
}

/**
 * Callback the fade out animation
 * @param {Object} data The response data
 * @param {String} url The URL that was fetched
 */

function onAnimationComplete({ data, url }) {
  // empty the parent
  newsResults.html("");

  // build the HTML for the news cards
  // going to pass in an array ... map creates an array that maps back to given array
  // map like for.each will go through each element in base array one by one ... difference is results are stored in an array
  // iterates through the news array and creates the HTML news cards ... with map function, it always transforms the data, and it returns the same length back
  const newsCards = data.news.map((n) => createNewsCard(n));
  newsResults.append(newsCards);

  //  functionality example:
  // if user has 10 news items:
  // [{
  //     title: 'News item 1'
  //   }, {
  //     title: 'News item 2'
  //   },
  //   ...
  // ]
  // and createNewsCard function is applied, it would run the function 10 times, once to each item in the array ... in that particular function, it returns an array of HTML elements that look like:
  // [
  //   'div.news',
  //   'div.news'
  //   ...
  // ]
  // then drop the results into the jQuery newsResults.append() function.

  // pass the search info to the pagination buttons
  updatePagination(data, url);

  const onScrollComplete = () => newsResults.animate({ opacity: 1 }, duration);

  // scroll to the top and fade back in
  $("html, body").animate({ scrollTop: 0 }, duration, onScrollComplete);
}
