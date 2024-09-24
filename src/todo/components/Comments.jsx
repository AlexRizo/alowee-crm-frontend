import { UserComment } from "./UserComment"

export const Comments = () => {
    return (
        <div className="w-full">
            <div className="p-4 text-lg font-medium bg-gray-500 text-white">
                <h1>Comentarios</h1>
            </div>
            <div className="p-2 border border-gray-300 flex flex-col gap-3">
                {
                    [1, 2, 3, 4, 5].map((item, index) => <UserComment key={index} />)
                }
            </div>
        </div>
    )
}
