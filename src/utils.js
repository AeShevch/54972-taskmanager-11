/**
 * Adds zero to number that less then 10
 * @param {number} number
 * @return {string}
 */
export const addZeroToNumber = (number) => number.toString().length < 2 ? `0` + number : number;

/**
 * Creates DOM-element from Html-string
 * @param {string} template Html-string
 * @return {ChildNode} DOM-element
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Inserts dom-element
 * @param {Node} container Parent node
 * @param {HTMLElement} element
 * @param {string} place Insert position
 */
export const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const isEscapeEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    action();
  }
};
