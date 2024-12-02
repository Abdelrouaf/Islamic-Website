import React, { useEffect, useRef, useState } from 'react'
import Malcolm from '../../images/malcolmX.png'
import kilay from '../../images/muhammad_ali.png'
import IslamBook from '../../images/Islam.jpg'
import notgodButGodBook from '../../images/not-god-but-God.jpg'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import style from './Faith.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'

export default function Faith() {

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
    const [blogTopics, setBlogTopics] = useState([])
    const [likes, setLikes] = useState([])
    const [likes2, setLikes2] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts

    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/faithBook/');
            const data = await response.json();
            setTopics(data.bookBlog || []); 

            const initialLikes2 = {};
            data.bookBlog.forEach( (topic) => {
                initialLikes2[topic._id] = topic.Likes
            } )

            setLikes2(initialLikes2)

            const blogResponse = await fetch('http://147.79.101.225:2859/api/faithVideo');
            const blogData = await blogResponse.json();
            setBlogTopics(blogData.VideoBlog || []);
        
            const initialLikes = {};
            blogData.VideoBlog.forEach( (topic) => {
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
    const handleLikeClickVideo = async (topicId) => {

        if (likes[topicId]) {
            return;
        }

        const isLiked = !likes[topicId]

        const currentLikes = blogTopics.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setBlogTopics(currentLikes)

        setLikes( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = blogTopics.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/faithVideo/${topicId}`, {
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
                setBlogTopics( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchData()
    }

    // Function to handle like button click
    const handleLikeClickBook = async (topicId) => {

        if (likes2[topicId]) {
            return;
        }

        const isLiked = !likes2[topicId]

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

            const response = await axios.post(`http://147.79.101.225:2859/api/faithBook/${topicId}`, {
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
    const recentBooks = topics.slice(-5);

    const text = "Celebrities & Books & Blogs"

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
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={`${style.headTitle}`}>Faith</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                        {text.split('').map( (char, index) => 
                        
                            <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                        
                        )}

                    </motion.h3>
                
                </div>
            
            </div>

            <div className="container">
            
                {/* <div className="text-center mb-5">
                
                    <span className={style.headTitle}>Faith</span>
                
                    <h3 className={style.title}>Celebrities & Books</h3>
                
                </div> */}
            
                {/* <div className={style.titles}>
                
                    <span className={style.headTitle2}>Faith</span>
                
                    <h3 className={style.title2}>Celebrities & Books</h3>
                
                </div> */}
            
                <Splide className='mt-5' 
                        options={{
                            type: 'loop',
                            drag: 'free',        // Enable free dragging
                            freeScroll: true,    // Enable free scrolling
                            heightRatio: 0.5, // Set the height relative to the width
                            cover: true,     // Ensures images cover the slide area
                            lazyLoad: true,  // Enable lazy loading if needed
                            perPage: 3,          // Number of slides to show per page
                            gap: '20px',         // Gap between slides
                            pagination: false,   // Disable pagination if not needed
                        }}
                    >
                    
                        <SplideSlide >
                        
                            <div className={style.card}>
                            
                                <a href="/faith">
                                
                                    <div className={style.image}>
                                    
                                        <img src={Malcolm} alt="Malcolm" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className="p-2">
                                    
                                        <h4 className={style.celName}>Malcolm x</h4>
                                    
                                        <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, temporibus.</p>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </SplideSlide>
                    
                        <SplideSlide >
                        
                            <div className={style.card}>
                            
                                <a href="/faith">
                                
                                    <div className={style.image}>
                                    
                                        <img src={kilay} alt="kilay" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className="p-2">
                                    
                                        <h4 className={style.celName}>Muhammed Ali</h4>
                                    
                                        <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, temporibus.</p>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </SplideSlide>
                    
                        <SplideSlide >
                        
                            <div className={`${style.card} h-100`}>
                            
                                <a href="/faith">
                                
                                    <div className={style.image}>
                                    
                                        <img src={Malcolm} alt="Malcolm" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className="p-2">
                                    
                                        <h4 className={style.celName}>Malcolm x</h4>
                                    
                                        <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, temporibus.</p>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </SplideSlide>
                    
                </Splide>
            
                <div className={`${style.titleBox} text-center mt-5`}>
                
                    <h3 className={style.title}>Books about Islam</h3>
                
                </div>

                <div className="row gy-2 mt-5">
                
                    <div className="col-md-9">

                        {/* <div className={style.bookSection}>
                        
                            <div className={style.topicDesign}>
                            
                                <span className={style.count}>1</span>
                            
                                <h3 className={style.title}>Islam</h3>
                            
                            </div> 
                        
                            <div className="row align-items-center">

                                <div className="col-md-8">

                                    <span className={style.publisher}>by <span>Karen Armstrong</span></span>

                                    <p className={style.descriptionBook}>No religion in the modern world is as feared and misunderstood as Islam. It haunts the popular imagination as an extreme faith that promotes terrorism, authoritarian government, female oppression, and civil war. In a vital revision of this narrow view of Islam and a distillation of years of thinking and writing about the subject, Karen Armstrong’s short history demonstrates that the world’s fastest-growing faith is a much more complex phenomenon than its modern fundamentalist strain might suggest.</p>

                                </div>

                                <div className="col-md-4">

                                    <div className={style.image}>

                                        <img src={IslamBook} alt="" />

                                    </div>

                                    <div className={`${style.btn} overflow-hidden text-center`}>

                                        <a href='/images/donate.png' className={style.downloadBtn} download='donateImage.png'><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>

                                    </div>

                                </div>

                            </div>
                        
                            
                        
                        </div>
                    
                        <div className={style.bookSection} >
                        
                            <div className={style.topicDesign}>
                                
                                <span className={style.count}>2</span>
                            
                                <h3 className={style.title}>No god but God</h3>
                            
                            </div> 
                        
                            <div className="row align-items-center">

                                <div className="col-md-8">

                                    <span className={style.publisher}>by <span>Reza Aslan</span></span>
                        
                                    <p className={style.descriptionBook}>In No god but God, internationally acclaimed scholar Reza Aslan explains Islam — the origins and evolution of the faith — in all its beauty and complexity. Timely and persuasive, No god but God is an elegantly written account that explains this magnificent yet misunderstood faith.</p>

                                </div>

                                <div className="col-md-4">

                                    <div className={style.image}>
                                        
                                        <img src={notgodButGodBook} alt="" />
                                    
                                    </div>
                                    
                                    <div className={`${style.btn} overflow-hidden text-center`}>
                                    
                                        <a href='/images/donate.png' className={style.downloadBtn} download='donateImage.png'><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>
                                    
                                    </div>
                                
                                </div>

                            </div>
                        
                        </div> */}

                        {topics.map( (topic, index) => (

                            <div key={topic._id} id={topic._id} className={style.bookSection} >
                                                    
                                {/* <div className={style.topicDesign} id={topic._id}>
                                    
                                    <span className={style.count}>{index + 1}</span>

                                    <h3 className={style.title}>{topic.title}</h3>

                                </div>  */}

                                <div className="row gy-2 align-items-center">

                                    <div className="col-md-8">

                                        <h3 className={style.bookTitle}>{topic.title}</h3>

                                        <span className={style.publisher}>by <span>{topic.author}</span></span>

                                        <p className={style.descriptionBook}>{topic.description}</p>

                                        <div className={`${style.details} d-flex gap-3`}>
                                    
                                            <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>
                                        
                                            {/* <span><i className={`fa-regular fa-heart ${likes2[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickBook(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}
                                        
                                            {/* <span><i className="fa-regular fa-eye"></i> {topic.Views} </span> */}
                                        
                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className={style.image}>
                                            
                                            <img src={`http://147.79.101.225:2859/uploads/books/${topic.imageName}`} alt={topic.title} loading='lazy' />
                                        
                                        </div>
                                        
                                        <div className={`${style.btn} overflow-hidden text-center`}>
                                        
                                            <a href={`http://147.79.101.225:2859/uploads/books/${topic.book}`} target='_blank' className={style.downloadBtn} download={`http://147.79.101.225:2859/uploads/Books/${topic.book}`}><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>
                                        
                                        </div>
                                    
                                    </div>

                                </div>

                            </div>

                        ) )}

                        <div className={`${style.titleBox} text-center my-5`}>
                        
                            <h3 className={style.title}>blogs</h3>
                        
                        </div>

                        {blogTopics.map( (topic, index) => (

                            <div key={topic._id} className={style.topicSection}>

                                <div id={topic._id} className={style.topicDesign}>

                                    <span className={style.count}>{index + 1}</span>

                                    <h3 className={style.title}>{topic.title}</h3>

                                </div>

                                <div className={style.videoContainer}>
                                    <video className={style.videoPlayer}  controls>
                                        <source src={`http://147.79.101.225:2859/uploads/Videos/${topic.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                <p className={style.paragraph}>{topic.description}</p>

                                <div className={`${style.details} d-flex gap-3`}>

                                    <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>

                                    {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickVideo(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}

                                    {/* <span><i className="fa-regular fa-eye"></i>{topic.Views}</span> */}

                                </div>

                            </div>

                        ) )}

                        {/* <div className={style.topicSection}>

                            <div className={style.topicDesign}>

                                <span className={style.count}>1</span>

                                <h3 className={style.title}>title</h3>

                            </div>

                            <div className={style.videoContainer}>
                                <video className={style.videoPlayer} controls>
                                    <source src="../../files/القارئ إسلام صبحي .. (وذا النون إذ ذهب مغاضبا).mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <p className={style.paragraph}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad asperiores vitae quo consequuntur iste explicabo numquam fugit, facere deleniti similique!</p>

                            <div className={`${style.details} d-flex gap-3`}>
                            
                                <span><i className="fa-regular fa-calendar"></i>sep 21, 2024</span>
                            
                                <span><i className="fa-regular fa-heart"></i> 5</span>
                            
                                <span><i className="fa-regular fa-eye"></i> 156 </span>
                            
                            </div>

                        </div> */}

                    </div>

                    <div className="col-md-3">
                    
                        {/* <div className={style.box}>
                        
                            <h4 className={style.title}>Quick Links</h4>
                        
                            <ul>
                            
                                <li>
                                    
                                    <a href="#shahadah "><i className="fa-solid fa-chevron-right"></i>islam Book</a>
                                
                                </li>
                            
                                <li>
                                
                                    <a href="#salah"><i className="fa-solid fa-chevron-right"></i>No god but God Book</a>
                                
                                </li>
                            
                            </ul>
                        
                        </div> */}
                    
                    <div className={style.box}>
                        
                        <h4 className={style.title}>Recent Books</h4>
                    
                        <ul>
                        
                            {topics.length > 0 ? (
                            
                                recentBooks.map( (topic, index) => ( 
                                
                                    <li className={style.quickLink} key={topic._id}>
                                    
                                        <div className={`${style.cardBox} d-flex align-items-center`}>
                                        
                                            <div className={style.img}>
                                            
                                                <a href={`#${topic.title}`}><img src={`http://147.79.101.225:2859/uploads/books/${topic.imageName}`} alt={topic.title} loading='lazy' /></a>
                                            
                                            </div>
                                        
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
                                    
                                        <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.blogTitle}>{topic.title}</a>
                                    
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
                                    
                                        <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                    
                                    </li>
                                
                                ) )}
                        
                        </ul>
                    
                    </div>

                    </div>
                
                </div>
            
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
