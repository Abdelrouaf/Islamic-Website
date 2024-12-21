import React, { useEffect, useRef, useState } from 'react'
import loadingImg from '../../images/loading.png'
import style from './AzkarDetails.module.scss'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Azkar } from 'islam.js'
import { v4 as uuidv4 } from 'uuid';
import image1 from '../../images/morning.png'
import image2 from '../../images/nightZkar.png'
import image3 from '../../images/wearing.png'
import image4 from '../../images/sleepingZkar.png'
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function AzkarDetails() {

    const images = [
        image1,
        image2,
        image4,
        image3
    ];

    const [topics, setTopics] = useState([])
    const { category } = useParams();
    const azkar = new Azkar()
    const allAzkar = azkar.getAll()
    const [categoryContent, setCategoryContent] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const splideRef = useRef();

    const [url, setUrl] = useState("");

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.content) {
                setTopics(data.content);
            }             

        } catch {
        }
    };

    useEffect(() => {
        if (category) {
            const content = azkar.getByCategory(category);
            setCategoryContent(content);
        }

    }, [category, url]);

    useEffect(() => {
    
        if ( category && categoryContent.length > 0 ) {
            if ( categoryContent[0].category === 'أذكار الصباح' ) {
                setUrl(`https://ahegazy.github.io/muslimKit/json/azkar_sabah.json`);
            } else if ( categoryContent[0].category === 'أذكار المساء' ) {
                setUrl('https://ahegazy.github.io/muslimKit/json/azkar_massa.json')
            } else {
                setTopics([])
            }
        }

        fetchData(url)

    }, [category, categoryContent]);

    const handleZikrClick = (zkarName) => {
        const content = azkar.getByCategory(zkarName);
        setCategoryContent(content);
        setCurrentIndex(0); 
        if (splideRef.current) {
            splideRef.current.go(0);
        }
    };

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
        const newToast = { id: uuidv4(), message, type }; 

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000); 
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
        setShowShareButtons((prev) => !prev); 
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

    // if (!category) {
    //     return  <div id="page">
    //     <div id="container">
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="h3">loading</div>
    //     </div>
    //   </div>; 
    // }

    if (!category) {
        return <div id='page'>
        
            <div>
            
                <div className='d-flex align-items-center justify-content-center'>
                
                    <div className={style.fImage}>
                    
                        <img src={loadingImg} width={100} alt="loading" />
                    
                    </div>
                
                    <div className={style.sImage}>
                    
                    <div className={style.hourglassBackground}>
                        <div className={style.hourglassContainer}>
                        <div className={style.hourglassCurves} />
                        <div className={style.hourglassCapTop} />
                        <div className={style.hourglassGlassTop} />
                        <div className={style.hourglassSand} />
                        <div className={style.hourglassSandStream} />
                        <div className={style.hourglassCapBottom} />
                        <div className={style.hourglassGlass} />
                        </div>
                    </div>
                    
                    </div>
                
                </div>
            
                <h4 style={{display: 'block !important', margin: '0'}}>استثمر دقائق الانتظار في الاستغفار</h4>
            
            </div>
        
        </div>
    
    }

    return (
    
        <>
        
            <div className={`${style.blogSection} ${style.section} ${style.notranslate}`} translate="no">
            
                <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
                
                    {/* <div className={`text-center mb-5`}>
                    
                        <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Azkar</motion.span>
                    
                        <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                            {text.split('').map( (char, index) => 
                            
                                <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                            
                            )}

                        </motion.h3>
                    
                    </div> */}
                
                </div>

                <div className="container">
                
                    <div className="row gy-2 mt-5">
                    
                        <h1 className='text-center'>{category}</h1>
                        
                        <div className='col-lg-12' >
                        
                            <Splide ref={splideRef}
                                options={{
                                    type: 'loop',
                                    perPage: 1,
                                    arrows: true,
                                    pagination: false,
                                    drag: true,
                                    height: '210px'
                                }}
                            
                                onMove={(splide) => {
                                    // Update the current index when the user navigates
                                    setCurrentIndex(splide.index);
                                }}
                            >
                        
                                { topics.length > 0 ? topics.map( (zikr, index) => (

                                    <SplideSlide key={index} style={{ height: '400px' }}>
                                    
                                        <div className={style.bigBox}>

                                            <div className={`text-center d-flex justify-content-center align-items-center ${style.box2}`}>

                                                <div className=''>

                                                    <p className={style.zikrDescription}>{zikr.zekr}</p>

                                                </div>

                                            </div>

                                            <div className={style.counter}>

                                                { zikr.repeat > 1 ? <span className={style.count}> التكرار : <span> {zikr.repeat} </span> | </span>  : '' }

                                                <span className={style.share} onClick={handleShareClick}>
                                                مشاركة <i className="fa-solid fa-share-nodes"></i>
                                                {showShareButtons && (
                                                <div className={style.shareButtons}>
                                                    <motion.span
                                                        className={style.copy}
                                                        title='copy'
                                                        onClick={() => { handleCopy(zikr.zekr); }}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={0}
                                                        variants={buttonVariants}
                                                    >
                                                        <i className="fa-regular fa-copy"></i>
                                                    </motion.span>
                                                    <motion.span
                                                        onClick={() => handleShareTelegram(zikr.zekr)}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={1}
                                                        variants={buttonVariants}
                                                    >
                                                        <i className="fa-brands fa-telegram"></i>
                                                    </motion.span>
                                                    <motion.span
                                                        onClick={() => handleShareWhatsApp(zikr.zekr)}
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

                                ) ) 
                                
                                
                                : categoryContent.map((zkarItem, index) => (
                                
                                <SplideSlide key={index} style={{ height: '400px' }}>
                                
                                    <div className={style.bigBox}>

                                        <div className={`text-center d-flex justify-content-center align-items-center ${style.box2}`}>
                                        
                                            <div className=''>
                                            
                                                <p className={style.zikrDescription}>{zkarItem.zikr}</p>
                                            
                                                { zkarItem.reference.length > 0 && !zkarItem.reference.includes('سورة') && !zkarItem.reference.includes('البقرة') ? <span className={style.reference}>[ رواه: {zkarItem.reference} ]</span> : '' }
                                            
                                            </div>
                                    
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
                            
                            )) } 
                        
                            </Splide>
                        
                            <span className={style.currentIndex}>{currentIndex + 1} / {categoryContent.length}</span>
                        
                        </div>
                    
                    </div>
                
                    <div className="row gy-2 mt-5">
                
                        {Array.from(allAzkar.entries()).map( ([zkar], index) => (
                        
                            <div className="col-md-6 col-lg-4" key={index}>
                        
                                <Link to={`/azkarCatagories/${encodeURIComponent(zkar)}`} onClick={() => {handleZikrClick(zkar); window.scrollTo({top: 300, behavior: 'smooth'})}}>
                                
                                    <div className={style.box}>
                                    
                                        {/* <div className={style.image}>
                                        
                                            <img src={images[index % images.length]} alt={`Azkar images ${index + 1}`} loading='lazy' />
                                        
                                        </div> */}
                                    
                                        <h4>{zkar}</h4>
                                    
                                    </div>
                                
                                </Link>
                            
                            </div>
                        
                        ) )}
                    
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
