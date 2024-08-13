export const LoadingComponent = () => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center h-screen animate__animated animate__fadeIn">
            <div className="relative w-16 h-16 animate-spin">
                <div className="absolute inset-0 rounded-full border-2 border-l-0 border-t-0 border-sky-500" />
                <div className="absolute inset-1 rounded-full border-2 border-l-0 border-t-0 border-sky-300/60" />
            </div>
            <h1 className="text-xl text-sky-950 animate-pulse">Cargando...</h1>
        </div>
    )
}
