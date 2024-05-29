import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent } from '../components'
import { useEventStore, useUiStore } from '../../hooks'
import { useEffect, useState } from 'react'

export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );
    const { events, setActiveEvent, startLoadingEvents } = useEventStore();
    const { openModal } = useUiStore();
    
    const onDoubleClick = (e) => {
        openModal();
    };
    const onSelect = (event) => {
        setActiveEvent(event)
    };
    const onView = (event) => {
        localStorage.setItem('lastView', event );
        setLastView( event )
    };
    
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
    
        return {
            style
        }
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);
    
    return (
        <div className='h-full max-h-full'>
            <Calendar
                culture='es'
                localizer={ localizer }
                defaultView={ lastView }
                events={ events }
                startAccessor='start'
                endAccessor='end'
                style={{ height: '100%', width: '100%', color: 'white' }}
                eventPropGetter={ eventStyleGetter }
                messages={ getMessagesES() }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onView }
            />
        </div>

    )
}
