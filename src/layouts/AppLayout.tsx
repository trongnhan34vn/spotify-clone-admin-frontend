import React from 'react'
import Header from '../components/Header'
import SidebarWrapper from '../components/SidebarWrapper'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Body */}
      <div className="flex flex-1 gap-2 overflow-hidden p-2">
        {/* Sidebar */}
        <SidebarWrapper />

        {/* Content */}
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout