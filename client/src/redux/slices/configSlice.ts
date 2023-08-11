import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export type Locale = 'pl' | 'uk' | 'it';

interface LocaleType {
    str: Locale;
    code: string
}

export interface configState {
    seed: number,
    failCount: number,
    pageCount: number,
    locale: LocaleType,

}

const initialState: configState = {
    seed: 0,
    failCount: 0,
    pageCount: 0,
    locale: {str: 'pl', code:'+48'},
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setSeed: (state, action:PayloadAction<number>) => {
            state.seed = action.payload;
        },
        setFailCount: (state, action:PayloadAction<number>) => {
            state.failCount = action.payload
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.pageCount = action.payload
        },
        setLocal: (state, action:PayloadAction<LocaleType>) => {
            state.locale = action.payload
        },
    },
});

export const { setSeed, setFailCount, setLocal, setPage } = configSlice.actions;

export default configSlice.reducer