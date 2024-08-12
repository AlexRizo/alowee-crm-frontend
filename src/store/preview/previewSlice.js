import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingPreview: false,
    previewTask: {},
};

export const previewSlice = createSlice({
    name: 'preview',
    initialState,
    reducers: {
        toggleIsLoadingPreview: (state) => {
            state.isLoadingPreview = !state.isLoadingPreview;
        },
        setPreviewTask: (state, action) => {
            state.previewTask = action.payload;
        }
    },
});

export const { increment, decrement, incrementBy } = previewSlice.actions;