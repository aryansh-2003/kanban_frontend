import React, { useContext } from 'react'
import { Header } from '../components'
import { Outlet } from 'react-router'
import HeaderContext from "../components/context/HeaderContext";

function Layout() {

  const { sidebarOpen } = useContext(HeaderContext);
  
  return (
    <div>
        <Header/>
        <div className=' flex flex-col pt-10'>
        <div className=''>
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Layout