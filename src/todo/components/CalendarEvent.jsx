import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"

export const CalendarEvent = ({ event }) => {
    const { title, user, status } = event
    
    return (
        <>
            <strong>{ title }</strong>
            <span className="flex gap-1">
                {
                    status
                    ? 
                        <>
                            <CheckCircleIcon className="h-5" />
                            <p>Finalizada</p>
                        </>
                    :
                        <>
                            <ExclamationCircleIcon className="h-5"/>
                            <p>Pendiente</p>
                        </>
                }
                
            </span>
        </>
    )
}