import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage, onAddNewEvent, onCheckingForm, onDeleteEvent, onErrorResponse, onLoadEvents, onLoadlatestEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { todoApi } from "../api";
import { convertDateEvent, fireModal } from "../helpers";

export const useEventStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { events, latestEvents, activeEvent, message } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

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
                dispatch(onAddNewEvent({ id: data.event.id, ...eventData, user, status: false }));
                fireModal({
                    title: 'Evento creado',
                    text: 'El evento ha sido creado y enviado para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                navigate('/calendar');
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

    const startLoadingLatestEvents = async() => {
        try {
            const { data } = await todoApi.get('/events?limit=3');
            const events = convertDateEvent(data.events);
            dispatch(onLoadlatestEvents(events));
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
        latestEvents,
        activeEvent,
        message,
        hasEventSelected: !!activeEvent,
        
        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
        startLoadingLatestEvents
    };
};