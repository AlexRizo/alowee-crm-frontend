import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenModal: (state) => {
            state.isModalOpen = true;
        },
        onCloseModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { onOpenModal, onCloseModal } = uiSlice.actions;