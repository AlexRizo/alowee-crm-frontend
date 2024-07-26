import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"

export const CalendarEvent = ({ event }) => {
    const { title, status, type, printType } = event;    
    return (
        <>
            <strong className="capitalize">{ title ? title : `Diseño: ${ event?.printType ? printType : type }`  }</strong>
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