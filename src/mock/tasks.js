const TASK_CARDS_COUNT = 20;
const getRandomElem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max, digits = 0) => (Math.random() * (max - min) + min).toFixed(digits);
const getRandomBoolean = () => Math.random() >= 0.5;

/**
 * Returns random date or null
 * @return {Date|null}
 */
const getRandomDate = () => getRandomBoolean() ? new Date(parseInt(getRandomNumber(0, Date.now()), 10)) : null;

/**
 * Creates object with keys from array and values set by function
 * @param {array} array Input array
 * @param {function} getValueFunction Function to set value
 * @return {object}
 */
const getObjectFromArray = (array, getValueFunction) => array.reduce((acc, key) => Object.assign(acc, {[key]: getValueFunction(key)}), {});

/**
 * Creates object with color data
 * @param {array} colors
 * @return {object}
 */
const getColors = (colors) => {
  const activeColor = getRandomElem(colors);
  const setActive = (key) => activeColor === key;

  return getObjectFromArray(colors, setActive);
};

const getTaskDataMock = () => ({
  colors: [`black`, `yellow`, `blue`, `green`, `pink`],
  repeatingDays: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`]
});

class Task {
  constructor({colors, repeatingDays}) {
    this.colors = getColors(colors);
    this.description = `Here is a card with filled data`;
    this.dueDate = getRandomDate();
    this.isArchive = getRandomBoolean();
    this.isFavourite = getRandomBoolean();
    this.repeatingDays = getObjectFromArray(repeatingDays, getRandomBoolean);
  }
}

export const tasks = new Array(TASK_CARDS_COUNT).fill(``).map(() => new Task(getTaskDataMock()));
