import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../nav/nav'
import Footer from '../footer/Footer'

export default function Layout({tokenData}) {
  return (
    <>
    <Nav tokenData = {tokenData}/>
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer/>
    </>
  )
}
