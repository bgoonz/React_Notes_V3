import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

// LOGIN ACTION
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    dispatch(setUser(res.data.user));
    return res;
};

// RESTOREUSER ACTION
export const restoreUser = () => async dispatch => {
    const res = await fetch('/api/session');
    dispatch(setUser(res.data.user));
    return res;
};

// SIGNUP ACTION
export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const res = await fetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    dispatch(setUser(res.data.user));
    return res;
};

// AWS
export const createUser = (user) => async (dispatch) => {
    const { images, image, username, email, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // for multiple files
    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    // for single file
    if (image) formData.append("image", image);

    const res = await fetch(`/api/users/`, {
        method: "POST",
        body: formData,
    });

    dispatch(setUser(res.data.user));
};

// LOGOUT ACTION
export const logout = () => async (dispatch) => {
    const res = await fetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const addUserState = Object.assign({}, { user: action.payload });
            return addUserState;
        case REMOVE_USER:
            const removeUserState = Object.assign({}, { user: null });
            return removeUserState;
        default:
            return state;
    }
};

// To be added
// switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload };

export default sessionReducer;
