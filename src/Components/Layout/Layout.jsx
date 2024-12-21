import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import style from '../Style/Layout/Layout.module.scss'

export default function Layout() {

    const location = useLocation();

    // Check if the current path is '/sign'
    const isSignPage = location.pathname === '/sign';

    // Check if the current path is '/verify-account'
    const isVerifyPage = location.pathname === '/verify-account'

    // Check if the current path is '/forget-password'
    const isForgetPasswordPage = location.pathname === '/forget-password'

    // Check if the current path is '/change-password'
    const isChangePasswordPage = location.pathname === '/reset-password'

    return (
    
        <>
        
            { !isSignPage && !isVerifyPage && !isForgetPasswordPage && !isChangePasswordPage && <Header/> }
        
            <Outlet></Outlet>
        
            { !isSignPage && !isVerifyPage && !isForgetPasswordPage && !isChangePasswordPage && <Footer />}
        
        </>
    
    )
}
