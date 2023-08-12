import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slices/dataSlice'
import configReducer from './slices/configSlice'


const store = configureStore({
    reducer:{
        data: dataReducer,
        config: configReducer
    }
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch