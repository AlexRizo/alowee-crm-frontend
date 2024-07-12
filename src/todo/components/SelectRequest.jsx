import { NavLink } from "react-router-dom"

export const SelectRequest = ({ children, url = '/', color = 'teal', title, subTitle, shortDesc, longDesc }) => {
    return (
        <NavLink to={ url } className={`w-96 bg-white hover:scale-105 hover:shadow-xl transition rounded shadow`}>
            <div className="p-7 w-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="p-4 border border-gray-400 rounded-full">
                        { children }
                    </div>
                    <span>
                        <p className='text-2xl mb-1 text-gray-700 font-medium'>{ title }</p>
                        <p className='text-gray-600'>{ shortDesc }</p>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span>
                        <p className='text-gray-700 font-medium'>{ subTitle }</p>
                        <p className='text-gray-600'>{ longDesc }</p>
                    </span>
                </div>
            </div>
        </NavLink>
    )
}