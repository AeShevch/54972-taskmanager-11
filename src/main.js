import {createSiteMenuTemplate} from './components/menu';
import {createSiteFiltersTemplate} from './components/filters';
import {createBoardTemplate} from './components/board';
import {createEditCardTemplate} from './components/edit-card';
import {createLoadMoreButtonTemplate} from './components/load-more-btn';
import {createTaskCardTemplate} from './components/task-card';
import {filters} from './mock/filter';
import {tasks} from './mock/tasks';

const TASK_CARDS_PER_LINE = 4;

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
  render(mainContainerElement, createSiteFiltersTemplate(filters));
  render(mainContainerElement, createBoardTemplate());

  const boardContainerElement = mainContainerElement.querySelector(`.board`);
  const tasksListElement = boardContainerElement.querySelector(`.board__tasks`);

  render(tasksListElement, createEditCardTemplate(tasks[0]));

  const makeShowNewTasksFunc = () => {
    let tasksArr = tasks.slice(1);
    return (count) => {
      tasksArr.splice(0, count).forEach((task) => render(tasksListElement, createTaskCardTemplate(task)));
      if (!tasksArr.length) {
        loadMoreBtnElement.remove();
      }
    };
  };
  const showNewTasks = makeShowNewTasksFunc();
  // -1 – because one card is already shown
  showNewTasks(TASK_CARDS_PER_LINE - 1);

  render(boardContainerElement, createLoadMoreButtonTemplate());
  const loadMoreBtnElement = boardContainerElement.querySelector(`.load-more`);
  const onLoadMoreClick = () => showNewTasks(TASK_CARDS_PER_LINE);
  loadMoreBtnElement.addEventListener(`click`, onLoadMoreClick);

};

init();
