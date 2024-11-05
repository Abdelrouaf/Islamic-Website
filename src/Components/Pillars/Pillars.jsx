import React, { useEffect, useRef, useState } from 'react'
import style from './Pillars.module.scss'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'

export default function Pillars() {

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    const movingZikrRef = useRef(null);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);

    const [shahadahTopic, setShahadahTopic] = useState([])
    const [salahTopic, setSalahTopic] = useState([])
    const [sawmTopic, setSawmTopic] = useState([])
    const [zakatTopic, setZakatTopic] = useState([])
    const [haijTopic, setHaijTopic] = useState([])
    const [likesShahadah, setLikesShahadah] = useState([])
    const [likesPrayer, setLikesPrayer] = useState([])
    const [likesSawm, setLikesSawm] = useState([])
    const [likesZakat, setLikesZakat] = useState([])
    const [likesHaij, setLikesHaij] = useState([])
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    const fetchShahadah = async () => {
        
        try {
            const shahadahResponse = await fetch('http://147.79.101.225:2859/api/certificateBlog/')
            const data1 = await shahadahResponse.json();
        
            setShahadahTopic(data1.CertificateBlog || [])
        
            const initialLikesShahadah = {};
            data1.CertificateBlog.forEach( (topic) => {
                initialLikesShahadah[topic._id] = topic.Likes
            } )

            setLikesShahadah(initialLikesShahadah)

            // ////////////////////////////////////////////////
            const salahResponse = await fetch('http://147.79.101.225:2859/api/prayerBlog/')
            const data2 = await salahResponse.json();
        
            setSalahTopic(data2.PrayerBlog || [])
        
            const initialLikesPrayer = {};
            data2.PrayerBlog.forEach( (topic) => {
                initialLikesPrayer[topic._id] = topic.Likes
            } )

            setLikesPrayer(initialLikesPrayer)

            // /////////////////
            const sawmResponse = await fetch('http://147.79.101.225:2859/api/fastingBlog/')
            const data3 = await sawmResponse.json();
        
            setSawmTopic(data3.FastingBlog || [])
        
            const initialLikesSawm = {};
            data3.FastingBlog.forEach( (topic) => {
                initialLikesSawm[topic._id] = topic.Likes
            } )

            setLikesSawm(initialLikesSawm)

            // /////////////////////
            const zakatResponse = await fetch('http://147.79.101.225:2859/api/zakatBlog/')
            const data4 = await zakatResponse.json();
        
            setZakatTopic(data4.ZakatBlog || [])
        
            const initialLikesZakat = {};
            data4.ZakatBlog.forEach( (topic) => {
                initialLikesZakat[topic._id] = topic.Likes
            } )

            setLikesZakat(initialLikesZakat)

            // ////////////////////////////////////
            const haijResponse = await fetch('http://147.79.101.225:2859/api/haijBlog/')
            const data5 = await haijResponse.json();
        
            setHaijTopic(data5.HaijBlog || [])
        
            const initialLikesHaij = {};
            data5.HaijBlog.forEach( (topic) => {
                initialLikesHaij[topic._id] = topic.Likes
            } )

            setLikesHaij(initialLikesHaij)

        } catch {
        }
    }

    useEffect( () => {
        fetchShahadah();
    }, [])

    // Function to handle like button click
    const handleLikeClickShahadah = async (topicId) => {

        if (likesShahadah[topicId]) {
            return;
        }

        const isLiked = !likesShahadah[topicId]

        const currentLikes = shahadahTopic.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setShahadahTopic(currentLikes)

        setLikesShahadah( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = shahadahTopic.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/certificateBlog/${topicId}`, {
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
                setShahadahTopic( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchShahadah()
    }

    // Function to handle like button click
    const handleLikeClickPrayer = async (topicId) => {

        if (likesPrayer[topicId]) {
            return;
        }

        const isLiked = !likesPrayer[topicId]

        const currentLikes = salahTopic.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setSalahTopic(currentLikes)

        setLikesPrayer( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = salahTopic.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/prayerBlog/${topicId}`, {
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
                setSalahTopic( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchShahadah()
    }

    // Function to handle like button click
    const handleLikeClickSawm = async (topicId) => {

        if (likesSawm[topicId]) {
            return;
        }

        const isLiked = !likesSawm[topicId]

        const currentLikes = sawmTopic.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setSawmTopic(currentLikes)

        setLikesSawm( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = sawmTopic.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/fastingBlog/${topicId}`, {
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
                setSawmTopic( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchShahadah()
    }

    // Function to handle like button click
    const handleLikeClickZakat = async (topicId) => {

        if (likesZakat[topicId]) {
            return;
        }

        const isLiked = !likesZakat[topicId]

        const currentLikes = zakatTopic.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setZakatTopic(currentLikes)

        setLikesZakat( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = zakatTopic.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/zakatBlog/${topicId}`, {
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
                setZakatTopic( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchShahadah()
    }

    // Function to handle like button click
    const handleLikeClickHaij = async (topicId) => {

        if (likesHaij[topicId]) {
            return;
        }

        const isLiked = !likesHaij[topicId]

        const currentLikes = haijTopic.map( (topic) => 
            topic._id === topicId ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes } : topic
        )

        setHaijTopic(currentLikes)

        setLikesHaij( (prevLikes) => ({
            ...prevLikes,
            [topicId]: isLiked,
        }) )

        try {

            const topic = haijTopic.find( (t) => t._id === topicId )

            const response = await axios.post(`http://147.79.101.225:2859/api/haijBlog/${topicId}`, {
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
                setHaijTopic( (prevTopics) => 
                
                    prevTopics.map( (t) => t._id === topicId ? {...t, Likes: updatedLikes } : t    )

                )

            }

        } catch  {
        }

        fetchShahadah()
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

    // Merge all topics into one array
    const allTopics = [
        ...shahadahTopic.map(t => ({ ...t, pillar: 'shahadah' })),
        ...salahTopic.map(t => ({ ...t, pillar: 'salah' })),
        ...sawmTopic.map(t => ({ ...t, pillar: 'sawm' })),
        ...zakatTopic.map(t => ({ ...t, pillar: 'zakat' })),
        ...haijTopic.map(t => ({ ...t, pillar: 'haij' })),
    ];

    // Sort topics by Likes in descending order
    const mostLikedTopics = allTopics.sort((a, b) => b.Likes - a.Likes);

    const text = "Five Pillars of Islam"

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
            
                <div className="text-center mb-5">
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>The pillars of Islam</motion.span>
                
                    <motion.h3 className={style.title} initial='hidden' animate='visible' variants={h3Variants}>

                        {text.split('').map( (char, index) => 
                        
                            <motion.span key={index} variants={spanVariants}>{char}</motion.span>
                        
                        )}

                    </motion.h3>
                
                </div>
            
            </div>
        
            <div className="container">
            
                {/* <div className="text-center mb-5">
                
                    <span className={style.headTitle}>The pillars of Islam</span>
                
                    <h3 className={style.title}>Five Pillars of Islam</h3>
                
                </div> */}
            
                {/* <div className={style.titles}>
                
                    <span className={style.headTitle2}>The pillars of Islam</span>
                
                    <h3 className={style.title2}>Five Pillars of Islam</h3>
                
                </div> */}
            
                <div className="row mt-5">
                
                    <div className="col-md-8">
                    
                        {shahadahTopic.map( (shahadah, index) => (
                        
                            <div className={style.shahadah} key={shahadah._id} id='shahadah'>
                        
                                {shahadahTopic[0]._id === shahadah._id ? 
                                
                                
                                
                                    <div className={style.topicDesign}>
                                    
                                        <span className={style.count}>1</span>
                                    
                                        <h3 className={style.title}>{shahadah.title}</h3>
                                    
                                    </div> 
                                
                                
                                
                                : ''}
                            
                                <div className={style.image}>
                                
                                    <img src={`http://147.79.101.225:2859/uploads/Images/${shahadah.imageName}`} alt={shahadah.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(shahadah.createdAt)}</span>
                                
                                    {/* <span><i className={`fa-regular fa-heart ${likesShahadah[shahadah._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickShahadah(shahadah._id)} style={{ cursor: 'pointer' }}></i> {shahadah.Likes}</span> */}
                                
                                    {/* <span><i className="fa-regular fa-eye"></i>{shahadah.Views}</span> */}
                                
                                </div>
                            
                                {/* <div className={style.ayat}>
                                    
                                    <span className={style.enSurah}> <span className={style.basmala}>In the name of allah, the beneficent, the merciful</span>
                                        Say: He is Allah, the One! (1) Allah, the eternally Besought of all! (2) He begetteth not nor was begotten. (3) And there is none comparable unto Him. (4) <span className={style.surah}>(Surah AL-IKHLAS)</span> </span>
                                
                                    <span className={style.arSurah}> <span className={style.basmala}>بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ</span>
                                        قُلۡ هُوَ ٱللَّهُ أَحَدٌ (﻿١﻿) ٱللَّهُ ٱلصَّمَدُ (﻿٢﻿) لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ (﻿٣﻿) وَلَمۡ يَكُن لَّهُ ۥ ڪُفُوًا أَحَدٌ (﻿٤﻿) <span className={style.surah}>(سُوۡرَةُ الإخلاص)</span></span>
                                
                                </div> */}
                            
                                {shahadahTopic[0]._id !== shahadah._id ? <h4 className={style.subTitle}>{shahadah.title}</h4> : '' }
                            
                                <p className={style.paragraph}>{shahadah.description}</p>
                            
                            </div>
                        
                        ) )}
                    
                        {salahTopic.map( (salah, index) => (
                        
                            <div className={style.salah} key={salah._id} id='salah'>
                        
                            {salahTopic[0]._id === salah._id ? 
                                
                                
                                
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>2</span>
                                
                                    <h3 className={style.title}>{salah.title}</h3>
                                
                                </div> 
                            
                            
                            
                            : ''}
                            
                                <div className={style.image}>
                                
                                    <img src={`http://147.79.101.225:2859/uploads/Images/${salah.imageName}`} alt={salah.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(salah.createdAt)}</span>
                                
                                    {/* <span><i className={`fa-regular fa-heart ${likesPrayer[salah._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickPrayer(salah._id)} style={{ cursor: 'pointer' }}></i> {salah.Likes}</span> */}
                                
                                    {/* <span><i className="fa-regular fa-eye"></i> {salah.Views} </span> */}
                                
                                </div>
                            
                                {salahTopic[0]._id !== salah._id ? <h4 className={style.subTitle}>{salah.title}</h4> : '' }
                            
                                <p className={style.paragraph}>{salah.description}</p>
                            
                            </div>
                            
                        ) )}
                    
                        {sawmTopic.map( (sawm, index) => (
                        
                            <div className={style.sawm} key={sawm._id} id='sawm'>
                            
                            {sawmTopic[0]._id === sawm._id ? 
                                
                                
                                
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>1</span>
                                
                                    <h3 className={style.title}>{sawm.title}</h3>
                                
                                </div> 
                            
                            
                            
                            : ''}
                            
                                <div className={style.image}>
                                
                                    <img src={`http://147.79.101.225:2859/uploads/Images/${sawm.imageName}`} alt={sawm.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(sawm.createdAt)}</span>
                                
                                    {/* <span><i className={`fa-regular fa-heart ${likesSawm[sawm._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickSawm(sawm._id)} style={{ cursor: 'pointer' }}></i> {sawm.Likes}</span> */}
                                
                                    {/* <span><i className="fa-regular fa-eye"></i>{sawm.Views}</span> */}
                                
                                </div>
                            
                                {sawmTopic[0]._id !== sawm._id ? <h4 className={style.subTitle}>{sawm.title}</h4> : '' }
                            
                                <p className={style.paragraph}>{sawm.description}</p>
                            
                            </div>
                        
                        ) )}
                    
                        {zakatTopic.map( (zakat, index) => (
                        
                            <div className={style.zakat} key={zakat._id} id='zakat'>
                        
                            {zakatTopic[0]._id === zakat._id ? 
                                
                                
                                
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>1</span>
                                
                                    <h3 className={style.title}>{zakat.title}</h3>
                                
                                </div> 
                            
                            
                            
                            : ''}
                            
                                <div className={style.image}>
                                
                                    <img src={`http://147.79.101.225:2859/uploads/Images/${zakat.imageName}`} alt={zakat.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(zakat.createdAt)}</span>
                                
                                    {/* <span><i className={`fa-regular fa-heart ${likesZakat[zakat._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickZakat(zakat._id)} style={{ cursor: 'pointer' }}></i> {zakat.Likes}</span> */}
                                
                                    {/* <span><i className="fa-regular fa-eye"></i>{zakat.Views}</span> */}
                                
                                </div>
                            
                                {zakatTopic[0]._id !== zakat._id ? <h4 className={style.subTitle}>{zakat.title}</h4> : '' }
                            
                                <p className={style.paragraph}>{zakat.description}</p>
                            
                            </div>
                        
                        ) )}
                    
                        {haijTopic.map( (haij, index) => (
                        
                            <div className={style.haij} key={haij._id} id='haij'>
                            
                            {haijTopic[0]._id === haij._id ? 
                                
                                <div className={style.topicDesign}>
                                
                                    <span className={style.count}>1</span>
                                
                                    <h3 className={style.title}>{haij.title}</h3>
                                
                                </div> 
                            
                            : ''}
                            
                                <div className={style.image}>
                                
                                    <img src={`http://147.79.101.225:2859/uploads/Images/${haij.imageName}`} alt={haij.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(haij.createdAt)}</span>
                                
                                    {/* <span><i className={`fa-regular fa-heart ${likesHaij[haij._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClickHaij(haij._id)} style={{ cursor: 'pointer' }}></i> {haij.Likes}</span> */}
                                
                                    {/* <span><i className="fa-regular fa-eye"></i>{haij.Views}</span> */}
                                
                                </div>
                            
                                {haijTopic[0]._id !== haij._id ? <h4 className={style.subTitle}>{haij.title}</h4> : '' }
                            
                                <p className={style.paragraph}>{haij.description}</p>
                            
                            </div>
                        
                        ) )}
                    
                    </div>
                
                    <div className="col-md-4">
                    
                        <div className={style.box}>
                        
                        <h4 className={style.title}>Blog Categories</h4>
                    
                        <ul>
                        
                            <li className={style.quickLink}>
                            
                                <a href={`#shahadah`} onClick={(e) => { e.preventDefault(); handleScrollToTopic('shahadah'); }} className={style.blogTitle}>shahadah</a>
                            
                            </li>
                        
                            <li className={style.quickLink}>
                            
                                <a href="#salah" onClick={(e) => { e.preventDefault(); handleScrollToTopic('salah'); }} className={style.blogTitle}>Salah (Prayer)</a>
                            
                            </li>
                        
                            <li className={style.quickLink}>
                            
                                <a href="#sawm" onClick={(e) => { e.preventDefault(); handleScrollToTopic('sawm'); }} className={style.blogTitle}>Sawm (Fasting)</a>
                            
                            </li>
                        
                            <li className={style.quickLink}>
                            
                                <a href="#zakat" onClick={(e) => { e.preventDefault(); handleScrollToTopic('zakat'); }} className={style.blogTitle}>Zakat (Almsigiving)</a>
                            
                            </li>
                        
                            <li className={style.quickLink}>
                            
                                <a href="#haij" onClick={(e) => { e.preventDefault(); handleScrollToTopic('haij'); }} className={style.blogTitle}>Haij (Pilgrimage)</a>
                        
                            </li>
                        
                        </ul>
                    
                    </div>
                
                    <div className={`${style.box} ${style.mostLikedBox} ${style.sticky}`} ref={mostLikedRef}>
                    
                        <h4 className={style.title}>most Liked</h4>
                    
                        <ul>
                        
                        {/* {topics
                            .sort((a, b) => b.Likes - a.Likes) 
                            .map((topic) => ( */}
                                
                                    {/* <li className={style.quickLink}>
                                    
                                        <a href={`#shahadah`} onClick={(e) => { e.preventDefault(); handleScrollToTopic('shahadah'); }} className={style.mostLiked}>shahadah</a>
                                    
                                    </li>
                                
                                    <li className={style.quickLink}>
                                    
                                        <a href="#salah" onClick={(e) => { e.preventDefault(); handleScrollToTopic('salah'); }} className={style.mostLiked}>Salah (Prayer)</a>
                                    
                                    </li>
                                
                                    <li className={style.quickLink}>
                                    
                                        <a href="#sawm" onClick={(e) => { e.preventDefault(); handleScrollToTopic('sawm'); }} className={style.mostLiked}>Sawm (Fasting)</a>
                                    
                                    </li>
                                
                                    <li className={style.quickLink}> 
                                    
                                        <a href="#zakat" onClick={(e) => { e.preventDefault(); handleScrollToTopic('zakat'); }} className={style.mostLiked}>Zakat (Almsigiving)</a>
                                    
                                    </li>
                                
                                    <li className={style.quickLink}>
                                    
                                        <a href="#haij" onClick={(e) => { e.preventDefault(); handleScrollToTopic('haij'); }} className={style.mostLiked}>Haij (Pilgrimage)</a>
                                
                                    </li> */}
                                
                                {/* ) )} */}
                        
                                {mostLikedTopics.slice(0, 5).map((topic) => (
                                    <li className={style.quickLink} key={topic._id}>
                                        <a href={`#${topic.pillar}`} onClick={(e) => { e.preventDefault(); handleScrollToTopic(topic.pillar); }} className={style.mostLiked}>
                                            {topic.pillar} ({topic.Likes} Likes)
                                        </a>
                                    </li>
                                ))}

                        </ul>
                    
                    </div>
                    
                    </div>
                
                </div>
            
            </div>
        
            <div className={style.zikrScroll}>
                
                <div className={style.scrollContent}>

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