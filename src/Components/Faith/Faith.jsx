import React from 'react'
import shahadah from '../../images/Shahadah-in-Islam-Relevance-of-the-First-Pillar-of-Islam.png'
import prayer from '../../images/prayer.jpg'
import fasting from '../../images/fasting.jpeg'
import zakat from '../../images/definition-zakat.jpg'
import haij from '../../images/haij2.png'
import Malcolm from '../../images/malcolmX.png'
import kilay from '../../images/muhammad_ali.png'
import IslamBook from '../../images/Islam.jpg'
import notgodButGodBook from '../../images/not-god-but-God.jpg'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import style from './Faith.module.scss'
import { Link } from 'react-router-dom'

export default function Faith() {

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
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
            
                <div className="row mt-5">
                
                    <div className="col-md-8">
                    
                        <div className={style.shahadah} id='shahadah'>
                        
                            <div className={style.topicDesign}>
                            
                                <span className={style.count}>1</span>
                            
                                <h3 className={style.title}>Islam</h3>
                            
                            </div> 
                        
                            <div className={style.image}>
                            
                                <img src={IslamBook} alt="" />
                            
                            </div>
                        
                            <span className={style.publisher}>by <span>Karen Armstrong</span></span>
                        
                            <p className={style.descriptionBook}>No religion in the modern world is as feared and misunderstood as Islam. It haunts the popular imagination as an extreme faith that promotes terrorism, authoritarian government, female oppression, and civil war. In a vital revision of this narrow view of Islam and a distillation of years of thinking and writing about the subject, Karen Armstrong’s short history demonstrates that the world’s fastest-growing faith is a much more complex phenomenon than its modern fundamentalist strain might suggest.</p>
                        
                            <div className={`${style.btn} overflow-hidden`}>
                            
                                <a href='/images/donate.png' className={style.downloadBtn} download='donateImage.png'><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>
                            
                            </div>
                        
                        </div>
                    
                        <div className={style.salah} id='salah'>
                        
                            <div className={style.topicDesign}>
                                
                                <span className={style.count}>2</span>
                            
                                <h3 className={style.title}>No god but God</h3>
                            
                            </div> 
                        
                            <div className={style.image}>
                            
                                <img src={notgodButGodBook} alt="" />
                            
                            </div>
                        
                            <span className={style.publisher}>by <span>Reza Aslan</span></span>
                        
                            <p className={style.descriptionBook}>In No god but God, internationally acclaimed scholar Reza Aslan explains Islam — the origins and evolution of the faith — in all its beauty and complexity. Timely and persuasive, No god but God is an elegantly written account that explains this magnificent yet misunderstood faith.</p>
                        
                            <div className={`${style.btn} overflow-hidden`}>
                            
                                <a href='/images/donate.png' className={style.downloadBtn} download='donateImage.png'><i className="fa-solid fa-cloud-arrow-down"></i>Download</a>
                            
                            </div>
                        
                        </div>
                    
                        {/* <div className={style.sawm} id='sawm'>
                        
                            <div className={style.topicDesign}>
                            
                                <span className={style.count}>3</span>
                            
                                <h3 className={style.title}>Sawm (Fasting)</h3>
                            
                            </div> 
                        
                            <div className={style.image}>
                            
                                <img src={fasting} alt="" />
                            
                            </div>
                        
                            <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eum error dolorum ut natus officiis in quos harum aspernatur laborum. Voluptas asperiores consequuntur et qui necessitatibus, dolores tempora pariatur provident repudiandae rem molestias! Officia a possimus, voluptatem maiores autem similique, quae illum dolorum mollitia laborum tempore reprehenderit accusamus? Ab reiciendis nobis quasi repudiandae, cumque eaque a nulla ipsa commodi non magni odio enim? Maxime impedit dolore possimus reprehenderit ab quisquam iste, neque, exercitationem similique autem consectetur quas nesciunt cum ratione vel, animi expedita cumque mollitia recusandae nobis qui. Neque nemo dolorum tempore assumenda alias, commodi corrupti quisquam maxime omnis quae?</p>
                        
                        </div>
                    
                        <div className={style.zakat} id='zakat'>
                        
                            <div className={style.topicDesign}>
                            
                                <span className={style.count}>4</span>
                            
                                <h3 className={style.title}>Zakat (Almsigiving)</h3>
                            
                            </div> 
                        
                            <div className={style.image}>
                            
                                <img src={zakat} alt="" />
                            
                            </div>
                        
                            <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eum error dolorum ut natus officiis in quos harum aspernatur laborum. Voluptas asperiores consequuntur et qui necessitatibus, dolores tempora pariatur provident repudiandae rem molestias! Officia a possimus, voluptatem maiores autem similique, quae illum dolorum mollitia laborum tempore reprehenderit accusamus? Ab reiciendis nobis quasi repudiandae, cumque eaque a nulla ipsa commodi non magni odio enim? Maxime impedit dolore possimus reprehenderit ab quisquam iste, neque, exercitationem similique autem consectetur quas nesciunt cum ratione vel, animi expedita cumque mollitia recusandae nobis qui. Neque nemo dolorum tempore assumenda alias, commodi corrupti quisquam maxime omnis quae?</p>
                        
                        </div>
                    
                        <div className={style.haij} id='haij'>
                        
                            <div className={style.topicDesign}>
                            
                                <span className={style.count}>5</span>
                            
                                <h3 className={style.title}>Haij (Pilgrimage)</h3>
                            
                            </div> 
                        
                            <div className={style.image}>
                            
                                <img src={haij} alt="" />
                            
                            </div>
                        
                            <p className={style.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eum error dolorum ut natus officiis in quos harum aspernatur laborum. Voluptas asperiores consequuntur et qui necessitatibus, dolores tempora pariatur provident repudiandae rem molestias! Officia a possimus, voluptatem maiores autem similique, quae illum dolorum mollitia laborum tempore reprehenderit accusamus? Ab reiciendis nobis quasi repudiandae, cumque eaque a nulla ipsa commodi non magni odio enim? Maxime impedit dolore possimus reprehenderit ab quisquam iste, neque, exercitationem similique autem consectetur quas nesciunt cum ratione vel, animi expedita cumque mollitia recusandae nobis qui. Neque nemo dolorum tempore assumenda alias, commodi corrupti quisquam maxime omnis quae?</p>
                        
                        </div> */}
                    
                    </div>
                
                    <div className="col-md-4">
                    
                        <div className={style.box}>
                        
                            <h4 className={style.title}>Quick Links</h4>
                        
                            <ul>
                            
                                <li>
                                    
                                    <a href="#shahadah "><i className="fa-solid fa-chevron-right"></i>islam Book</a>
                                
                                </li>
                            
                                <li>
                                
                                    <a href="#salah"><i className="fa-solid fa-chevron-right"></i>No god but God Book</a>
                                
                                </li>
                            
                            </ul>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </div>
        
        </div>
    
    )
}
