import { parseISO } from "date-fns";

export const convertDateEvent = (events, type) => {
    if (type === 'event') {
        return events.map(event => {
            event.start = parseISO(event.start);
            event.end = parseISO(event.end);
            
            return event;
        });
    } else {
        return events.map(event => {
            event.deadline = parseISO(event.deadline);
            
            return event;
        });
    }
}; 