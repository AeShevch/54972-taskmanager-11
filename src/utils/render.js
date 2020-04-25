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
 * @param {object} component
 * @param {string} place Insert position
 */
export const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

/**
 * Replaces one dom element with another
 * @param {object} newComponent New element
 * @param {object} oldComponent Element to replace
 */
export const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const areExistsElements = !!(newElement && oldElement && parentElement);

  if (areExistsElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  } else {
    throw new Error(`New or old element doesn't exist`);
  }
};

/**
 * Removes element
 * @param {object} component
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
