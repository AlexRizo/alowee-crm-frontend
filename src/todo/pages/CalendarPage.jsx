import { useState } from 'react'

import { Calendar } from 'react-big-calendar'
import { addHours } from "date-fns"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent } from '../components'

export const CalendarPage = () => {
    const onDoubleClick = (e) => {
        console.log('onDoubleClick', e);
    };
    const onSelect = (e) => {
        console.log('onSelect', e);
    };
    const onView = (e) => {
        console.log('onView', e);
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

    const events = [
        {
            _id: new Date().getTime(),
            title: 'Evento de prueba',
            notes: 'Este es un evento de prueba',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'David'
            }
        }
    ];
    
    return (
        <Calendar
            culture='es'
            localizer={ localizer }
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
    )
}
