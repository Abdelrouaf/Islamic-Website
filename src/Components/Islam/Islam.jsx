import React, { useEffect, useRef, useState } from 'react'
import style from './Islam.module.scss'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Islam() {

    const [topics, setTopics] = useState([])
    const [likes, setLikes] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts

    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/lifeBlogs/');
            const data = await response.json();
            setTopics(data.LifeBlog || []); 
        
            const initialLikes = {};
            data.LifeBlog.forEach( (topic) => {
                initialLikes[topic._id] = topic.Likes
            } )

            setLikes(initialLikes)

        } catch {
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

            const response = await axios.post(`http://147.79.101.225:2859/api/lifeBlogs/${topicId}`, {
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

    const text = "The Purpose Of Life"

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
            
                <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>About Islam</motion.span>
            
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
                
                    <div className="col-md-8">
                    
                        {topics.map( (topic, index) => (

                            <div key={topic._id} className={style.topicSection}>
                            
                                <div className={style.topicDesign} id={topic._id}>

                                    <span className={style.count}>{index + 1}</span>

                                    <h3 className={style.title}>{topic.title}</h3>

                                </div> 

                                <div className={style.video}>

                                    <iframe src={topic.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                                    <p className={style.paragraph}>{topic.description}</p>

                                    <div className={`${style.details} d-flex gap-3`}>

                                        <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>

                                        {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClick(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}

                                        {/* <span><i className="fa-regular fa-eye"></i>{topic.Views}</span> */}

                                    </div>

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
                    
                        {/* <div className={style.box}>
                        
                            <h4 className={style.title}>Quick Links</h4>
                        
                            <ul>
                            
                                <li>
                                    
                                    <a href="#part1 "><i className="fa-solid fa-chevron-right"></i>The Purpose of Life (Part 1)</a>
                                
                                </li>
                            
                                <li>
                                
                                    <a href="#part2"><i className="fa-solid fa-chevron-right"></i>The Purpose of Life (Part 2)</a>
                                
                                </li>
                            
                                <li>
                                
                                    <a href="#part3"><i className="fa-solid fa-chevron-right"></i>The Purpose of Life (Part 3)</a>
                                
                                </li>
                            
                            </ul>
                        
                        </div> */}
                    
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
                        
                            <h4 className={style.title}>most Liked</h4>
                        
                            <ul>
                            
                            {topics
                                .sort((a, b) => b.Likes - a.Likes)
                                .map((topic) => (
                                    
                                        <li className={style.quickLink} key={topic._id}>
                                        
                                            <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                        
                                        </li>
                                    
                                    ) )}
                            
                            </ul>
                        
                        </div>

                    </div>
                
                </div>
            
            </div>
        
        </div>
    
    )
}
