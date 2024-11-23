import React, { useEffect, useState } from 'react'
import style from './ProgramsHome.module.scss'
import { Link, useOutletContext } from 'react-router-dom'
import Sign from '../Sign/Sign'

export default function ProgramsHome() {

    const [showSign, setShowSign] = useState(false);

    const openSign = () => setShowSign(true);
    const closeSign = () => setShowSign(false);

    const {token} = useOutletContext()

    const [run, setRun] = useState(0)

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             await fetch('http://147.79.101.225:2859/api/programs/', {
    //                 method : "GET",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`
    //                 },
    //                     credentials: "include"
    //             })
    //             .then( (res) => {
    //                 console.log('Response from API:', res); // Log the response object
    //                 return res.json();
    //             } )
    //             .then( (data) => console.log(data) )
    //             .then( err => console.error("Error is: ", err) )
    //         } catch (error) {
    //             console.error("error ", error);
    //         }
    //     };

    //     getData();
    // }, [run]);

    const userToken = localStorage.getItem('accessToken')

    useEffect(() => {
        async function getData() {
            try {
                // console.log('Fetching data with token:', token); // Log token
    
                const response = await fetch('http://147.79.101.225:2859/api/programs/', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });
    
                console.log('Response from API:', response); // Log raw response
    
                if (!response.ok) {
                    // Handle non-2xx HTTP status codes
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Data received from API:', data.Programs); // Log parsed data
            } catch (error) {
                console.error("Error occurred during the fetch:", error.message); // Properly log error
            }
        }
    
        getData();
    }, [run]);

    console.log("home ", token);
    

    return (
    
        <>
        
            <section className={style.homeSec}>

                <div className="container">

                    <div className={style.text}>

                        <h4 className={style.title}>Your Learning, Just a Download Away</h4>

                        <p className={style.description}>"Discover a world of knowledge at your fingertips. Nextgen Knowledge is your one-stop destination for high-quality resources in engineering, medical, dental, and programming. Our carefully curated library provides the tools and materials you need to excel in your studies and professional journey. Explore, download, and empower your learning experience with content crafted to fuel your passion and potential. Dive into the resources you need today!"</p>

                        {/* <a href="#categories" className={style.hoverBtn} ><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>  explore</a> */}

                        <Link to="#categories" className={style.exploreBtn}>
                            <span className={style.button_lg}>
                                <span className={style.button_sl}></span>
                                <span className={style.button_text}>Explore</span>
                            </span>
                        </Link>

                        <div className={style.social}>

                            <div className={style.main}>
                            
                                <div className={style.up}>
                                <button className={style.card1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="30px" height="30px" fillRule="nonzero" className={style.instagram}><g fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray="5,5" strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" /></g></g></svg>
                                </button>
                                <button className={style.card2}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" className={style.twitter} viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"/></svg>
                                </button>
                                </div>
                                <div className={style.down}>
                                <button className={style.card3}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" className={style.github} viewBox="0 0 16 16"><path d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"/></svg>
                                </button>
                                <button className={style.card4}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" className={style.discord} viewBox="0 0 256 180"><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>
                                </button>
                                </div>
                            
                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
            <section className={style.categoriesSec}>

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-md-6">

                            <div className={style.box}>

                                <Link to='category/architecture'>
                                
                                    <div className={style.image}>

                                        <img src='http://147.79.101.225:2859/public/engineering7.jpg' alt="Architecture" loading='lazy' />

                                    </div>
                                
                                </Link>

                                <Link to='category/architecture'><h4 className={style.title}>Architecture</h4></Link>

                                <p className={style.description}>Architecture software programs are essential tools for architects, designers, and students to create, visualize, and refine architectural designs.</p>

                                <Link to='category/architecture' className={style.seeMoreBtn}>See more</Link>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className={style.box}>

                                <Link to='category/dental'>
                                
                                    <div className={style.image}>

                                        <img src='http://147.79.101.225:2859/public/dentail1.jpg' alt="Dental" loading='lazy' />

                                    </div>
                                
                                </Link>

                                <Link to='category/dental'><h4 className={style.title}>Dental</h4></Link>

                                <p className={style.description}>Dental programs are designed to support dentists, hygienists, and dental offices with tools for diagnostics, patient management, and treatment planning.</p>

                                <Link to='category/dental' className={style.seeMoreBtn}>See more</Link>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className={style.box}>

                                <Link to='category/civil'>
                                
                                    <div className={style.image}>

                                        <img src='http://147.79.101.225:2859/public/engineering5.jpg' alt="Civil" loading='lazy' />

                                    </div>
                                
                                </Link>

                                <Link to='category/civil'><h4 className={style.title}>Civil</h4></Link>

                                <p className={style.description}>Civil engineering programs offer specialized tools for planning, designing, and managing infrastructure projects.</p>

                                <Link to='category/civil' className={style.seeMoreBtn}>See more</Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* <div>
            
                <h1>Home Page</h1>

                <button onClick={openSign}>Open Sign In</button>

                {showSign && <Sign onClose={closeSign} />}
            
            </div> */}

        </>
    
    )
}
