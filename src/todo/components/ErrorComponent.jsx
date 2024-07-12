import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export const ErrorComponent = ({ error = '' }) => {
    return (
        <span className="text-red-500 text-sm flex gap-1 mt-1">
            <ExclamationCircleIcon className="h-5 w-5" />
            { error }.
        </span> 
    )
}
