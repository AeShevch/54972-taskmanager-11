import AbstractComponent from "./abstract-component";

const createFilterMarkup = ({name, count}, isChecked) => (
  `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
   <label for="filter__${name}" class="filter__label">
   ${name} <span class="filter__${name}-count">${count}</span></label>`
);

/**
 * Returns the markup of filter
 * @param {Object[]} filterData
 * @return {string}
 */
const createSiteFiltersTemplate = (filterData) => {
  const filterMarkup = filterData.map((filterItem, index) => createFilterMarkup(filterItem, index === 0)).join(`\n`);

  return `<section class="main__filter filter container">
          ${filterMarkup}
          </section>`;
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteFiltersTemplate(this._filters);
  }
}
