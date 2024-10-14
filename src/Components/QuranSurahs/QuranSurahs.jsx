import React, { useEffect, useRef, useState } from 'react'
import style from './QuranSurahs.module.scss'
import { motion } from 'framer-motion'
import { Quran } from 'islam.js';
import axios from 'axios';

export default function QuranSurahs() {

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
    const [defaultLang, setDefaultLang] = useState('quran_en.json')
    const mostLikedRef = useRef(null); // Ref to observe the "most liked" section

    const quran = new Quran()
    // const quranVerse = quran.getVerse(1, 4)
    // console.log(quranVerse);
    

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

    const handleSurahClick = (surah) => {
        setTopic(surah);  // Update the topic state to the clicked surah
        setSelectedSurah(surah.id);
    };

    const [surahIndex, setSurahIndex] = useState('');
    const [verseIndex, setVerseIndex] = useState('');

    let [versesCount, setVersesCount] = useState(0)

    const handleSurahChange = (event) => {
        let value = parseInt(event.target.value, 10);
    
        // Ensure the value stays within the min and max range
        if (value > 114) {
            value = 114; // Max surah value
        } else if (value < 1) {
            value = 1; // Min surah value
        }
    
        setVersesCount(value)
        setVerseIndex('');
        setSurahIndex(value);
    };

    const handleVerseChange = (event) => {
    
        let value = parseInt(event.target.value, 10);
    
        // Ensure the value stays within the min and max range
        if (value > quran.getChapterByIndex(versesCount).numberOfVerses) {
            value = quran.getChapterByIndex(versesCount).numberOfVerses; // Max surah value
        } else if (value < 1) {
            value = 1; // Min surah value
        }

        setVerseIndex(value);
    };

    const [verses, setVerses] = useState([]);
    const [versesTranslation, setVersesTranslation] = useState([]);
    const verseData = { verse: verses, translation: versesTranslation };


    const handleSearch = () => {
        const surah = parseInt(surahIndex, 10);
        const verse = parseInt(verseIndex, 10);
    
        if (!isNaN(surah) && !isNaN(verse)) {
            // Fetch the verse using islam.js
            const verseData = quran.getVerse(surah, verse);
            const translationData = quran.getMultipleVersesWithTranslation([{ chapterNo: surah, verseNo: verse }]);
    
            // Extract and store the translation
            if (translationData && translationData.length > 0) {
                const translation = translationData[0]?.translation || '';
                setVerses([verseData]);
                setVersesTranslation([translation]);
            } else {
                setVerses([verseData]);
                setVersesTranslation(['Translation not found']);
            }
        } 
    };

    const BASE_URL = 'https://cdn.islamic.network/quran/audio-surah/128/en.misharyrashidalafasyenglishtranslationsaheehibrahimwalk/'; // Base URL for audio
    const INITIAL_SURAH_INDEX = 1; // Starting Surah index
    const [nameSurahPlay, setNameSurahPlay] = useState('Al-Fatihah')
    const [surahPlayIndex, setSurahPlayIndex] = useState(INITIAL_SURAH_INDEX);
    const [currentSurahPlay, setCurrentSurahPlay] = useState(`${BASE_URL}${surahIndex}.mp3`);
    const [progress, setProgress] = useState(0);
    const [play, setPlay] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
  
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
  
    const togglePlayStop = () => {
      if (audioRef.current) {
        if (play) {
          // Pause the audio
          audioRef.current.pause();
        } else {
          // Play the audio
          audioRef.current.play();
        }
        setPlay(!play); // Toggle play/pause state
      }
    };
  
    const handleAudioReset = () => {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setPlay(!play);
      setProgress(0); // Reset progress
        setCurrentTime(0); // Reset current time
    };
  
    useEffect(() => {
      const audio = audioRef.current;
  
      const updateDuration = () => {
        if (audio) {
          setDuration(audio.duration);
        }
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100); // Update progress here
      };
      
      if (audio) {
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', updateDuration);
      }
      return () => {
        if (audio) {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', updateDuration);
        }
      };
    }, [currentSurahPlay]);  
  
    // Reset progress and currentTime when the surah changes
    useEffect(() => {
        setCurrentSurahPlay(`${BASE_URL}${surahPlayIndex}.mp3`);
        setNameSurahPlay(quran.getChapterByIndex(surahPlayIndex).englishName)
        setProgress(0);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    }, [surahPlayIndex]);

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
                    
                        <div className={style.box}>

                            <h4 className={style.title}>Listen to the Quran</h4>

                            <div className={style.quranPlayer}>
                                
                                <div className="d-block justify-content-between align-items-center position-relative z-2">
                                
                                    <h4 className={style.title}>{nameSurahPlay}</h4>

                                    <audio ref={audioRef} src={currentSurahPlay}></audio>
                                    
                                    <div className={style.progressBar}>
                                    
                                        <div className={style.customAudioBar}>
                                        
                                        <div
                                        className={style.progress}
                                        style={{ width: `${progress}%` }}
                                        ></div>
                                        
                                        {/* <span>{time}</span> */}
                                        
                                        </div>
                                    
                                        <div className="d-flex justify-content-between">
                                        
                                        <span>{formatTime(currentTime)}</span>
                                    
                                        <span>{formatTime(duration)}</span>
                                        
                                        </div>
                                    
                                    </div>
                                
                                    <div className='text-center'>
                                    
                                        <button onClick={() => { if (surahPlayIndex > 1) { setSurahPlayIndex(surahPlayIndex - 1); } } }><i className="fa-solid fa-backward"></i></button>
                                    
                                        <button onClick={togglePlayStop}>{play ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
                                    
                                        <button onClick={handleAudioReset}><i className="fa-solid fa-stop"></i></button>
                                    
                                        <button onClick={() => setSurahPlayIndex(surahPlayIndex + 1)}><i className="fa-solid fa-forward"></i></button>
                                    
                                    </div>

                                </div>
                            
                            </div>

                        </div>

                        <motion.div initial='hidden' animate='visible' variants={toUp} className={style.search}>

                            <div className={style.inputGroup}>

                                <div className='form-outline'>

                                    <input type="search" className='form-control' placeholder='Search...' name="search" id="search" value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} />

                                </div>

                                <button type="button" aria-label='search by surah name' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>

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
                                                        <h4 className={`${selectedSurah === surah.id ? style.hover : ''}`}>{index + 1} Surah {surah.transliteration} </h4>
                                                        <h4 className={`${selectedSurah === surah.id ? style.hover : ''}`}> سورة {surah.name} </h4>
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

                            <select className="form-select" onChange={onChangeLang} value={Object.keys(surahLang).find(key => surahLang[key].api === defaultLang)} aria-label="Default select example">
                            
                                <option value="en">English</option>

                                <option value='ar'>Arabic</option>
                            
                                <option value="bn">Bengali</option>
                            
                                <option value="zh">Chinese</option>
                            
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
                                            {defaultLang === 'quran.json' ? verse.text : verse.translation } <span className={style.verseNumber}>{verse.id}</span>
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
                                                    {defaultLang === 'quran.json' ? verse.text : verse.translation } <span className={style.verseNumber}>{verse.id}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                    
                    </div>
                
                </div>
            
                <div className={`${style.searchVersesBox} text-center`}>
                    <h4 className='mb-3'>Search for Quran Verses</h4>
                    <div className={style.inputs}>
                        <input
                        type="number"
                        value={surahIndex}
                        onChange={handleSurahChange}
                        placeholder="Surah Index"
                        min='1'
                        max='114'
                        />
                        <input
                        type="number"
                        value={verseIndex}
                        onChange={handleVerseChange}
                        placeholder="Verse Index"
                        min='1'
                        max={quran.getChapterByIndex(versesCount)}
                        disabled={!surahIndex || isNaN(surahIndex)} 
                        />
                        <button onClick={handleSearch} aria-label='search by surah number and verse number' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
                    
                    </div>
                
                    <div className={`${style.searchVerses} mt-3`}>

                        <p>{verseData.verse}</p>
                        <p>{verseData.translation}</p>

                    </div>

                </div>

            </div>
        
        </div>
    
    )
}
