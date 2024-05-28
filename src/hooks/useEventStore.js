import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useEventStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = (eventData) => {
        if (eventData._id) {
            // Update
            dispatch(onUpdateEvent(eventData));
        } else {
            // Create
            dispatch(onAddNewEvent({ ...eventData, _id: new Date().getTime()} ));
        }
    };

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    };

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        
        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    };
};