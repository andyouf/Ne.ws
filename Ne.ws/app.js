import { fetchDropDown } from "./api.js";
import { appendDropDownOptions } from "./dropDown.js";
import { initSearch } from "./search.js";
import { initCategoryChange } from "./category.js";
import { initLanguageChange } from "./language.js";
import { initRegionChange } from "./region.js";
import { initDateChange } from "./date.js";

//  *initializes data for (categories, region, lang) which will occupy dropdowns
async function startApp() {
  // Promise.all takes in an array of async functions and will let you know when they are all done
  // Promise.all takes in an array of Promises, that run in parallel
  // it returns the results when all 3 process are completed
  const results = await Promise.all([
    fetchDropDown("categories"),
    fetchDropDown("languages"),
    fetchDropDown("regions"),
  ]);
  // destructrue - unpack distinct values from an entire array or object into variables. All in one line!
  // destructure the array, in the same order they were called above
  // so, first position would be the categories, etc.
  // for objects, you HAVE to use the exact key name in order to destructure
  const [categories, languages, regions] = results;

  // please work
  window.currentsAPI = {};
  window.currentsAPI.categories = categories;

  // now have data for DropDowns,
  // can use the same function to append to each dropdown <select> element
  appendDropDownOptions("#select-categories", categories);
  appendDropDownOptions("#select-language", languages);
  appendDropDownOptions("#select-region", regions);

  // initialize the search modules and filters
  initSearch();
  initCategoryChange();
  initLanguageChange();
  initRegionChange();
  initDateChange();
}

startApp();
//gitchange