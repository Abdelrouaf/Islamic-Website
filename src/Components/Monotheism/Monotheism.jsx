import React, { useEffect, useRef, useState } from "react";
import loadingImg from '../../images/loading.png'
import style from "./Monotheism.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Azkar } from "islam.js";

export default function Monotheism() {

  const [isRTL, setIsRTL] = useState(false);

  // Function to detect the language and set direction
  const detectLanguage = () => {
    // Example: Check if the current language is Arabic
    const currentLang = document.documentElement.lang || "en";
    setIsRTL(currentLang === "ar"); // Adjust based on actual language detection logic
  };

   // Run detection on mount
   useEffect(() => {
    detectLanguage();
  }, []);

  const azkar = new Azkar();

  const [dataZikr, setDataZikr] = useState([]);
  const movingZikrRef = useRef(null);

  useEffect(() => {
    const allAzkar = azkar.getAll();
    setDataZikr(allAzkar);
  }, []);

  const [zikrScrollVisible, setZikrScrollVisible] = useState(false);

  const toggleZikrScroll = () => {
    setZikrScrollVisible(!zikrScrollVisible);
  };

  const [topics, setTopics] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [likes, setLikes] = useState([]);

  const mostLikedRef = useRef(null);

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/monotheismBlog/"
      );
      const data = await response.json();
      setTopics(data.monothesimBlog || []);

      const initialLikes = {};
      data.monothesimBlog.forEach((topic) => {
        initialLikes[topic._id] = topic.Likes;
      });

      setLikes(initialLikes);
    } catch {

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLikeClick = async (topicId) => {
    if (likes[topicId]) {
      return;
    }

    const isLiked = !likes[topicId];

    const currentLikes = topics.map((topic) =>
      topic._id === topicId
        ? { ...topic, Likes: isLiked ? topic.Likes + 1 : topic.Likes }
        : topic
    );

    setTopics(currentLikes);

    setLikes((prevLikes) => ({
      ...prevLikes,
      [topicId]: isLiked,
    }));

    try {
      const topic = topics.find((t) => t._id === topicId);

      const response = await axios.post(
        `http://147.79.101.225:2859/api/monotheismBlog/${topicId}`,
        {
          ...topic,
          Likes: isLiked ? topic.Likes + 1 : topic.Likes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const updatedLikes = topic.Likes;

        setTopics((prevTopics) =>
          prevTopics.map((t) =>
            t._id === topicId ? { ...t, Likes: updatedLikes } : t
          )
        );
      }
    } catch {}

    fetchData();
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
  };

  const handleScrollToTopic = (topicId) => {
    const element = document.getElementById(topicId);
    if (element) {
      const headerOffset = 150;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const recentBlogs = topics.slice(-5);

  const text = "Definition, Examples, & Facts";

  const h3Variants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const spanVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
    },
  };

  const variants = {
    hidden: { opacity: 0, y: -500 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const toUp = {
    hidden: { opacity: 0, y: 500 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // if (loading) {
  //   return  <div id="page">
  //   <div id="container">
  //     <div id="ring" />
  //     <div id="ring" />
  //     <div id="ring" />
  //     <div id="ring" />
  //     <div id="h3">loading</div>
  //   </div>
  // </div>
  // }

  if (loading) {
    return <div id='page'>
    
        <div>
        
            <div className='d-flex align-items-center justify-content-center'>
            
                <div className={style.fImage}>
                
                    <img src={loadingImg} width={100} alt="loading" />
                
                </div>
            
                <div className={style.sImage}>
                
                <div className={style.hourglassBackground}>
                    <div className={style.hourglassContainer}>
                    <div className={style.hourglassCurves} />
                    <div className={style.hourglassCapTop} />
                    <div className={style.hourglassGlassTop} />
                    <div className={style.hourglassSand} />
                    <div className={style.hourglassSandStream} />
                    <div className={style.hourglassCapBottom} />
                    <div className={style.hourglassGlass} />
                    </div>
                </div>
                
                </div>
            
            </div>
        
            <h4 style={{display: 'block !important', margin: '0'}}>استثمر دقائق الانتظار في الاستغفار</h4>
        
        </div>
    
    </div>

}

  return (
    <div className={`${style.blogSection} ${style.section}`}>
      <div
        className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}
      >
        {/* <div className={`text-center mb-5`}>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={variants}
            className={style.headTitle}
          >
            Monotheism
          </motion.span>

          <motion.h3
            className={style.title}
            initial="hidden"
            animate="visible"
            variants={h3Variants}
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={spanVariants}>
                {char}
              </motion.span>
            ))}
          </motion.h3>
        </div> */}
      </div>

      <div className="container">
        {topics.length > 0 ? (
          <div className="row gy-2 mt-5">
            <div className="col-md-8">
              {topics.map((topic, index) => (
                <div key={topic._id} className={style.topicSection}>
                  <div className={style.topicDesign} id={topic._id}>
                    <span className={style.count}>{index + 1}</span>

                    <h3 className={style.title}>{topic.title}</h3>
                  </div>

                  <div className={style.image}>
                    <img
                      src={`http://147.79.101.225:2859/uploads/Images/${topic.imageName}`}
                      alt={topic.title}
                      loading="lazy"
                    />
                  </div>

                  <div className={`${style.details} d-flex gap-3`}>
                    <span>
                      <i className="fa-regular fa-calendar"></i>
                      {getDate(topic.createdAt)}
                    </span>

                    {/* <span><i className={`fa-regular fa-heart ${likes[topic._id] ? style.liked : style.notLiked}`} onClick={() => handleLikeClick(topic._id)} style={{ cursor: 'pointer' }}></i> {topic.Likes}</span> */}

                    {/* <span><i className="fa-regular fa-eye"></i> {topic.Views} </span> */}
                  </div>

                  {topic.surah ? (
                    <div className={`${style.ayat} ${style.notranslate}`} translate="no">
                      <span className={style.enSurah}>
                        {" "}
                        <span className={style.basmala}>
                          In the name of allah, the beneficent, the merciful
                        </span>
                        {topic.contentEnglish}
                        <span className={style.surah}>
                          (Surah {topic.surah})
                        </span>{" "}
                      </span>

                      <span className={style.arSurah}>
                        {" "}
                        <span className={style.basmala}>
                          بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
                        </span>
                        {topic.contentArabic}{" "}
                        <span className={style.surah}>
                          {topic.NumberOfVerse}
                        </span>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <p className={style.paragraph}> */}
                  <div
                    className={style.paragraph}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(topic.description, {
                        ADD_TAGS: [
                          "img",
                          "video",
                          "iframe",
                          "p",
                          "div",
                          "span",
                          "br",
                        ],
                        ADD_ATTR: [
                          "src",
                          "controls",
                          "alt",
                          "class",
                          "style",
                          "allow",
                          "allowfullscreen",
                          "frameborder",
                          "scrolling",
                        ],
                      }),
                    }}
                  />
                  {/* </p> */}
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className={style.box}>
                <h4 className={style.title}>Recent Blogs</h4>

                <ul>
                  {
                    /* {topics.length > 0 ? (*/

                    recentBlogs.map((topic, index) => (
                      <li className={style.quickLink} key={topic._id}>
                        <div className={`${style.card} d-flex`}>
                          <div className={style.image}>
                            <a href={`#${topic.title}`}>
                              <img
                                src={`http://147.79.101.225:2859/uploads/Images/${topic.imageName}`}
                                alt={topic.title}
                                loading="lazy"
                              />
                            </a>
                          </div>

                          <div className={style.cardBody}>
                            <a
                              href={`#${topic.title}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleScrollToTopic(topic._id);
                              }}
                              className={style.cardTitle}
                            >
                              <h4>{topic.title}</h4>
                            </a>

                            <p className={style.paragraph}>
                              {getDate(topic.createdAt)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className={style.box}>
                <h4 className={style.title}>Blog Categories</h4>

                <ul>
                  {topics.map((topic, index) => (
                    <li className={style.quickLink} key={topic._id}>
                      <a
                        href={`#${topic.title}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScrollToTopic(topic._id);
                        }}
                        className={style.blogTitle}
                      >
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`${style.box} ${style.mostLikedBox} ${style.sticky}`}
                ref={mostLikedRef}
              >
                <h4 className={style.title}>most Views</h4>

                <ul>
                  {topics
                    .sort((a, b) => b.Views - a.Views)
                    .map((topic) => (
                      <li className={style.quickLink} key={topic._id}>
                        <a
                          href={`#${topic.title}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollToTopic(topic._id);
                          }}
                          className={style.mostLiked}
                        >
                          {topic.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className={`mt-5 ${style.fullEmpty}`}><span>There is no blogs right now! <br></br> Try again in another time</span></p>        )}
      </div>

      <span className={style.showToggle} onClick={toggleZikrScroll}>{zikrScrollVisible && <> <i className="fa-solid fa-caret-up"></i> show</>}</span>

<div className={`${style.zikrScroll} ${zikrScrollVisible ? 'd-none' : 'd-flex'}`}>
    <span className={style.hideToggle} onClick={toggleZikrScroll}>{ !zikrScrollVisible && <> <i className="fa-solid fa-caret-down"></i>hide </>}</span>

        <div
          className={style.scrollContent}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {Array.from(dataZikr.entries()).map(([zkar, items], index) => (
            <div key={index} className={style.box}>
              <ul>
                {items.map((item, key) => (
                  <span key={key}>
                    <li>
                      <h4>{zkar}</h4>
                      <p>{item.zikr}</p>
                    </li>
                  </span>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
