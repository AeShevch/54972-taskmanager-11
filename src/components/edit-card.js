import {addZeroToNumber} from '../mock/utils';

const getDeadlineHtml = (dueDate) => (
  `<fieldset class="card__date-deadline">
     <label class="card__input-deadline-wrap">
       <input
         class="card__date"
         type="text"
         placeholder=""
         name="date"
         value="${dueDate.getDate()} ${dueDate.toLocaleString(`en`, {month: `long`})} ${addZeroToNumber(dueDate.getHours())}:${addZeroToNumber(dueDate.getMinutes())}"
       />
     </label>
   </fieldset>`
);

const getRepeatDaysHtml = (repeatingDays) => {
  const innerHtml = Object.entries(repeatingDays).map(([day, activity], index) => (
    `<input
       class="visually-hidden card__repeat-day-input"
       type="checkbox"
       id="repeat-${day}-${index}"
       name="repeat"
       value="${day}"
       ${activity ? `checked` : ``}
     />
     <label class="card__repeat-day" for="repeat-${day}-${index}">${day}</label>`
  )).join(`\n`);

  return `<fieldset class="card__repeat-days">
     <div class="card__repeat-days-inner">
      ${innerHtml}
     </div>
   </fieldset>`;
};

const getColorsHtml = (colors) => Object.entries(colors).map(([name, activity], index) => (
  `<input
     type="radio"
     id="color-${name}-${index}"
     class="card__color-input card__color-input--${name} visually-hidden"
     name="color"
     value="${name}"
     ${activity ? `checked` : ``}
   />
   <label
     for="color-${name}-${index}"
     class="card__color card__color--${name}"
     >${name}</label
   >`
)).join(`\n`);

const createEditCardTemplate = (task) => {
  const isRepeating = Object.values(task.repeatingDays).includes(true);
  const hasDate = task.dueDate !== null;
  const isOverdue = hasDate && task.dueDate < new Date();
  const color = Object.entries(task.colors).find(([, value]) => value === true)[0];

  return `<article class="card card--edit card--${color} ${isRepeating ? `card--repeat` : ``} ${isOverdue ? `card--deadline` : ``} ">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${task.description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${hasDate ? `yes` : `no`}</span>
                </button>

                ${hasDate ? getDeadlineHtml(task.dueDate) : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                ${isRepeating ? getRepeatDaysHtml(task.repeatingDays) : ``}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${getColorsHtml(task.colors)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`;
};

export {createEditCardTemplate};
