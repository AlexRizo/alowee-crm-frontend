import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
    isLoadingEvents: true,
    activeEvent: null,
    message: undefined 
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => event.id === payload.id ? payload : event);
        },
        onDeleteEvent: (state, { payload }) => {
            state.events = state.events.filter(event => event.id !== payload);
            state.activeEvent = null;
        },
        onErrorResponse: (state, { payload }) => {
            state.message = payload;
        },
        clearMessage: (state) => {
            state.message = undefined;
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.events = payload;
            // payload.forEach(event => {
            //     const exist = state.events.some(dbEvent => dbEvent.id === event.id);
            //     if (!exist) {
            //         state.events.push(event);
            //     }
            // });
        },
    },
});

export const { onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetActiveEvent, onErrorResponse, clearMessage, onLoadEvents } = calendarSlice.actions;