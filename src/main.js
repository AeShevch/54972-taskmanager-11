import SiteMenuComponent from "./components/menu";
import SortComponent from "./components/sort";
import TasksComponent from "./components/tasks";
import FilterComponent from "./components/filters";
import BoardComponent from "./components/board";
import TaskEditComponent from "./components/edit-card";
import LoadMoreButtonComponent from "./components/load-more-btn";
import TaskComponent from "./components/task-card";
import NoTasksComponent from "./components/no-tasks";
import {filters} from "./mock/filter";
import {tasks} from "./mock/tasks";
import {render} from "./utils";

const TASK_CARDS_PER_LINE = 4;

const mainContainerElement = document.querySelector(`.main`);
const menuContainerElement = mainContainerElement.querySelector(`.control`);

const renderTask = (tasksListElement, task) => {

  const closeTasks = () => {
    tasksListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    document.removeEventListener(`keyup`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeTasks();
    }
  };

  const onEditButtonClick = () => {
    tasksListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keyup`, onEscPress);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    closeTasks();
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(tasksListElement, taskComponent.getElement());
};

const renderBoard = () => {
  render(menuContainerElement, new SiteMenuComponent().getElement());
  render(mainContainerElement, new FilterComponent(filters).getElement());
  render(mainContainerElement, new BoardComponent().getElement());

  const boardContainerElement = mainContainerElement.querySelector(`.board`);

  render(boardContainerElement, new SortComponent().getElement());
  render(boardContainerElement, new TasksComponent().getElement());

  const tasksListElement = boardContainerElement.querySelector(`.board__tasks`);

  if (!tasks.length) {
    render(tasksListElement, new NoTasksComponent().getElement());
    return;
  }
  const makeShowNewTasksFunc = () => {
    let tasksArr = tasks.slice();
    return (count) => {
      tasksArr.splice(0, count).forEach((task) => renderTask(tasksListElement, task));
      if (!tasksArr.length) {
        loadMoreBtnElement.remove();
      }
    };
  };
  const showNewTasks = makeShowNewTasksFunc();
  showNewTasks(TASK_CARDS_PER_LINE);

  render(boardContainerElement, new LoadMoreButtonComponent().getElement());
  const loadMoreBtnElement = boardContainerElement.querySelector(`.load-more`);
  const onLoadMoreClick = () => showNewTasks(TASK_CARDS_PER_LINE);
  loadMoreBtnElement.addEventListener(`click`, onLoadMoreClick);
};

const init = () => {
  renderBoard();
};

init();
