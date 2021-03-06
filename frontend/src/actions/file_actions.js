import * as FilesApiUtil from '../util/files_util';
export const RECEIVE_FILE = "RECEIVE_FILE";
export const RECEIVE_FILE_ERRORS = "RECEIVE_FILE_ERRORS";
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const DELETE_FILE = "DELETE_FILE"; 

export const receiveFile = file => ({
    type: RECEIVE_FILE,
    file
});

export const receiveFiles = files => ({
    type: RECEIVE_FILES,
    files
});

export const receiveFileErrors = errors => ({
    type: RECEIVE_FILE_ERRORS,
    errors
});
export const receiveDeleteFile = (data) => ({
    type: DELETE_FILE,
    data
});

export const deleteFile = (user_id, filename) => dispatch => (
    FilesApiUtil.deleteFileByUserIdAndFileName(user_id, filename)
    .then(response => (
        dispatch(receiveDeleteFile(response.data))
        ), error => {
            dispatch(receiveFileErrors(error.response.data));
    })
);

export const uploadFile = data => dispatch => (
    FilesApiUtil.postToCloudinary(data).then(response => (
        dispatch(receiveFile(response.data))
        ), error => (
            dispatch(receiveFileErrors(error.response.data))
    ))
);

export const fetchAll = user_id => dispatch => {
    return FilesApiUtil.getAllFilesByUserId(user_id).then(response => (
        dispatch(receiveFiles(response.data))
    ), error => (
        dispatch(receiveFileErrors(error.response.data))
    ));
};