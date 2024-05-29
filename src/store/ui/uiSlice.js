import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    isCheckingForm: false,
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
        onCheckingForm: (state) => {
            state.isCheckingForm = !state.isCheckingForm;
        },
    },
});

export const { onOpenModal, onCloseModal, onCheckingForm } = uiSlice.actions;