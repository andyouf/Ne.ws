/**
 * loop through a list, then create and append an <option> element to it's selector
 * @param {String} selector CSS Selector
 * @param {Array | Object} list a list to interate and create an <option> element
 */
export function appendDropDownOptions(selector, list) {
  // check if the list is an array (without named keys)
  if (list instanceof Array) {
    list.forEach(function (item) {
      $(selector).append(`<option value=${item}>${toTitleCase(item)}</option>`);
    });
  } else {
    // if not an array, then it's an object with key, value pairs
    // create an array from the object,
    // with position zero[0] as key and position one[1] as value
    const entries = Object.entries(list);

    // destructure the params within the arguments
    entries.forEach(function ([key, value]) {
      $(selector).append(`<option value=${value}>${toTitleCase(key)}</option>`);
    });
  }
}

/**
 * @param {String} text Some text content
 * @return {String} A text string that is title-cased ex: "Title Cased Example"
 */
function toTitleCase(text = "") {
  return (
    text
      // make array of words
      .split(" ")
      // transform each first letter of word
      .map((word) => word.replace(/\w{1}/, (match) => match.toUpperCase()))
      // join array words with space into string
      .join(" ")
  );
}
