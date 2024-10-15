import React, { createContext, useEffect, useState } from 'react'
import style from './Amdin.module.scss'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../../images/logo-color-removebg-preview (1).png'
import monothesismIcon from '../../images/monoIcon.png' 
import shahadahIcon from '../../images/shahadahIcon.png'
import prayerIcon from '../../images/prayerIcon.png'
import sawmIcon from '../../images/sawmIcon.png'
import zakatIcon from '../../images/zakatIcon.png'
import haijIcon from '../../images/haijIcon.png'
import blog from '../../images/blog.png'
import book from '../../images/book.pnh.png'
import news from '../../images/news.png'
import islamIcon from '../../images/islamIcon.png'
import logoWithoutName from '../../images/logo-color-removebg-preview.png'

export const ThemeContext = createContext(null)

export default function Admin() {
    let [open, setOpen] = useState(false)

    let [open3, setOpen3] = useState(false)

    let [list, setList] = useState([
    
        {
        
            id: 0,
        
            title: 'dashboard'
        
        },
    
        {
        
            id: 1,
        
            title: 'add user'
        
        },
    
        {
        
            id: 2,
        
            title: 'all user ',
        
        },
    
        {
        
            id: 3,
        
            title: 'add product',
        
        },
    
        {
        
            id: 4,
        
            title: 'all product',
        
        },
    
        {
        
            id: 5,
        
            title: 'categories',
        
        },
    
        {
        
            id: 6,
        
            title: 'add store',
        
        },
    
        {
        
            id: 7,
        
            title: 'all store',
        
        },
    
        {
        
            id: 8,
        
            title: 'add order',
        
        },
    
        {
        
            id: 9,
        
            title: 'all order',
        
        },
    
        {
        
            id: 10,
        
            title: 'media',
        
        },
    
        {
        
            id: 11,
        
            title: 'pages',
        
        },
    
        {
        
            id: 12,
        
            title: 'shipping',
        
        },
    
        {
        
            id: 13,
        
            title: 'coupons',
        
        },
    
        {
        
            id: 14,
        
            title: 'points',
        
        },
    
        {
        
            id: 15,
        
            title: 'wallet',
        
        },
    
        {
        
            id: 16,
        
            title: 'theme options',
        
        },
    
        {
        
            id: 17,
        
            title: 'setting'
        
        }
    
    ])

    useEffect( () => {
    
        localStorage.setItem('adminSearch', JSON.stringify(list))
    
    })

    const [searchItems, setSearchItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('adminSearch'));
        if (items) {
            setSearchItems(items);
        }
    }, []);

    let fox = [];

    const [display, setDisplay] = useState(false)

    const [box, setBox] = useState(fox)

    const [listLength, setListLength] = useState(0)

    function searchResult(e) {
        let input = e.target.value;
        fox = []
        for ( let i = 0; i < searchItems.length; i++ ) {
        
            if (searchItems[i].title.includes(input.trim().toLowerCase()) === true || searchItems[i].title.includes(input.trim().toUpperCase()) === true) {
                // setBox(searchItems[i])
                fox.push(searchItems[i].title)
                setDisplay(true)
                // setBox(fox)
                console.log(fox);
            }
        
        }
        setBox(fox)
        setListLength(fox.length)
    }

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

    useEffect(() => {
        const isMonotheismActive = location.pathname.startsWith('/en/monotheism');
        const isEditActive = location.pathname.startsWith('/edit');
        const isIslamActive = location.pathname.startsWith('/en/islam');
        const isNewsActive = location.pathname.startsWith('/en/news')
        if (isMonotheismActive || isEditActive || isIslamActive || isNewsActive) {
            setOpen3(true);
            setOpenMonotheism(true)
            setOpenIslam(true)
            setOpenNews(true)
        } else {
            setOpen3(false);
            setOpenMonotheism(false)
            setOpenIslam(false)
            setOpenNews(false)
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

    }, [location]);
    


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            
            <div className={` ${style.pageWrapper} ${theme === 'dark' ? ` ${style.dark} ` : ` ${style.light} `} `}>
            
                <div className={`${style.pageHeader}`}>
                
                    <div className={`${style.headerWrapper} ${theme === 'dark' ?  ` ${style.dark} ` : ` ${style.light} `} `}>
                    
                        <div className={`${style.logo_Search}`}>
                        
                            {/* <div className={`${style.Menu}`}>
                            
                                <i onClick={ () => {setOpenMenu(!openMenu)} } className="fa-solid fa-bars text-dark" role='button'></i>
                            
                            </div> */}
                        
                            {/* <div className={`${style.headerLogo}`}>
                            
                                <Link to='/en/dashboard' className='text-decoration-none d-flex justify-content-between align-items-center' ><img src={logoWithoutName} alt="" width={50} /></Link>
                            
                            </div> */}
                        
                            <div className={`d-flex w-75 ${style.search} ${style.input}`}>
                            
                                <input onKeyUp={searchResult} type="text" placeholder='search cleana...' className={`form-control py-2 border-end-none`} />
                            
                                <button className={`btn btn-warning text-white ${style.searchIcon}`}><i className="fa-solid fa-magnifying-glass"></i></button>
                                
                                
                                { listLength > 0 ? <div className={ display ?  `${style.searchResult}` : 'd-none' }>
                                    
                                    {box.map((x, index) => 
                                        
                                        
                                        
                                            <Link to='' key={index} className={`text-capitalize ${style.linkSearch}`}>{x}</Link>
                                        
                                        
                                        
                                        )}</div> : ''
                                
                                }
                            
                                
                            
                            </div>
                        
                        </div>
                    
                        <div className={`d-flex align-items-center gap-3 fs-5 mx-3 ${style.quickIcons}`}>
                        
                            {/* <div className={`fs-4 ${style.language}`}>
                            
                                <i className="fa-solid fa-language"></i>
                            
                            </div> */}
                        
                            {/* <div className={`${style.notifications}`}>
                            
                                <i className="fa-solid fa-bell"></i>
                            
                            </div> */}
                        
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
                        
                            <Link className='d-flex align-items-center text-decoration-none' to='/en/dashboard'><img src={logo} alt="" width={100}/><i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i></Link>
                        
                            <i onClick={ () => {setOpenMenu(!openMenu)} } className={`fa-solid fa-bars text-white ${style.Menu} `}></i>
                        
                        </div>
                    
                        <nav className={`${style.sidebarMain}`}>
                        
                            <ul className={`${style.sidebarLinks}`}>
                            
                                <li><NavLink to='dashboard' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><i className="fa-solid fa-house"></i> dashboard</NavLink></li>
                            
                                <li>
                                
                                    {/* <NavLink to='' onClick={ ()=> {setOpen(!open)} } className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }} ><i className="fa-solid fa-user-group"></i> users <i className={` ${style.menu} ${open ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></NavLink> */}
                                
                                    <h3 onClick={ ()=> {setOpen(!open)} } className={`${style.link} `} ><i className="fa-solid fa-user-group"></i> users <i className={` ${style.menu} ${open ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open ? `${style.active}`: `${style.inactive}` } `}>
                                    
                                        <li><NavLink to='user/create' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover}  ` : ` ${style.linkTransparent}`)) }}>add user</NavLink></li>
                                    
                                        <li><NavLink to='all/users' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}>all users</NavLink></li>
                                    
                                        <li><NavLink to='user/role' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}>role</NavLink></li>
                                    
                                    </ul>
                                
                                </li>
                            
                                <li>
                                
                                    <h3 onClick={ ()=> {setOpen3(!open3)} } className={`${style.link}`} ><i className="fa-solid fa-newspaper"></i> pages <i className={` ${style.menu} ${open3 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                
                                    <ul className={`${style.sidebarSubmenu} ${open3 ? `${style.active}`: `${style.inactive}` } `}>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openMonotheism ? style.linkHover : style.linkTransparent}`}><NavLink to='monotheism/create/topic' className={({ isActive }) => {const isMonotheismActive = location.pathname.startsWith('/en/monotheism'); return `text-white`;}}><img src={monothesismIcon} alt="" /><span>Monotheism</span></NavLink></li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen4(!open4)} } className={`${style.link}`} ><i className="fa-solid fa-building-columns"></i>Pillars <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open4 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${openShahadah ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/shahadah/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><img src={shahadahIcon} alt="" /><span>Shahadah</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openPrayer ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/prayer/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><img src={prayerIcon} alt="" /><span>Prayer</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openSawm ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/sawm/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><img src={sawmIcon} alt="" /><span>Sawm</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openZakat ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/zakat/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><img src={zakatIcon} alt="" /><span>Zakat</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openHaij ? style.linkHover : style.linkTransparent}`}><NavLink to='pillars/haij/create' className={({ isActive }) => {const isPillarsActive = location.pathname.startsWith('/en/pillars'); return `text-white`;}}><img src={haijIcon} alt="" /><span>Haij</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li>
                                        
                                            <h3 onClick={ ()=> {setOpen2(!open2)} } className={`${style.link}`} ><i className="fa-solid fa-mosque"></i>Faith <i className={` ${style.menu} ${open4 ? 'fa-solid fa-angle-down': 'fa-solid fa-angle-right'}`}></i></h3>
                                        
                                            <ul className={`${style.sidebarSubmenu} ${style.sidebarBackground} ${open2 ? `${style.active}`: `${style.inactive}` } `}>

                                                <li className={`${style.topicIcon} ${style.link} ${openFaithBook ? style.linkHover : style.linkTransparent}`}><NavLink to='faith/book/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/book'); return `text-white`;}}><img src={book} alt="" /><span>Book</span></NavLink></li>

                                                <li className={`${style.topicIcon} ${style.link} ${openFaithBlog ? style.linkHover : style.linkTransparent}`}><NavLink to='faith/blog/create' className={({ isActive }) => {const isFaithActive = location.pathname.startsWith('/en/faith/blog'); return `text-white`;}}><img src={blog} alt="" /><span>Blog</span></NavLink></li>

                                            </ul>
                                        
                                        </li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openIslam ? style.linkHover : style.linkTransparent}`}><NavLink to='islam/create' className={({isActive}) => {const isIslamActive = location.pathname.startsWith('/en/islam'); return ( ` text-white `) }}><img src={islamIcon} alt="" /><span>About Islam</span></NavLink></li>
                                    
                                        <li className={`${style.topicIcon} ${style.link} ${openNews ? style.linkHover : style.linkTransparent}`}><NavLink to='news/create' className={({isActive}) => {const isNewsActive = location.pathname.startsWith('/en/news'); return ( ` text-white `) }}><img src={news} alt="" /><span>News</span></NavLink></li>

                                    </ul>
                                
                                </li>
                            
                                <li><NavLink to='media' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><i className="fa-regular fa-image"></i> media</NavLink></li>
                            
                                <li><NavLink to='setting' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkHover} ` : ` ${style.linkTransparent}`)) }}><i className="fa-solid fa-gear"></i>settings</NavLink></li>
                            
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
