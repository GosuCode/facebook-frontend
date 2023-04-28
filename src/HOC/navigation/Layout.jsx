import React from 'react'
import Navbar from '../../component/toolbar/Navbar'

const Layout = ({ children }) => {
    return (
        <div>

            <Navbar />
            {children}
        </div>
    )
}

export default Layout
