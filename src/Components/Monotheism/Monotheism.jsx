import React, { useEffect, useRef, useState } from 'react'
import style from './Monotheism.module.scss'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'

export default function Monotheism() {

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

    const [topics, setTopics] = useState([]);
    const [isSticky, setIsSticky] = useState(false); // State to track if the box should be sticky
    const [likes, setLikes] = useState([])
    // const [loading, setLoading] = useState(true)

    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts

    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/monotheismBlog/');
            const data = await response.json();
            // If the response has the array inside another object, access it properly
            setTopics(data.monothesimBlog || []); // Assuming 'monothesimBlog' is the key holding the array
        
            const initialLikes = {};
            data.monothesimBlog.forEach( (topic) => {
                initialLikes[topic._id] = topic.Likes
            } )

            setLikes(initialLikes)
            // setLoading(false)
        } catch  {
            // setLoading(false)
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

            const response = await axios.post(`http://147.79.101.225:2859/api/monotheismBlog/${topicId}`, {
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

    // if (loading) {
    //     return <p className={`${style.loading} ${style.section}`}>Loading, Please wait <span className={style.loader}></span></p>; 
    // }  

    const text = "Definition, Examples, & Facts"

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
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Monotheism</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                        {text.split('').map( (char, index) => 
                        
                            <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                        
                        )}

                    </motion.h3>
                
                </div>
            
            </div>
        
            <div className="container">
            
                {/* <div className="text-center mb-5">
                
                    <span className={style.headTitle}>Monotheism</span>
                
                    <h3 className={style.title}>Definition, Examples, & Facts</h3>
                
                </div> */}
            
                {/* <div className={style.titles}>
                
                    <span className={style.headTitle2}>Monotheism</span>
                
                    <h3 className={style.title2}>Definition, Examples, & Facts</h3>
                
                </div> */}
            { topics.length > 0 ? (
                <div className="row mt-5">
                
                    <div className="col-md-8">
                    
                        
                        
                            {topics.map( (topic, index) => (
                            
                                <div key={topic._id} className={style.topicSection}>
                                
                                    <div className={style.topicDesign} id={topic._id}>
                                    
                                        <span className={style.count}>{index + 1}</span>
                                    
                                        <h3 className={style.title}>{topic.title}</h3>
                                    
                                    </div> 
                                
                                    <div className={style.image}>
                                    
                                        <img src={`http://147.79.101.225:2859/uploads/Images/${topic.imageName}`} alt={topic.title} loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={`${style.details} d-flex gap-3`}>
                                    
                                        <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>
                                    
                                        {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClick(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}
                                    
                                        {/* <span><i className="fa-regular fa-eye"></i> {topic.Views} </span> */}
                                    
                                    </div>
                                
                                    {topic.surah ? (
                                    
                                        <div className={style.ayat}>
                                        
                                            <span className={style.enSurah}> <span className={style.basmala}>In the name of allah, the beneficent, the merciful</span>
                                                {topic.contentEnglish}<span className={style.surah}>(Surah {topic.surah})</span> </span>
                                        
                                            <span className={style.arSurah}> <span className={style.basmala}>بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ</span>
                                                {topic.contentArabic} <span className={style.surah}>{topic.NumberOfVerse}</span></span>
                                        
                                        </div>
                                    
                                    ): ''}
                                
                                    <p className={style.paragraph}>{topic.description}</p>
                                
                                </div>
                            
                            ) )}
                    
                    </div>
                
                    <div className="col-md-4">
                    
                        <div className={style.box}>
                        
                            <h4 className={style.title}>Recent Blogs</h4>
                        
                            <ul>
                            
                                {/* {topics.length > 0 ? (*/
                                
                                    recentBlogs.map( (topic, index) => ( 
                                    
                                        <li className={style.quickLink} key={topic._id}>
                                        
                                            <div className={`${style.card} d-flex`}>
                                            
                                                <div className={style.image}>
                                                
                                                    <a href={`#${topic.title}`}><img src={`http://147.79.101.225:2859/uploads/Images/${topic.imageName}`} alt={topic.title} loading='lazy' /></a>
                                                
                                                </div>
                                            
                                                <div className={style.cardBody}>
                                                
                                                    <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.cardTitle}><h4>{topic.title}</h4></a>
                                                
                                                    <p className={style.paragraph}>{getDate(topic.createdAt)}</p>
                                                
                                                </div>
                                            
                                            </div>
                                        
                                        </li>
                                    
                                    ) )}
                            
                            </ul>
                        
                        </div>
                    
                        <div className={style.box}>
                        
                            <h4 className={style.title}>Blog Categories</h4>
                        
                            <ul>
                            
                                {
                                
                                    topics.map( (topic, index) => ( 
                                    
                                        <li className={style.quickLink} key={topic._id}>
                                        
                                            <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.blogTitle}>{topic.title}</a>
                                        
                                        </li>
                                    
                                    ) )}
                            
                            </ul>
                        
                        </div>
                    
                        <div className={`${style.box} ${style.mostLikedBox} ${style.sticky}`} ref={mostLikedRef}>
                        
                            <h4 className={style.title}>most Liked</h4>
                        
                            <ul>
                            
                            {topics
                                .sort((a, b) => b.Likes - a.Likes) // Optional: Sort topics by Likes
                                .map((topic) => (
                                    
                                        <li className={style.quickLink} key={topic._id}>
                                        
                                            <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                        
                                        </li>
                                    
                                    ) )}
                            
                            </ul>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            ) : '' }
            
            </div>
        
            <span className={style.showToggle} onClick={toggleZikrScroll}>{zikrScrollVisible && <i className="fa-solid fa-caret-up"></i>}</span>

<div className={`${style.zikrScroll} ${zikrScrollVisible ? 'd-none' : 'd-flex'}`}>
    <span className={style.hideToggle} onClick={toggleZikrScroll}>{ !zikrScrollVisible && <i className="fa-solid fa-caret-down"></i>}</span>
                
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