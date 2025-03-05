import axios from 'axios';

const API_BASE_URL = 'https://mock-api.autobot.site/api/@arist';

export const getPosts = () => {
    return axios.get(`${API_BASE_URL}/posts`); // No params
};

export const createPost = (postData) => {
    return axios.post(`${API_BASE_URL}/posts`, postData);
};

export const getPostById = (postId) => {
    return axios.get(`${API_BASE_URL}/posts/${postId}`);
};

export const updatePost = (postId, postData) => {
    return axios.put(`${API_BASE_URL}/posts/${postId}`, postData);
};

export const deletePost = (postId) => {
    return axios.delete(`${API_BASE_URL}/posts/${postId}`);
};
