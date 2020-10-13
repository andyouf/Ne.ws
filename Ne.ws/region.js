import { updatePageUI } from "./update.js";
import { buildUrl, fetchData } from "./api.js";

const regions = $("#select-region");

// initialize the change events for the region filters
export function initRegionChange() {
  regions.on("change", onChange);

  // update the page when the region has changed
  async function onChange(event) {
    const region = event.target.value;
    const url = buildUrl({ regionsVal: region });
    const data = await fetchData(url);

    // update the page results
    updatePageUI(data, url);
  }
}
