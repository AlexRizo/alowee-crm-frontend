import { CalendarIcon, CameraIcon, DevicePhoneMobileIcon, MapPinIcon, VideoCameraIcon } from "@heroicons/react/24/outline"
import { es } from "date-fns/locale"
import { format, isSameDay } from "date-fns"

export const TaskDescription = ({ title, requiriments, start, end, location, description, status, createdAt, user }) => {
    const sameDay = isSameDay(start, end)
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between bg-black text-white p-4 font-medium text-lg">
                <h1>{ title }</h1>
                <h2>Evento</h2>
            </div>
            <div className="p-4 h-full border border-gray-300">
                <div className="flex gap-2 items-center">
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
                </div>
                <div className="my-2">
                    <h2 className="font-medium">Requerimientos:</h2>
                    <div className="pl-4">
                        {
                            requiriments.map((req, index) => (
                                <p className="capitalize flex gap-2" key={index}>
                                    {
                                        req === 'fotografia'
                                        ? <CameraIcon height={20} />
                                        : req === 'transmision'
                                        ? <VideoCameraIcon height={20} />
                                        : req === 'reel'
                                        ? <DevicePhoneMobileIcon height={20} />
                                        : null
                                    }
                                    { req }
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <MapPinIcon height={20} />
                    <p>{ location }</p>
                </div>
                <hr />
                <p className="pt-4">{ description }</p>
            </div>
        </div>
        
    )
}
