import Avatar from "boring-avatars"

export const UserComment = ({ username, comment, id }) => {
    return (
        <div className="rounded-lg bg-slate-200 flex w-max gap-2 p-4">
            <div>
                <Avatar name="David Ayala" size={ 50 } />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="font-medium text-gray-600">David Ayala</h1>
                <p>Este es un comentario de prueba para una tarea de prueba...</p>
            </div>
        </div>
    )
}
