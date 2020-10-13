import { updatePageUI } from "./update.js";
import { buildUrl, fetchData } from "./api.js";

const categories = $("#select-categories");

/**
 * @param {Object} event
 */

export async function onCategoryClick(event) {
  console.log(event);
  const { category } = event.target.dataset;
  const url = buildUrl({ categoryVal: category });
  const data = await fetchData(url);

  // update the category selector
  categories.get(0).value = category;

  // update the page results
  updatePageUI(data, url);
}

// change handler for category ... also sends a new request for data and updates UI
export function initCategoryChange() {
  categories.on("change", onChange);

  async function onChange(event) {
    const category = event.target.value;
    const url = buildUrl({ categoryVal: category });
    const data = await fetchData(url);

    // update the page results
    updatePageUI(data, url);
  }
}
//test2