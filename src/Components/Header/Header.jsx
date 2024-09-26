import React, { useState } from 'react'
import logo from '../../images/logo-color-removebg-preview (1).png'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'

export default function Header() {

    // change Navbar color when scrolling down
    const [navbarColor, setNavbarColor] = useState(false)

    function changeNavbarColor() {
        if(window.scrollY >= 90) {
            setNavbarColor(true)
        } else {
            setNavbarColor(false)
        }
    }

    window.addEventListener("scroll", changeNavbarColor)

    return (
    
        <header className={style.header}>
        
            <nav className={navbarColor ? `${style.navbar} navbar navbar-expand-lg bg-black` : `${style.navbar} navbar navbar-expand-lg bg-black` }>
            
                <div className="container">
                
                    <div className="d-flex justify-content-between align-items-center w-100">
                    
                        <div className={style.logo}>
                        
                            <Link className="navbar-brand" to='/'><img src={logo} width={100} alt="" /></Link>
                        
                        </div>
                        
                        <ul className="navbar-nav mb-2 mb-lg-0">
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/monotheism'>Monotheism</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/islam'>About</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/pillars'>Pillars</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/faith'>Faith</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/news'>News</NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link"  to='/programs'>Programs</a>
                            </li>
                        
                            {/* <li className="nav-item">
                                <a className="nav-link" to=''>Donation</a>
                            </li> */}
                        
                        </ul>
                    
                        <div className={style.btn}>
                        
                            <form action="" className={style.form}>
                                
                                <button className={style.donateBtn}><i className="fa-solid fa-heart"></i> Donate</button>
                            
                            </form>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </nav>
        
        </header>
    
    )
}
