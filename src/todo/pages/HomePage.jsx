import { useEffect } from "react";
import { useEventStore } from "../../hooks/useEventStore";
import { CardData, CardPending } from "../components"

export const HomePage = () => {
    const { latestEvents, startLoadingLatestEvents } = useEventStore();

    useEffect(() => {
        startLoadingLatestEvents();
    }, []);
    
    return (
        <>
            <div className="flex flex-row gap-5">
                <CardData />
                <CardPending events={ latestEvents }/>
            </div>
            <div>

            </div>
        </>
    )
}
