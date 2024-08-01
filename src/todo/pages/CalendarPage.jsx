import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent, CalendarModal } from '../components'
import { useCalendarStore, useUiStore } from '../../hooks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { set, subDays } from 'date-fns'
import { useMemo } from 'react'
import { useCallback } from 'react'

export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month' );
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openModal } = useUiStore();
    const { user } = useSelector(state => state.auth);

    //? Los meses van del 0 al 11 (Enero a Diciembre), siendo 0 Enero y 11 Diciembre;
    const [ currentMonth, setCurrentMonth ] = useState(new Date().getMonth());
    const [ currentDay, setCurrentDay ] = useState(new Date());
    const [ currentRange, setCurrentRange ] = useState({ start: new Date(), end: new Date() });

    const cm = useMemo(() => { return currentMonth }, [currentMonth]);

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

    const handleRangeChange = useCallback(() => {
        // Calcular el primer día del mes anterior y el último día del mes siguiente
        const startDate = new Date(currentDay.getFullYear(), cm - 1, 1);
        const endDate = new Date(currentDay.getFullYear(), cm + 2, 0);
    
        setCurrentRange({ start: startDate, end: endDate });
    }, [currentDay, cm]);
    
    const handleNavChange = (date) => {
        setCurrentDay(new Date(date));
        setCurrentMonth(date.getMonth());
    };
    
    useEffect(() => {
        handleRangeChange();
    }, [currentDay, handleRangeChange]);
    
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
                    onNavigate={ handleNavChange }
                />
            </div>
            
            <CalendarModal />
        </>
    )
}
