import React, { useEffect, useRef, useState } from 'react'
import style from './Islam.module.scss'

export default function Islam() {

    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/lifeBlogs/');
                const data = await response.json();
                setTopics(data.LifeBlog || []); 
                
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
            
                <span className={style.headTitle}>About Islam</span>
            
                <h3 className={style.title}>The Purpose Of Life</h3>
            
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

                                        <span><i className="fa-regular fa-heart"></i>{topic.Likes}</span>

                                        <span><i className="fa-regular fa-eye"></i>{topic.Views}</span>

                                    </div>

                                </div>

                            </div>

                        ) )}

                        <div className={style.topicSection}>
                        
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
                        
                        </div>
                    
                    </div>
                
                    <div className="col-md-4">
                    
                        <div className={style.box}>
                        
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
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </div>
        
        </div>
    
    )
}
