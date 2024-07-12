import { DevicePhoneMobileIcon, NewspaperIcon, PaintBrushIcon } from '@heroicons/react/24/outline'
import { DesignModal, SelectRequest } from '../components'
import { useUiStore } from "../../hooks";

export const RequestPage = () => {
    const { openModal } = useUiStore();

    return (
        <>
            <div className="flex flex-row flex-wrap gap-4">
                <SelectRequest
                    url="/requests/new-event"
                    color="bg-indigo-600"
                    title="Evento"
                    shortDesc="Solucitud para eventos"
                    subTitle="Cobertura de eventos"
                    longDesc="Cubrir un evento con fotografía y/o video"
                >
                    <NewspaperIcon className="h-10 text-gray-700" />
                </SelectRequest>

                <SelectRequest
                    url="/requests/new-post"
                    color="bg-violet-600"
                    title="Publicación"
                    shortDesc="Solictud para publicación"
                    subTitle="Publicación en redes"
                    longDesc="Publicación en redes sociales con diseño y contenido personalizado"
                >
                    <DevicePhoneMobileIcon className="h-10 text-gray-700" />
                </SelectRequest>

                <div onClick={ openModal } className="w-96 bg-white hover:scale-105 hover:shadow-xl transition rounded shadow cursor-pointer">
                    <div className="p-7 w-full flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-4 border border-gray-400 rounded-full">
                            <PaintBrushIcon className="h-10 text-gray-700" />
                            </div>
                            <span>
                                <p className='text-2xl mb-1 text-gray-700 font-medium'>Diseño</p>
                                <p className='text-gray-600'>Solictud para diseño</p>
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span>
                                <p className='text-gray-700 font-medium'>Diseños personalizados</p>
                                <p className='text-gray-600'>Diseño de contenido para redes, impresiones, playeras, etc...</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <DesignModal />
        </>
    )
}
