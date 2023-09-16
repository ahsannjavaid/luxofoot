import React from 'react'
import Navbar from './Header/Navbar'
import Footer from './Footer/Footer'

const Layout = ({ children, onCart }) => {
    return (
        <>
            <Navbar onCart = {onCart}/>
            <main style={{minHeight: "75vh"}}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout