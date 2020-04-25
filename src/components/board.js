import AbstractComponent from "./abstract-component";
/**
 * Returns the markup of sort block
 * @return {string}
 */
const createBoardTemplate = () => (
  `<section class="board container"></section>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
