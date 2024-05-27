import { CardData, CardPending } from "../components"

export const HomePage = () => {
    return (
        <>
            <div className="flex flex-row gap-5">
                <CardData />
                <CardPending />
            </div>
            <div>

            </div>
        </>
    )
}
