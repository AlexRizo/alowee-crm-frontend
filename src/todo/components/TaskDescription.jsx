import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { es } from "date-fns/locale"
import { format, isSameDay } from "date-fns"

export const TaskDescription = ({ title, requiriments, start, end, location, description, status, createdAt, user }) => {
    const sameDay = isSameDay(start, end)

    return (
        <div className="flex flex-col">
            <div className="flex">
                <h1>{ title }</h1>
                -
                <h2>Evento</h2>
            </div>
            <div>
                <span>
                    <CalendarIcon height={20} />
                    {
                        sameDay
                        ?
                            <p>
                                {`${format(start, 'PPp', { locale: es })} - ${format(end, 'p', { locale: es })}`}
                            </p>
                        :
                            <p>
                                {`${format(start, 'PPp', { locale: es })} - ${format(end, 'PPp', { locale: es })}`}
                            </p>
                    }
                </span>
                <span>
                    <h2>Requerimientos:</h2>
                    <p>{ requiriments }</p>
                </span>
                <span>
                    <MapPinIcon height={20} />
                    <p>{ location }</p>
                </span>
                <hr />
                <p>{ description }</p>
            </div>
        </div>
    )
}
