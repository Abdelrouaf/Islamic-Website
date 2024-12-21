import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Azkar } from 'islam.js'
import { v4 as uuid } from 'uuid'
import loadingImg from '../../images/loading.png'
import style from './Category.module.scss'
import axios from 'axios'

export default function Category() {

    const { category } = useParams();

    const location = useLocation()

    const { description } = location.state || {}

    const [isLoading, setIsLoading] = useState(true);

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [allPrograms, setAllPrograms] = useState([])

    async function getData() {
        try {    
            if ( category === "All-Categories" ) {
                const response = await fetch(`http://147.79.101.225:2859/api/programs/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();

                setAllPrograms(data)
                setIsLoading(false);

            } else {
                const response = await fetch(`http://147.79.101.225:2859/api/programs/category?category=${category}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();

                setAllPrograms(data.Programs)
                setIsLoading(false);
            }

        } catch  {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();

    }, [category]);    

    const [allItemsSaved, setAllItemsSaved] = useState([])
    const [allItemsLiked, setAllItemsLiked] = useState([])

    useEffect( () => {
        const fetchAllSavedPrograms = async () => {
            try {
                const checkResponse = await fetch(`http://147.79.101.225:2859/api/saveitem/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                    },
                    credentials: "include",
                });
            
                if (checkResponse.ok) {
                    const allItems = await checkResponse.json();
                    const totalSaved = allItems.savedItems;
                    setAllItemsSaved(totalSaved)
                }
            
            } catch {
                setIsLoading(false)
            }
        }
        fetchAllSavedPrograms()

        const fetchAllLikedPrograms = async () => {
            try {
                const checkResponse = await fetch(`http://147.79.101.225:2859/api/like/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                    },
                    credentials: "include",
                });
            
                if (checkResponse.ok) {
                    const allItems = await checkResponse.json();
                    const totalLiked = allItems.MyLikes;
                    setAllItemsLiked(totalLiked)
                }
            
            } catch {
                setIsLoading(false)
            }
        }
        fetchAllLikedPrograms()

    }, [] )

    let isLiking = false;

    // Like From User
    const likeFromUser = async (program) => {

        if (isLiking) return;

        isLiking = true;

        try {        
            const response = await fetch(`http://147.79.101.225:2859/api/like/${program._id}`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                // body: JSON.stringify(program),
            });
    
            if (!response.ok) {
                // Log the response status and status text for debugging
                console.error(`Error: ${response.status} - ${response.statusText}`);
                const errorDetails = await response.json().catch(() => null); // Handle non-JSON error responses
                console.error("Error details:", errorDetails);
                throw new Error('Failed to Like item');
            }
            
            const newProgram = await response.json();
            const newProgramMessage = JSON.stringify(newProgram);
            showToast(newProgram.message, 'success')
            
        
            const responsePrograms = await fetch(`http://147.79.101.225:2859/api/programs/${category !== 'All-Categories' ? `category?category=${category}` : ''}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
                credentials: "include"
            });

            if (!responsePrograms.ok) {
                throw new Error(`HTTP error! status`);
            }

            const data = await responsePrograms.json();
            const programs = category === "All-Categories" ? data : data.Programs;

            setAllPrograms(programs)

            const checkResponse = await fetch(`http://147.79.101.225:2859/api/like/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
                credentials: "include",
            });
    
            if (checkResponse.ok) {
                const allItems = await checkResponse.json();
                const totalLikes= allItems.MyLikes;
                setAllItemsLiked(totalLikes)
            }
    
        } catch {
            showToast("Error liking the program", "error");
        } finally {
            isLiking = false;  // Reset the flag
        }
    }

    // Function to save the item
    const saveItem = async (program) => {
    
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/saveitem/${program._id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                credentials: "include",
                // body: JSON.stringify(program),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save item');
            }

            // await saveProgram(program)
            const responseData = await response.json();
            showToast(responseData.message, 'success')
    
            const responsePrograms = await fetch(`http://147.79.101.225:2859/api/programs/${category !== 'All-Categories' ? `category?category=${category}` : ''}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
                credentials: "include"
            });

            if (!responsePrograms.ok) {
                throw new Error(`HTTP error! status`);
            }

            const data = await responsePrograms.json();
            const programs = category === "All-Categories" ? data : data.Programs;

            setAllPrograms(programs)

            const checkResponse = await fetch(`http://147.79.101.225:2859/api/saveitem/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
                credentials: "include",
            });
    
            if (checkResponse.ok) {
                const allItems = await checkResponse.json();
                const totalSaved = allItems.savedItems;
                setAllItemsSaved(totalSaved)
            }
    
        } catch (error) {
            showToast('Error saving item', 'error');
        }
    };

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    // const movingZikrRef = useRef(null);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);

    const [zikrScrollVisible, setZikrScrollVisible] = useState(false)

    const toggleZikrScroll = () => {
        setZikrScrollVisible(!zikrScrollVisible)
    }

    function formatNumber(number) {
        if (number === undefined || number === null) {
            return ''; // Or return a default value, such as 'N/A'
        }
    
        if (number >= 1_000_000) {
            return `${(number / 1_000_000).toFixed(1)}M`;
        } else if (number >= 1_000) {
            return `${(number / 1_000).toFixed(1)}K`; 
        }
        return number.toString();
    }
    

    const [searchQuery, setSearchQuery] = useState('');

    // Filter the programs based on the search query
    const filteredPrograms = allPrograms && allPrograms.length > 0 ? allPrograms.filter(program =>
        program.programName && typeof program.programName === 'string' 
            && program.programName.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const [toasts, setToasts] = useState([]);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        const newToast = { id: uuid(), message, type };
    
        setToasts((prevToasts) => [...prevToasts, newToast]);
    
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user) {
            navigate('/sign');
        }
    }, [navigate]); 

    if (isLoading) {
        return <div id='page'>
        
            <div>
            
                <div className='d-flex align-items-center justify-content-center'>
                
                    <div className={style.fImage}>
                    
                        <img src={loadingImg} width={100} alt="loading" loading='lazy' />
                    
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

    // if (!allPrograms || allPrograms.length === 0) {
    //     return (
    //         <p className='d-flex justify-content-center align-items-center w-100 fs-5' style={{height: '100vh'}}>No items available</p>
    //     )
    // }

    return (
    
        <>
        
        {/* <section className={style.currentlyNav}>

            <div className="container">

                <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} </h4>

            </div>

        </section> */}

            <section className={style.categorySec}>

                <div className="container">

                    <div className={style.text}>

                        <h4 className={style.title}>{category}</h4>

                        <p className={style.description}>{description}</p>

                    </div>

                </div>

            </section>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} </h4>

                </div>

            </section>

            <section className={style.selectCategory}>

                <div className="container">

                    <div className="row gy-2">

                        <div className="col-lg-3 d-none d-lg-block">

                            <div className={style.selectBox}>

                                <h4 className={style.categoryTitle}>Programs category</h4>

                                <ul>

                                    <li><Link to='/programs/category/All-Categories' state={{ description: 'Showing all categories programs.' }} className={`${ location.pathname.endsWith('All-Categories') ? style.programsHover : '' }`}>All Categories</Link></li>

                                    <li><Link to='/programs/category/Architecture-Software' state={{ description: 'Architecture software programs are essential tools for architects, designers, and students to create, visualize, and refine architectural designs.' }} className={`${ location.pathname.endsWith('Architecture-Software') ? style.programsHover : '' }`}>Architecture software</Link></li>

                                    <li><Link to='/programs/category/Structure-Software' state={{ description: 'Structure software programs offer specialized tools for planning, designing, and managing infrastructure projects.' }} className={`${ location.pathname.endsWith('Structure-Software') ? style.programsHover : '' }`}>Structure software</Link></li>

                                    <li><Link to='/programs/category/Dental-Software' state={{ description: 'Dental programs are designed to support dentists, hygienists, and dental offices with tools for diagnostics, patient management, and treatment planning.' }} className={`${ location.pathname.endsWith('Dental-Software') ? style.programsHover : '' }`}>Dental software</Link></li>

                                    <li><Link to='/programs/category/English-Material' state={{ description: 'English Material contains resources for learning English, such as books, guides, grammar explanations, or vocabulary building materials.' }} className={`${ location.pathname.endsWith('English-Material') ? style.programsHover : '' }`}>English Material</Link></li>

                                    <li><Link to='/programs/category/English-Software' state={{ description: 'English Software designed to teach, test, or improve English skills. These could include language learning applications, typing tutors, or interactive tools.' }} className={`${ location.pathname.endsWith('English-Software') ? style.programsHover : '' }`}>English software</Link></li>

                                    <li><Link to='/programs/category/English-CDS' state={{ description: 'English CDS containing English lessons, audio books, or multimedia resources aimed at improving listening and speaking skills.' }} className={`${ location.pathname.endsWith('English-CDS') ? style.programsHover : '' }`}>English CDS</Link></li>

                                    <li><Link to='/programs/category/Islamic-CDS' state={{ description: 'Islamic CDS contain CDs with Islamic content, such as Quran recitations, lectures, or Nasheeds.' }} className={`${ location.pathname.endsWith('Islamic-CDS') ? style.programsHover : '' }`}>Islamic CDS</Link></li>

                                    <li><Link to='/programs/category/Islamic-Material' state={{ description: 'Islamic Material consists of Islamic educational content, including books, articles, and guides about the Quran, Hadith, and other aspects of Islamic teachings.' }} className={`${ location.pathname.endsWith('Islamic-Material') ? style.programsHover : '' }`}>Islamic Material</Link></li>

                                    <li><Link to='/programs/category/Different' state={{ description: 'Include a variety of unrelated programs or tools that don’t fit into the above categories. These could range from utility software to general learning applications.' }} className={`${ location.pathname.endsWith('Different') ? style.programsHover : '' }`}>Different</Link></li>

                                </ul>

                            </div>

                            { allPrograms && !allPrograms.length < 1 ? (

                                <div className={`${style.selectBox} ${style.sticky}`}>

                                    <h4 className={style.categoryTitle}>{category} Programs</h4>

                                    <div className={style.input}>

                                        <i className="fa-solid fa-magnifying-glass"></i>

                                        <input type="search" className='form-control p-2' placeholder='search here..' value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value) } />

                                    </div>

                                    <ul>

                                        { allPrograms && filteredPrograms.map( (program, index) => {

                                            return <li key={index}><Link to={`../${program.programCategory}/${program._id}`}>{program.programName}</Link></li>

                                        } ) }

                                    </ul>

                                </div>

                            ) : '' }

                            

                        </div>

                        <div className="col-lg-9">

                            { allPrograms.length < 1 || allPrograms === null ? 
                            
                                <p className={style.fullEmpty}><span>No programs in this category! <br></br> Try another one</span></p>
                        
                                : (

                                    <div className="row gy-2">

                                        { allPrograms && allPrograms.length > 0 && allPrograms.map( (program, index) => {

                                            const sizeInBytes = program.size;
                                            let sizeFormatted = '';

                                            if (isNaN(sizeInBytes) || sizeInBytes <= 0) {
                                                sizeFormatted = '0 KB'
                                            } else {
                                                if (sizeInBytes >= 1024 * 1024 * 1024) {
                                                    // GB
                                                    sizeFormatted = (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                } else if (sizeInBytes >= 1024 * 1024) {
                                                    // MB
                                                    sizeFormatted = (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
                                                } else {
                                                    // KB
                                                    sizeFormatted = (sizeInBytes / 1024).toFixed(2) + ' KB';
                                                }
                                            }

                                            // const isLiked = Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === program._id);

                                            // console.log("isliked: ", isLiked);
                                            

                                            return (

                                                <div className="col-md-12 col-lg-6 col-xxl-4" key={program._id}>

                                                    <div className={style.programBox}>

                                                        <Link to={`../${program.programCategory}/${program._id}`}>
                                                        
                                                            <div className={style.image}>

                                                                <img src={`http://147.79.101.225:2859/uploads/Programs/${program.programImage}`} alt="auto-desk" loading='lazy' />

                                                            </div>
                                                        
                                                        </Link>

                                                        <Link to={`../${program.programCategory}/${program._id}`}><h4 className={style.programTitle}>{program.programName}</h4></Link>

                                                        <p className={style.programSize}>Program size: <span>{sizeFormatted}</span></p>

                                                        <div className={style.btns}>

                                                            <Link to={`../${program.programCategory}/${program._id}`}>

                                                                <button className={style.viewBtn}>
                                                                
                                                                    View
                                                                
                                                                    <span className={style.arrow}>
                                                                    
                                                                        <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                                                    
                                                                    </span>

                                                                </button>
                                                            
                                                            </Link>

                                                            <button onClick={ () => saveItem(program) } className={style.bookmarkBtn}>
                                                            
                                                                <span className={style.IconContainer}>
                                                                
                                                                    <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                                                
                                                                    <path
                                                                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                                                    ></path>
                                                                
                                                                    </svg>
                                                                
                                                                </span>
                                                            
                                                                <p className={style.text}> { allItemsSaved.find(item => item.programId._id === program._id) ? 'Unsave' : 'Save' } </p>
                                                            
                                                            </button>

                                                        </div>

                                                        <div className={style.programDetails}>

                                                            <div onClick={ () => {likeFromUser(program)} } className={`${ Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === program._id) ? style.removeLikeButton : style.likeButton }`}>
                                                                                                                        
                                                                <input className={style.on} id={`heart-${program._id}`} type="checkbox" />

                                                                <label className={style.likeLabel} htmlFor={`heart-${program._id}`}>

                                                                    <svg className={style.likeIcon} fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />

                                                                    </svg>

                                                                    <span className={style.likeText}>Likes</span>

                                                                </label>

                                                                <span className={`${style.likeCount} ${style.one} ${Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === program._id) ? 'text-white': ''}`}>{formatNumber(program.likes)}</span>

                                                                <span className={`${style.likeCount} ${style.two} ${Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === program._id) ? 'text-white': ''}`}>{formatNumber(program.likes)}</span>

                                                            </div>

                                                            <div className={style.viewSave}>

                                                                <span className={style.views}> <i className="fa-regular fa-eye"></i>  {formatNumber(program.views)}</span>

                                                                <span className={style.downloads}><i className="fa-solid fa-download"></i> {formatNumber(program.downloads)} </span>

                                                                <span className={style.Saved}> {allItemsSaved.find(item => item.programId._id === program._id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>) } {formatNumber(program.saved)}</span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            )

                                        } ) }

                                    </div>

                                )

                            }

                        </div>

                        </div>

                </div>

            </section>

            <div id="toastBox" className={style.toastBox}>
            
                {toasts.map((toast) => (
                
                    <div key={toast.id} className={`${style.tast} ${toast.type} ${style[toast.type]} ${style.show}`}>
                    
                        <i className={`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'error' ? 'fa-times-circle' : toast.type === 'invalid' ? 'fa-exclamation-circle' : ''}`}></i>
                    
                        {toast.message}
                    
                        <div className={style.progress}></div>
                    
                    </div>
                
                ))}
            
            </div>

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
