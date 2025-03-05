import axios from 'axios';

const API_BASE_URL = 'https://mock-api.autobot.site/api/@arist';

export const getPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    console.log("API Response from api.js:", response.data); // Debug API output
    return response; // Ensure the correct response is returned
};

export const createPost = (postData) => {
    return axios.post(`${API_BASE_URL}/posts`, postData);
};

export const getPostById = (postId) => {
    return axios.get(`${API_BASE_URL}/posts/${postId}`);
};

export const updatePost = (postId, data) => {
    return axios.put(`${API_BASE_URL}/posts/${postId}`, data);
};

export const deletePost = (postId) => {
    return axios.delete(`${API_BASE_URL}/posts/${postId}`);
};
