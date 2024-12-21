import React, { useEffect, useRef, useState } from 'react'
import Malcolm from '../../images/malcolmX.png'
import kilay from '../../images/muhammad_ali.png'
import ahmedDeedat from '../../images/Da3yia.jpg'
import IslamBook from '../../images/Islam.jpg'
import notgodButGodBook from '../../images/not-god-but-God.jpg'
import loadingImg from '../../images/loading.png'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import style from './Faith.module.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'
import DOMPurify from 'dompurify';

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

    const [loading ,setLoading] = useState(true)

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
        } finally {
            setLoading(false)
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
            
            </div>

            <div className="container">
            
                <div className="row gy-3 mt-5">
                    
                    <div className="col-md-6 col-lg-4">
                    
                        <div className={style.card}>
                            
                            <a href="/faith">
                            
                                <div className={style.image}>
                                
                                    <img src={Malcolm} alt="Malcolm" loading='lazy' />
                                
                                </div>
                            
                                <div className="p-2">
                                
                                    <h4 className={style.celName}>Malcolm x</h4>
                                
                                    <p className={style.description}>Malcolm X ( Brother Shahbaz) was a Muslim -  well-read, reflective, minimalist, passionate, and visionary man who taught black Americans the value of self-reliance, self-respect, and pride. He was said to be incorruptible in his principles and beliefs.</p>
                                
                                </div>
                            
                            </a>
                        
                        </div>
                    
                    </div>
                
                    <div className="col-md-6 col-lg-4">
                    
                        <div className={style.card}>
                            
                            <a href="/faith">
                            
                                <div className={style.image}>
                                
                                    <img src={kilay} alt="kilay" loading='lazy' />
                                
                                </div>
                            
                                <div className="p-2">
                                
                                    <h4 className={style.celName}>Muhammed Ali</h4>
                                
                                    <p className={style.description}>Muhammad Ali was one of the greatest boxers in history, the first fighter to win the world heavyweight championship on three separate occasions. In addition, he was known for his social message of black pride and black resistance to white domination and for refusing induction into the U.S. Army during the Vietnam War.</p>
                                
                                </div>
                            
                            </a>
                        
                        </div>
                    
                    </div>
                
                    <div className="col-md-6 col-lg-4">
                    
                        <div className={`${style.card}`}>
                            
                            <a href="/faith">
                            
                                <div className={style.image}>
                                
                                    <img src={ahmedDeedat} alt="Ahmed-Deedat" loading='lazy' />
                                
                                </div>
                            
                                <div className="p-2">
                                
                                    <h4 className={style.celName}>Ahmed Deedat</h4>
                                
                                    <p className={style.description}>Benefacted writer, polymath and dexterous in every wake of expertise, Deedat has been discussed so much up-to-date circumstances. Being a Muslim missionary, his works and lectures had a unique position among the pastoral Christian biblical scholars. Deedat, as the expert of more than twenty different languages, he could convince the audience through his eloquence and scholarship.</p>
                                
                                </div>
                            
                            </a>
                        
                        </div>
                    
                    </div>
                
                </div>
            
                {/* <Splide className='mt-5' 
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
                                    
                                        <img src={ahmedDeedat} alt="Ahmed-Deedat" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className="p-2">
                                    
                                        <h4 className={style.celName}>Ahmed Deedat</h4>
                                    
                                        <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, temporibus.</p>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </SplideSlide>
                    
                </Splide> */}
            
                { topics.length > 0 || blogTopics.length > 0 ? (
                
                    <>
                
                        { topics.length > 0 && (
                        
                            <div className={`${style.titleBox} text-center mt-5`}>
                            
                                <h3 className={style.title}>Books about Islam</h3>
                            
                            </div>
                        
                        ) }
                    
                        <div className="row gy-2 mt-5">
                        
                            <div className="col-md-9">

                                {topics.map( (topic, index) => (

                                    <div key={topic._id} id={topic._id} className={style.bookSection} >

                                        <div className="row gy-2 align-items-center">

                                            <div className="col-md-8">

                                                <h3 className={style.bookTitle}>{topic.title}</h3>

                                                <span className={style.publisher}>by <span>{topic.author}</span></span>

                                                    <div className={style.descriptionBook}
                                                        dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(topic.description, {
                                                                ADD_TAGS: ["img", "video", "iframe", "p", "div", "span", "br"],
                                                                ADD_ATTR: ["src", "controls", "alt", "class", "style", "allow", "allowfullscreen", "frameborder", "scrolling"],
                                                            }),
                                                        }}
                                                    />

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

                                { blogTopics.length > 0 && (
                                
                                    <>
                                    
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

                                                    {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickVideo(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}

                                                    {/* <span><i className="fa-regular fa-eye"></i>{topic.Views}</span> */}

                                                </div>

                                            </div>

                                        ) )}
                                
                                    </>
                                
                                ) }

                            </div>

                            <div className="col-md-3">
                            
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
                                
                                    <h4 className={style.title}>most views</h4>
                                
                                    <ul>
                                    
                                    {topics
                                        .sort((a, b) => b.Views - a.Views)
                                        .map((topic) => (
                                            
                                                <li className={style.quickLink} key={topic._id}>
                                                
                                                    <a href={`#${topic.title}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                                
                                                </li>
                                            
                                            ) )}
                                    
                                    </ul>
                                
                                </div>

                            </div>
                        
                        </div>
                
                    </>
                
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
