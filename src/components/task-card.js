import {addZeroToNumber} from "../utils/common";
import AbstractComponent from "./abstract-component";

const getDeadlineHtml = (dueDate) => (
  `<div class="card__dates">
     <div class="card__date-deadline">
       <p class="card__input-deadline-wrap">
         <span class="card__date">${dueDate.getDate()} ${dueDate.toLocaleString(`en`, {month: `long`})}</span>
         <span class="card__time">${addZeroToNumber(dueDate.getHours())}:${addZeroToNumber(dueDate.getMinutes())}</span>
       </p>
     </div>
   </div>`
);

/**
 * Returns the markup of task card
 * @return {string}
 */
const createTaskCardTemplate = ({colors, description, dueDate, isArchive, isFavourite, repeatingDays}) => {
  const isRepeating = Object.values(repeatingDays).includes(true);
  const repeatClass = isRepeating ? `card--repeat` : ``;
  const hasDate = dueDate !== null;
  const isOverdue = hasDate && dueDate < new Date();
  const deadlineClass = isOverdue ? `card--deadline` : ``;
  const deadlineHtml = hasDate ? getDeadlineHtml(dueDate) : ``;
  const color = Object.entries(colors).find(([, value]) => value === true)[0];
  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavourite ? `` : `card__btn--disabled`;

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    ${deadlineHtml}
                  </div>
                </div>
              </div>
            </div>
          </article>`;
};

export default class TaskCard extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskCardTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }
}
