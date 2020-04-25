import AbstractComponent from "./abstract-component";

const getNoTasksHtml = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  ;</p>`
);

export default class NoTasks extends AbstractComponent {
  getTemplate() {
    return getNoTasksHtml();
  }
}
