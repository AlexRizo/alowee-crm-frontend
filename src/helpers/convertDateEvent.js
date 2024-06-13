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
        post.postDate = parseISO(post.postDate);
        
        return post;
    })
};