import {createSiteMenuTemplate} from "./components/menu";
import {createSiteFiltersTemplate} from "./components/filters";
import {createBoardTemplate} from "./components/board";
import {createEditCardTemplate} from "./components/edit-card";
import {createLoadMoreBtnTemplate} from "./components/load-more-btn";
import {createTaskCardTemplate} from "./components/task-card";

const TASK_CARDS_COUNT = 3;
const mainContainerElement = document.querySelector(`.main`);
const menuContainerElement = mainContainerElement.querySelector(`.control`);

/**
 * Renders components markup
 * @param {object} container Container for inserting a components markup
 * @param {string} template Component markup
 * @param {string} [place] Insert position (optional)
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const init = () => {
  render(menuContainerElement, createSiteMenuTemplate());
  render(mainContainerElement, createSiteFiltersTemplate());
  render(mainContainerElement, createBoardTemplate());

  const boardContainerElement = mainContainerElement.querySelector(`.board`);
  const tasksListElement = boardContainerElement.querySelector(`.board__tasks`);

  render(tasksListElement, createEditCardTemplate());
  for (let i = 0; i <= TASK_CARDS_COUNT; i++) {
    render(tasksListElement, createTaskCardTemplate());
  }
  render(boardContainerElement, createLoadMoreBtnTemplate());
};

init();
