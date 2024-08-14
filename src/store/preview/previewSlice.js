import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingPreview: false,
    previewTask: {},
};

export const previewSlice = createSlice({
    name: 'preview',
    initialState,
    reducers: {
        toggleIsLoadingPreview: (state, { payload }) => {
            state.isLoadingPreview = payload;
        },
        setPreviewTask: (state, { payload }) => {
            state.previewTask = payload;
        }
    },
});

export const { toggleIsLoadingPreview, setPreviewTask } = previewSlice.actions;