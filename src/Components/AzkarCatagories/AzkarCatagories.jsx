import React from 'react'
import style from './AzkarCatagories.module.scss'
import { motion } from 'framer-motion'
import { Azkar } from 'islam.js'
import image1 from '../../images/morning.png'
import image2 from '../../images/nightZkar.png'
import image3 from '../../images/wearing.png'
import image4 from '../../images/sleepingZkar.png'
import { Link } from 'react-router-dom'


export default function AzkarCatagories() {

    const azkar = new Azkar()
    const allAzkar = azkar.getAll()

     // Array of images (replace with the actual image paths)
        const images = [
        image1,
        image2,
        image4,
        image3
    ];

    const text = "Morning, Evening & After Pray"

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

    // const toUp = {
    //     hidden: { opacity: 0, y: 500 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    // };

    return (
    
        <div className={`${style.blogSection} ${style.section}`}>
        
            <div className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}>
            
                <div className={`text-center mb-5`}>
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Azkar</motion.span>
                
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
                
                    {Array.from(allAzkar.entries()).map( ([zkar], index) => (
                    
                        <div className="col-md-6 col-lg-4" key={index}>
                    
                            <a href={`/azkarCatagories/${encodeURIComponent(zkar)}`}>
                            
                                <div className={style.box}>
                                
                                    <div className={style.image}>
                                    
                                        <img src={images[index % images.length]} alt={`Azkar images ${index + 1}`} />
                                    
                                    </div>
                                
                                    <h4>{zkar}</h4>
                                
                                </div>
                            
                            </a>
                        
                        </div>
                    
                    ) )}
                
                </div>
            
            </div>
        
        </div>
    
    )
}
