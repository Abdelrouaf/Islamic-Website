import React, { useEffect, useRef, useState } from "react";
import style from "./QuranSurahs.module.scss";
import { motion } from "framer-motion";
import { Quran } from "islam.js";
import Select from "react-select";
import Diacritics from "diacritics";

export default function QuranSurahs() {
  const surahLang = {
    ar: { api: "quran.json" },
    bn: { api: "quran_bn.json" },
    zh: { api: "quran_zh.json" },
    en: { api: "quran_en.json" },
    es: { api: "quran_es.json" },
    fr: { api: "quran_fr.json" },
    id: { api: "quran_id.json" },
    ru: { api: "quran_ru.json" },
    sv: { api: "quran_sv.json" },
    tr: { api: "quran_tr.json" },
    ur: { api: "quran_ur.json" },
  };

  const [topic, setTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [defaultSurah, setDefaultSurah] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultLang, setDefaultLang] = useState("quran_en.json");
  const mostLikedRef = useRef(null);
  const [verseIndexOnRead, setVerseIndexOnRead] = useState(2);

  const quran = new Quran();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/${defaultLang}`
        );
        const data = await response.json();

        setSelectedSurah(data[1].id);

        setDefaultSurah(data[1]);
        setTopics(data || []);
        setFilteredTopics(data || []);
        setTopic(data[1]);
        if (selectedSurah) {
          const matchingSurah = data.find(
            (surah) => surah.id === selectedSurah
          );
          if (matchingSurah) {
            setTopic(matchingSurah);
            setNameSurahPlay(matchingSurah.transliteration);
          }
        } else {
          setTopic(data[1]);
        }
        audioOnReadClick();
      } catch {}
    };

    fetchData();
  }, [defaultLang]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTopics(topics);
    } else {
      const filtered = topics.filter(
        (surah) =>
          surah.transliteration
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          surah.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchTerm, topics]);

  const onChangeLang = (e) => {
    const country = e.target.value;
    setDefaultLang(surahLang[country].api);

    if (selectedSurah) {
      const matchingSurah = topics.find((topic) => topic.id === selectedSurah);
      if (matchingSurah) {
        setTopic(matchingSurah);
        setNameSurahPlay(matchingSurah.transliteration);
      }
    }
  };

  const handleScrollToTopic = (topicId) => {
    const element = document.getElementById(topicId);
    if (element) {
      const headerOffset = 120;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const surahs =
    topics.length > 0
      ? Array.from({ length: 114 }, (_, index) => {
          return {
            value: index + 1,
            label: `${topics[index].transliteration} ${index + 1}`,
          };
        })
      : [];

  const getNumberOfVerses = (surahIndex) => {
    return quran.getChapterByIndex(surahIndex)?.numberOfVerses || 0;
  };

  const [surahIndex, setSurahIndex] = useState("");
  const [verseIndex, setVerseIndex] = useState("");
  const [verseIndexNumber, setVerseIndexNumber] = useState(0);
  const [surahIndexNumber, setSurahIndexNumber] = useState(1);

  const [verses, setVerses] = useState([]);
  const [versesTranslation, setVersesTranslation] = useState([]);
  const [surahSearchIndexName, setSurahSearchIndexName] = useState("");
  const [surahSearchIndexType, setSurahSearchIndexType] = useState("");

  const [showAudios, setShowAudios] = useState(false);

  const surahChange = (selectedOption) => {
    if (selectedOption) {
      setSurahIndex(selectedOption.value);
      setSurahIndexNumber(selectedOption.value);
      setVerseIndex("");
      setStartVerseIndex(null);
      setEndVerseIndex(null);
      setVerses([]);
      setVersesTranslation([]);
      setAudiosSearchAr([]);
      setAudiosSearchEn([]);
      setSurahSearchIndexType("");
      setSurahSearchIndexName("");
      setFlag(false);
    }
  };

  const [startVerseIndex, setStartVerseIndex] = useState(null);
  const [endVerseIndex, setEndVerseIndex] = useState(null);

  const startVerseChange = (selectedOption) => {
    setStartVerseIndex(selectedOption.value);
    setVerseIndex(selectedOption.value);
    setEndVerseIndex(null);
    setVerseIndexNumber(selectedOption.value);
  };

  const endVerseChange = (selectedOption) => {
    setEndVerseIndex(selectedOption.value);
  };

  const [flag, setFlag] = useState(false);

  // const handleSearch = () => {
  //     const surah = parseInt(surahIndex, 10);
  //     const verse = parseInt(verseIndex, 10);
  //     const endVerse = parseInt(endVerseIndex, 10)

  //     if (isNaN(surah) || surah === '') {
  //         setVerses([]);
  //         setVersesTranslation([]);
  //         setStartVerseIndex(null); // Reset start verse
  //         setEndVerseIndex(null); // Reset end verse
  //         return;
  //     }

  //     if (isNaN(verse) || isNaN(endVerse)) {
  //         setVerses([]);
  //         setVersesTranslation([]);
  //         return;
  //     }

  //     if (!isNaN(surah) && !isNaN(verse) && !isNaN(endVerse)) {
  //         const verseRange = [];

  //         for (let verseNo = verse; verseNo <= endVerse; verseNo++) {
  //             verseRange.push({ chapterNo: surah, verseNo });
  //         }

  //         const verseData = quran.getVerseRange(surah, verse, endVerse)
  //         const translationData = quran.getVerseRangeWithTranslation(surah, verse, endVerse)

  //         setSurahSearchIndexType(quran.getChapterByIndex(surah).type);
  //         setSurahSearchIndexName(quran.getChapterByIndex(surah).name)

  //         if (translationData && translationData.length > 0) {
  //             const translations = translationData.map(item => item.translation || 'Translation not found');
  //             setVerses(verseData);
  //             setVersesTranslation(translations);
  //         } else {
  //             setVerses(verseData);
  //             setVersesTranslation('Translation not found');
  //         }

  //         setFlag(true)
  //         audioOnSearchClick()
  //     }
  // };

  const handleSearch = () => {
    const surah = parseInt(surahIndex, 10);
    const verse = parseInt(verseIndex, 10);
    const endVerse = parseInt(endVerseIndex, 10);

    if (isNaN(surah) || surah === "") {
      setVerses([]);
      setVersesTranslation([]);
      setStartVerseIndex(null);
      setEndVerseIndex(null);
      return;
    }

    if (isNaN(verse) || isNaN(endVerse)) {
      setVerses([]);
      setVersesTranslation([]);
      return;
    }

    if (!isNaN(surah) && !isNaN(verse) && !isNaN(endVerse)) {
      const topic = topics.find((item) => item.id === surah);

      if (!topic) {
        setVerses([]);
        setVersesTranslation([]);
        return;
      }

      const verseRange = [];

      for (let verseNo = verse; verseNo <= endVerse; verseNo++) {
        const verseText = topic.verses.find((v) => v.id === verseNo);

        if (verseText) {
          verseRange.push({ id: verseText.id, text: verseText.text });
        }
      }

      const translations = verseRange.map((v) => {
        const translation =
          topic.verses.find((vv) => vv.id === v.id)?.translation ||
          "Translation not found";
        return translation;
      });

      setSurahSearchIndexType(topic.type);
      setSurahSearchIndexName(topic.name);

      if (verseRange.length > 0) {
        setVerses(verseRange);
        setVersesTranslation(translations);
      } else {
        setVerses([]);
        setVersesTranslation("Translation not found");
      }

      setFlag(true);
      audioOnSearchClick();
    }
  };

  const [audiosSearchAr, setAudiosSearchAr] = useState([]);
  const [audiosSearchEn, setAudiosSearchEn] = useState([]);
  const [audioReadAr, setAudioReadAr] = useState([]);
  const [audioReadEn, setAudioReadEn] = useState([]);

  let quranSearch = {
    verse: verses,
    translation: versesTranslation,
  };

  const BASE_URL =
    "https://cdn.islamic.network/quran/audio-surah/128/en.misharyrashidalafasyenglishtranslationsaheehibrahimwalk/";
  const INITIAL_SURAH_INDEX = 2;
  const [nameSurahPlay, setNameSurahPlay] = useState("Al-Baqarah");
  const [surahPlayIndex, setSurahPlayIndex] = useState(INITIAL_SURAH_INDEX);
  const [currentSurahPlay, setCurrentSurahPlay] = useState(
    `${BASE_URL}${surahIndex}.mp3`
  );
  const [progress, setProgress] = useState(0);
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const audioOnSearchClick = async () => {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahIndexNumber}/en.walk`
      );
      const data = await response.json();
      const audioUrlsEn = data.data.ayahs.map((ayah) => ayah.audio);
      setAudiosSearchEn(audioUrlsEn);
      setAudioReadEn(audioUrlsEn);

      const responseAr = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahIndexNumber}/ar.alafasy`
      );
      const dataAr = await responseAr.json();
      const audioUrlsAr = dataAr.data.ayahs.map((ayah) => ayah.audio);
      setAudiosSearchAr(audioUrlsAr);
      setAudioReadAr(audioUrlsAr);
    } catch {}
  };

  const showAudio = () => {
    setShowAudios((prev) => !prev);
  };

  const resetSearch = () => {
    setSurahIndex("");
    setVerseIndex("");
    setStartVerseIndex(null);
    setEndVerseIndex(null);
    setVerses([]);
    setVersesTranslation([]);
    setAudiosSearchAr([]);
    setAudiosSearchEn([]);
    setSurahSearchIndexType("");
    setSurahSearchIndexName("");
    setFlag(false);
  };

  const handleSurahClick = (surah) => {
    setTopic(surah);
    setPlay(false);
    setVerseIndexOnRead(surah.id);
    audioOnReadClick();
    setSelectedSurah(surah.id);
    setNameSurahPlay(surah.transliteration);
    setSurahPlayIndex(surah.id);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlayStop = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay(!play);
    }
  };

  const handleAudioReset = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setPlay(false);
    setProgress(0);
    setCurrentTime(0);
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
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", updateDuration);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, [currentSurahPlay]);

  useEffect(() => {
    setCurrentSurahPlay(`${BASE_URL}${surahPlayIndex}.mp3`);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [surahPlayIndex]);

  const handleMouseDown = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max(offsetX / rect.width, 0), 1);
    setProgress(newProgress * 100);
    audioRef.current.currentTime = newProgress * duration;
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleMouseDown(e);
    }
  };

  const [highlighted, setHighlighted] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const componentRef = useRef(null);

  const handleVerseClick = (verse, index, surah) => {
    const surahIndex = quran.getChapterByIndex(surah).number;

    setVerseIndexOnRead(surahIndex);

    if (
      highlightedWord &&
      highlightedWord.verse === verse &&
      highlightedWord.index === index
    ) {
      togglePlayStopOnRead(index);
      return;
    } else {
      setHighlightedWord({ verse, index, surah });
      setHighlighted(true);
    }
    audioOnReadClick();
  };

  const audioOnReadClick = async () => {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${verseIndexOnRead}/en.walk`
      );
      const data = await response.json();
      const audioUrlsEn = data.data.ayahs.map((ayah) => ayah.audio);
      setAudioReadEn(audioUrlsEn);

      const responseAr = await fetch(
        `https://api.alquran.cloud/v1/surah/${verseIndexOnRead}/ar.alafasy`
      );
      const dataAr = await responseAr.json();
      const audioUrlsAr = dataAr.data.ayahs.map((ayah) => ayah.audio);
      setAudioReadAr(audioUrlsAr);
    } catch {}
  };

  const audioReadRef = useRef([]);
  const [onReadAudio, setOnReadAudio] = useState(false);

  const togglePlayStopOnRead = (index) => {
    const audioElement = audioReadRef.current[index];
    if (audioElement) {
      audioElement.onended = handleAudioEnd;
      if (onReadAudio) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setOnReadAudio(!onReadAudio);
    }
  };

  const handleAudioEnd = () => {
    setOnReadAudio(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setHighlightedWord(null);
        setHighlighted(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHighlightedWord(null);
    setHighlighted(false);
  }, [defaultSurah, topic]);

  const text = "Surah";

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

  const numberOfVerses = getNumberOfVerses(surahIndex);

  const verseOptions = Array.from({ length: numberOfVerses }, (_, index) => ({
    value: index + 1,
    label: `Verse ${index + 1}`,
  }));

  const removeDiacritics = (text) => {
    return Diacritics.remove(text);
  };

  const normalizeArabicText = (text) => {
    if (!text) return "";

    let normalizedText = removeDiacritics(text);

    normalizedText = normalizedText
      .replace(/آ|ٱ|أ|إ|ا|إِ|ـ|ىٰ|ء|ءَٰٓ|ءَ|ءَا|ءَا| ٰ|وٰ/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ن|نَِ/g, "ن")
      .replace(/تَ|تُ/g, "ت")
      .replace(/يَ|ى|يَٰ|ي/g, "ي")
      .replace(/حَ|حَٰ/g, "ح")
      .replace(/ـَٔ/g, "ئ")
      .replace(/ئ|ؤ|ءَ/g, "ء")
      .replace(/ل/g, "ل");
    normalizedText = normalizedText.replace(/[\u0660-\u0669]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) - 0x0660 + 48)
    );

    normalizedText = normalizedText.replace(/[^ء-ي0-9a-zA-Z ]/g, "");

    return normalizedText;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loadingVerse, setLoadingVerse] = useState(false);

  const debounceTimer = useRef(null);

  const handleVerseSearch = (query) => {
    setSearchQuery(query);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    setLoadingVerse(true);

    debounceTimer.current = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setLoadingVerse(false);
        return;
      }

      const normalizedQuery = normalizeArabicText(query.trim());

      const isArabic = /[\u0600-\u06FF]/.test(query);

      const matchedResults = topics.reduce((acc, chapter) => {
        const matchedVerses = chapter.verses.filter((verse) => {
          const normalizedText = normalizeArabicText(verse.text);

          if (isArabic) {
            return normalizedText.includes(normalizedQuery);
          } else {
            return verse.translation
              .toLowerCase()
              .includes(query.trim().toLowerCase());
          }
        });

        if (matchedVerses.length > 0) {
          acc.push({
            chapterName: chapter.name,
            chapterNameInEnglish: chapter.transliteration,
            transliteration: chapter.transliteration,
            verses: matchedVerses,
            type: chapter.type,
            totalVerse: chapter.total_verses,
          });
        }

        return acc;
      }, []);

      setResults(matchedResults);
      setLoadingVerse(false);
    }, 300);
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const normalizedText = normalizeArabicText(text);
    const normalizedQuery = normalizeArabicText(query);

    const regex = new RegExp(`(${normalizedQuery})`, "gi");
    return normalizedText.split(regex).map((part, index) =>
      part.toLowerCase() === normalizedQuery.toLowerCase() ? (
        <span
          key={index}
          className={` text-black`}
          style={{ backgroundColor: "bisque", padding: "5px" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
    
    <div className={`${style.blogSection} ${style.section}`}>
      <div
        className={`${style.backgroundTitle} d-flex justify-content-center align-items-center`}
      >
        <div className={`text-center mb-5`}>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={variants}
            className={style.headTitle}
          >
            Quran
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
        </div>
      </div>

      <div className="container">
        <div className="row gy-2 mt-5">
          <div className="col-md-4">
            <div className={style.box}>
              <h4 className={style.title}>Listen to the Quran.</h4>

              <div className={style.quranPlayer}>
                <div className="d-block justify-content-between align-items-center position-relative z-2">
                  <h4 className={style.title}>{nameSurahPlay}</h4>

                  <audio ref={audioRef} src={currentSurahPlay}></audio>

                  <div
                    className={style.progressBar}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                  >
                    <div
                      className={style.customAudioBar}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className={style.progress}
                        onMouseLeave={() => {}}
                        style={{ width: `${progress}%` }}
                      ></div>

                      {/* <span>{time}</span> */}
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>{formatTime(currentTime)}</span>

                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        if (surahPlayIndex > 1) {
                          setSurahPlayIndex(surahPlayIndex - 1);
                          const previousSurah = topics.find(
                            (topic) => topic.id === surahPlayIndex - 1
                          );
                          setNameSurahPlay(
                            previousSurah ? previousSurah.transliteration : ""
                          );
                          if (play) {
                            setPlay(!play);
                          }
                        }
                      }}
                    >
                      <i className="fa-solid fa-backward"></i>
                    </button>

                    <button onClick={togglePlayStop}>
                      {play ? (
                        <i className="fa-solid fa-pause"></i>
                      ) : (
                        <i className="fa-solid fa-play"></i>
                      )}
                    </button>

                    <button onClick={handleAudioReset}>
                      <i className="fa-solid fa-stop"></i>
                    </button>

                    <button
                      onClick={() => {
                        if (surahPlayIndex < 114) {
                          setSurahPlayIndex(surahPlayIndex + 1);
                          const nextSurah = topics.find(
                            (topic) => topic.id === surahPlayIndex + 1
                          );
                          setNameSurahPlay(
                            nextSurah ? nextSurah.transliteration : ""
                          );
                          if (play) {
                            setPlay(!play);
                          }
                        }
                      }}
                    >
                      <i className="fa-solid fa-forward"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={toUp}
              className={style.search}
            >
              <div className={style.inputGroup}>
                <div className="form-outline">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    name="search"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  aria-label="search by surah name"
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={toUp}
              className={`${style.box} ${style.mostLikedBox} ${style.sticky}`}
              ref={mostLikedRef}
            >
              <h4 className={style.title}>All Surahs.</h4>
              <ul>
                {filteredTopics.map((surah, index) => (
                  <li className={style.quickLink} key={surah.id}>
                    <div className={`${style.cardBox}`}>
                      <div className={style.cardBody}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSurahClick(surah);
                          }}
                          className={`${style.cardTitle} d-flex justify-content-between align-items-center`}
                        >
                          <h4
                            className={`${
                              selectedSurah === surah.id ? style.hover : ""
                            }`}
                          >
                            {surah.id} Surah {surah.transliteration}.{" "}
                          </h4>
                          <h4
                            className={`${
                              selectedSurah === surah.id ? style.hover : ""
                            }`}
                          >
                            {" "}
                            سورة {surah.name}{" "}
                          </h4>
                        </a>
                        <p className={style.paragraph}>
                          Total Verses: {surah.total_verses}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="col-md-8">
            <div className={style.selectLang}>
              <select
                className="form-select"
                onChange={onChangeLang}
                value={Object.keys(surahLang).find(
                  (key) => surahLang[key].api === defaultLang
                )}
                aria-label="Default select example"
              >
                <option value="en">English</option>

                <option value="ar">Arabic</option>

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
              <div
                key={topic?.id}
                ref={componentRef}
                className={style.topicSection}
              >
                <div className={style.topicDesign} id={topic.id}>
                  <h3 className={style.title}>
                    {" "}
                    {defaultLang === "quran.json"
                      ? ` سورة  ${topic.name}`
                      : `Surah ${topic.transliteration}`}
                  </h3>
                  <h4 className={style.basmala}>
                    {" "}
                    {defaultLang === "quran.json"
                      ? "بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ"
                      : "In the name of Allah, the Entirely Merciful, the Especially Merciful"}{" "}
                  </h4>
                </div>
                <div
                  className={`${style.verses} ${
                    defaultLang === "quran.json"
                      ? style.directionRTL
                      : style.directionLTR
                  }`}
                >
                  {topic.verses.map((verse, index) => (
                    <p
                      key={verse.id}
                      className={`${style.paragraph} ${
                        highlightedWord &&
                        highlighted &&
                        highlightedWord.verse.id === verse.id
                          ? style.selection
                          : ""
                      }  d-inline`}
                      onClick={() => handleVerseClick(verse, index, topic.id)}
                    >
                      {defaultLang === "quran.json"
                        ? verse.text
                        : verse.translation}{" "}
                      <span className={style.verseNumberIndex}>
                        {" "}
                        {defaultLang === "quran.json"
                          ? `﴿${verse.id}﴾`
                          : `﴾${verse.id}﴿`}
                      </span>
                      <audio
                        ref={(el) => (audioReadRef.current[index] = el)}
                        src={audioReadEn[index]}
                        onEnded={handleAudioEnd}
                      ></audio>
                      <button
                        className={`${
                          highlightedWord &&
                          highlighted &&
                          highlightedWord.verse.id === verse.id
                            ? "d-block"
                            : "d-none"
                        }`}
                        onClick={() => togglePlayStopOnRead(index)}
                      >
                        {!onReadAudio ? (
                          <i className="fa-solid fa-play"></i>
                        ) : (
                          <i className="fa-solid fa-pause"></i>
                        )}
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              defaultSurah && (
                <div
                  key={defaultSurah.id}
                  ref={componentRef}
                  className={style.topicSection}
                >
                  <div className={style.topicDesign} id={defaultSurah.id}>
                    <h3 className={style.title}> سورة {defaultSurah.name}</h3>
                    <h4 className={style.basmala}>
                      بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
                    </h4>
                  </div>
                  <div className={style.verses}>
                    {defaultSurah.verses.map((verse, index) => (
                      <p
                        key={verse.id}
                        className={`${style.paragraph} ${
                          highlightedWord &&
                          highlighted &&
                          highlightedWord.verse.id === verse.id
                            ? style.selection
                            : ""
                        } d-inline rtl`}
                        onClick={() =>
                          handleVerseClick(verse, index, defaultSurah.id)
                        }
                      >
                        {defaultLang === "quran.json"
                          ? verse.text
                          : verse.translation}{" "}
                        <span className={style.verseNumberIndex}>
                          {" "}
                          {defaultLang === "quran.json"
                            ? `﴿${verse.id}﴾`
                            : `﴾${verse.id}﴿`}{" "}
                        </span>
                        <audio
                          ref={(el) =>
                            audioReadRef.current[(defaultSurah.id = el)]
                          }
                          src={audioReadEn[index]}
                          onEnded={handleAudioEnd}
                        ></audio>
                        <button
                          className={`${
                            highlightedWord &&
                            highlighted &&
                            highlightedWord.verse.id === verse.id
                              ? "d-block"
                              : "d-none"
                          }`}
                          onClick={() => togglePlayStopOnRead(index)}
                        >
                          {!onReadAudio ? (
                            <i className="fa-solid fa-play"></i>
                          ) : (
                            <i className="fa-solid fa-pause"></i>
                          )}
                        </button>
                      </p>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className={`${style.searchVersesBox} text-center`}>
          <h4 className="mb-3">Search for Quran Verses</h4>

          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className={`${style.input} ${style.verseSearch}`}>
              <input
                type="text"
                className="form-control p-2"
                placeholder="enter your verse here"
                value={searchQuery}
                onChange={(e) => {
                  handleVerseSearch(e.target.value);
                }}
              />

              {loadingVerse && (
                <svg viewBox="25 25 50 50" className={style.loadingContainer}>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    className={style.container}
                  ></circle>
                </svg>
              )}
            </div>
          </div>

          <div className={`d-block d-md-flex ${style.inputs}`}>
            <div className="d-md-flex gap-3 d-block">
              <Select
                value={
                  surahIndex
                    ? {
                        value: surahIndex,
                        label: `${
                          topics[surahIndex - 1].transliteration
                        } ${surahIndex}`,
                      }
                    : null
                }
                onChange={surahChange}
                options={surahs}
                placeholder="Select Surah Index"
                aria-label="Select Surah Index"
                isSearchable
              />

              <Select
                value={
                  startVerseIndex
                    ? {
                        value: startVerseIndex,
                        label: `Start Verse ${startVerseIndex}`,
                      }
                    : null
                }
                onChange={startVerseChange}
                options={verseOptions}
                placeholder="Select Start Verse"
                isDisabled={!surahIndex}
                aria-label="Select Start Verse Index"
                isSearchable
              />

              <Select
                value={
                  endVerseIndex
                    ? {
                        value: endVerseIndex,
                        label: `End Verse ${endVerseIndex}`,
                      }
                    : null
                }
                onChange={endVerseChange}
                options={verseOptions.filter(
                  (option) => option.value >= startVerseIndex
                )}
                placeholder="Select End Verse"
                isDisabled={!startVerseIndex}
                aria-label="Select End Verse Index"
                isSearchable
              />
            </div>

            <button
              onClick={handleSearch}
              aria-label="search by surah number and verse number"
              className="btn btn-primary m-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {flag ? (
              <button onClick={resetSearch} className="btn btn-success m-2">
                reset
              </button>
            ) : (
              ""
            )}

            {flag ? (
              <h4 onClick={showAudio} className={style.downloadBtn}>
                {" "}
                {!showAudios ? `Show Audio` : `hidden Audio`}{" "}
                {!showAudios ? (
                  <i className="fa-solid fa-volume-high"></i>
                ) : (
                  <i className="fa-solid fa-volume-xmark"></i>
                )}
              </h4>
            ) : (
              ""
            )}
          </div>

          {/* <div className={`${style.searchVerses} mt-3`}>

                        <p className={style.verseInEnglish}>{verseData.translation}</p>
                    
                        <p className={style.verseInArabic}> {verses[0] ? `{ ${verseData.verse} }` : ''}</p>

                        <div className="d-flex justify-content-between align-items-center">
                        
                            <p className={style.typeSurah}>{surahSearchIndexType}</p>

                            <p className={style.nameSurahInSearchBox}>{ surahSearchIndexName.length <= 0 ? '' : `[سورة ${surahSearchIndexName} ]` }</p>

                            <audio style={{display: 'none'}} ref={searchAudioRef} src={enAudioOnSearchClick} controls></audio>

                            <audio style={{display: 'none'}} ref={searchAudioArRef} src={arAudioOnSearchClick} controls></audio>

                        </div>

                    </div> */}

          <div
            className={`${style.searchVerses} mt-3 ${
              quranSearch?.verse?.length > 0 ? "d-block" : "d-none"
            }`}
          >
            <h4 className={style.basmala}>
              بِسۡمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
            </h4>

            {quranSearch?.verse?.map((verse, index) => (
              <div key={verse.id || index}>
                <div className={style.divVerseLang}>
                  <p className={style.verseInEnglish}>
                    {quranSearch.translation[index]}{" "}
                    <span className={style.verseNumberIndex}>
                      ﴾{index + verseIndexNumber}﴿
                    </span>
                  </p>
                </div>

                {showAudios ? (
                  <audio
                    style={{ display: "inline" }}
                    src={audiosSearchEn[index + verseIndexNumber - 1]}
                    controls
                  ></audio>
                ) : (
                  <audio
                    style={{ display: "none" }}
                    src={audiosSearchEn[index + verseIndexNumber - 1]}
                    controls
                  ></audio>
                )}

                <div className={style.divVerseLang}>
                  <p className={style.verseInArabic}>
                    {" "}
                    {quranSearch.verse[index].text}{" "}
                    <span className={style.verseNumberIndex}>
                      ﴿{index + verseIndexNumber}﴾
                    </span>
                  </p>
                </div>

                {showAudios ? (
                  <audio
                    style={{ display: "inline" }}
                    src={audiosSearchAr[index + verseIndexNumber - 1]}
                    controls
                  ></audio>
                ) : (
                  <audio
                    style={{ display: "none" }}
                    src={audiosSearchAr[index + verseIndexNumber - 1]}
                    controls
                  ></audio>
                )}
              </div>
            ))}

            <div
              className={`d-flex align-items-center ${style.surahBottomDetails}`}
            >
              <p className={style.nameSurahInSearchBox}>
                {" "}
                {surahSearchIndexName?.length <= 0
                  ? ""
                  : `[سورة ${surahSearchIndexName} ]`}{" "}
                -{" "}
              </p>

              <p className={style.typeSurah}> {surahSearchIndexType} </p>

              <p className={style.typeSurah}>[{numberOfVerses}]</p>
            </div>
          </div>

          {results.map((result, index) => (
            <div key={index}>
              {/* <h4>سورة {result.chapterName}</h4> */}
              <div
                className={`d-flex align-items-center justify-content-center`}
                style={{ direction: "rtl", color: "teal" }}
              >
                <p className={style.nameSurahInSearchBox}>
                  {" "}
                  {`[ سورة ${result.chapterName} Surah ${result.chapterNameInEnglish} ]`}{" "}
                  -{" "}
                </p>

                <p className={style.typeSurah}> {result.type} </p>

                <p className={style.typeSurah}>[{result.totalVerse}]</p>
              </div>
              {result.verses.map((verse, ind) => (
                <div key={ind}>
                  <p
                    className={`${style.verseInArabic} ${style.verseSearchStyle}`}
                  >
                    {highlightText(verse.text, searchQuery)}
                  </p>
                  <p
                    className={`${style.verseInEnglish} ${style.verseSearchStyle}`}
                  >
                    {highlightText(verse.translation, searchQuery)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
}
