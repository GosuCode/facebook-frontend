import fbicon from '../assets/fbicon.png'
import { AiFillHome, AiOutlineClose } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { IoMdPhotos } from 'react-icons/io'
import { HiUserGroup } from 'react-icons/hi'
import { SiFacebookgaming } from 'react-icons/si'
import { CgMenuGridO, CgProfile } from 'react-icons/cg'
import { BsMessenger } from 'react-icons/bs'
import { MdNotifications } from 'react-icons/md'
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

    const [openSide, setOpenSide] = useState(false)

    const handleSidebar = () => {
        setOpenSide(!openSide)
    }

    const links = [
        {
            icons: <AiFillHome />,
            path: '/',
            tip: 'Home'
        },
        {
            icons: <FaUserFriends />,
            path: '/posts',
            tip: 'Friends'
        },
        {
            icons: <IoMdPhotos />,
            path: '/createpost',
            tip: 'Photos'
        },
        {
            icons: <HiUserGroup />,
            path: '/',
            tip: 'Group'
        },
        {
            icons: <SiFacebookgaming />,
            path: '/',
            tip: 'Gaming'
        },
    ]

    const links2 = [
        {
            icons: <CgMenuGridO />,
            path: '/',
            tip: 'Menu'
        },
        {
            icons: <BsMessenger />,
            path: '/',
            tip: 'Messenger'
        },
        {
            icons: <MdNotifications />,
            path: '/',
            tip: 'Notification'
        },
        {
            icons: <CgProfile />,
            path: '/login',
            tip: 'Profile'
        },
    ]

    const SidebarData = [
        {
            Name: "home",
            path: '/'
        },
        {
            Name: "login",
            path: '/login '
        },
        {
            Name: "registration",
            path: "/registration"
        },
        {
            Name: "categories",
            path: "/categories"
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
    const navigate = useNavigate()

    //create a logout function where you delete the token from the local storage and navigate to the login page
    const handleLogout = () => {
        window.localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            <div className='grid grid-cols-8 bg-[#1C1E21] items-center text-white py-2 px-4 sticky top-0'>
                <div className='grid grid-cols-2'>
                    <div>
                        <img src={fbicon} alt="" height={40} width={40} />
                    </div>
                    <div>
                        <input type="search" placeholder='search' className='focus:outline-none bg-[#303338] rounded-full px-4 py-2' />
                    </div>
                </div>
                <div className='col-start-3 col-span-4 grid-cols-5 text-3xl flex px-4'>
                    {
                        links.map((val, i) => {
                            return (
                                <Tooltip title={val.tip} key={i}>
                                    <Link to={val.path} className='w-full h-full rounded-md grid justify-center hover:bg-[#303338]'>
                                        <div>
                                            {val.icons}
                                        </div>
                                    </Link>
                                </Tooltip>
                            )
                        })
                    }
                </div>
                <div className='col-start-7 col-span-2 text-2xl'>
                    <div className='flex justify-end gap-5'>
                        {
                            links2.map((val, i) => {
                                return (
                                    <Tooltip title={val.tip} key={i}>
                                        <div className='w-10 h-10 rounded-full items-center grid justify-center bg-[#303338]'
                                            onClick={handleSidebar}>
                                            {val.icons}
                                        </div>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                    <div className={openSide ? 'fixed top-0 right-0 h-full w-[250px] border-r border-l-[#ccc] text-black' : 'fixed right-[-100%]'} >

                        <div
                            className={openSide ? 'fixed right-0 h-full w-[250px] border-r border-l-[#ccc] ' : 'fixed right-[-100%]'}>
                            <div className='bg-white shadow-md h-screen pt-5 px-5 pb-[150px]'>
                                <span className='absolute top-0 right-2 text-black' onClick={handleSidebar}>
                                    {!openSide ? '' : <AiOutlineClose size={40} />}
                                </span>
                                <div className='w-full px-5 h-9'></div>
                                <div>
                                    {
                                        SidebarData.map((val, i) => {
                                            return <div key={i} className='hover:text-[#f79918] py-[5px] px-5 capitalize'><Link to={val.path}>{val.Name}</Link></div>
                                        })
                                    }
                                    <div className='cursor-pointer' onClick={handleLogout}>Logout</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
