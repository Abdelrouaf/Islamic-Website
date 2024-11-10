import React, { useEffect, useState } from 'react'
import logo from '../../images/logo-color-removebg-preview (1).png'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Header() {

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
                // setTimeout(() => {
                    window.location.href = '../sign'
                // }, 2000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
    
        <header className={`${style.header} ${headerPosition ? 'position-fixed' : 'position-static'}`}>
        
            <div className={style.upperHeader}>

                <div className="container">

                    <div className="row justify-content-between align-items-center">

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

            <nav className={navbarColor ? `${style.navbar} navbar navbar-expand-lg bg-black` : `${style.navbar} navbar navbar-expand-lg bg-black` }>
            
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
                                    <a onClick={toggleNavbar} className="nav-link"  to='/programs'>Programs</a>
                                </motion.li>
                            
                                {/* <li className="nav-item">
                                    <a className="nav-link" to=''>Donation</a>
                                </li> */}
                        
                            </ul>

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

                        <span>social: </span>

                        <div className={style.social}>

                            <a href="#" ><i className="fa-brands fa-facebook"></i></a>

                            <a href="#"><i className="fa-brands fa-youtube"></i></a>

                            <a href="#"><i className="fa-brands fa-instagram"></i></a>

                            <button type='submit' onClick={logoutUser} className='border-0 bg-transparent text-white'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>

                            <Link to='/sign' className='text-white'><i className="fa-regular fa-user"></i></Link>

                        </div>

                    </div>

                    </div>
                
                </div>
            
            </nav>
        
        </header>
    
    )
}
