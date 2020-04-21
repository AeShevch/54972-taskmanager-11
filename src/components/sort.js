import {createElement} from '../utils.js';

const createSortHtml = () => (
  `<div class="board__filter-list">
    <a href="#" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" class="board__filter">SORT BY DATE up</a>
    <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`
);

export default class SortComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortHtml();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
