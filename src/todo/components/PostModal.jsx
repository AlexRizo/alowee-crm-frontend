import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export const PostModal = ({ data }) => {

    const isRetarded = () => {
        if (new Date(data.deadline) < new Date() && !data.status) return true;
        console.log({ status: data.status });
        return false;
    };
    
    return (
        <>
            <div className="flex flex-col mb-3">
                <h1 className="text-xl font-medium mb-1">{ data.title }</h1>
                <span className="flex flex-row gap-2 text-gray-500">
                    <CalendarIcon className="h-5" />
                    <span>
                        {
                            format(data.deadline, 'PPp', { locale: es })
                        }
                    </span>
                </span>
            </div>
            <div className="mb-3">
                <p>{ data.description }</p>
            </div>
            <div className="mb-4">
                <span className="flex gap-1 items-center mb-1 text-gray-500">
                    <UserIcon className="h-5" />
                    <p>{ data.user.name }</p>
                </span>
                <span className="flex gap-1 items-center mb-1">
                    <ClockIcon className={`${ data.status ? 'text-green-600' : 'text-orange-500' } h-5`} />
                    <p className={`${ data.status ? 'text-green-600' : 'text-orange-500' }`}>
                        { data.status ? 'Finalizada' : 'Pendiente' } { isRetarded() && ' (Con retraso)' }
                    </p>
                </span>
            </div>
        </>
    )
}