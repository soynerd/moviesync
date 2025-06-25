import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    loginDetails :{
        id: nanoid(),
        username: "",
        loggedIn: false
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginDetails.username = action.payload.username;
            state.loginDetails.loggedIn = true;
        },
        logout: (state) => {
            state.loginDetails.username = "";
            state.loginDetails.loggedIn = false;
        }
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;