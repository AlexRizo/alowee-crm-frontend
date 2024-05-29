import { useDispatch, useSelector } from "react-redux";
import { clearMessage, onAddNewEvent, onCheckingForm, onDeleteEvent, onErrorResponse, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { todoApi } from "../api";
import { convertDateEvent, fireModal } from "../helpers";

export const useEventStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent, message } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async(eventData) => {
        onCheckingForm();

        if (eventData.id) {
            // Update
            dispatch(onUpdateEvent(eventData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-event-req', eventData);
                console.log(data);
                dispatch(onAddNewEvent({ id: data.event.id, ...eventData }));
                fireModal({
                    title: 'Evento creado',
                    text: 'El evento ha sido creado y enviado para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(error.response.data?.message ||
                    Object.values(error.response.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
        }
        onCheckingForm();
    };

    const startLoadingEvents = async() => {
        try {
            const { data } = await todoApi.get('/events');
            const events = convertDateEvent(data.events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
        }
    };

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    };

    return {
        // Properties
        events,
        activeEvent,
        message,
        hasEventSelected: !!activeEvent,
        
        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    };
};