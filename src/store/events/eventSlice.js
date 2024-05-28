import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const testEvent = {
    _id: new Date().getTime(),
    title: 'Evento de prueba',
    description: 'Este es un evento de prueba',
    start: new Date(),
    end: addHours(new Date(), 2),
    requeriments: [],
    user: {
        _id: '123',
        name: 'David'
    },
    type: 'event'
};

const initialState = {
    events: [
        testEvent
    ],
    activeEvent: null
};

export const eventSlice = createSlice({
    name: 'event',
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
            state.events = state.events.map(event => event._id === payload._id ? payload : event);
        },
        onDeleteEvent: (state, { payload }) => {
            state.events = state.events.filter(event => event._id !== payload);
            state.activeEvent = null;
        }
    },
});

export const { onAddNewEvent, onUpdateEvent, onDeleteEvent, onSetActiveEvent } = eventSlice.actions;