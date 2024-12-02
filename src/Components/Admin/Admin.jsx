import React, { createContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../../images/logo-color-removebg-preview (1).png'
// import logo from '../../images/programs-logo1.png'
import programImage from '../../images/programsImageInDashboard3.png'
import dashboardHome from '../../images/dashboardHome.png'
import chat from '../../images/chat.png'
import group from '../../images/group.png'
import islamicImg from '../../images/ramadan.png'
import pagesImg from '../../images/landing-page.png'
import mediaImg from '../../images/social-media.png'
import settingImg from '../../images/settings.png'
import profileUser from '../../images/manager.png'
import { v4 as uuid } from 'uuid'
import style from './Admin.module.scss'
import axios from 'axios'

export const ThemeContext = createContext(null)

export default function Admin() {
    let [open, setOpen] = useState(false)

    let [open3, setOpen3] = useState(false)

    const [openMenu, setOpenMenu] = useState(false)

    const [theme, setTheme] = useState('light')

    function toggleTheme() {
        setTheme((curr) => (curr === 'light' ? 'dark': 'light' ) )
    }

    const location = useLocation();

    const [open4, setOpen4] = useState(false)

    const [open2, setOpen2] = useState(false);

    const [openPrograms, setOpenPrograms] = useState(false)
    const [addProgramsOpen, setAddProgramsOpen] = useState(false)
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    const [isProgramsOpen, setIsProgramsOpen] = useState(false)

    const [architectureOpen, setArchitectureOpen] = useState(false)

    const [structureOpen, setStructureOpen] = useState(false)

    const [dentalOpen, setDentalOpen] = useState(false)

    const [englishMaterialOpen, setEnglishMaterialOpen] = useState(false)

    const [englishSoftwareOpen, setEnglishSoftwareOpen] = useState(false)

    const [englishCDSOpen, setEnglishCDSOpen] = useState(false)

    const [islamicCDSOpen, setIslamicCDSOpen] = useState(false)

    const [islamicMaterialOpen, setIslamicMaterialOpen] = useState(false)

    const [differentOpen, setDifferentOpen] = useState(false)

    const [pagesOpen, setPagesOpen] = useState(false)

    const [islamicPagesOpen, setIslamicPagesOpen] = useState(false)

    const [programsPagesOpen, setProgramsPagesOpen] = useState(false)

    useEffect(() => {
        if (location.pathname.startsWith('/en/islamic')) {
            setOpen3(true)
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setOpen(false);
            setPagesOpen(false)
        } else  {
            setOpen3(false)
        }
    
        const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars');
        if (isPillarsActive) {
            setOpen4(true);
            setOpen3(true);
            setOpen2(false);
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setPagesOpen(false)
        } else {
            setOpen4(false);
        }
    
        const isFaithActive = location.pathname.startsWith('/en/islamic/faith');
        if (isFaithActive) {
            setOpen2(true);
            setOpen3(true);
            setOpen4(false);
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setPagesOpen(false)
        } else {
            setOpen2(false);
        }

        const isAddProgramsOpen = location.pathname.startsWith("/en/add-programs")

        const isProgramOpen = location.pathname.startsWith("/en/programs/")

        if ( isAddProgramsOpen || isProgramOpen ) {
            setIsProgramsOpen(true)
            setOpenPrograms(true)
            setOpen3(false);
            setOpen(false);
        } else {
            setIsProgramsOpen(false)
            setOpenPrograms(false)
        }

        if (isAddProgramsOpen) {
            setCategoriesOpen(false)
        } else if (isProgramOpen) {
            setAddProgramsOpen(false)
        }

        if (location.pathname.startsWith('/en/add-programs')) {
            setOpenPrograms(true);
            setAddProgramsOpen(true);
        } else if (location.pathname.startsWith('/en/programs')) {
            setOpenPrograms(true);
            setCategoriesOpen(true);
        } else {
            setOpenPrograms(false);
            setAddProgramsOpen(false);
            setCategoriesOpen(false);
        }

        if (location.pathname.startsWith('/en/user')) {
            setOpen(true)
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setOpen3(false);
        } else  {
            setOpen(false)
        }

        if (open) {
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setOpen3(false);
        } else if (open3) {
            setIsProgramsOpen(false)
            setOpenPrograms(false)
            setOpen(false);
        } else if (isProgramsOpen) {
            setOpen(false);
            setOpen3(false)
        }

    }, [location.pathname]);

    // const programCategories = JSON.parse(localStorage.getItem('programData')) || []

    const [programs, setPrograms] = useState([])

    const userToken = localStorage.getItem('accessToken')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!userToken) {
            showToast("No access token found. Please log in again.", 'error');
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [userToken]);    

    useEffect( () => {

        const fetchPrograms = async () => {
            try {
            
                const response = await fetch('http://147.79.101.225:2859/api/programs/', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status:`);
                }
            
                const data = await response.json()

                setPrograms(data.Programs)            
            } catch {
                showToast("Error in fetching programs.", 'error')
            }
        }

        fetchPrograms()

        const interval = setInterval(fetchPrograms, 5000);

        return () => clearInterval(interval);

    }, [] )

    const [toasts, setToasts] = useState([]);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        const newToast = { id: uuid(), message, type };
    
        setToasts((prevToasts) => [...prevToasts, newToast]);
    
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000);
    };

    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    // Logout User 
    const logoutUser = async (e) => {
        e.preventDefault();
    
        try {

            const response = await axios.post('http://147.79.101.225:2859/api/auth/logout')

            if (response.status === 200 || response.status === 201) {
                localStorage.removeItem('userIn');
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('accessToken');
                // setTimeout(() => {
                    window.location.href = '/'
                // }, 2000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const profileUserRef = useRef(null)
    const [isProfileUserActive, setIsProfileUserActive] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileUserRef.current && !profileUserRef.current.contains(event.target)) {
                setIsProfileUserActive(false)
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <p className={`${style.loading} ${style.section}`}>No access token found. Please log in again. <span className={style.loader}></span></p>; 
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            
            <div className={` ${style.pageWrapper} ${theme === 'dark' ? ` ${style.dark} ` : ` ${style.light} `} `}>
            
                <div className={`${style.pageHeader}`}>
                
                    <div className={`${style.headerWrapper} ${theme === 'dark' ?  ` ${style.dark} ` : ` ${style.light} `} `}>
                    
                        <div className={`${style.logo_Search}`}>
                        
                            <div className={`d-flex w-75 ${style.search} ${style.input}`}>
                            
                                <input type="text" placeholder='search cleana...' className={`form-control py-2 border-end-none`} />
                            
                                <button className={`btn btn-warning text-white ${style.searchIcon}`}><i className="fa-solid fa-magnifying-glass"></i></button>
                            
                            </div>
                        
                        </div>
                    
                        <div className={`d-flex align-items-center gap-3 fs-5 mx-3 ${style.quickIcons}`}>
                        
                            <div className={`${style.darkTheme}`}>
                            
                                <div className="box">
                                    <label htmlFor="switch" className={`${style.toggle}`}>
                                        <input type="checkbox" className={`${style.input}`} id={`${style.switch}`} />
                                        <div className={`${style.icon} ${style.iconMoon}`} onClick={toggleTheme} >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="32"
                                            height="32"
                                        >
                                            <path
                                            fillRule="evenodd"
                                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                                            clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        </div>

                                        <div className={`${style.icon} ${style.iconSun}`} onClick={toggleTheme} >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            width="32"
                                            height="32"
                                        >
                                            <path
                                            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                                            ></path>
                                        </svg>
                                        </div>
                                    </label>
                                </div>

                            
                            
                            </div>
                        
                        </div>
            
                        <div className={`d-flex flex-end  ${style.profile}`}>
                        
                            {/* <i className="fa-solid fa-circle-user"></i> */}
                        
                            {/* <span className={` ${style.profileName}`}>a</span> */}
                        
                            <div className={style.right}>

                                <div ref={profileUserRef} onClick={ () => setIsProfileUserActive(prevState => !prevState) } className={style.profileUser}>

                                    <img src={profileUser} width={40} alt="profile-user" loading='lazy' />

                                    <ul className={`${isProfileUserActive ? style.active : ''}`}>

                                        <li><h4><i className="fa-regular fa-user"></i> {user.details.name}</h4></li>

                                        <li><h4><i className="fa-regular fa-envelope"></i> {user.details.email}</h4></li>

                                        <li>
                                        
                                            <button type='submit' onClick={logoutUser} className={style.logoutBtn}>
                                        
                                                <div className={style.sign}>
                                                
                                                    <svg viewBox="0 0 512 512">
                                                    
                                                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                                    
                                                    </svg>
                                                
                                                </div>
                                        
                                                <div className={style.textBtn}>Logout</div>
                                        
                                            </button>
                                        
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>
                    
                    </div>
                
                </div>
        
                <div className={` ${style.pageBodyWrapper}`}>
                
                    <div className={`${!openMenu ? ` ${style.SidebarWrapper} ` : `${style.SidebarWrapper} ${style.widthSidebarBig}`}  ${theme === 'dark' ?  ` ${style.SidebarWrapperDarkMode} ` : ` ${style.SidebarWrapper} `}  `}>
                    
                        <div className={`${style.sidebarLogo}`}>
                        
                            <Link className='d-flex align-items-center text-decoration-none' to='/en/dashboard'><img src={logo} alt="logo" loading='lazy' width={100}/><i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i></Link>
                        
                            <i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i>
                        
                        </div>
                    
                        <nav className={`${style.sidebarMain}`}>
                        
                            <ul className={`${style.sidebarLinks}`}>
                            
                                <li><NavLink to='dashboard' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><img src={dashboardHome} className={style.headTitleImg} alt='dashboard-home-image' loading='lazy'/> dashboard</NavLink></li>
                            
                                <li>
                                
                                    <h3 onClick={ ()=> {setOpen(!open); setOpen3(false); setIsProgramsOpen(false); setOpenPrograms(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/user') ? style.linkHover : '' } `} ><img src={group} className={style.headTitleImg} alt="teamwork-image" loading='lazy' /> users <i className={` fa-solid fa-angle-right ${style.menu} ${ open ? style.rotateArrow : '' }`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open ? `${style.active}`: `${style.inactive}` } `}>

                                        <h3 className={`d-none ${style.link} ${style.justTitle}  ${style.linkHover} `} > users <i className={` fa-solid fa-angle-right ${style.menu} ${style.rotateArrow}`}></i></h3>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/user/all-users`) ? style.linkHover : style.linkTransparent}`}><NavLink to='user/all-users' className={({ isActive }) => {const isAllUserActive = location.pathname.startsWith('/en/user/all-user'); return `text-white`;}}><span>all users</span> </NavLink></li>

                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/user/approve-user`) ? style.linkHover : style.linkTransparent}`}><NavLink to='user/approve-user' className={({ isActive }) => {const isApprovedUserActive = location.pathname.startsWith('/en/user/approve-user'); return `text-white`;}}> <span>approve user</span> </NavLink></li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/user/user-role`) ? style.linkHover : style.linkTransparent}`}><NavLink to='user/user-role' className={({ isActive }) => {const isUserRoleActive = location.pathname.startsWith('/en/user/user-role'); return `text-white`;}}> <span>role</span> </NavLink></li>
                                    
                                    </ul>
                                
                                </li>

                                <li><NavLink to='chat' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><img src={chat} className={style.headTitleImg} alt='chat-image' loading='lazy'/> chat</NavLink></li>
                            
                                <li>
                                
                                    <h3 onClick={ ()=> {setOpen3(!open3); setOpen(false); setIsProgramsOpen(false); setOpenPrograms(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/islamic') ? style.linkHover : '' }`} ><img src={islamicImg} className={style.headTitleImg} alt="islamic-image" loading='lazy' /> islamic <i className={` fa-solid fa-angle-right ${style.menu} ${ open3 ? style.rotateArrow : '' }`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open3 ? `${style.active}`: `${style.inactive}` } `}>
                                    
                                        <h3 className={`d-none ${style.link} ${style.justTitle}  ${style.linkHover}`} > islamic <i className={` fa-solid fa-angle-right ${style.menu} ${style.rotateArrow}`}></i></h3>

                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/monotheism`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/monotheism/create/topic' className={({ isActive }) => {const isMonotheismActive = location.pathname.startsWith('/en/islamic/monotheism'); return `text-white`;}}><span>Monotheism</span></NavLink></li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen4(!open4); setOpen2(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/islamic/pillars') ? style.linkHover : '' }`} >Pillars <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open4 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/pillars/shahadah`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/pillars/shahadah/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars/shahadah'); return `text-white`;}}><span> - Shahadah</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/pillars/prayer`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/pillars/prayer/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars/prayer'); return `text-white`;}}><span> - Prayer</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/pillars/sawm`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/pillars/sawm/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars/sawm'); return `text-white`;}}><span> - Sawm</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/pillars/zakat`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/pillars/zakat/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars/zakat'); return `text-white`;}}><span> - Zakat</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/pillars/haij`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/pillars/haij/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/islamic/pillars/haij'); return `text-white`;}}><span> - Haij</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen2(!open2); setOpen4(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/islamic/faith') ? style.linkHover : '' }`} >Faith <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open2 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/faith/book`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/faith/book/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/book'); return `text-white`;}}><span> - Book</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/faith/blog`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/faith/blog/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/blog'); return `text-white`;}}><span> - Blog</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/islam`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/islam/create' className={({isActive}) => {const isIslamActive = location.pathname.startsWith('/en/islam'); return ( ` text-white `) }}><span>About Islam</span></NavLink></li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/islamic/news`) ? style.linkHover : style.linkTransparent}`}><NavLink to='islamic/news/create' className={({isActive}) => {const isNewsActive = location.pathname.startsWith('/en/news'); return ( ` text-white `) }}><span>News</span></NavLink></li>

                                    </ul>
                                
                                </li>
                            
                                <li>

                                <h3 onClick={ ()=> {setOpenPrograms(!openPrograms); setOpen3(false); setOpen(false)} } className={`${style.link} ${ isProgramsOpen ? style.linkHover : '' } `} ><img src={programImage} className={style.headTitleImg} alt="programs-image" loading='lazy ' /> programs <i className={` fa-solid fa-angle-right ${style.menu} ${ openPrograms ? style.rotateArrow : '' }`}></i></h3>
                                
                                <ul className={`${style.sidebarSubmenu} ${openPrograms ? `${style.active} `: `${style.inactive}` } `}>
                                
                                    <h3 className={`d-none ${style.link} ${style.justTitle} ${style.linkHover} `} > programs <i className={` fa-solid fa-angle-right ${style.menu} ${style.rotateArrow}`}></i></h3>

                                    <li>
                                    
                                        <h3 onClick={ ()=> {setAddProgramsOpen(!addProgramsOpen); setCategoriesOpen(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/add-programs/') ? style.linkHover : '' } `} >Add <i className={` fa-solid fa-angle-right ${style.menu} ${ addProgramsOpen ? style.rotateArrow : '' }`}></i></h3>
                                    
                                        <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${addProgramsOpen ? `${style.active}`: `${style.inactive}` } `}>

                                            {/* <li className={`${style.topicIcon} ${style.link} ${addCategoryOpen ? style.linkHover : style.linkTransparent}`}><NavLink to='add-programs/categories/create' className={({ isActive }) => {const isAddCategoryActive = location.pathname.startsWith('/en/add-programs/categories/create'); return `text-white`;}}><span> - Add Category</span></NavLink></li> */}

                                            <li className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith('/en/add-programs/program/create') ? style.linkHover : style.linkTransparent}`}><NavLink to='add-programs/program/create' className={({ isActive }) => {const isAddProgramActive = location.pathname.startsWith('/en/add-programs/program/create'); return `text-white`;}}><span> - Add Program</span></NavLink></li>

                                        </ul>
                                    
                                    </li>

                                    <li>
                                    
                                        <h3 onClick={ ()=> {setCategoriesOpen(!categoriesOpen); setAddProgramsOpen(false)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/') ? style.linkHover : '' } `}>Categories <i className={` ${style.menu} ${categoriesOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                    
                                        <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${categoriesOpen ? `${style.active}`: `${style.inactive}` } `}>

                                            <li>

                                                <h3 onClick={ ()=> {setArchitectureOpen(!architectureOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Architecture-Software') ? style.linkHover : '' } `} >Architecture software <i className={` ${style.menu} ${architectureOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${architectureOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'Architecture-Software' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setStructureOpen(!structureOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Structure-Software') ? style.linkHover : '' } `} >Structure software <i className={` ${style.menu} ${structureOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${structureOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'Structure-Software' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setDentalOpen(!dentalOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Dental-software') ? style.linkHover : '' } `} >Dental software <i className={` ${style.menu} ${dentalOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${dentalOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'Dental-Software' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setEnglishMaterialOpen(!englishMaterialOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/English-Material') ? style.linkHover : '' } `} >English Material <i className={` ${style.menu} ${englishMaterialOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${englishMaterialOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'English-Material' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setEnglishSoftwareOpen(!englishSoftwareOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/English-Software') ? style.linkHover : '' } `} >English Software <i className={` ${style.menu} ${englishSoftwareOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${englishSoftwareOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'English-Software' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setEnglishCDSOpen(!englishCDSOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/English-CDS') ? style.linkHover : '' } `} >English CDS <i className={` ${style.menu} ${englishCDSOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${englishCDSOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (

                                                        data.programCategory === 'English-CDS' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setIslamicCDSOpen(!islamicCDSOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Islamic-CDS') ? style.linkHover : '' } `} >Islamic CDS <i className={` ${style.menu} ${islamicCDSOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${islamicCDSOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (

                                                        data.programCategory === 'Islamic-CDS' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setIslamicMaterialOpen(!islamicMaterialOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Islamic-Material') ? style.linkHover : '' } `} >Islamic Material <i className={` ${style.menu} ${islamicMaterialOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${islamicMaterialOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'Islamic-Material' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            <li>

                                                <h3 onClick={ ()=> {setDifferentOpen(!differentOpen)} } className={`${style.link} ${ location.pathname.startsWith('/en/programs/Different') ? style.linkHover : '' } `} >Different <i className={` ${style.menu} ${differentOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>

                                                <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${differentOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                    { programs.length > 1 ? programs.map( (data, index) => (
                                                
                                                        data.programCategory === 'Different' ? (
                                                            <li key={index} className={`${style.topicIcon} ${style.link} ${location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`) ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.programCategory}/${data._id}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.programCategory}/${data._id}`); return `text-white`;}}><span> - {data.programName}</span></NavLink></li>
                                                        ) : '' 
                                                    
                                                    )) : '' }

                                                </ul>

                                            </li>

                                            {/* { programCategories.length > 1 ? programCategories.map( (data, index) => (
                                            
                                                <li key={index} className={`${style.topicIcon} ${style.link} ${openProgram ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.title}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.title}`); return `text-white`;}}><span> - {data.title}</span></NavLink></li>
                                            
                                            )) : '' } */}

                                        </ul>
                                    
                                    </li>

                                </ul>

                                </li>

                                <li>
                                
                                    <h3 onClick={ ()=> {setPagesOpen(!pagesOpen); setOpen(false); setOpen3(false); setIsProgramsOpen(false); setOpenPrograms(false)} } className={`${style.link} ${ pagesOpen ? style.linkHover : '' } `} ><img src={pagesImg} className={style.headTitleImg} alt="teamwork-image" loading='lazy' /> pages <i className={` fa-solid fa-angle-right ${style.menu} ${ pagesOpen ? style.rotateArrow : '' }`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${pagesOpen ? `${style.active}`: `${style.inactive}` } `}>

                                        <h3 className={`d-none ${style.link} ${style.justTitle}  ${style.linkHover} `} > pages <i className={` fa-solid fa-angle-right ${style.menu} ${style.rotateArrow}`}></i></h3>
                                    
                                        <li>

                                            <h3 onClick={ ()=> {setIslamicPagesOpen(!islamicPagesOpen); setProgramsPagesOpen(false); setOpen(false); setOpen3(false); setIsProgramsOpen(false); setOpenPrograms(false)} } className={`${style.link} ${ islamicPagesOpen ? style.linkHover : '' } `} > islamic <i className={` fa-solid fa-angle-right ${style.menu} ${ islamicPagesOpen ? style.rotateArrow : '' }`}></i></h3>
                                
                                            <ul className={`${style.sidebarSubmenu} ${islamicPagesOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/' target='_blank'><span> - Home page</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/monotheism' target='_blank'><span> - monotheism</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/islam' target='_blank'><span> - islam</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/pillars' target='_blank'><span> - pillars</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/faith' target='_blank'><span> - faith</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/news' target='_blank'><span> - news</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/azanTiming' target='_blank'><span> - azan Timing</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/quran' target='_blank'><span> - Quran</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/azkarCatagories' target='_blank'><span> - azkar</span></NavLink></li>

                                            </ul>

                                        </li>

                                        <li>

                                            <h3 onClick={ ()=> {setProgramsPagesOpen(!programsPagesOpen); setIslamicPagesOpen(false); setOpen(false); setOpen3(false); setIsProgramsOpen(false); setOpenPrograms(false)} } className={`${style.link} ${ programsPagesOpen ? style.linkHover : '' } `} > Programs <i className={` fa-solid fa-angle-right ${style.menu} ${ programsPagesOpen ? style.rotateArrow : '' }`}></i></h3>
                                
                                            <ul className={`${style.sidebarSubmenu} ${programsPagesOpen ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/programs' target='_blank'><span> - Home page</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/programs/category/engineer' target='_blank'><span> - Categories</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/programs/category/engineer' target='_blank'><span> - program</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} `}><NavLink to='/programs/user' target='_blank'><span> - user profile</span></NavLink></li>

                                            </ul>

                                        </li>
                                    
                                    </ul>
                                
                                </li>
                            
                                <li><NavLink to='media' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><img src={mediaImg} className={style.headTitleImg} alt='media-image' loading='lazy' /> media</NavLink></li>
                            
                                <li><NavLink to='setting' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><img src={settingImg} className={style.headTitleImg} alt='media-image' loading='lazy' /> settings</NavLink></li>
                            
                            </ul>
                        
                        </nav>
                    
                    </div>
                
                </div>
            
                <div className={`${style.body} ${theme === 'dark' ? ` ${style.SidebarWrapperDarkMode} `: ` ${style.body} ` } `}>
                
                    <div className={`${style.pageBody} ${theme === 'dark' ? ` ${style.dark} ` : ` ${style.light} ` } `}>
                    
                        <Outlet></Outlet>
                    
                    </div>
                
                </div>
        
                <div className={`${style.pageFooter} ${theme === 'dark' ? ` ${style.dark} `: ` ${style.light} ` }`}>
                
                    <h4>Copyright 2023 © Taw3ya </h4>
                
                </div>
        
            </div>
        
        </ThemeContext.Provider>
    )
}
