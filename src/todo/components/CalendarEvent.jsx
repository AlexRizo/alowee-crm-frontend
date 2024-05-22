export const CalendarEvent = ({ event }) => {
    const { title, user } = event
    
    return (
        <>
        <strong>{ title }</strong>
        <p> - { user.name }</p>
        </>
    )
}