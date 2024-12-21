import React, { useEffect, useRef, useState } from 'react'
import loadingImg from '../../images/loading.png'
import style from './News.module.scss'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'
import DOMPurify from 'dompurify';

export default function News() {

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    const movingZikrRef = useRef(null);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);

    const [zikrScrollVisible, setZikrScrollVisible] = useState(false)

    const toggleZikrScroll = () => {
        setZikrScrollVisible(!zikrScrollVisible)
    }

    const [topics, setTopics] = useState([])
    const [likes, setLikes] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts

    const [loading, setLoading] = useState(true)
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/news/');
            const data = await response.json();
            setTopics(data.News || []); 
        
            const initialLikes = {};
            data.News.forEach( (topic) => {
                initialLikes[topic._id] = topic.Likes
            } )

            setLikes(initialLikes)

        } catch {
        } finally {
            setLoading(false)
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle like button click
    const handleLikeClick = async (topicId) => {

        if (likes[topicId]) {
            return;
        }

        const isLiked = !likes[topicId]

        const currentLikes = topics.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setTopics(currentLikes)

        setLikes( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = topics.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/news/${topicId}`, {
                ...topic,  // Send the entire blog data
                Likes: isLiked ? topic.Likes + 1 : topic.Likes // Update just the Likes field
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if(response.status === 200 || response.status === 201) {
                
                const updatedLikes = topic.Likes

                // Update the topics with the new like count
                setTopics( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchData()
    }

    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${monthName} ${day}, ${year}`; // Return formatted date
    };

    const handleScrollToTopic = (topicId) => {
        const element = document.getElementById(topicId);
        if (element) {
            const headerOffset = 150; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Get the last three topics from the array
    const recentBlogs = topics.slice(-5); 

    const text = "Blogs, News, Events"

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

    // if (loading) {
    //     return  <div id="page">
    //     <div id="container">
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="ring" />
    //       <div id="h3">loading</div>
    //     </div>
    //   </div>
    // }

    if (loading) {
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
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
            
                {/* <div className={`text-center mb-5`}>
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>News</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                            {text.split('').map( (char, index) => 
                            
                                <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                            
                            )}

                        </motion.h3>
                
                </div> */}
            
            </div>

            <div className="container">
            
                { topics.length > 0 ? (
                
                    <div className="row gy-2 mt-5">
                    
                        <div className="col-md-8">
                        
                            {topics.map( (topic, index) => (

                                <div key={topic._id} className={style.topicSection}>
                                
                                    <div className={style.topicDesign} id={topic._id}>

                                        <span className={style.count}>{index + 1}</span>

                                        <h3 className={style.title}>{topic.title}</h3>

                                    </div> 

                                    {topic.video ? (
                                        <div className={style.videoContainer}>
                                        <video className={style.videoPlayer}  controls>
                                            <source src={topic.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    ) : (
                                        <div className={style.image}>

                                            <img src={`http://147.79.101.225:2859/uploads/News/${topic.imageName}`} alt={topic.title} loading='lazy' />

                                        </div>
                                    ) }

    {/* <p className={style.paragraph}> */}
                                        <div className={style.paragraph}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(topic.description, {
                    ADD_TAGS: ["img", "video", "iframe", "p", "div", "span", "br"],
                    ADD_ATTR: ["src", "controls", "alt", "class", "style", "allow", "allowfullscreen", "frameborder", "scrolling"],
                }),
            }}
    />
    {/* </p> */}

                                    <div className={`${style.details} d-flex gap-3`}>

                                        <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>

                                        {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClick(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}

                                        {/* <span><i className="fa-regular fa-eye"></i>{topic.Views}</span> */}

                                    </div>

                                </div>

                            ) )}

                            {/* <div className={style.topicSection}>
                            
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>1</span>
                                
                                    <h3 className={style.title}>The Purpose of Life</h3>
                                
                                </div> 
                            
                                <div className={style.video}>
                                
                                    <iframe src="https://www.youtube.com/embed/Zor1et-rT8c?si=Z9ZqFmGY27DUDk1R" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                
                                    <p className={style.paragraph}>Khalid Yasin delivered this lecture in Saudi Arabia in 1994, which resulted in 43 persons accepting Islam on that very night. What Is The Purpose of Life? Why are we here and where are we going? Through the verses of the Holy Qur'an, Shaykh Khalid Yasin expounds upon the creation of the universe and this amazing world we live in -- and how it came to be. With his logical style of argument, the Shaykh answers these questions with much wisdom.</p>
                                
                                </div>
                            
                            </div>
                        
                            <div className={style.topicSection}>
                            
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>2</span>
                                
                                    <h3 className={style.title}>The Purpose of Life</h3>
                                
                                </div> 
                            
                                <div className={style.video}>
                                
                                    <iframe src="https://www.youtube.com/embed/Y5W1dkXv05Q?si=JsO18Tonf0__mlop" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                
                                    <p className={style.paragraph}>Khalid Yasin delivered this lecture in Saudi Arabia in 1994, which resulted in 43 persons accepting Islam on that very night. What Is The Purpose of Life? Why are we here and where are we going? Through the verses of the Holy Qur'an, Shaykh Khalid Yasin expounds upon the creation of the universe and this amazing world we live in -- and how it came to be. With his logical style of argument, the Shaykh answers these questions with much wisdom.</p>
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eum error dolorum ut natus officiis in quos harum aspernatur laborum. Voluptas asperiores consequuntur et qui necessitatibus, dolores tempora pariatur provident repudiandae rem molestias! Officia a possimus, voluptatem maiores autem similique, quae illum dolorum mollitia laborum tempore reprehenderit accusamus? Ab reiciendis nobis quasi repudiandae, cumque eaque a nulla ipsa commodi non magni odio enim? Maxime impedit dolore possimus reprehenderit ab quisquam iste, neque, exercitationem similique autem consectetur quas nesciunt cum ratione vel, animi expedita cumque mollitia recusandae nobis qui. Neque nemo dolorum tempore assumenda alias, commodi corrupti quisquam maxime omnis quae?</p>
                            
                            </div>
                        
                            <div className={style.topicSection}>
                            
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>3</span>
                                
                                    <h3 className={style.title}>The Purpose of Life</h3>
                                
                                </div> 
                            
                                <div className={style.video}>
                                
                                    <iframe src="https://www.youtube.com/embed/NQbnt5ZLRu8?si=c7MbzlcF228s_9nZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                
                                    <p className={style.paragraph}>Khalid Yasin delivered this lecture in Saudi Arabia in 1994, which resulted in 43 persons accepting Islam on that very night. What Is The Purpose of Life? Why are we here and where are we going? Through the verses of the Holy Qur'an, Shaykh Khalid Yasin expounds upon the creation of the universe and this amazing world we live in -- and how it came to be. With his logical style of argument, the Shaykh answers these questions with much wisdom.</p>
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eum error dolorum ut natus officiis in quos harum aspernatur laborum. Voluptas asperiores consequuntur et qui necessitatibus, dolores tempora pariatur provident repudiandae rem molestias! Officia a possimus, voluptatem maiores autem similique, quae illum dolorum mollitia laborum tempore reprehenderit accusamus? Ab reiciendis nobis quasi repudiandae, cumque eaque a nulla ipsa commodi non magni odio enim? Maxime impedit dolore possimus reprehenderit ab quisquam iste, neque, exercitationem similique autem consectetur quas nesciunt cum ratione vel, animi expedita cumque mollitia recusandae nobis qui. Neque nemo dolorum tempore assumenda alias, commodi corrupti quisquam maxime omnis quae?</p>
                            
                            </div> */}
                        
                        </div>
                    
                        <div className="col-md-4">
                        
                            <div className={style.box}>
                                
                                <h4 className={style.title}>Recent Blogs</h4>
                            
                                <ul>
                                
                                    {topics.length > 0 ? (
                                    
                                        recentBlogs.map( (topic, index) => ( 
                                        
                                            <li className={style.quickLink} key={topic._id}>
                                            
                                                <div className={`${style.cardBox} d-flex align-items-center`}>
                                                
                                                    <div className={style.cardBody}>
                                                    
                                                        <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.cardTitle}><h4>{topic.title}</h4></a>
                                                    
                                                        <p className={style.paragraph}>{getDate(topic.createdAt)}</p>
                                                    
                                                    </div>
                                                
                                                </div>
                                            
                                            </li>
                                        
                                        ) ) ) : ("")}
                                
                                </ul>
                            
                            </div>
                        
                            <div className={style.box}>
                            
                                <h4 className={style.title}>Blog Categories</h4>
                            
                                <ul>
                                
                                    {
                                    
                                        topics.map( (topic, index) => ( 
                                        
                                            <li className={style.quickLink} key={topic._id}>
                                            
                                                <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.blogTitle}>{topic.title}</a>
                                            
                                            </li>
                                        
                                        ) )}
                                
                                </ul>
                            
                            </div>
                        
                            <div className={`${style.box} ${style.mostLikedBox} ${style.sticky}`} ref={mostLikedRef}>
                            
                                <h4 className={style.title}>most Views</h4>
                            
                                <ul>
                                
                                {topics
                                    .sort((a, b) => b.Views - a.Views)
                                    .map((topic) => (
                                        
                                            <li className={style.quickLink} key={topic._id}>
                                            
                                                <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                            
                                            </li>
                                        
                                        ) )}
                                
                                </ul>
                            
                            </div>

                        </div>
                    
                    </div>
                
                ) : (
                
                    <p className={`mt-5 ${style.fullEmpty}`}><span>There is no blogs right now! <br></br> Try again in another time</span></p>                
                ) }
            
                
            
            </div>
        
            <span className={style.showToggle} onClick={toggleZikrScroll}>{zikrScrollVisible && <> <i className="fa-solid fa-caret-up"></i> show</>}</span>

<div className={`${style.zikrScroll} ${zikrScrollVisible ? 'd-none' : 'd-flex'}`}>
    <span className={style.hideToggle} onClick={toggleZikrScroll}>{ !zikrScrollVisible && <> <i className="fa-solid fa-caret-down"></i>hide </>}</span>
                
            <div className={style.scrollContent} onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = 'paused';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                    }}>

                    {Array.from(dataZikr.entries()).map( ([zkar, items], index) => (

                            <div key={index} className={style.box}>

                                <ul>

                                    {items.map((item, key) => (
                                    
                                        <span key={key}>
                                            
                                            <li>
                                            <h4 >{zkar}</h4>
                                                <p>{item.zikr}</p>
                                                
                                            </li>
                                        
                                        </span>
                                    ))}

                                </ul>

                            </div>
                    
                    ) )}

                </div>
            
            </div>

        </div>
    
    )
}
