import AbstractComponent from "./abstract-component";

/**
 * Returns the markup of «load more» button
 * @return {string}
 */
const createLoadMoreButtonTemplate = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
