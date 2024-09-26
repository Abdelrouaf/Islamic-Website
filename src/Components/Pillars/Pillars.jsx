import React, { useEffect, useRef, useState } from 'react'
import style from './Pillars.module.scss'

export default function Pillars() {

    const [shahadahTopic, setShahadahTopic] = useState([])
    const [salahTopic, setSalahTopic] = useState([])
    const [sawmTopic, setSawmTopic] = useState([])
    const [zakatTopic, setZakatTopic] = useState([])
    const [haijTopic, setHaijTopic] = useState([])
    const [loading, setLoading] = useState(true)
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    useEffect( () => {
    
        const fetchShahadah = async () => {
        
            try {
                const shahadahResponse = await fetch('http://localhost:8080/api/certificateBlog/')
                const data1 = await shahadahResponse.json();
            
                setShahadahTopic(data1.CertificateBlog || [])
            
                const salahResponse = await fetch('http://localhost:8080/api/prayerBlog/')
                const data2 = await salahResponse.json();
            
                setSalahTopic(data2.PrayerBlog || [])
            
                const sawmResponse = await fetch('http://localhost:8080/api/fastingBlog/')
                const data3 = await sawmResponse.json();
            
                setSawmTopic(data3.FastingBlog || [])
            
                const zakatResponse = await fetch('http://localhost:8080/api/zakatBlog/')
                const data4 = await zakatResponse.json();
            
                setZakatTopic(data4.ZakatBlog || [])
            
                const haijResponse = await fetch('http://localhost:8080/api/haijBlog/')
                const data5 = await haijResponse.json();
            
                setHaijTopic(data5.HaijBlog || [])
            
            } catch(error) {
                console.error('Error Fetching Shahadah Topic:', error)
            } finally {
                setLoading(false)
            }
        
        }
    
        fetchShahadah();
    
    }, [])

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

    if (loading) return <p className='section'> Loading.... </p>

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
            
                <div className="text-center mb-5">
                
                    <span className={style.headTitle}>The pillars of Islam</span>
                
                    <h3 className={style.title}>Five Pillars of Islam</h3>
                
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
                                
                                    <img src={shahadah.image} alt={shahadah.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(shahadah.createdAt)}</span>
                                
                                    <span><i className="fa-regular fa-heart"></i>{shahadah.Likes}</span>
                                
                                    <span><i className="fa-regular fa-eye"></i>{shahadah.Views}</span>
                                
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
                                
                                    <img src={salah.image} alt={salah.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(salah.createdAt)}</span>
                                
                                    <span><i className="fa-regular fa-heart"></i> {salah.Likes}</span>
                                
                                    <span><i className="fa-regular fa-eye"></i> {salah.Views} </span>
                                
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
                                
                                    <img src={sawm.image} alt={sawm.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(sawm.createdAt)}</span>
                                
                                    <span><i className="fa-regular fa-heart"></i>{sawm.Likes}</span>
                                
                                    <span><i className="fa-regular fa-eye"></i>{sawm.Views}</span>
                                
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
                                
                                    <img src={zakat.image} alt={zakat.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(zakat.createdAt)}</span>
                                
                                    <span><i className="fa-regular fa-heart"></i>{zakat.Likes}</span>
                                
                                    <span><i className="fa-regular fa-eye"></i>{zakat.Views}</span>
                                
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
                                
                                    <img src={haij.image} alt={haij.title} />
                                
                                </div>
                            
                                <div className={`${style.details} d-flex gap-3`}>
                                
                                    <span><i className="fa-regular fa-calendar"></i>{getDate(haij.createdAt)}</span>
                                
                                    <span><i className="fa-regular fa-heart"></i>{haij.Likes}</span>
                                
                                    <span><i className="fa-regular fa-eye"></i>{haij.Views}</span>
                                
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
        
        </div>
    
    )
}