import axios from 'axios';

export const fetchStories = () => {
    return axios.get('./api/stories');
};

export const fetchStory = storyId => {
    return axios.get(`/api/stories/${storyId}`);
};

export const createStory = storyData => {
    return axios.post('/api/stories', storyData);
};

export const updateStory = storyData => {
    return axios.patch(`/api/stories/${storyData.id}`, storyData);
};

export const deleteStory = storyId => {
    return axios.delete(`/api/stories/${storyId}`);
};

