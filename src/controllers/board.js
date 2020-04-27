import {remove, render, replace} from "../utils/render";
import BoardComponent from "../components/board";
import SortComponent, {SortType} from "../components/sort";
import TasksComponent from "../components/tasks";
import {tasks} from "../mock/tasks";
import NoTasksComponent from "../components/no-tasks";
import LoadMoreButtonComponent from "../components/load-more-btn";
import TaskComponent from "../components/task-card";
import TaskEditComponent from "../components/edit-card";

const mainContainerElement = document.querySelector(`.main`);
const TASK_CARDS_PER_LINE = 4;

const renderLoadMoreButton = (component, container, onClickFunc) => {
  render(container, component);
  const onLoadMoreClick = () => onClickFunc(TASK_CARDS_PER_LINE);
  component.setClickHandler(onLoadMoreClick);
};

const renderTask = (tasksListElement, task) => {

  const closeTasks = () => {
    replace(taskComponent, taskEditComponent);
    document.removeEventListener(`keyup`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeTasks();
    }
  };

  const onEditButtonClick = () => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keyup`, onEscPress);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    closeTasks();
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setFormSubmitHandler(onEditFormSubmit);

  render(tasksListElement, taskComponent);
};

const getSortedTasks = (sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render() {
    const container = this._container;
    render(mainContainerElement, new BoardComponent());


    render(container.getElement(), this._sortComponent);
    render(container.getElement(), this._tasksComponent);

    const tasksListElement = container.getElement().querySelector(`.board__tasks`);

    if (!tasks.length) {
      render(tasksListElement, this._noTasksComponent);
      return;
    }
    const makeShowNewTasksFunc = (tasksArr) => {
      let tasksToShow = tasksArr.slice();
      return (count) => {
        tasksToShow.splice(0, count).forEach((task) => renderTask(tasksListElement, task));
        if (!tasksToShow.length) {
          remove(this._loadMoreButtonComponent);
        }
      };
    };
    const showNewTasks = makeShowNewTasksFunc(tasks);
    showNewTasks(TASK_CARDS_PER_LINE);

    renderLoadMoreButton(this._loadMoreButtonComponent, container.getElement(), showNewTasks);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      tasksListElement.innerHTML = ``;
      const sortedTasks = getSortedTasks(sortType, 0, TASK_CARDS_PER_LINE);
      const showSortedTasks = makeShowNewTasksFunc(sortedTasks);
      showSortedTasks(TASK_CARDS_PER_LINE);

      renderLoadMoreButton(this._loadMoreButtonComponent, container.getElement(), showNewTasks);
    });
  }
}
