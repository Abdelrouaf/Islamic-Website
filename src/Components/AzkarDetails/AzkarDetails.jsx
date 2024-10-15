import React, { useEffect, useRef, useState } from 'react'
import style from './AzkarDetails.module.scss'
import { motion, stagger } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Azkar } from 'islam.js'
import { v4 as uuidv4 } from 'uuid';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function AzkarDetails() {

    const azkarItems = [
        "Azkar paragraph 1",
        "Azkar paragraph 2",
        "Azkar paragraph 3"
      ];

    const [title, setTitle] = useState(null)
    const [topics, setTopics] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section
    const { category } = useParams();
    const azkar = new Azkar()
    const [categoryContent, setCategoryContent] = useState([]); // State to store the Azkar content
    // Track the current active slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      // Fetch the Azkar content for the selected category
      const content = azkar.getByCategory(category); // Assuming `getCategoryContent` exists
      setCategoryContent(content); // Store the content in state
    }, []);
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

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard', 'success');
        }).catch(() => {
            showToast("Failed to copy!", 'error')
        });
    };

    const [toasts, setToasts] = useState([]);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        const newToast = { id: uuidv4(), message, type }; // Create a unique ID for each toast

        // Add the new toast to the list of toasts
        setToasts((prevToasts) => [...prevToasts, newToast]);

        // Remove the toast after 6 seconds
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000); // Keep the toast for 6 seconds
    };

    const siteName = "Shared by Taw3ya"; 

    const formatShareMessage = (text) => {
        // Get the current window URL
        const currentUrl = window.location.href;
        return `${text}\n\n${siteName}\n\n${currentUrl}`;
    };

    // Share functionality
    const handleShareTelegram = (text) => {
        const formattedMessage = formatShareMessage(text);
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(formattedMessage)}`;
        window.open(telegramShareUrl, '_blank');
    };

    const handleShareWhatsApp = (text) => {
        const formattedMessage = formatShareMessage(text);
        const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(formattedMessage)}`;
        window.open(whatsappShareUrl, '_blank');
    };

    const [showShareButtons, setShowShareButtons] = useState(false); // State to manage button visibility

    // Animation variants for share buttons
    const buttonVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    const handleShareClick = () => {
        setShowShareButtons((prev) => !prev); // Toggle share button visibility
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
    
        <>
        
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
                    
                        {/*<div className="col-md-4">
                        
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
                                        
                                            <li className={style.quickLink}>
                                            
                                                <div className={`${style.cardBox}`}>
                                                
                                                    <div className={style.cardBody}>
                                                    
                                                        <a href="#"
                                                            onClick={(e) => { e.preventDefault(); handleRemembranceClick('afterPrayer') }} className={`${style.cardTitle} d-flex justify-content-between align-items-center`}>
                                                        
                                                            <h4>{category}</h4>
                                                                                                            
                                                        </a>
                                                    
                                                    </div>
                                                
                                                </div>
                                            
                                            </li>
                                        
                                    </ul>
                                
                            </motion.div>

                        </div> */}

                        {/* <motion.div initial='hidden' animate='visible' variants={toUp} className="col-md-8">

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
                        
                        </motion.div> */}
                        <h1 className='text-center'>{category}</h1>
                        
                        <div className='col-lg-12' >
                        
                            <Splide
                                options={{
                                    type: 'loop',
                                    perPage: 1,
                                    arrows: true,
                                    pagination: false,
                                    drag: true,
                                }}
                            
                                onMove={(splide) => {
                                    // Update the current index when the user navigates
                                    setCurrentIndex(splide.index);
                                }}
                            >
                        
                                {categoryContent.map((zkarItem, index) => (
                                
                                    <SplideSlide key={index} style={{ height: '400px' }}>
                                    
                                        <div className={`text-center d-flex justify-content-center align-items-center ${style.box}`}>
                                        
                                            <div>
                                            
                                                <p className={style.zikrDescription}>{zkarItem.zikr}</p>
                                            
                                                { zkarItem.reference.length > 0 && !zkarItem.reference.includes('سورة') && !zkarItem.reference.includes('البقرة') ? <span className={style.reference}>[ رواه: {zkarItem.reference} ]</span> : '' }
                                            
                                            </div>
                                        
                                            <div className={style.counter}>
                                            
                                                { zkarItem.count.length > 0 ? <span className={style.count}> التكرار : <span> {zkarItem.count} </span> | </span>  : '' }
                                            
                                                {/* <span className={style.share}>
                                                
                                                    مشاركة <i className="fa-solid fa-share-nodes"></i>
                                                
                                                    <div className={style.shareButtons}>
                                                    
                                                        <span className={style.copy} title='copy' onClick={ () => {handleCopy(zkarItem.zikr)} }>  <i className="fa-regular fa-copy"></i> </span>
                                                    
                                                        <span onClick={() => handleShareTelegram(zkarItem.zikr)} ><i class="fa-brands fa-telegram"></i> </span>
                                                    
                                                        <span onClick={() => handleShareWhatsApp(zkarItem.zikr)} ><i class="fa-brands fa-whatsapp"></i> </span>
                                                    
                                                    </div>
                                                
                                                </span> */}
                                            
                                                <span className={style.share} onClick={handleShareClick}>
                                            مشاركة <i className="fa-solid fa-share-nodes"></i>
                                            {showShareButtons && (
                                                <div className={style.shareButtons}>
                                                    <motion.span
                                                        className={style.copy}
                                                        title='copy'
                                                        onClick={() => { handleCopy(zkarItem.zikr); }}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={0}
                                                        variants={buttonVariants}
                                                    >
                                                        <i className="fa-regular fa-copy"></i>
                                                    </motion.span>
                                                    <motion.span
                                                        onClick={() => handleShareTelegram(zkarItem.zikr)}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={1}
                                                        variants={buttonVariants}
                                                    >
                                                        <i className="fa-brands fa-telegram"></i>
                                                    </motion.span>
                                                    <motion.span
                                                        onClick={() => handleShareWhatsApp(zkarItem.zikr)}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={2}
                                                        variants={buttonVariants}
                                                    >
                                                        <i className="fa-brands fa-whatsapp"></i>
                                                    </motion.span>
                                                </div>
                                            )}
                                        </span>
                                            
                                            </div>
                                        
                                        </div>
                                    
                                    </SplideSlide>
                                
                                ))}
                        
                            </Splide>
                        
                            <span className={style.currentIndex}>{currentIndex + 1} / {categoryContent.length}</span>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </div>
        
            <div id="toastBox" className={style.toastBox}>
                {toasts.map((toast) => (
                    <div key={toast.id} className={`${style.tast} ${toast.type} ${style[toast.type]} ${style.show}`}>
                        <i className={`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'error' ? 'fa-times-circle' : toast.type === 'invalid' ? 'fa-exclamation-circle' : ''}`}></i>
                        {toast.message}
                        <div className={style.progress}></div>
                    </div>
                ))}
            </div>
        
        </>
    
    )
}
