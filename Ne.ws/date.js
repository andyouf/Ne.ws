import { updatePageUI } from "./update.js";
import { buildUrl, fetchData } from "./api.js";

const startDate = $("#select-date-start");
const endDate = $("#select-date-end");
const apply = $("#date-range-apply");
const keywords = $("#keywords");
const selectLanguage = $("#select-language");
const selectRegion = $("#select-region");
const selectCategories = $("#select-categories");

// initialize date change events

export function initDateChange() {
  // add event listeners and pass in an string ID to know which date picker is being picked
  startDate.on("change", onChange.bind(null, "startDate"));
  endDate.on("change", onChange.bind(null, "endDate"));

  // this event applies a new search with a specified date range
  apply.on("click", onApply);

  // start with undefined values
  let start;
  let end;

  // update the start and end variables on user input
  // function statements are hoisted to the top
  function onChange(type, event) {
    if (type === "startDate") {
      start = event.target.value;
    }
    if (type === "endDate") {
      end = event.target.value;
    }
  }

  // seperate action to make sure there is a date range
  async function onApply() {
    // if start and end dates exist, create a new url
    if (start && end) {
      const url = buildUrl({
        keywordsVal: keywords.val(),
        languageVal: selectLanguage.val(),
        regionsVal: selectRegion.val(),
        categoryVal: selectCategories.val(),
        startDateVal: start,
        endDateVal: end,
      });

      const data = await fetchData(url);

      // update the page results
      updatePageUI(data, url);
    }
  }
}
