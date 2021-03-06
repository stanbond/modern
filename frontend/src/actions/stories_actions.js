import * as StoriesApiUtil from '../util/stories_api_util';

export const RECEIVE_ALL_STORIES = 'RECEIVE_ALL_STORIES';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const RECEIVE_STORIES_ERRORS = 'RECEIVE_STORIES_ERRORS';
export const RECEIVE_STORIES = "RECEIVE_STORIES";
export const RECEIVE_RESPONSES = "RECEIVE_RESPONSES";
export const RECEIVE_RESPONSE_ERRORS = "RECEIVE_RESPONSE_ERRORS";
export const RECEIVE_CLAPS = "RECEIVE_CLAPS";
export const RECEIVE_CLAPS_ERRORS = "RECEIVE_CLAPS_ERRORS";

export const receiveAllStories = stories => ({
    type: RECEIVE_ALL_STORIES,
    stories
});

export const receiveStory = story => ({
    type: RECEIVE_STORY,
    story
});

export const removeStory = story => ({
    type: REMOVE_STORY,
    storyId: story._id
});

export const receiveStoriesErrors = errors => ({
    type: RECEIVE_STORIES_ERRORS,
    errors
});

export const receiveStories = stories => ({
    type: RECEIVE_STORIES,
    stories
});

export const receiveResponses = responses => ({
    type: RECEIVE_RESPONSES,
    responses
});

export const receiveResponsesErrors = errors => ({
    type: RECEIVE_RESPONSE_ERRORS,
    errors
});

export const receiveClaps = claps => ({
    type: RECEIVE_CLAPS,
    claps
});

export const receiveClapsErrors = errors => ({
    type: RECEIVE_CLAPS_ERRORS,
    errors
});

export const fetchStories = () => dispatch => {
    return StoriesApiUtil.fetchStories()
        .then(response => (dispatch(receiveAllStories(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const fetchStoriesOfOneUser = (user_id) => dispatch => {
    return StoriesApiUtil.fetchStories(user_id)
        .then(response => (dispatch(receiveAllStories(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const fetchStory = storyId => dispatch => {
    return StoriesApiUtil.fetchStory(storyId)
        .then(response => (
            dispatch(receiveStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const createStory = storyData => dispatch => {
    return StoriesApiUtil.createStory(storyData)
        .then(response => (
            dispatch(receiveStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

export const updateStory = storyData => dispatch => {
    return StoriesApiUtil.updateStory(storyData)
        .then(response => {
            return dispatch(receiveStory(response.data))
        }, error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

export const deleteStory = storyId => dispatch => {
    return StoriesApiUtil.deleteStory(storyId)
        .then(response => {
            return dispatch(removeStory(response.data))
        }, error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

export const getStoriesByUsernameAndId = user => dispatch => {
    return StoriesApiUtil.fetchStoriesOfOneUser({ username: user.username, id: user.id }).then(response => (
        dispatch(receiveStories(response.data))
    ), error => (
        dispatch(receiveStoriesErrors(error.response.data))
    ));
};

export const createResponse = (storyId, userResponse) => dispatch => (
    StoriesApiUtil.createResponse(storyId, userResponse).then(response => {
       return dispatch(receiveResponses(response.data))
    }, error => (
        dispatch(receiveResponsesErrors(error.response.data))
    ))
);

export const fetchResponses = (storyId) => dispatch => (
    StoriesApiUtil.fetchResponses(storyId).then(response => (
        dispatch(receiveResponses(response.data))
    ), error => (
        dispatch(receiveResponsesErrors(error.response.data))
    ))
);

export const getTotalClaps = storyId => dispatch => {
    return StoriesApiUtil.getClaps(storyId).then(response => {
        return dispatch(receiveClaps(response.data))
    }, error => (
        dispatch(receiveClapsErrors(error.response.data))
    ))
};

export const patchAClap = storyId => dispatch => {
    return StoriesApiUtil.patchClap(storyId).then(response => {
        return dispatch(receiveClaps(response.data))
    }, error => (
        dispatch(receiveClapsErrors(error.response.data))
    ))
};