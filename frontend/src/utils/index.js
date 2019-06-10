export const clearDOMElement = el => {
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }
};
