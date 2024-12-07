import React, { useEffect, useRef, useState } from 'react'
import logo from '../../images/logo-color-removebg-preview (1).png'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Header() {

    const [isRTL, setIsRTL] = useState(false);

    // Function to detect the language and set direction
    const detectLanguage = () => {
      // Example: Check if the current language is Arabic
      const currentLang = document.documentElement.lang || "en";
      setIsRTL(currentLang === "ar"); // Adjust based on actual language detection logic
    };
  
     // Run detection on mount
     useEffect(() => {
      detectLanguage();
    }, []);

    // change Navbar color when scrolling down
    const [navbarColor, setNavbarColor] = useState(false)
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for toggling navbar
    const [headerPosition, setHeaderPosition] = useState(false)

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState); // Toggle navbar state
    };

    function changeNavbarColor() {
        if(window.scrollY >= 45) {
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
    const [selectedCountry, setSelectedCountry] = useState('EG'); // Default is Egypt
    const [selectedCity, setSelectedCity] = useState(countryData['EG'].capital); // Default is Cairo

    useEffect(() => {
        const fetchPrayersTime = async () => {
            try {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0'); // Get the day and format as two digits
                const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month and format as two digits (months are zero-based)
                const year = today.getFullYear(); // Get the full year

                const currentDate = `${day}-${month}-${year}`;
            
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${selectedCity}&country=${selectedCountry}&method=1`);

                const data = await response.json();
                const azan = data.data.timings;
                setPrayersTime(azan || {});
                findNextPrayer(azan); // Calculate the next prayer time
            } catch (error) {
                console.error('Error fetching the topics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayersTime();
        const interval = setInterval(() => {
            if (Object.keys(prayersTime).length > 0) {
                findNextPrayer(prayersTime); // Recalculate every minute
            }
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up the interval
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

        // If no future prayer is found, assume the next prayer is Fajr of the next day
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
                    window.location.href = '../sign'
                // }, 2000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsNavbarOpen(false)
            }
        };

        const handleScroll = () => {
            setIsNavbarOpen(false);
          };
    
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (loading) {
        return  <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">loading</div>
        </div>
      </div>
    }

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
                                
                                    { isRTL && <select className="form-select my-2" style={{direction: 'ltr'}} onChange={handleCountryChange} value={selectedCountry} aria-label="Default select example">
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
                                    </select> }

                                    { !isRTL && <select className="form-select my-2" onChange={handleCountryChange} value={selectedCountry} aria-label="Default select example">
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
                                    </select> }
                                
                                </motion.div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <nav className={navbarColor ? `${style.navbar} navbar navbar-expand-lg bg-black` : `${style.navbar} navbar navbar-expand-lg bg-black` } style={{direction: 'ltr'}} ref={menuRef}>
            
                <div className="container">
                
                    <div className="d-flex justify-content-between align-items-center w-100">
                        
                        <div className={style.logo}>
                        
                            <Link className="navbar-brand" to='/'><img src={logo} width={100} alt="" /></Link>
                        
                        </div>

                        <div className={`collapse navbar-collapse justify-content-center ${style.navbarCollapse} ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">

                            <ul className={`navbar-nav mb-2 mb-lg-0`}>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/quran'>Quran</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : .5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/azkarCatagories'>Azkar</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 1 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/monotheism'>Monotheism</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 1.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/islam'>About Islam</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 2 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/pillars'>Pillars</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 2.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/faith'>Faith</NavLink>
                                </motion.li>
                            
                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 3 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className={({ isActive }) => (isActive ? `nav-link ${style.activeLink}` : 'nav-link')} to='/news'>News</NavLink>
                                </motion.li>

                                <motion.li initial={{ x : -20, opacity: 0 }} animate={{ x : 0, opacity : 1 }} transition={{ duration : 1, delay : 3.5 }} className="nav-item">
                                    <NavLink onClick={toggleNavbar} className="nav-link"  to='/sign'>Programs</NavLink>
                                </motion.li>
                            
                                {/* <li className="nav-item">
                                    <a className="nav-link" to=''>Donation</a>
                                </li> */}
                        
                            </ul>

                        </div>
                    
                        <button className="navbar-toggler" type="button" onClick={toggleNavbar} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        
                            {/* <span className="navbar-toggler-icon"></span> */}

                            <i className="fa-solid fa-bars text-white"></i>
                        
                        </button>

                        {/* <div className={style.btn}>
                        
                            <form action="" className={style.form}>
                                
                                <button className={style.donateBtn}><i className="fa-solid fa-heart"></i> Donate</button>
                            
                            </form>
                        
                        </div> */}
                    
                    <div className={style.right}>

                        <div className={style.social}>

                            <div className={style.socialLoginIcons}>
                                <div className={style.socialContainer}>
                                    <div className={`${style.icon} ${style.socialIcon11}`}>
                                    <svg
                                        viewBox="0 0 512 512"
                                        height="1.7em"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={style.svgIcontwit}
                                        fill="white"
                                    >
                                        <path
                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                        ></path>
                                    </svg>
                                    </div>
                                    <div className={style.socialIcon1}>
                                    <svg
                                        viewBox="0 0 512 512"
                                        height="1.7em"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={style.svgIcontwit}
                                        fill="black"
                                    >
                                        <path
                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                        ></path>
                                    </svg>
                                    </div>
                                </div>
                                <div className={style.socialContainer}>
                                    <div className={`${style.icon} ${style.socialIcon22}`}>
                                    <svg
                                        fill="white"
                                        className={style.svgIcon}
                                        viewBox="0 0 448 512"
                                        height="1.5em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                        ></path>
                                    </svg>
                                    </div>
                                    <div className={style.socialIcon2}>
                                    <svg
                                        fill="white"
                                        className={style.svgIcon}
                                        viewBox="0 0 448 512"
                                        height="1.5em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                        ></path>
                                    </svg>
                                    </div>
                                </div>
                                <div className={style.socialContainer}>
                                    <div className={`${style.icon} ${style.socialIcon33}`}>
                                    <svg
                                        viewBox="0 0 384 512"
                                        fill="white"
                                        height="1.6em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                        ></path>
                                    </svg>
                                    </div>
                                    <div className={style.socialIcon3}>
                                    <svg
                                        viewBox="0 0 384 512"
                                        fill="white"
                                        height="1.6em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                        ></path>
                                    </svg>
                                    </div>
                                </div>
                            </div>

                            {/* <Link to='/sign' className={style.glowOnHover}>Sign in!</Link> */}

                        </div>

                    </div>

                    </div>
                
                </div>
            
            </nav>
        
        </header>
    
    )
}
