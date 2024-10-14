import React, { useEffect, useRef, useState } from 'react'
import surah1 from '../../Audios/سورة الكهف - ماهر المعيقلي - جودة عالية  surat alk.mp3'
import surah2 from '../../Audios/سورة يوسف كامله بصوت القارئ ماهر المعيقلي.mp3'
import aboutUsCover from '../../images/about-us-cover-removebg-preview.png'
import prayerHead from '../../images/prayer-head-shp.png'
import Shahadah from '../../images/shahadah.png'
import Salah from '../../images/salah.png'
import Zakat from '../../images/zakat.png'
import Sawm from '../../images/sawm.png'
import Haij from '../../images/haig-removebg-preview.png'
import './Main.module.scss'

export default function Main() {

  const [currentSurah, setCurrentSurah] = useState(surah1);
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
  }, [currentSurah]);  

  // Reset progress and currentTime when the surah changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [currentSurah]);

  return (
      <>
      
        <section className="welcome section">
        
          <div className="container h-100">
          
            <div className="d-flex align-items-center justify-content-center h-100">
            
              <div className="titles"> 
              
                <h4>الحمدلله</h4>
            
                <h3>“Keep your tongue wet with the remembrance of Allah.”</h3>
              
              </div>
            
            </div>
          
          </div>
        
        </section>
      
        <div className="quran-player">
        
          <div className="d-flex justify-content-between align-items-center position-relative z-2">
          
            <h2>Listen to the Quran</h2>
            
            <div>
            
              <button onClick={() => setCurrentSurah(surah1)}><i className="fa-solid fa-backward"></i></button>
            
              <button onClick={togglePlayStop}>{play ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
            
              <button onClick={handleAudioReset}><i className="fa-solid fa-stop"></i></button>
            
              <button onClick={() => setCurrentSurah(surah2)}><i className="fa-solid fa-forward"></i></button>
            
            </div>
          
            <audio ref={audioRef} src={currentSurah}></audio>
          
            <div className="progressBar">
            
              <div className="custom-audio-bar">
              
                <div
                className="progress"
                style={{ width: `${progress}%` }}
                ></div>
              
                {/* <span>{time}</span> */}
              
              </div>
            
              <div className="d-flex justify-content-between">
              
                <span>{formatTime(currentTime)}</span>
            
                <span>{formatTime(duration)}</span>
              
              </div>
            
            </div>
          
          </div>
        
        </div>
      
        <section className="info">
        
          <div className="container">
          
            <div className="row">
            
              <div className="col-md-4 p-0">
              
                <div className="boxLeft">
                
                  <h3 className="title">prayers times</h3>
                
                  <h4 className='cityTime'>Prayer times in Mecca</h4>
                
                  <p className="date">Fri 6 Sep</p>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Fajr</h4>
                    
                      <span className='time'>04:48 AM</span>
                    
                    </div>
                  
                  </div>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Sunrise</h4>
                    
                      <span className='time'>5:48 AM</span>
                    
                    </div>
                  
                  </div>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Dhuhr</h4>
                    
                      <span className='time'>12:48 PM</span>
                    
                    </div>
                  
                  </div>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Asr</h4>
                    
                      <span className='time'>03:30 PM</span>
                    
                    </div>
                  
                  </div>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Maghrib</h4>
                    
                      <span className='time'>07:58 PM</span>
                    
                    </div>
                  
                  </div>
                
                  <div className="prayDetails">
                  
                    <div className="d-flex justify-content-between align-items-center">
                    
                      <h4 className="pray">Isha'a</h4>
                    
                      <span className='time'>09:12 PM</span>
                    
                    </div>
                  
                  </div>
                
                </div>
              
              </div>
            
              <div className="col-md-8 p-0">
              
                <div className="boxRight">
                
                  <span className="headTitle">history</span>
                
                  <h3 className="title">About Islam</h3>
                
                  <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, unde. Eos mollitia ipsa possimus saepe quam inventore similique quos ad quas esse est consectetur ab magni provident iste, dolorem nulla!</p>
                
                  <a href="#" className='btn btn-warning'>read more</a>
                
                </div>
              
              </div>
            
            </div>
          
          </div>
        
        </section>
      
        <section className="aboutUs section">
        
          <div className="container">
          
            <div className="row align-items-center">
            
              <div className="col-lg-6">
              
                <div className="image">
                
                  <img src={aboutUsCover} alt="" />
                
                </div>
              
              </div>
            
              <div className="col-lg-6">
              
                <div className="box">
                
                  <span className="headTitle">about us</span>
                
                  <h4 className="title">Seeking of knowledge is a duty of every Muslim</h4>
                
                  <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aliquam totam nostrum alias quae beatae eius veniam natus ratione, blanditiis recusandae sequi nisi porro nobis, fugiat iste! Exercitationem, ab tempora.</p>
                
                  <div className="btns d-flex align-items-center gap-5">
                  
                    <a href="#" className='btn btn-warning text-white'>Learn more</a>
                  
                    <a href="#"><i class="fa-regular fa-circle-play"></i> watch our video</a>
                  
                  </div>
                
                </div>
              
              </div>
            
            </div>
          
          </div>
        
        </section>
      
        <section className="pillars">
        
          <div className="container">
          
            <div className="titles">
            
              <span className="headTitle">About religion</span>
            
              <h4 className="title">Pillars of Islam</h4>
            
              <img src={prayerHead} alt="" />
            
            </div>
          
            <div className="d-flex justify-content-center gap-5 align-items-baseline flex-wrap">
            
              {/* <div className="col-lg-3"> */}
              
                <div className="box">
                
                  <div className="image">
                  
                    <img src={Shahadah} alt="" />
                  
                  </div>
                
                  <h4 className="name">Shahadah</h4>
                
                  <h4 className="en">[Faith]</h4>
                
                </div>
              
              {/* </div> */}
            
              {/* <div className="col-lg-3"> */}
              
                <div className="box">
                
                  <div className="image">
                  
                    <img src={Salah} alt="" />
                  
                  </div>
                
                  <h4 className="name">Salah</h4>
                
                  <h4 className="en">[Prayer]</h4>
                
                </div>
              
              {/* </div> */}
            
              {/* <div className="col-lg-3"> */}
              
                <div className="box">
                
                  <div className="image">
                  
                    <img src={Zakat}  alt="" />
                  
                  </div>
                
                  <h4 className="name">Zakat</h4>
                
                  <h4 className="en">[charity]</h4>
                
                </div>
              
              {/* </div> */}
          
              {/* <div className="col-lg-3"> */}
              
                <div className="box">
                
                  <div className="image">
                  
                    <img src={Sawm} alt="" />
                  
                  </div>
                
                  <h4 className="name">Sawm</h4>
                
                  <h4 className="en">[Fasting]</h4>
                
                </div>
              
              {/* </div> */}
            
              {/* <div className="col-lg-3"> */}
              
                <div className="box">
                
                  <div className="image">
                  
                    <img src={Haij} alt="" />
                  
                  </div>
                
                  <h4 className="name">Haij</h4>
                
                  <h4 className="en">[Pilgrimage]</h4>
                
                </div>
              
              {/* </div> */}
            
            </div>
          
          </div>
        
        </section>
      
      </>
  )
}