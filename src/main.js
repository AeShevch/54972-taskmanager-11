import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import SiteMenuComponent from "./components/menu";
import FilterComponent from "./components/filters";
import {tasks} from "./mock/tasks";
import {filters} from "./mock/filter";
import {render} from "./utils/render";

const mainContainerElement = document.querySelector(`.main`);
const menuContainerElement = mainContainerElement.querySelector(`.control`);

render(menuContainerElement, new SiteMenuComponent());
render(mainContainerElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(mainContainerElement, boardComponent);
boardController.render(tasks);
