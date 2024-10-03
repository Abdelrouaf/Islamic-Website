import React, { useEffect, useRef, useState } from 'react'
import style from './Quran.module.scss'
import { motion } from 'framer-motion'

export default function Quran() {

    const surahLang = {

        ar: { api: 'quran.json' },
        bn: { api: 'quran_bn.json' },
        zh: { api: 'quran_zh.json' },
        en: { api: 'quran_en.json' },
        es: { api: 'quran_es.json' },
        fr: { api: 'quran_fr.json' },
        id: { api: 'quran_id.json' },
        ru: { api: 'quran_ru.json' },
        sv: { api: 'quran_sv.json' },
        tr: { api: 'quran_tr.json' },
        ur: { api: 'quran_ur.json' },

    }

    const [topic, setTopic] = useState(null)
    const [topics, setTopics] = useState([])
    const [defaultSurah, setDefaultSurah] = useState(null)
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [filteredTopics, setFilteredTopics] = useState([]); // Surahs filtered by search
    const [searchTerm, setSearchTerm] = useState(''); // Search input state
    const [defaultLang, setDefaultLang] = useState('quran.json')
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/${defaultLang}`);
                const data = await response.json();

                setDefaultSurah(data[1]); 
                setTopics(data || [])
                setFilteredTopics(data || []); // Initialize filtered topics with all surahs
                setTopic(data[1])
                setSelectedSurah(data[1].id);
                
            } catch {
            } 
        };

        fetchData();
    }, [defaultLang]);

    // Filter surahs based on search input
    useEffect(() => {
        if (searchTerm === '') {
            // If search input is empty, show all surahs
            setFilteredTopics(topics);
        } else {
            // Filter Surahs by transliteration or name
            const filtered = topics.filter((surah) =>
                surah.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                surah.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTopics(filtered);
        }
    }, [searchTerm, topics]);

    const onChangeLang = (e) => {
        const country = e.target.value;
        setDefaultLang(surahLang[country].api)
    }

    const handleScrollToTopic = (topicId) => {
        const element = document.getElementById(topicId);
        if (element) {
            const headerOffset = 120; // Adjust this value based on your header height
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

    const handleSurahClick = (surah) => {
        setTopic(surah);  // Update the topic state to the clicked surah
        setSelectedSurah(surah.id);
    };

    const text = 'Surah'

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
            
                <div  className={`text-center mb-5`}>
                
                    <motion.span initial='hidden' animate="visible" variants={variants} className={style.headTitle}>Quran</motion.span>
                
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
                
                    <div className="col-md-4">
                    
                        <motion.div initial='hidden' animate='visible' variants={toUp} className={style.search}>

                            <div className={style.inputGroup}>

                                <div className='form-outline'>

                                    <input type="search" className='form-control' placeholder='Search...' name="search" id="search" alue={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} />

                                </div>

                                <button type="button" className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>

                            </div>

                        </motion.div>

                        <motion.div initial='hidden' animate='visible' variants={toUp}  className={`${style.box} ${style.mostLikedBox} ${style.sticky}`} ref={mostLikedRef}>
                                <h4 className={style.title}>All Surahs</h4>
                                <ul>
                                    {filteredTopics.map((surah, index) => (
                                        <li className={style.quickLink} key={surah.id}>
                                            <div className={`${style.cardBox}`}>
                                                <div className={style.cardBody}>
                                                    <a href="#"
                                                    onClick={(e) => { e.preventDefault(); handleSurahClick(surah); }} className={`${style.cardTitle} d-flex justify-content-between align-items-center`}>
                                                        <h4 className={`${selectedSurah === surah.id ? style.hover : ''}`}> Surah {surah.transliteration} </h4>
                                                        <h4 className={`${selectedSurah === surah.id ? style.hover : ''}`}> سورة {surah.name}</h4>
                                                    </a>
                                                    <p className={style.paragraph}>Total Verses: {surah.total_verses}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                        </motion.div>

                    </div>

                    <div className="col-md-8">
                    
                        <div className={style.selectLang}>

                            <select className="form-select" onChange={onChangeLang} value={defaultLang} aria-label="Default select example">
                            
                                <option value='ar'>Arabic</option>
                            
                                <option value="bn">Bengali</option>
                            
                                <option value="zh">Chinese</option>
                            
                                <option value="en">English</option>
                            
                                <option value="es">Spanish</option>

                                <option value="fr">French</option>

                                <option value="id">Indonesian</option>

                                <option value="ru">Russian</option>

                                <option value="sv">Swedish</option>

                                <option value="tr">Turkish</option>

                                <option value="ur">Urdu</option>

                            </select>

                        </div>

                        {topics.length > 0 ? (
                            <div key={topic?.id} className={style.topicSection}>
                                <div className={style.topicDesign} id={topic?.id}>
                                    <h3 className={style.title}> {defaultLang === 'quran.json' ? ` سورة  ${topic.name}` : `Surah ${topic.transliteration}` }</h3>
                                    <h4 className={style.basmala}> {defaultLang === 'quran.json' ? 'بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ' : 'In the name of allah, the beneficent, the merciful'}  </h4>
                                </div>
                                <div className={`${style.verses} ${defaultLang === 'quran.json' ? style.directionRTL : style.directionLTR}`}>
                                    {topic?.verses?.map((verse, index) => (
                                        <p key={verse.id} className={`${style.paragraph}  d-inline`}>
                                            {defaultLang === 'quran.json' ? verse.text : verse.translation } <span>({verse.id})</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            ) : (
                                defaultSurah && (
                                    <div key={defaultSurah.id} className={style.topicSection}>
                                        <div className={style.topicDesign} id={defaultSurah.id}>
                                            <h3 className={style.title}> سورة {defaultSurah.name}</h3>
                                            <h4 className={style.basmala}>بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ</h4>
                                        </div>
                                        <div className={style.verses}>
                                            {defaultSurah.verses.map((verse, index) => (
                                                <p key={verse.id} className={`${style.paragraph} d-inline rtl`}>
                                                    {defaultLang === 'quran.json' ? verse.text : verse.translation } <span>({verse.id})</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}

                        {/* <div className={style.topicSection}>
                        
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
                        
                        </div> */}
                    
                    </div>
                
                </div>
            
            </div>
        
        </div>
    
    )
}
