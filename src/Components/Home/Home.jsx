import React, { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify';
import shahadh from '../../images/shahadh.png'
import salah from '../../images/salah.png'
import sawm from '../../images/sawm.png'
import zakat from '../../images/zaka.png'
import haij from '../../images/haij.png'
import shapeOne from '../../images/shape-1.png'
import shapeTwo from '../../images/shape-2.png'
import shapeThree from '../../images/shape-3.png'
import Malcolm from '../../images/malcolmX.png'
import kilay from '../../images/muhammad_ali.png'
import ahmedDeedat from '../../images/Da3yia.jpg'
import IslamBook from '../../images/Islam.jpg'
import notgodButGodBook from '../../images/not-god-but-God.jpg'
import mosque from '../../images/mosque.png'
import pillarServ from '../../images/pillarServ.png'
import quran from '../../images/quran.png'
import kabah from '../../images/kabah.png'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import { Azkar } from 'islam.js'
import style from './Home.module.scss'

export default function Home() {

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);

    const [zikrScrollVisible, setZikrScrollVisible] = useState(false)

    const toggleZikrScroll = () => {
        setZikrScrollVisible(!zikrScrollVisible)
    }

    const [topics, setTopics] = useState([])

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

        } catch {
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${monthName} ${day}, ${year}`; // Return formatted date
    };

    return (
    
        <>
        
            <section className={style.welcome}>
            
                
            
            </section>
        
            <section className={`${style.services} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mt-3 mb-5">
                    
                        <span className={style.headTitle}>Services</span>
                    
                        <h3 className={style.title}>Objective & Mission</h3>
                    
                    </div>
                
                    <div className="row gy-2">
                    
                        <div className="col-md-6 col-lg-4">
                        
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Monotheism</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={kabah} alt="kabah" loading='lazy' />
                                
                                </div>
                            
                                {/* <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p> */}
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-6 col-lg-4">
                        
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Pillars of Islam</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={pillarServ} alt="pillars of Islam" loading='lazy' />
                                
                                </div>
                            
                                {/* <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p> */}
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-6 col-lg-4">
                            
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Faith</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={quran} alt="quran-image" loading='lazy' />
                                
                                </div>
                            
                                {/* <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p> */}
                            
                            </div>
                        
                        </div>
                        
                        <div className="col-md-6 col-lg-4">
                            
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Purpose of Life</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={mosque} alt="mosque" loading='lazy' />
                                
                                </div>
                            
                                {/* <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p> */}
                            
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </section>
        
            <section className={`${style.monotheism} ${style.section}`}>
            
                <div className="container">
                
                    <div className="row gy-2 align-items-center">
                    
                        <div className="col-lg-6">
                        
                            <div className={style.leftBox}>
                            
                                <iframe src="https://www.youtube.com/embed/gVjuZ2RAX68?si=3Cz4goXrbWQWB3LH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                        
                            </div>
                        
                        </div>
                    
                        <div className="col-lg-6">
                        
                            <div className={style.rightBox}>
                            
                                <span className={style.headTitle}>Monotheism</span>
                            
                                <h3 className={style.title}>Definition, Examples, & Facts</h3>
                            
                                <div className={style.ayat}>
                                
                                    <span className={style.enSurah}> <span className={style.basmala}>In the name of allah, the beneficent, the merciful</span>
                                        Say: He is Allah, the One! (1) Allah, the eternally Besought of all! (2) He begetteth not nor was begotten. (3) And there is none comparable unto Him. (4) <span className={style.surah}>(Surah AL-IKHLAS)</span> </span>
                                
                                    <span className={style.arSurah}> <span className={style.basmala}>بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ</span>
                                        قُلۡ هُوَ ٱللَّهُ أَحَدٌ (﻿١﻿) ٱللَّهُ ٱلصَّمَدُ (﻿٢﻿) لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ (﻿٣﻿) وَلَمۡ يَكُن لَّهُ ۥ ڪُفُوًا أَحَدٌ (﻿٤﻿) <span className={style.surah}>(سُوۡرَةُ الإخلاص)</span></span>
                                
                                </div>
                            
                                {/* <p className={style.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex voluptates ipsam numquam sit exercitationem odit maiores dolorem delectus nulla quasi, facere necessitatibus suscipit, asperiores ea ad minima vel, distinctio nam! Quos officia explicabo tempora facilis distinctio sit libero, consequuntur porro commodi ipsam illum repudiandae voluptas laudantium molestiae animi maxime.</p> */}
                            
                                <a href="monotheism" className={style.readBtn}>Read more</a>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </section>
        
            <section className={`${style.pillars} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                        
                        <span className={style.headTitle}>The pillars of Islam</span>
                    
                        <h3 className={style.title}>Nums, Types</h3>
                    
                    </div>
                
                    <h4 className={style.subTitle}>Five Pillars <span>of Islam</span></h4>
                
                    <div className="row gy-2 justify-content-center align-items-center">
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxOne}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={shahadh} alt="shahadh" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.one}`}>Shahadah</h4>
                                    
                                        <span className={style.enPillar}>(Faith)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxTwo}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={salah} alt="salah" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.two}`}>Salah</h4>
                                    
                                        <span className={style.enPillar}>(Prayer)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxThree}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={zakat} alt="zakat" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.three}`}>Zakat</h4>
                                    
                                        <span className={style.enPillar}>(Fasting)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxFour}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={sawm} alt="sawm" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.four}`}>Sawm</h4>
                                    
                                        <span className={style.enPillar}>(Almsgiving)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className= {`${style.box} ${style.boxFive}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={haij} alt="haij" loading='lazy' />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.five}`}>Hajj</h4>
                                    
                                        <span className={style.enPillar}>(Pilgrimage )</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                
                    <div className={style.btn}>
                    
                        <a href="pillars" className={style.readBtn}>Learn More</a>
                    
                    </div>
                
                </div>
            
                <div className={style.shape1}>
                
                    <img src={shapeOne} alt="shape-One" loading='lazy' />
                
                </div>
            
                <div className={style.shape2}>
                
                    <img src={shapeTwo} alt="shape-Two" loading='lazy' />
                
                </div>
            
                <div className={style.shape3}>
                
                    <img src={shapeThree} alt="shapeThree" loading='lazy' />
                
                </div>
            
            </section>
        
            <section className={`${style.faithSec} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>Faith</span>
                    
                        <h3 className={style.title}>Celebrities & Books</h3>
                    
                    </div>
                
                    <div className="row gy-3">
                    
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
                
                    { topics.length > 0 && (
                
                    <div className={style.books}>
                    
                        <div className={`${style.titleBox} text-center`}>
                        
                            <h3 className={style.title}>Books about Islam</h3>
                        
                        </div>
                    
                        <ul>
                        
                            {topics.slice(-2).map( (topic) => (
                            
                                <li key={topic._id} id={topic._id}>
                                
                                    <div className="d-block d-md-flex justify-content-between">
                                    
                                        <div className={style.left}>
                                        
                                            <h4 className={style.bookTitle}>{topic.title}</h4>
                                        
                                            <span className={style.publisher}>by <span>{topic.author}</span></span>
                                        
                                            <div className={style.descriptionBook}
                                                dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(topic.description, {
                                                ADD_TAGS: ["img", "video", "iframe", "p", "div", "span", "br"],
                                                ADD_ATTR: ["src", "controls", "alt", "class", "style", "allow", "allowfullscreen", "frameborder", "scrolling"],
                                                }),
                                                }}
                                            />
                                        
                                            <div className={`mb-2 ${style.btns}`}>
                                            
                                                <a href={`http://147.79.101.225:2859/uploads/books/${topic.book}`} target='_blank' className={style.downloadBtn} download={`http://147.79.101.225:2859/uploads/Books/${topic.book}`}><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>
                                            
                                            </div>
                                        
                                        </div>
                                    
                                        <div className={style.right}>
                                        
                                            <div className={style.image}>
                                            
                                                <img src={`http://147.79.101.225:2859/uploads/books/${topic.imageName}`} alt={topic.title} loading='lazy' />
                                            
                                            </div>
                                        
                                        </div>
                                    
                                    </div>
                                
                                </li>
                            
                            ) )}
                        
                        </ul>
                    
                        <div className={`d-flex justify-content-center mt-2 mb-4 ${style.btns}`}>
                        
                            <a href="faith" className={style.readBtn}>See More</a>
                        
                        </div>
                    
                    </div>
                
                    )}
                
                </div>
            
            </section>
        
            <section className={`${style.aboutIslam} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>About Islam</span>
                    
                        <h3 className={style.title}>The Purpose Of Life</h3>
                    
                    </div>
                
                    <div className={style.video}>
                    
                        <iframe src="https://www.youtube.com/embed/Zor1et-rT8c?si=Z9ZqFmGY27DUDk1R" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    
                        <p className={style.paragraph}>Khalid Yasin delivered this lecture in Saudi Arabia in 1994, which resulted in 43 persons accepting Islam on that very night. What Is The Purpose of Life? Why are we here and where are we going? Through the verses of the Holy Qur'an, Shaykh Khalid Yasin expounds upon the creation of the universe and this amazing world we live in -- and how it came to be. With his logical style of argument, the Shaykh answers these questions with much wisdom.</p>
                    
                        <div className={style.btns}>
                        
                            <a href="islam" className={style.readBtn}>Read more</a>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </section>
        
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

        </>
    
    )

}