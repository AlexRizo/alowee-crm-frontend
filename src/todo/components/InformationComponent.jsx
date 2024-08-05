import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"

export const InformationComponent = ({ info }) => {
    return (
        <span className="text-slate-500 text-sm flex gap-1 mt-1">
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <p>{ info }.</p>
        </span>
    )
}
