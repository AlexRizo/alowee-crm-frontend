import { NavLink } from "react-router-dom"

export const SelectRequest = ({ children, title, subTitle, shortDesc, longDesc }) => {
    return (
        <NavLink to={'/requests/new-event'} className='bg-gray-600 w-96 hover:bg-gray-700 transition rounded shadow'>
            <div className="p-7 w-full flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div>
                        { children }
                    </div>
                    <span>
                        <p className='text-2xl mb-1 text-white font-medium'>{ title }</p>
                        <p className='text-gray-300/90'>{ shortDesc }</p>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span>
                        <p className='mb-1 text-white font-medium'>{ subTitle }</p>
                        <p className='text-gray-300/90'>{ longDesc }</p>
                    </span>
                </div>
            </div>
        </NavLink>
    )
}