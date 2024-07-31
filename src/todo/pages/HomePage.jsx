import { useEffect } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { CardData, CardPending } from "../components"

export const HomePage = () => {
    const { latestEvents, startLoadingLatestEvents } = useCalendarStore();
    const now = new Date(),
          start = new Date(now.getFullYear(), now.getMonth(), 1),
          end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    useEffect(() => {
        startLoadingLatestEvents(start, end);
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