import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import program1 from '../../images/program1.jpeg'
import { v4 as uuid } from 'uuid'
import loadingImg from '../../images/loading.png'
import style from './SaveItems.module.scss'
import axios from 'axios'

export default function SaveItems() {

    const [isLoading, setIsLoading] = useState(true);

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [allSavedPrograms, setAllSavedPrograms] = useState([])

    const [allItemsLiked, setAllItemsLiked] = useState([])

    async function getData() {
        try {    
            const response = await fetch(`http://147.79.101.225:2859/api/saveitem`, {
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
            setAllSavedPrograms(data.savedItems)
            setIsLoading(false);

        } catch (error) {
            console.error("Error occurred during the fetch:", error.message);
            setIsLoading(false);
        }
    }

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

    useEffect(() => {
        getData();
        fetchAllLikedPrograms()
    }, [run]);

    let isLiking = false;

    const [likeMessage, setLikeMessage] = useState(false)

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

            if (newProgram.message === 'You Liked This Program') {
                setLikeMessage(true)
            } else {
                setLikeMessage(false)
            }
            
        
            const responsePrograms = await fetch(`http://147.79.101.225:2859/api/programs/`, {
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
            // setAllPrograms(data)

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
    
            const responsePrograms = await fetch(`http://147.79.101.225:2859/api/programs/`, {
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

            // setAllPrograms(data)

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
                setAllSavedPrograms(totalSaved)
            }
    
        } catch (error) {
            showToast('Error saving item', 'error');
        }
    };

    function formatNumber(number) {
        if (number >= 1_000_000) {
            return `${(number / 1_000_000).toFixed(1)}M`;
        } else if (number >= 1_000) {
            return `${(number / 1_000).toFixed(1)}K`; 
        }
        return number.toString();
    }

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

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    { allSavedPrograms.length > 0 && <h4><i className="fa-solid fa-bookmark"></i>  <i className="fa-solid fa-angle-right"></i> My Saved items </h4> }

                </div>

            </section>

            { allSavedPrograms.length > 0 ? (

                <section className={style.selectCategory}>

                    <div className="row gy-2">

                        { allSavedPrograms && allSavedPrograms.map( (saved, index) => {

                            const sizeInBytes = saved.programId.size;
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

                            return (

                                <div className="col-md-12 col-lg-6 col-xl-4" key={saved.programId._id}>

                                    <div className={style.programBox}>

                                        <Link to={`/programs/${saved.programId.programCategory}/${saved.programId._id}`}>
                                        
                                            <div className={style.image}>

                                                <img src={`http://147.79.101.225:2859/uploads/Programs/${saved.programId.programImage}`} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`/programs/${saved.programId.programCategory}/${saved.programId._id}`}><h4 className={style.programTitle}>{saved.programId.programName}</h4></Link>

                                        <p className={style.programSize}>Program size: <span>{sizeFormatted}</span></p>

                                        <div className={style.btns}>

                                            <Link to={`/programs/${saved.programId.programCategory}/${saved.programId._id}`}>

                                                <button className={style.viewBtn}>
                                                
                                                    View
                                                
                                                    <span className={style.arrow}>
                                                    
                                                        <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                                    
                                                    </span>

                                                </button>
                                            
                                            </Link>

                                            <button onClick={ () => saveItem(saved.programId) } className={style.bookmarkBtn}>
                                            
                                                <span className={style.IconContainer}>
                                                
                                                    <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                                
                                                    <path
                                                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                                    ></path>
                                                
                                                    </svg>
                                                
                                                </span>
                                            
                                                <p className={style.text}>Unsave</p>
                                            
                                            </button>


                                        </div>

                                        <div className={style.programDetails}>

                                            <div onClick={ () => {likeFromUser(saved.programId)} } className={`${ Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === saved.programId._id) ? style.removeLikeButton : style.likeButton }`}>
                                            
                                                <input className={style.on} id={`heart-${saved.programId._id}`} type="checkbox" />

                                                <label className={style.likeLabel} htmlFor={`heart-${saved.programId._id}`}>

                                                    <svg className={style.likeIcon} fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />

                                                    </svg>

                                                    <span className={style.likeText}>Likes</span>

                                                </label>

                                                <span className={`${style.likeCount} ${style.one}`}>{formatNumber(saved.programId.likes)}</span>

                                                <span className={`${style.likeCount} ${style.two}`}>{ likeMessage ? formatNumber(saved.programId.likes + 1) : formatNumber(saved.programId.likes - 1) }</span>

                                            </div>

                                            <div className={style.viewSave}>

                                                <span className={style.views}> <i className="fa-regular fa-eye"></i>  {formatNumber(saved.programId.views)}</span>

                                                <span className={style.downloads}><i className="fa-solid fa-download"></i> {formatNumber(saved.programId.downloads)} </span>

                                                <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> {formatNumber(saved.programId.saved)} </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )

                        } ) }

                    </div>

                </section>

            ) : <p className='d-flex align-items-center justify-content-center mt-5 h-100'>You didn't save any item</p> }

            <div id="toastBox" className={style.toastBox}>
                
                {toasts.map((toast) => (
                
                    <div key={toast.id} className={`${style.tast} ${toast.type} ${style[toast.type]} ${style.show}`}>
                    
                        <i className={`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'error' ? 'fa-times-circle' : toast.type === 'invalid' ? 'fa-exclamation-circle' : ''}`}></i>
                    
                        {toast.message}
                    
                        <div className={style.progress}></div>
                    
                    </div>
                
                ))}
            
            </div>
        
        </>
    
    )
}
