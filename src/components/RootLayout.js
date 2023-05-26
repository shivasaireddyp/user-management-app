import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../components/navbar/Navbar"
import Footer from "./footer/Footer"
import "./RootLayout.css"

function RootLayout() {
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className='for-outlet'>
            <Outlet />
        </div>
        <div className='for-footer'>
            <Footer />
        </div>
    </div>
  )
}

export default RootLayout