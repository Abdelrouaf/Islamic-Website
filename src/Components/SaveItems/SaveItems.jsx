import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import program1 from '../../images/program1.jpeg'
import { v4 as uuid } from 'uuid'
import style from './SaveItems.module.scss'
import axios from 'axios'

export default function SaveItems() {

    const [isLoading, setIsLoading] = useState(true);

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [allSavedPrograms, setAllSavedPrograms] = useState([])

    useEffect(() => {
        async function getData() {
            try {    
                const response = await fetch(`http://147.79.101.225:2859/api/saveitem`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });
    
                console.log('Response from API:', response);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();
                console.log('Data from save item:', data.savedItems);

                setAllSavedPrograms(data.savedItems)
                setIsLoading(false);

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
                setIsLoading(false);
            }
        }
    
        getData();
    }, [run]);

    // Unsave Program
    const UnsaveProgram = async (saveId) => {

        console.log("show program details ", saveId);

        try {    
            const response = await fetch(`http://147.79.101.225:2859/api/saveitem/${saveId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
                credentials: "include",
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status`);
            }
    
            const data = await response.json();
            
            showToast('Item deleted successfully!', 'success')
    
                const response2 = await fetch(`http://147.79.101.225:2859/api/saveitem`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });
        
                if (!response2.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data2 = await response2.json();
    
                setAllSavedPrograms(data2.savedItems)
                setIsLoading(false);
    
        } catch (error) {
            showToast('Error occurred during save the item', 'error')
            setIsLoading(false);
        }
    } 

    // Like Program
    const likeProgram = async (program) => {
        try {
            const updatedLikes = program.likes + 1;
    
            console.log("Attempting to update program likes:", program._id);
    
            const updateResponse = await axios.post(`http://147.79.101.225:2859/api/programs/${program._id}`, {
                ...program,
                likes: updatedLikes
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
    
            console.log("Update response status:", updateResponse.status);
            console.log("Response data:", updateResponse.data);
    
            if (updateResponse.status === 200 || updateResponse.status === 201) {
                setAllSavedPrograms((prevPrograms) =>
                    prevPrograms.map((t) =>
                        t._id === program._id ? { ...t, likes: updatedLikes } : t
                    )
                );
    
                showToast("Program liked!", "success");
            }
    
        } catch (error) {
            console.error("Error occurred during the like request:", error.message);
            if (error.response) {
                console.error("Response error status:", error.response.status);
                console.error("Response error data:", error.response.data);
            }
            showToast("Error liking the program", "error");
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

    if (isLoading) {
        return <p className={style.loading}>Loading, Please wait <span className={style.loader}></span></p>; 
    }  

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-bookmark"></i>  <i className="fa-solid fa-angle-right"></i> My Saved items </h4>

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

                                            <button onClick={ () => UnsaveProgram(saved._id) } className={style.bookmarkBtn}>
                                            
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

                                            <button onClick={ () => likeProgram(saved.programId) } className={style.like}>
                                            
                                                <span className={style.icon}>
                                            
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                                </svg>

                                                </span>

                                                <span className={style.title}>i love it</span>

                                            </button>

                                            {/* <div className={`${style.likeButton}`}>
                                            
                                                <input className={style.on} id="heart" type="checkbox" />
                                            
                                                <label className={style.likeLabel} htmlFor="heart">
                                                
                                                <svg className={style.likeIcon} fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                
                                                </svg>
                                            
                                                <span className={style.likeText}>Likes</span>
                                            
                                                </label>
                                            
                                                <span className={`${style.likeCount} ${style.one}`}>68</span>
                                            
                                                <span className={`${style.likeCount} ${style.two}`}>69</span>
                                            
                                            </div> */}

                                            <div className={style.viewSave}>

                                                <span className={style.views}>{formatNumber(saved.programId.views)} views</span>

                                                <span><i class="fa-regular fa-heart"></i> {saved.programId.likes}</span>

                                                <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> {formatNumber(saved.programId.saved)} </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )

                        } ) }

                    </div>

                </section>

            ) : <p className='d-flex align-items-center justify-content-center mt-5'>You didn't save any item</p> }

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
