import {configureStore} from '@reduxjs/toolkit'
import mediaReducer from './mediaSlice'
import loginReducer from './loginSlice'
export const store = configureStore({
    reducer: {
        media: mediaReducer,  // media state will be handled by mediaReducer
        login: loginReducer,  // login state will be handled by loginReducer
    }
});