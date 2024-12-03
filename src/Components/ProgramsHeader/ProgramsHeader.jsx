import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import logo from '../../images/program-logo1.png'
// import profileUser from '../../images/profile-user.png'
import profileUser from '../../images/man (1).png'
import style from './ProgramsHeader.module.scss'

export default function ProgramsHeader() {

    // change Navbar color when scrolling down
    const [navbarColor, setNavbarColor] = useState(false)
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [headerPosition, setHeaderPosition] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState);
    };

    function changeNavbarColor() {
        if(window.scrollY >= 90) {
            setNavbarColor(true)
            setHeaderPosition(true)
        } else {
            setNavbarColor(false)
            setHeaderPosition(false)
        }
    }

    window.addEventListener("scroll", changeNavbarColor)

    const countryData = {
        EG: { name: 'Egypt', capital: 'Cairo' },
        US: { name: 'United States', capital: 'Washington' },
        SA: { name: 'Saudi Arabia', capital: 'Riyadh' },
        AE: { name: 'United Arab Emirates', capital: 'Abu Dhabi' },
        GB: { name: 'United Kingdom', capital: 'London' },
        FR: { name: 'France', capital: 'Paris' },
        CA: { name: 'Canada', capital: 'Ottawa' },
        DE: { name: 'Germany', capital: 'Berlin' },
        IN: { name: 'India', capital: 'New Delhi' },
        PK: { name: 'Pakistan', capital: 'Islamabad' },
        ID: { name: 'Indonesia', capital: 'Jakarta' },
        TR: { name: 'Turkey', capital: 'Ankara' },
        DZ: { name: 'Algeria', capital: 'Algiers' },
        MA: { name: 'Morocco', capital: 'Rabat' },
        QA: { name: 'Qatar', capital: 'Doha' },
    };

    const [prayersTime, setPrayersTime] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPrayer, setNextPrayer] = useState('');
    const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('EG'); 
    const [selectedCity, setSelectedCity] = useState(countryData['EG'].capital); 

    useEffect(() => {
        const fetchPrayersTime = async () => {
            try {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0'); 
                const month = String(today.getMonth() + 1).padStart(2, '0'); 
                const year = today.getFullYear();

                const currentDate = `${day}-${month}-${year}`;
            
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${selectedCity}&country=${selectedCountry}&method=1`);

                const data = await response.json();
                const azan = data.data.timings;
                setPrayersTime(azan || {});
                findNextPrayer(azan); 
            } catch (error) {
                console.error('Error fetching the topics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayersTime();
        const interval = setInterval(() => {
            if (Object.keys(prayersTime).length > 0) {
                findNextPrayer(prayersTime); 
            }
        }, 1000); 

        return () => clearInterval(interval); 
    }, [prayersTime, selectedCity, selectedCountry]);

    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);
        setSelectedCity(countryData[countryCode].capital);
    };

    const [minTiming, setMinTiming] = useState(10)
    const [hourTiming, setHourTiming] = useState(10)

    // Function to calculate the time difference in HH:MM:SS
    const calculateTimeDifference = (prayerTime) => {
        const [prayerHours, prayerMinutes] = prayerTime.split(':').map(Number);
        const now = new Date();
        const prayerDate = new Date(now);
        prayerDate.setHours(prayerHours);
        prayerDate.setMinutes(prayerMinutes);
        prayerDate.setSeconds(0);

        if (prayerDate < now) {
            // If the prayer time has already passed, calculate for the next day
            prayerDate.setDate(prayerDate.getDate() + 1);
        }

        const diff = prayerDate - now;
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        // const minutes = 5
        const seconds = totalSeconds % 60;

        setMinTiming(minutes);

        setHourTiming(hours)

        // Format the time as HH:MM:SS
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
        };

    // Function to find the next prayer time
    const findNextPrayer = (azan) => {
        const now = new Date();
        const prayerNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
        let foundNextPrayer = false;

        for (let i = 0; i < prayerNames.length; i++) {
            const [hours, minutes] = azan[prayerNames[i]].split(':').map(Number);
            const prayerDate = new Date();
            prayerDate.setHours(hours);
            prayerDate.setMinutes(minutes);
            prayerDate.setSeconds(0);

            if (prayerDate > now) {
                setNextPrayer(prayerNames[i]);
                setTimeUntilNextPrayer(calculateTimeDifference(azan[prayerNames[i]]));
                foundNextPrayer = true;
                break;
            }
        }

        if (!foundNextPrayer) {
            setNextPrayer('Fajr');
            setTimeUntilNextPrayer(calculateTimeDifference(azan['Fajr']));
        }
    };

    // Variants for navbar animation
    const navbarVariants = {
        hidden: { opacity: 0, y: -500 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    // Variants for prayer times
    const prayerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };

    // Variants for country selection
    const selectVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1 } }
    };

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

    return (
    
        <header className={`${style.header} ${headerPosition ? 'position-fixed' : 'position-static'}`}>
        
            <div className={style.upperHeader}>

                <div className="container">

                    <div className="row gy-2 justify-content-between align-items-center">

                        <div className="col-lg-2 col-sm-6">

                            <motion.div initial='hidden' animate='visible' variants={prayerVariants} className={style.left}>

                                <h4>Timing for <span className={style.azan}>{nextPrayer}</span> is <motion.span className={minTiming <= 5 && hourTiming === 0 ? style.transform : ''} >{timeUntilNextPrayer}</motion.span></h4>

                            </motion.div>

                        </div>

                        <div className="col-lg-8 d-none d-lg-block">

                            <div className={style.center}>

                                <motion.ul initial='hidden' animate='visible' variants={navbarVariants}>

                                    <li><h4 className={style.azan}>Fajr <span>{prayersTime.Fajr}</span> </h4></li>

                                    <li><h4 className={style.azan}>Sunrise <span>{prayersTime.Sunrise}</span> </h4></li>

                                    <li><h4 className={style.azan}>Dhuhr <span>{prayersTime.Dhuhr}</span> </h4></li>

                                    <li><h4 className={style.azan}>Asr <span>{prayersTime.Asr}</span> </h4></li>

                                    <li><h4 className={style.azan}>Maghrib <span>{prayersTime.Maghrib}</span> </h4></li>

                                    <li><h4 className={style.azan}>Isha <span>{prayersTime.Isha}</span> </h4></li>

                                </motion.ul>

                            </div>

                        </div>

                        <div className="col-lg-2 col-sm-6 ">

                            <div className={style.right}>

                                <motion.div initial='hidden' animate='visible' variants={selectVariants} className='d-flex align-items-center gap-1'>
                                
                                    <Link to='/azanTiming' className={style.timing}>Timing: </Link>
                                
                                    <select className="form-select my-2" onChange={handleCountryChange} value={selectedCountry} aria-label="Default select example">
                                        <option value='EG'>Egypt</option>
                                        <option value="US">United States</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="FR">France</option>
                                        <option value="CA">Canada</option>
                                        <option value="DE">Germany</option>
                                        <option value="IN">India</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="TR">Turkey</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="MA">Morocco</option>
                                        <option value="QA">Qatar</option>
                                    </select>
                                
                                </motion.div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <nav className={navbarColor ? `${style.navbar} navbar navbar-expand-lg bg-white` : `${style.navbar} navbar navbar-expand-lg bg-transparent` }>
            
                <div className="container">
                
                    <div className="d-flex justify-content-between align-items-center w-100">
                    
                        <div className={style.logo}>
                        
                            <Link className="navbar-brand" to='/programs'><img src={logo} width={100} alt="" /></Link>
                        
                        </div>

                        <div className={`collapse navbar-collapse justify-content-center ${style.navbarCollapse} ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">

                            <ul className={`navbar-nav mb-2 mb-lg-0`}>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/Architecture-Software' state={{ description: 'Architecture software programs are essential tools for architects, designers, and students to create, visualize, and refine architectural designs.' }}>Architecture</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 1 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/Structure-Software' state={{ description: 'Structure software programs offer specialized tools for planning, designing, and managing infrastructure projects.' }}>Structure</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : .5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/Dental-Software' state={{ description: 'Dental programs are designed to support dentists, hygienists, and dental offices with tools for diagnostics, patient management, and treatment planning.' }}>Dental</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 1.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/English-Material' state={{ description: 'English Material contains resources for learning English, such as books, guides, grammar explanations, or vocabulary building materials.' }}>English</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 2 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/Islamic-Material' state={{ description: 'Islamic Material consists of Islamic educational content, including books, articles, and guides about the Quran, Hadith, and other aspects of Islamic teachings.' }}>Islamic</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 2.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='category/Different' state={{ description: 'Include a variety of unrelated programs or tools that don’t fit into the above categories. These could range from utility software to general learning applications.' }}>different</NavLink>
                                </motion.li>
                            
                                {/* <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 3 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='news'>News</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 3.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className="nav-link"  to='programs'>Programs</NavLink>
                                </motion.li> */}
                            
                                {/* <li className="nav-item">
                                    <a className="nav-link" to=''>Donation</a>
                                </li> */}
                        
                            </ul>

                            <div className={style.right}>

                                <div ref={profileUserRef} onClick={ () => setIsProfileUserActive(prevState => !prevState) } className={style.profileUser}>

                                    <img src={profileUser} width={40} alt="profile-user" loading='lazy' />

                                    <ul className={`${isProfileUserActive ? style.active : ''}`}>

                                        <li><Link  to='user'><i className="fa-regular fa-user"></i> Profile</Link></li>

                                        <li><Link to='user/save-items'><i className="fa-regular fa-bookmark"></i> Saved items</Link></li>

                                        <li><Link to='user/inbox'><i className="fa-regular fa-comment"></i> inbox</Link></li>

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
                    
                        <button className="navbar-toggler" type="button" onClick={toggleNavbar} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        
                            <span className="navbar-toggler-icon"></span>
                        
                        </button>

                        {/* <div className={style.btn}>
                        
                            <form action="" className={style.form}>
                                
                                <button className={style.donateBtn}><i className="fa-solid fa-heart"></i> Donate</button>
                            
                            </form>
                        
                        </div> */}
                    
                    <div className={style.right}>

                        {/* <button className={style.BtnContainer}>
                        
                            <span className={style.text}>Sign in!</span>
                        
                            <span className={style.iconContainer}>
                            
                                <svg
                                width="16"
                                height="19"
                                viewBox="0 0 16 19"
                                fill="nones"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <circle cx="1.61321" cy="1.61321" r="1.5" fill="white"></circle>
                                <circle cx="5.73583" cy="1.61321" r="1.5" fill="white"></circle>
                                <circle cx="5.73583" cy="5.5566" r="1.5" fill="white"></circle>
                                <circle cx="9.85851" cy="5.5566" r="1.5" fill="white"></circle>
                                <circle cx="9.85851" cy="9.5" r="1.5" fill="white"></circle>
                                <circle cx="13.9811" cy="9.5" r="1.5" fill="white"></circle>
                                <circle cx="5.73583" cy="13.4434" r="1.5" fill="white"></circle>
                                <circle cx="9.85851" cy="13.4434" r="1.5" fill="white"></circle>
                                <circle cx="1.61321" cy="17.3868" r="1.5" fill="white"></circle>
                                <circle cx="5.73583" cy="17.3868" r="1.5" fill="white"></circle>
                                </svg>
                            
                            </span>
                        
                        </button> */}

                        {/* <Link to='/sign' className={style.glowOnHover}>Sign in!</Link> */}

                        <div ref={profileUserRef} onClick={ () => setIsProfileUserActive(prevState => !prevState) } className={style.profileUser}>

                            <img src={profileUser} width={40} alt="profile-user" loading='lazy' />

                            <ul className={`${isProfileUserActive ? style.active : ''}`}>

                                <li><Link to='user'><i className="fa-regular fa-user"></i> Profile</Link></li>

                                <li><Link to='user/save-items'><i className="fa-regular fa-bookmark"></i> Saved items</Link></li>

                                <li><Link to='user/inbox'><i className="fa-regular fa-comment"></i> inbox</Link></li>

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

{/* sign out */}
                        {/* <button type='submit' onClick={logoutUser} className='border-0 bg-transparent text-black'><i className="fa-solid fa-arrow-right-from-bracket"></i></button> */}

                        {/* <button class={style.logoutBtn}>
                        
                            <div class={style.sign}><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                        
                            <div class={style.text}>Logout</div>
                        
                        </button> */}

                    </div>

                    </div>
                
                </div>
            
            </nav>
        
        </header>
    
    )
}
