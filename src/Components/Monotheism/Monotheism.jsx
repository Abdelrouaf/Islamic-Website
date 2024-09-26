import React, { useEffect, useRef, useState } from 'react'
import style from './Monotheism.module.scss'
import { NavLink } from 'react-router-dom';

export default function Monotheism() {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true)
    const [isSticky, setIsSticky] = useState(false); // State to track if the box should be sticky

    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/monotheismBlog/');
                const data = await response.json();
                // If the response has the array inside another object, access it properly
                setTopics(data.monothesimBlog || []); // Assuming 'monothesimBlog' is the key holding the array
            } catch (error) {
                console.error('Error fetching the topics:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

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
            const headerOffset = 90; // Adjust this value based on your header height
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

    if (loading) return <p className='section'> Loading.... </p>

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
            
                <div className={`text-center mb-5`}>
                
                    <span className={style.headTitle}>Monotheism</span>
                
                    <h3 className={style.title}>Definition, Examples, & Facts</h3>
                
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
                                    
                                        <img src={topic.image} alt={topic.title} />
                                    
                                    </div>
                                
                                    <div className={`${style.details} d-flex gap-3`}>
                                    
                                        <span><i className="fa-regular fa-calendar"></i>{getDate(topic.createdAt)}</span>
                                    
                                        <span><i className="fa-regular fa-heart"></i> {topic.Likes}</span>
                                    
                                        <span><i className="fa-regular fa-eye"></i> {topic.Views} </span>
                                    
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
                                                
                                                    <a href={`#${topic._id}`}><img src={topic.image} alt={topic.title} /></a>
                                                
                                                </div>
                                            
                                                <div className={style.cardBody}>
                                                
                                                    <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.cardTitle}><h4>{topic.title}</h4></a>
                                                
                                                    <p className={style.paragraph}>July 21, 2024</p>
                                                
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
                                        
                                            <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.blogTitle}>{topic.title}</a>
                                        
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
                                        
                                            <a href={`#${topic._id}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic._id); }} className={style.mostLiked}>{topic.title}</a>
                                        
                                        </li>
                                    
                                    ) )}
                            
                            </ul>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            ) : (<p className={`text-center ${style.section}`}>No topics available <NavLink to='/' className={`${style.readBtn}`}>Back Home</NavLink></p>) }
            
            </div>
        
        </div>
    
    )
}