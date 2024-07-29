import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent, CalendarModal } from '../components'
import { useCalendarStore, useUiStore } from '../../hooks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { subDays } from 'date-fns'

export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openModal } = useUiStore();
    const { user } = useSelector(state => state.auth);

    const [ currentRange, setCurrentRange ] = useState({ start: new Date(), end: new Date() });
    
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
            backgroundColor: event.user._id === user.uid ? '#00796b' : '#4B5563',
            borderRadius: '5px',
            opacity: (event?.end || event?.deadline) < subDays(new Date(), 1) ? 0.6 : 1.0,
            color: 'white',
        }
    
        return {
            style
        }
    };

    const eventTypeStart = (event) => {
        const start = event.type === 'event' ? event.start : event.deadline;
        return start;
    }

    const eventTypeEnd = (event) => {
        const end = event.type === 'event' ? event.end : event.deadline;
        return end;
    }

    const handleRangeChange = (range) => {
        if (Array.isArray(range)) {
            setCurrentRange({ start: range[0], end: range[range.length - 1] });
        } else {
          setCurrentRange(range);
        }
    };
    
    useEffect(() => {
        startLoadingEvents(currentRange.start, currentRange.end);
    }, [currentRange]);
    
    return (
        <>
            <div className='h-full max-h-full'>
                <Calendar
                    culture='es'
                    localizer={ localizer }
                    defaultView={ lastView }
                    events={ events }
                    startAccessor={ eventTypeStart }
                    endAccessor={ eventTypeEnd }
                    style={{ height: '100%', width: '100%', color: 'black' }}
                    eventPropGetter={ eventStyleGetter }
                    messages={ getMessagesES() }
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={ onDoubleClick }
                    onSelectEvent={ onSelect }
                    onView={ onView }
                    onRangeChange={ handleRangeChange }
                />
            </div>
            
            <CalendarModal />
        </>
    )
}
