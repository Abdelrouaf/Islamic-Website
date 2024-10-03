import React, { useEffect, useRef, useState } from 'react'
import style from './Azkar.module.scss'
import { motion, stagger } from 'framer-motion'

export default function Azkar() {

    const [title, setTitle] = useState(null)
    const [topics, setTopics] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts

    const fetchData = async (url) => {
        try {
            // const response = await fetch(`https://ahegazy.github.io/muslimKit/json/${'azkar_sabah'}.json`);
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.content) {
                setTopics(data.content);
                setTitle(data.title);
            }             

        } catch (error) {
            console.error("error is ", error)
        } 
    };

    useEffect(() => {

        fetchData(`https://ahegazy.github.io/muslimKit/json/${'azkar_sabah'}.json`);
    }, []);

    const handleScrollToTopic = (topicId) => {
        const element = document.getElementById(topicId);
        if (element) {
            const headerOffset = 120; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleRemembranceClick = (type) => {
        let url = '';
        switch (type) {
            case 'morning':
                url = 'https://ahegazy.github.io/muslimKit/json/azkar_sabah.json';
                break;
            case 'evening':
                url = 'https://ahegazy.github.io/muslimKit/json/azkar_massa.json';
                break;
            case 'afterPrayer':
                url = 'https://ahegazy.github.io/muslimKit/json/PostPrayer_azkar.json';
                break;
            default:
                return;
        }
        fetchData(url); // Fetch data for the selected remembrance
    };

    const text = "Morning, Evening & After Pray"

    const h3Variants = {

        hidden: {
            opacity: 0
        },

        visible : {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }

    }

    const spanVariants = {

        hidden: {
            opacity: 0
        },

        visible : {
            opacity: 1
        }

    }

    const variants = {
        hidden: { opacity: 0, y: -500 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
    };

    const toUp = {
        hidden: { opacity: 0, y: 500 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
            
                <div className={`text-center mb-5`}>
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Azkar</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                        {text.split('').map( (char, index) => 
                        
                            <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                        
                        )}

                    </motion.h3>
                
                </div>
            
            </div>

            <div className="container">
            
                {/* <div className="text-center mb-5">
                
                    <span className={style.headTitle}>About Islam</span>
                
                    <h3 className={style.title}>The Purpose Of Life</h3>
                
                </div> */}
            
                {/* <div className={style.titles}>
                
                    <span className={style.headTitle2}>About Islam</span>
                
                    <h3 className={style.title2}>The Purpose Of Life</h3>
                
                </div> */}
            
                <div className="row mt-5">
                
                    <div className="col-md-4">
                    
                        <motion.div initial='hidden' animate='visible' variants={toUp} className={`${style.box} ${style.mostLikedBox} ${style.sticky}`} ref={mostLikedRef}>

                                <h4 className={style.title}>All Azkar</h4>

                                <ul>
                                        <li className={style.quickLink}>
                                        
                                            <div className={`${style.cardBox}`}>
                                            
                                                <div className={style.cardBody}>
                                                
                                                    <a href="#"
                                                        onClick={(e) => { e.preventDefault(); handleRemembranceClick('morning') }} className={`${style.cardTitle} d-flex justify-content-between align-items-center`}>
                                                    
                                                        <h4>Morning remembrances</h4>
                                                    
                                                        <h4> اذكار الصباح </h4>
                                                    
                                                    </a>
                                                
                                                </div>
                                            
                                            </div>
                                        
                                        </li>
                                    
                                        <li className={style.quickLink}>
                                        
                                            <div className={`${style.cardBox}`}>
                                            
                                                <div className={style.cardBody}>
                                                
                                                    <a href="#"
                                                        onClick={(e) => { e.preventDefault(); handleRemembranceClick('evening') }} className={`${style.cardTitle} d-flex justify-content-between align-items-center`}>
                                                    
                                                        <h4>Evening prayers</h4>
                                                    
                                                        <h4> اذكار المساء </h4>
                                                    
                                                    </a>
                                                
                                                </div>
                                            
                                            </div>
                                        
                                        </li>
                                    
                                        <li className={style.quickLink}>
                                        
                                            <div className={`${style.cardBox}`}>
                                            
                                                <div className={style.cardBody}>
                                                
                                                    <a href="#"
                                                        onClick={(e) => { e.preventDefault(); handleRemembranceClick('afterPrayer') }} className={`${style.cardTitle} d-flex justify-content-between align-items-center`}>
                                                    
                                                        <h4>Remembrances after prayer</h4>
                                                    
                                                        <h4> اذكار بعد الصلاة </h4>
                                                    
                                                    </a>
                                                
                                                </div>
                                            
                                            </div>
                                        
                                        </li>
                                    
                                </ul>
                            
                        </motion.div>

                    </div>

                    <motion.div initial='hidden' animate='visible' variants={toUp} className="col-md-8">

                        <div className={style.azkarBox}>

                            <div className={style.topicDesign}>
                                
                                <h3 className={style.title}> {title ? title : "اذكار الصباح"}</h3>
                            
                            </div>

                            {topics.length > 0 ? 

                                topics.map((azkar, index) => (

                                    <div key={index} className={style.topicSection}>

                                        <div className={style.azkar}>

                                                <p key={index} className={`${style.paragraph} d-inline rtl`}>
                                                
                                                    {azkar.zekr}
                                                
                                                </p>
                                            
                                                <div className={style.btns}>

                                                    <button className={style.downloadBtn}>{azkar.repeat}</button>

                                                </div>

                                        </div>
                                    
                                    </div>
                                
                                )) 
                            
                            : (
                            
                                <p>No topics available.</p>
                            
                            )}

                        </div>
                    
                    </motion.div>
                
                </div>
            
            </div>
        
        </div>
    
    )
}
