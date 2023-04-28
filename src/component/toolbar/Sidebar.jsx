import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [sideNav, setSideNav] = useState(false)
    const handleSideNav = () => setSideNav(!sideNav)

    const SidebarData = [
        {
            Name: "home",
            path: '/'
        },
        {
            Name: "categories",
            path: "/categories"
        },
        {
            Name: "travel",
            path: "/travel"
        },
        {
            Name: "food",
            path: "/food"
        },
        {
            Name: "technology",
            path: "/technology"
        },
        {
            Name: "business",
            path: "/business"
        }
    ]

    return (
        <>
            <>
            </>
            <div
                className={sideNav ? 'fixed right-0 h-full w-[250px] border-r border-l-[#ccc] ' : 'fixed right-[-100%]'}>
                <div className='bg-white shadow-md h-screen pt-5 px-5 pb-[150px]'>
                    <span className='absolute top-0 right-2 text-black' onClick={handleSideNav}>
                        {!sideNav ? '' : <AiOutlineClose size={40} />}
                    </span>
                    <div className='w-full px-5 h-9'></div>
                    <div>
                        {
                            SidebarData.map((val, i) => {
                                return <div key={i} className='hover:text-[#f79918] py-[5px] px-5 capitalize'><Link to={val.path}>{val.Name}</Link></div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
