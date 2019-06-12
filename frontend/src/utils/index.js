export const clearDOMElement = el => {
  while (el.lastChild) {
    el.removeChild(el.lastChild);
  }
};

export const hasCssClass = (el, className) => el.classList.contains(className);

export const generateAvatarByUsername = username => {
  if (!username) return ":(";
  return `${username[0]}${username[username.length - 1]}`;
};
