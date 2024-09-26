import React from 'react'
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
import IslamBook from '../../images/Islam.jpg'
import notgodButGodBook from '../../images/not-god-but-God.jpg'
import mosque from '../../images/mosque.png'
import pillarServ from '../../images/pillarServ.png'
import quran from '../../images/quran.png'
import kabah from '../../images/kabah.png'
// import donate from '../../images/donate.png'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import style from './Home.module.scss'

export default function Home() {

    return (
    
        <>
        
            <section className={style.welcome}>
            
                
            
            </section>
        
            <section className={`${style.services} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>Services</span>
                    
                        <h3 className={style.title}>Objective & Mission</h3>
                    
                    </div>
                
                    {/* <div className={style.titles}>
                    
                        <span className={style.headTitle2}>Services</span>
                    
                        <h3 className={style.title2}>Objective & Mission</h3>
                    
                    </div> */}
                
                    <div className="row">
                    
                        <div className="col-md-6 col-lg-4">
                        
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Monotheism</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={kabah} alt="" />
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-6 col-lg-4">
                        
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Pillars of Islam</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={pillarServ} alt="" />
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-6 col-lg-4">
                            
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Faith</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={quran} alt="" />
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p>
                            
                            </div>
                        
                        </div>
                        
                        <div className="col-md-6 col-lg-4">
                            
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Purpose of Life</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={mosque} alt="" />
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p>
                            
                            </div>
                        
                        </div>
                        
                        {/* <div className="col-md-6 col-lg-4">
                            
                            <div className={style.box}>
                            
                                <h4 className={style.srvTitle}>Donation</h4>
                            
                                <div className={style.image}>
                                
                                    <img src={donate} alt="" />
                                
                                </div>
                            
                                <p className={style.paragraph}>Lorem ipsum dolor sit amet.</p>
                            
                            </div>
                        
                        </div> */}
                    
                    </div>
                
                </div>
            
            </section>
        
            <section className={`${style.monotheism} ${style.section}`}>
            
                <div className="container">
                
                    {/* <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>Monotheism</span>
                    
                        <h3 className={style.title}>Definition, Examples, & Facts</h3>
                    
                    </div> */}
                
                    {/* <div className={style.titles}>
                    
                        <span className={style.headTitle2}>Monotheism</span>
                    
                        <h3 className={style.title2}>Definition, Examples, & Facts</h3>
                    
                    </div> */}
                
                    <div className="row align-items-center">
                    
                        <div className="col-lg-6">
                        
                            <div className={style.leftBox}>
                            
                                <iframe src="https://www.youtube.com/embed/gVjuZ2RAX68?si=3Cz4goXrbWQWB3LH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            
                                {/* <div className={style.image}></div> */}
                            
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
                            
                                <p className={style.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores ex voluptates ipsam numquam sit exercitationem odit maiores dolorem delectus nulla quasi, facere necessitatibus suscipit, asperiores ea ad minima vel, distinctio nam! Quos officia explicabo tempora facilis distinctio sit libero, consequuntur porro commodi ipsam illum repudiandae voluptas laudantium molestiae animi maxime.</p>
                            
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
                
                    {/* <div className={style.titles}>
                    
                        <span className={style.headTitle2}>The pillars of Islam</span>
                    
                        <h3 className={style.title2}>Nums, Types</h3>
                    
                    </div> */}
                
                    <h4 className={style.subTitle}>Five Pillars <span>of Islam</span></h4>
                
                    <div className="row justify-content-center align-items-center">
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxOne}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={shahadh} alt="" />
                                    
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
                                    
                                        <img src={salah} alt="" />
                                    
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
                                    
                                        <img src={zakat} alt="" />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.three}`}>Sawm</h4>
                                    
                                        <span className={style.enPillar}>(Fasting)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className={`${style.box} ${style.boxFour}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={sawm} alt="" />
                                    
                                    </div>
                                
                                    <div className={style.types}>
                                    
                                        <h4 className={`${style.pillar} ${style.four}`}>Zakat</h4>
                                    
                                        <span className={style.enPillar}>(Almsgiving)</span>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-4 col-lg-2">
                        
                            <div className= {`${style.box} ${style.boxFive}`}>
                            
                                <a href='pillars' className="">
                                
                                    <div className={style.image}>
                                    
                                        <img src={haij} alt="" />
                                    
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
                
                    <img src={shapeOne} alt="" />
                
                </div>
            
                <div className={style.shape2}>
                
                    <img src={shapeTwo} alt="" />
                
                </div>
            
                <div className={style.shape3}>
                
                    <img src={shapeThree} alt="" />
                
                </div>
            
            </section>
        
            <section className={`${style.faithSec} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>Faith</span>
                    
                        <h3 className={style.title}>Celebrities & Books</h3>
                    
                    </div>
                
                    {/* <div className={style.titles}>
                    
                        <span className={style.headTitle2}>Faith</span>
                    
                        <h3 className={style.title2}>Celebrities & Books</h3>
                    
                    </div> */}
                
                    <Splide
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
                                    
                                        <img src={Malcolm} alt="" />
                                    
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
                                    
                                        <img src={kilay} alt="" />
                                    
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
                                    
                                        <img src={Malcolm} alt="" />
                                    
                                    </div>
                                
                                    <div className="p-2">
                                    
                                        <h4 className={style.celName}>Malcolm x</h4>
                                    
                                        <p className={style.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, temporibus.</p>
                                    
                                    </div>
                                
                                </a>
                            
                            </div>
                        
                        </SplideSlide>
                    
                    </Splide>
                
                    <div className={style.books}>
                    
                        <div className={`${style.titleBox} text-center`}>
                        
                            <h3 className={style.title}>Books about Islam</h3>
                        
                        </div>
                    
                        <ul>
                        
                            <li>
                            
                                <div className="d-flex justify-content-between">
                                
                                    <div className={style.left}>
                                    
                                        <h4 className={style.bookTitle}>Islam</h4>
                                    
                                        <span className={style.publisher}>by <span>Karen Armstrong</span></span>
                                    
                                        <p className={style.descriptionBook}>No religion in the modern world is as feared and misunderstood as Islam. It haunts the popular imagination as an extreme faith that promotes terrorism, authoritarian government, female oppression, and civil war. In a vital revision of this narrow view of Islam and a distillation of years of thinking and writing about the subject, Karen Armstrong’s short history demonstrates that the world’s fastest-growing faith is a much more complex phenomenon than its modern fundamentalist strain might suggest.</p>
                                    
                                        <div className={style.btns}>
                                        
                                            <a href="faith" className={style.readBtn}>Learn more</a>
                                        
                                        </div>
                                    
                                    </div>
                                
                                    <div className={style.right}>
                                    
                                        <div className={style.image}>
                                        
                                            <img src={IslamBook} alt="" /> 
                                        
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            
                            </li>
                        
                            <li>
                            
                                <div className="d-flex justify-content-between">
                                
                                    <div className={style.left}>
                                    
                                        <h4 className={style.bookTitle}>No god but God</h4>
                                    
                                        <span className={style.publisher}>by <span>Reza Aslan</span></span>
                                    
                                        <p className={style.descriptionBook}>In No god but God, internationally acclaimed scholar Reza Aslan explains Islam — the origins and evolution of the faith — in all its beauty and complexity. Timely and persuasive, No god but God is an elegantly written account that explains this magnificent yet misunderstood faith.</p>
                                    
                                        <div className={style.btns}>
                                        
                                            <a href="faith" className={style.readBtn}>Learn more</a>
                                        
                                        </div>
                                    
                                    </div>
                                
                                    <div className={style.right}>
                                    
                                        <div className={style.image}>
                                        
                                            <img src={notgodButGodBook} alt="" /> 
                                        
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            
                            </li>
                        
                        </ul>
                    
                    </div>
                
                    {/* <div className={`${style.btn} d-flex align-items-center justify-content-center`}>
                    
                        <a href="#" className={style.readBtn}>Learn more</a>
                    
                    </div> */}
                
                </div>
            
            </section>
        
            <section className={`${style.aboutIslam} ${style.section}`}>
            
                <div className="container">
                
                    <div className="text-center mb-5">
                    
                        <span className={style.headTitle}>About Islam</span>
                    
                        <h3 className={style.title}>The Purpose Of Life</h3>
                    
                    </div>
                
                    {/* <div className={style.titles}>
                    
                        <span className={style.headTitle2}>About Islam</span>
                    
                        <h3 className={style.title2}>The Purpose Of Life</h3>
                    
                    </div> */}
                
                    <div className={style.video}>
                    
                        <iframe src="https://www.youtube.com/embed/Zor1et-rT8c?si=Z9ZqFmGY27DUDk1R" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    
                        <p className={style.paragraph}>Khalid Yasin delivered this lecture in Saudi Arabia in 1994, which resulted in 43 persons accepting Islam on that very night. What Is The Purpose of Life? Why are we here and where are we going? Through the verses of the Holy Qur'an, Shaykh Khalid Yasin expounds upon the creation of the universe and this amazing world we live in -- and how it came to be. With his logical style of argument, the Shaykh answers these questions with much wisdom.</p>
                    
                        <div className={style.btns}>
                        
                            <a href="islam" className={style.readBtn}>Read more</a>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </section>
        
        </>
    
    )

}