import {configureStore} from '@reduxjs/toolkit'
import mediaReducer from './mediaSlice'
export const store = configureStore({
    reducer: mediaReducer
});