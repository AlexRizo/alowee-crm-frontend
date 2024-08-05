import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage, onAddNewEvent, onCheckingForm, onDeleteEvent, onErrorResponse, onLoadEvents, onLoadlatestEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { todoApi } from "../api";
import { convertDateEvent, fireModal } from "../helpers";

export const useCalendarStore = () => {
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
                dispatch(onAddNewEvent({ id: data.event.id, ...eventData, user, status: false, type: 'event' }));
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

    const startSavingPost = async(postData) => {
        onCheckingForm();

        const postFormData = new FormData();

        for (const key in postData) {
            if (key === 'file') {
                if (postData.file) postFormData.append('file', postData.file[0]);
            } else if (key === 'socialNetworks') {
                postFormData.append('socialNetworks', JSON.stringify(postData.socialNetworks));
            } else if (key === 'deadline') {
                postFormData.append('deadline', postData.deadline.toISOString());
            } else {
                postFormData.append(key, postData[key]);
            }
        }

        if (postData.id) {
            // Update
            dispatch(onUpdateEvent(postData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-post-req', postFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                dispatch(onAddNewEvent({ id: data.post.id, ...postData, user, status: false, type: 'post' }));
                fireModal({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada y enviada para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                navigate('/calendar');
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(error.response?.data?.message ||
                    Object?.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
        }
        onCheckingForm();
    };

    const startSavingPrint = async(designData) => {
        dispatch(onCheckingForm());

        const DesignFormData = new FormData();

        for (const key in designData) {
            if (key === 'file') {
                if (designData.file) DesignFormData.append('file', designData.file[0]);
            } else if (key === 'printSize') {
                DesignFormData.append('printSize', JSON.stringify(designData.printSize));
            } else if (key === 'deadline') {
                DesignFormData.append('deadline', designData.deadline.toISOString());
            } else {
                DesignFormData.append(key, designData[key]);
            }
        }

        if (designData.id) {
            // Update
            dispatch(onUpdateEvent(designData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-design-req/print', DesignFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                dispatch(onAddNewEvent({ id: data.print.id, ...designData, user, status: false, type: 'post' }));
                fireModal({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada y enviada para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                dispatch(onCheckingForm());
                navigate('/calendar');
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(
                    error.response?.data?.message ||
                    Object.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
        }
    }

    const startSavingDigital = async(designData) => {
        dispatch(onCheckingForm());

        const DesignFormData = new FormData();

        for (const key in designData) {
            if (key === 'file') {
                if (designData.file) DesignFormData.append('file', designData.file[0]);
            } else if (key === 'deadline') {
                DesignFormData.append('deadline', designData.deadline.toISOString());
            } else {
                DesignFormData.append(key, designData[key]);
            }
        }

        if (designData.id) {
            // Update
            dispatch(onUpdateEvent(designData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-design-req/digital', DesignFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                dispatch(onAddNewEvent({ id: data.digital.id, ...designData, user, status: false, type: 'post' }));
                fireModal({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada y enviada para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                navigate('/calendar');
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(
                    error.response?.data?.message ||
                    Object.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
            dispatch(onCheckingForm());
        }
    }

    const startSavingTshirt = async(designData) => {
        dispatch(onCheckingForm());

        const DesignFormData = new FormData();

        for (const key in designData) {
            if (key === 'file') {
                if (designData.file) DesignFormData.append('file', designData.file[0]);
            } else if (key === 'deadline') {
                DesignFormData.append('deadline', designData.deadline.toISOString());
            } else {
                DesignFormData.append(key, designData[key]);
            }
        }

        if (designData.id) {
            // Update
            dispatch(onUpdateEvent(designData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-design-req/t-shirt', DesignFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                dispatch(onAddNewEvent({ id: data.tshirt.id, ...designData, user, status: false, type: 'post' }));
                fireModal({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada y enviada para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                navigate('/calendar');
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(
                    error.response?.data?.message ||
                    Object.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
            dispatch(onCheckingForm());
        }
    };

    const startSavingOther = async(designData) => {
        dispatch(onCheckingForm());

        const DesignFormData = new FormData();

        for (const key in designData) {
            if (key === 'file') {
                if (designData.file) DesignFormData.append('file', designData.file[0]);
            } else if (key === 'deadline') {
                DesignFormData.append('deadline', designData.deadline.toISOString());
            } else {
                DesignFormData.append(key, designData[key]);
            }
        }

        if (designData.id) {
            // Update
            dispatch(onUpdateEvent(designData));
        } else {
            // Create
            try {
                const { data } = await todoApi.post('/events/new-design-req/other', DesignFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                dispatch(onAddNewEvent({ id: data.other.id, ...designData, user, status: false, type: 'post' }));
                fireModal({
                    title: 'Tarea creada',
                    text: 'La tarea ha sido creada y enviada para su revisión. Pronto recibirás una respuesta.',
                    icon: 'success'
                });
                navigate('/calendar');
            } catch (error) {
                console.log(error);
                dispatch(onErrorResponse(
                    error.response?.data?.message ||
                    Object.values(error.response?.data?.errors).map((error) => error.msg).join('<br/>') ||
                    'Error desconocido'
                ));

                setTimeout(() => {
                    dispatch(clearMessage());
                }, 1000);
            }
            dispatch(onCheckingForm());
        }
    };

    const getEvents = async(custom) => {
        try {
            const { data } = await todoApi.get(`/events${ custom ? '?' + custom : '' }`);
            const events = convertDateEvent(data.response.events, 'event');
            const posts = convertDateEvent(data.response.posts, 'post');
            const prints = convertDateEvent(data.response.prints, 'print');
            const digital = convertDateEvent(data.response.digital, 'digital');
            const tshirts = convertDateEvent(data.response.tshirts, 'tshirt');
            const others = convertDateEvent(data.response.others, 'other');
            
            return [ ...events, ...posts, ...prints, ...digital, ...tshirts, ...others ];
        } catch (error) {
            console.log(error);
        }
    };

    const startLoadingEvents = async(start, end) => {
        dispatch(onLoadEvents(await getEvents(`start=${ start.toISOString() }&end=${ end.toISOString() }`)));
    };

    const startLoadingLatestEvents = async(start, end) => {
        dispatch(onLoadlatestEvents(await getEvents(`start=${ start.toISOString() }&end=${ end.toISOString() }`)));
    };

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    };

    return {
    //* Properties
        events,
        latestEvents,
        activeEvent,
        message,
        hasEventSelected: !!activeEvent,
        
    //* Methods
        //? Event
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,

        //?! Post
        startSavingPost,

        //?! Design
        startSavingPrint,

        //?! Digital
        startSavingDigital,

        //?! Tshirt
        startSavingTshirt,

        //?! Other
        startSavingOther,
        
        //? Load
        startLoadingEvents,
        startLoadingLatestEvents
    };
};