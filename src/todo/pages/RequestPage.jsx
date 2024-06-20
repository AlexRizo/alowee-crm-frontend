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
                    color="indigo"
                    title="Evento"
                    shortDesc="Solucitud para eventos"
                    subTitle="Cobertura de eventos"
                    longDesc="Cubrir un evento con fotografía y/o video"
                >
                    <NewspaperIcon className="h-10 text-gray-100" />
                </SelectRequest>

                <SelectRequest
                    url="/requests/new-post"
                    color="violet"
                    title="Publicación"
                    shortDesc="Solictud para publicación"
                    subTitle="Publicación en redes"
                    longDesc="Publicación en redes sociales con diseño y contenido personalizado"
                >
                    <DevicePhoneMobileIcon className="h-10 text-gray-100" />
                </SelectRequest>

                <div onClick={ openModal } className="w-96 bg-gray-600 hover:bg-gray-700 transition rounded shadow cursor-pointer">
                    <div className="p-7 w-full flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-4 bg-white/20 rounded-full">
                            <PaintBrushIcon className="h-10 text-gray-100" />
                            </div>
                            <span>
                                <p className='text-2xl mb-1 text-white font-medium'>Diseño</p>
                                <p className='text-gray-200'>Solictud para diseño</p>
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span>
                                <p className='text-white font-medium'>Diseños personalizados</p>
                                <p className='text-gray-200'>Diseño de contenido para redes, impresiones, playeras, etc...</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <DesignModal />
        </>
    )
}
