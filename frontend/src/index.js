// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import {fetchStories, fetchResponses} from './actions/stories_actions';
import { fetchAllUsers } from './actions/users_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);

        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { session: { isAuthenticated: true, currentUser: decodedUser } };
        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/';
        }
    } else {
        store = configureStore({});
    }
    const root = document.getElementById('root');
    // TESTING START
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TESTING END
    // window.dispatch(window.fetchAllUsers());
    ReactDOM.render(<Root store={store} />, root);
});

window.fetchStories = fetchStories;
window.fetchAllUsers = fetchAllUsers;
window.fetchResponses = fetchResponses;