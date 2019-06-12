import axios from "axios";

const API_BASE_URL = "";

export const fetchArticles = () => {
  return axios.get(`${API_BASE_URL}/articles`);
};

export const fetchArticleComments = articleId => {
  return axios.get(`${API_BASE_URL}/articles/${articleId}/comments`);
};

export const signUpOrSignInUser = username => {
  return axios.post(`${API_BASE_URL}/users`, { username });
};

export const voteUp = articleId => {
  return axios.post(`${API_BASE_URL}/articles/${articleId}/vote_up`);
};

export const voteDown = articleId => {
  return axios.post(`${API_BASE_URL}/articles/${articleId}/vote_down`);
};

export const postComment = (articleId, commentText, userId) => {
  return axios.post(`${API_BASE_URL}/articles/${articleId}/comments`, {
    content: commentText,
    user_id: userId
  });
};

export const postArticle = (title, content, userId) => {
  return axios.post(`${API_BASE_URL}/articles`, {
    title,
    content,
    user_id: userId
  });
};

export const loginOrCreate = username => {
  return axios.post(`${API_BASE_URL}/users`, {
    username
  });
};

export default {
  fetchArticles,
  fetchArticleComments,
  signUpOrSignInUser,
  voteUp,
  voteDown,
  postComment,
  loginOrCreate,
  postArticle
};
