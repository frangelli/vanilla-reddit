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

export const isLoggedIn = () => {
  return localStorage.getItem("za-user") ? true : false;
};

export const getCurrentUser = () => {
  return isLoggedIn() ? JSON.parse(localStorage.getItem("za-user")) : null;
};
