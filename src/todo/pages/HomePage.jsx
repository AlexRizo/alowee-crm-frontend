import { useEffect } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { CardData, CardPending } from "../components"

export const HomePage = () => {
    const { latestEvents, startLoadingLatestEvents } = useCalendarStore();

    useEffect(() => {
        startLoadingLatestEvents();
    }, []);
    
    return (
        <>
            <div className="flex flex-row gap-5">
                <div>
                    <CardData />
                </div>
                <div>
                    <CardPending events={ latestEvents }/>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}