import React, { createContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../../images/logo-color-removebg-preview (1).png'
import programImage from '../../images/programsImageInDashboard3.png'
import dashboardHome from '../../images/dashboardHome.png'
import group from '../../images/group.png'
import islamicImg from '../../images/ramadan.png'
import mediaImg from '../../images/social-media.png'
import settingImg from '../../images/settings.png'
import style from './Admin.module.scss'

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

    const [openMonotheism, setOpenMonotheism] = useState(false)

    const [openShahadah, setOpenShahadah] = useState(false)
    const [openPrayer, setOpenPrayer] = useState(false)
    const [openSawm, setOpenSawm] = useState(false)
    const [openZakat, setOpenZakat] = useState(false)
    const [openHaij, setOpenHaij] = useState(false)

    const [open2, setOpen2] = useState(false);
    const [openFaithBook, setOpenFaithBook] = useState(false)
    const [openFaithBlog, setOpenFaithBlog] = useState(false)

    const [openIslam, setOpenIslam] = useState(false)
    const [openNews, setOpenNews] = useState(false)

    const [openPrograms, setOpenPrograms] = useState(false)
    const [addProgramsOpen, setAddProgramsOpen] = useState(false)
    const [addCategoryOpen, setAddCategoryOpen] = useState(false)
    const [addProgramOpen, setAddProgramOpen] = useState(false)
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    const [isProgramsOpen, setIsProgramsOpen] = useState(false)

    const [openProgram, setOpenProgram] = useState(false)

    useEffect(() => {
        const isMonotheismActive = location.pathname.startsWith('/en/monotheism');
        setOpenMonotheism(isMonotheismActive)
        const isEditActive = location.pathname.startsWith('/edit');
        const isIslamActive = location.pathname.startsWith('/en/islam');
        setOpenIslam(isIslamActive)
        const isNewsActive = location.pathname.startsWith('/en/news')
        setOpenNews(isNewsActive)
        if (isMonotheismActive || isEditActive || isIslamActive || isNewsActive) {
            setOpen3(true);
        } else {
            setOpen3(false);
        }
    
        const isPillarsActive = location.pathname.startsWith('/en/pillars');
        if (isPillarsActive) {
            setOpen4(true);
            setOpen3(true)
        } else {
            setOpen4(false);
        }
    
        const isFaithActive = location.pathname.startsWith('/en/faith');
        if (isFaithActive) {
            setOpen2(true);
            setOpen3(true)
        } else {
            setOpen2(false);
        }

        const isShahadahActive = location.pathname.startsWith('/en/pillars/shahadah');
        setOpenShahadah(isShahadahActive);
        const isPrayerActive = location.pathname.startsWith('/en/pillars/prayer');
        setOpenPrayer(isPrayerActive);
        const isSawmActive = location.pathname.startsWith('/en/pillars/sawm');
        setOpenSawm(isSawmActive);
        const isZakatActive = location.pathname.startsWith('/en/pillars/zakat');
        setOpenZakat(isZakatActive);
        const isHaijActive = location.pathname.startsWith('/en/pillars/haij');
        setOpenHaij(isHaijActive);
    
        const isBookFaithActive = location.pathname.startsWith("/en/faith/book");
        setOpenFaithBook(isBookFaithActive)
        const isBlogFaithActive = location.pathname.startsWith("/en/faith/blog");
        setOpenFaithBlog(isBlogFaithActive)

        const isAddProgramsOpen = location.pathname.startsWith("/en/add-programs")

        if ( isAddProgramsOpen ) {
            setIsProgramsOpen(true)
        } else {
            setIsProgramsOpen(false)
        }

        const isAddCategoryActive = location.pathname.startsWith("/en/add-programs/categories/create")

        const isAddProgramActive = location.pathname.startsWith("/en/add-programs/program/create")

        if ( isAddCategoryActive || isAddProgramActive ) {
            setOpenPrograms(true)
            setAddProgramsOpen(true)
        } else {
            setOpenPrograms(false)
            setAddProgramsOpen(false)
        }

        if ( isAddCategoryActive ) {
            setAddCategoryOpen(true)
        } else {
            setAddCategoryOpen(false)
        }

        if ( isAddProgramActive ) {
            setAddProgramOpen(true)
        } else {
            setAddProgramOpen(false)
        }

        const isProgramOpen = location.pathname.startsWith("/en/programs/")

        if ( isProgramOpen ) {
            setOpenProgram(true)
        } else {
            setOpenProgram(false)
        }

    }, [location]);

    const programCategories = JSON.parse(localStorage.getItem('programData')) || []

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
                        
                            <span className={` ${style.profileName}`}>a</span>
                        
                        </div>
                    
                    </div>
                
                </div>
        
                <div className={` ${style.pageBodyWrapper}`}>
                
                    <div className={`${!openMenu ? ` ${style.SidebarWrapper} ` : `${style.SidebarWrapper}`}  ${theme === 'dark' ?  ` ${style.SidebarWrapperDarkMode} ` : ` ${style.SidebarWrapper} `}  `}>
                    
                        <div className={`${style.sidebarLogo}`}>
                        
                            <Link className='d-flex align-items-center text-decoration-none' to='/en/dashboard'><img src={logo} alt="logo" loading='lazy' width={100}/><i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i></Link>
                        
                            <i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i>
                        
                        </div>
                    
                        <nav className={`${style.sidebarMain}`}>
                        
                            <ul className={`${style.sidebarLinks}`}>
                            
                                <li><NavLink to='dashboard' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><img src={dashboardHome} className={style.headTitleImg} alt='dashboard-home-image' loading='lazy'/> dashboard</NavLink></li>
                            
                                <li>
                                
                                    {/* <NavLink to='' onClick={ ()=> {setOpen(!open)} } className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }} ><i className="fa-solid fa-user-group"></i> users <i className={` ${style.menu} ${open ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></NavLink> */}
                                
                                    <h3 onClick={ ()=> {setOpen(!open)} } className={`${style.link} `} ><img src={group} className={style.headTitleImg} alt="teamwork-image" loading='lazy' /> users <i className={` fa-solid fa-angle-right ${style.menu} ${ open ? style.rotateArrow : '' }`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open ? `${style.active}`: `${style.inactive}` } `}>
                                    
                                        <li><NavLink to='user/create' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover}  ` : ` ${style.linkTransparent}`)) }}>add user</NavLink></li>
                                    
                                        <li><NavLink to='all/users' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}>all users</NavLink></li>
                                    
                                        <li><NavLink to='user/role' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}>role</NavLink></li>
                                    
                                    </ul>
                                
                                </li>
                            
                                <li>
                                
                                    <h3 onClick={ ()=> {setOpen3(!open3)} } className={`${style.link}`} ><img src={islamicImg} className={style.headTitleImg} alt="islamic-image" loading='lazy' /> islamic <i className={` fa-solid fa-angle-right ${style.menu} ${ open3 ? style.rotateArrow : '' }`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open3 ? `${style.active}`: `${style.inactive}` } `}>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openMonotheism ? style.linkHover : style.linkTransparent}`}><NavLink to='monotheism/create/topic' className={({ isActive }) => {const isMonotheismActive = location.pathname.startsWith('/en/monotheism'); return `text-white`;}}><span>Monotheism</span></NavLink></li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen4(!open4)} } className={`${style.link}`} >Pillars <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open4 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${openShahadah ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/shahadah/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><span> - Shahadah</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openPrayer ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/prayer/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><span> - Prayer</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openSawm ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/sawm/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><span> - Sawm</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openZakat ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/zakat/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><span> - Zakat</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openHaij ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/haij/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><span> - Haij</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen2(!open2)} } className={`${style.link}`} >Faith <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open2 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${openFaithBook ? style.linkHover : style.linkTransparent}`}><NavLink to='faith/book/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/book'); return `text-white`;}}><span> - Book</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openFaithBlog ? style.linkHover : style.linkTransparent}`}><NavLink to='faith/blog/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/blog'); return `text-white`;}}><span> - Blog</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openIslam ? style.linkHover : style.linkTransparent}`}><NavLink to='islam/create' className={({isActive}) => {const isIslamActive = location.pathname.startsWith('/en/islam'); return ( ` text-white `) }}><span>About Islam</span></NavLink></li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openNews ? style.linkHover : style.linkTransparent}`}><NavLink to='news/create' className={({isActive}) => {const isNewsActive = location.pathname.startsWith('/en/news'); return ( ` text-white `) }}><span>News</span></NavLink></li>

                                    </ul>
                                
                                </li>
                            
                                <li>

                                <h3 onClick={ ()=> {setOpenPrograms(!openPrograms)} } className={`${style.link} ${ isProgramsOpen ? style.linkHover : '' } `} ><img src={programImage} className={style.headTitleImg} alt="programs-image" loading='lazy ' /> programs <i className={` fa-solid fa-angle-right ${style.menu} ${ openPrograms ? style.rotateArrow : '' }`}></i></h3>
                                
                                <ul className={`${style.sidebarSubmenu} ${openPrograms ? `${style.active} `: `${style.inactive}` } `}>
                                
                                    <li>
                                    
                                        <h3 onClick={ ()=> {setAddProgramsOpen(!addProgramsOpen)} } className={`${style.link} ${ isProgramsOpen ? style.linkHover : '' } `} >Add <i className={` fa-solid fa-angle-right ${style.menu} ${ addProgramsOpen ? style.rotateArrow : '' }`}></i></h3>
                                    
                                        <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${addProgramsOpen ? `${style.active}`: `${style.inactive}` } `}>

                                            <li className={`${style.topicIcon} ${style.link} ${addCategoryOpen ? style.linkHover : style.linkTransparent}`}><NavLink to='add-programs/categories/create' className={({ isActive }) => {const isAddCategoryActive = location.pathname.startsWith('/en/add-programs/categories/create'); return `text-white`;}}><span> - Add Category</span></NavLink></li>

                                            <li className={`${style.topicIcon} ${style.link} ${addProgramOpen ? style.linkHover : style.linkTransparent}`}><NavLink to='add-programs/program/create' className={({ isActive }) => {const isAddProgramActive = location.pathname.startsWith('/en/add-programs/program/create'); return `text-white`;}}><span> - Add Program</span></NavLink></li>

                                        </ul>
                                    
                                    </li>

                                    <li>
                                    
                                        <h3 onClick={ ()=> {setCategoriesOpen(!categoriesOpen)} } className={`${style.link}`} >Categories <i className={` ${style.menu} ${categoriesOpen ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                    
                                        <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${categoriesOpen ? `${style.active}`: `${style.inactive}` } `}>

                                            { programCategories.length > 1 ? programCategories.map( (data, index) => (
                                            
                                            // <>
                                            
                                                <li key={index} className={`${style.topicIcon} ${style.link} ${openProgram ? style.linkHover : style.linkTransparent}`}><NavLink to={`programs/${data.title}`} className={({ isActive }) => {const isProgramActive = location.pathname.startsWith(`/en/programs/${data.title}`); return `text-white`;}}><span> - {data.title}</span></NavLink></li>
                                            
                                            // </>
                                        
                                        )) : '' }

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
