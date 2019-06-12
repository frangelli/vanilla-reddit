import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

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

export default {
  fetchArticles,
  fetchArticleComments,
  signUpOrSignInUser,
  voteUp,
  voteDown,
  postComment
};
