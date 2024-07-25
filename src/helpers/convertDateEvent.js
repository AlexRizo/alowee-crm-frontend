import { parseISO } from "date-fns";

export const convertDateEvent = (events) => {
    return events.map(event => {
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);
        
        return event;
    })
};

export const convertDatePost = (posts) => {
    return posts.map(post => {
        post.deadline = parseISO(post.deadline);
        
        return post;
    })
};

export const convertDatePrint = (prints) => {
    return prints.map(print => {
        print.deadline = parseISO(print.deadline);
        
        return print;
    })
};