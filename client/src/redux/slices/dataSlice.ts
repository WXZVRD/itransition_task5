import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import instance from "../../Axios";

export const fetchData = createAsyncThunk('data/fetchData', async (config:any, { rejectWithValue }) => {
    try {
        const response = await instance.post('/generate', config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const fetchMoreData = createAsyncThunk('data/fetchMoreData', async (config:any, { rejectWithValue }) => {
    try {
        const response = await instance.post('/getMore', config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

enum FETCH_STATUS {
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
    IDLE = 'idle'
}

export interface IRowProps {
    index: number | string;
    fullName: string;
    uid: string;
    address: {
        country?: string;
        city?: string;
        street?: string;
    };
    phone: string;
}

interface dataState {
    list: IRowProps[],
    status: FETCH_STATUS
}
const initialState: dataState = {
    list: [],
    status: FETCH_STATUS.IDLE
}
export const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchData.pending, (state) => {
                state.list = []
                state.status = FETCH_STATUS.LOADING
            })
            .addCase(fetchData.fulfilled, (state, action:PayloadAction<IRowProps[]>) => {
                state.list = action.payload;
                state.status = FETCH_STATUS.LOADED;
            })
            .addCase(fetchData.rejected, (state) => {
                state.list = []
                state.status = FETCH_STATUS.ERROR
            })
            .addCase(fetchMoreData.pending, (state) => {
                state.status = FETCH_STATUS.LOADING
            })
            .addCase(fetchMoreData.fulfilled, (state, action:PayloadAction<IRowProps[]>) => {
                state.list.push(...action.payload);
                state.status = FETCH_STATUS.LOADED;
            })
            .addCase(fetchMoreData.rejected, (state) => {
                state.list = []
                state.status = FETCH_STATUS.ERROR
            })

})


export default dataSlice.reducer