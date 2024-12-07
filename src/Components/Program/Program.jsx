import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import programImage from '../../images/program1.jpeg'
import { Azkar } from 'islam.js'
import { v4 as uuid } from 'uuid'
import style from './Program.module.scss'

export default function Program() {

    const { id, category } = useParams()

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    // const movingZikrRef = useRef(null);

    const [zikrScrollVisible, setZikrScrollVisible] = useState(false)

    const toggleZikrScroll = () => {
        setZikrScrollVisible(!zikrScrollVisible)
    }

    const [run, setRun] = useState(0)

    const token = window.localStorage.getItem('accessToken')

    const [isLoading, setIsLoading] = useState(true);

    const [programData, setProgramData] = useState([])

    const [allPrograms, setAllPrograms] = useState([])

    const [allItemsSaved, setAllItemsSaved] = useState([])
    const [allItemsLiked, setAllItemsLiked] = useState([])

            async function getData() {
            try {    
                const response = await fetch(`http://147.79.101.225:2859/api/programs/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                });
        
                if (!response.ok) {
                    showToast('Failed to delete item', 'error');
                }
    
                const data = await response.json();

                setProgramData(data.Program)
                setIsLoading(false);

            } catch {
                showToast('Error in fetch categories', 'error');
                setIsLoading(false);
            }
        };

        async function getProgramsData() {
            try {    
                const response = await fetch(`http://147.79.101.225:2859/api/programs/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();
    
                setAllPrograms(data)
                setIsLoading(false);
    
            } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
                setIsLoading(false);
            }
        }

    useEffect(() => {

        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);

        getData();
        getProgramsData();

        const fetchAllSavedPrograms = async () => {
            try {
                const checkResponse = await fetch(`http://147.79.101.225:2859/api/saveitem/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });
            
                if (checkResponse.ok) {
                    const allItems = await checkResponse.json();
                    const totalSaved = allItems.savedItems;
                    setAllItemsSaved(totalSaved)
                }
            
            } catch {
                isLoading(false)
            }
        }
        fetchAllSavedPrograms()

        const fetchAllLikedPrograms = async () => {
            try {
                const checkResponse = await fetch(`http://147.79.101.225:2859/api/like/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });
            
                if (checkResponse.ok) {
                    const allItems = await checkResponse.json();
                    const totalLiked = allItems.MyLikes;
                    setAllItemsLiked(totalLiked)
                }
            
            } catch {
                isLoading(false)
            }
        }
        fetchAllLikedPrograms()

        // Set the interval to refresh the data every 3 seconds
        const intervalId = setInterval(() => {
            fetchAllSavedPrograms();
            fetchAllLikedPrograms();
        }, 100);

        // Cleanup the interval when the component unmounts or `run` changes
        return () => {
            clearInterval(intervalId);
        };
    
    }, [run]);

    let isLiking = false;

    // Like From User
    const likeFromUser = async (program) => {

        if (isLiking) return;

        console.log("likeFromUser received program:", program);
        isLiking = true;

        try {        
            const response = await fetch(`http://147.79.101.225:2859/api/like/${program._id}`,{
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
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
            console.log("Program liked and updated:", newProgram);

            showToast(newProgram.message, 'success')
    
            allItemsLiked();
    
        } catch {
            showToast("Error liking the program", "error");
        } finally {
            isLiking = false;  // Reset the flag
        }
    }

    // Like Program
    const likeProgram = async (program) => {

        try {
            const updatedLikes = program.likes + 1;
        
            const updateResponse = await axios.post(`http://147.79.101.225:2859/api/programs/${program._id}`, {
                ...program,
                likes: updatedLikes
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
    
            if (updateResponse.status === 200 || updateResponse.status === 201) {
                setAllPrograms((prevPrograms) =>
                    prevPrograms.map((t) =>
                        t._id === program._id ? { ...t, likes: updatedLikes } : t
                    )
                );
    
            }
    
        } catch {
            
        }
    };

    const [deleteFromSave, setDeleteFromSave] = useState(false);

    // Save or delete the program
    const saveProgram = async (program) => {
        try {    
            const checkResponse = await fetch(`http://147.79.101.225:2859/api/saveitem/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });
    
            if (checkResponse.ok) {
                const allItems = await checkResponse.json();
                const totalSaved = allItems.savedItems;
                const existingItem = totalSaved.find(item => item.programId._id === program._id);
    
                if (existingItem) {
                    showToast('Item deleted from saved successfully!', 'success');
                    return;
                }
            }

            showToast('Item saved successfully!', 'success');

            // allItemsSaved();
    
    
        } catch (error) {
            showToast('Error occurred during save the item', 'error');
            setIsLoading(false);
        }
        setDeleteFromSave(false);
    }
    
    // Function to save the item
    const saveItem = async (program) => {
    
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/saveitem/${program._id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                credentials: "include",
                // body: JSON.stringify(program),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save item');
            }

            await saveProgram(program)
    
            // Fetch updated programs after saving the item
            // await fetchPrograms(category);
    
        } catch (error) {
            showToast('Error saving item', 'error');
        }
    };
    
    // Function to fetch programs after saving or deleting an item
    // const fetchPrograms = async (category) => {
    //     try {
    //         const response = await fetch(`http://147.79.101.225:2859/api/programs/`, {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //             credentials: "include",
    //         });
    
    //         if (!response.ok) {
    //             showToast('Failed to fetch programs', 'error');
    //         }
    
    //         const data = await response.json();
    //         setAllPrograms(data);
    //         setIsLoading(false);
    //     } catch {
    //         showToast('Error fetching programs', 'error');
    //     }
    // };

    // Download Program
    const DownloadProgram = async (programId) => {

        try {
            const response = await fetch(`http://147.79.101.225:2859/api/programs/download/${programId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify(programId),
            });
    
            if (!response.ok) {
                showToast('Failed to downloaded item', 'error');
            }
            showToast('Item downloaded successfully!', 'success');
        } catch {
            showToast('Error in downloading item', 'error');
        }
    }

    function formatNumber(number) {
        if (number >= 1_000_000) {
            return `${(number / 1_000_000).toFixed(1)}M`;
        } else if (number >= 1_000) {
            return `${(number / 1_000).toFixed(1)}K`; 
        }
        return number.toString();
    }

    const sizeInBytes = programData.size;
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

    const [detailsFlag, setDetailsFlag] = useState(true)

    const [systemRequirementsFlag, setSystemRequirementsFlag] = useState(false)

    const [installationFlag, setInstallationFlag] = useState(false)

    const [toasts, setToasts] = useState([]);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        const newToast = { id: uuid(), message, type };
    
        setToasts((prevToasts) => [...prevToasts, newToast]);
    
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000);
    };

    // console.log("all programs ", allPrograms);
    

    const filteredProgramsByCategory = allPrograms && allPrograms.filter(
        program => program._id !== programData._id && program.programCategory === programData.programCategory
    );
    
    const programsToDisplay = filteredProgramsByCategory && filteredProgramsByCategory.length > 0 
        ? filteredProgramsByCategory 
        : allPrograms.filter(program => program._id !== programData._id); 

        // console.log("programs to display ", programsToDisplay);
        

    if (isLoading) {
        return  <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">loading</div>
        </div>
      </div>; 
    }  

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} <i className="fa-solid fa-angle-right"></i> {programData.programName   } </h4>

                </div>

            </section>

            <section className={style.programSec}>

                <div className="container">

                    <div className="row gy-2">

                        <div className="col-12">

                            <div className="row gy-2">

                                <div className="col-md-6">

                                    <div className={style.image}>

                                        <img src={`http://147.79.101.225:2859/uploads/Programs/${programData.programImage}`} alt="program-image" loading='lazy' />

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className={style.programOverview}>

                                        <h4 className={style.programTitle}>{programData.programName}</h4>

                                        <div className={style.downloadProgram}>
                                        
                                            <a onClick={ () => DownloadProgram(programData._id)} href={`http://147.79.101.225:2859/uploads/Programs/${programData.programFile}`} target='_blank' download>Download</a>
                                        
                                            <b className={style.top}>click to download</b>
                                        
                                            <b className={style.bottom}>{sizeFormatted}</b>
                                        
                                        </div>

                                        { programData && programData.description && programData.description.length > 0 ? (

                                            <div className={style.overview}>

                                                <h4 className={style.overviewTitle}>overview:</h4>

                                                <ul>

                                                    { programData.description.map( (description, index) =>

                                                        description.trim() !== '' ? (
                                                        
                                                            <li key={index + 1}><p><i className="fa-solid fa-check"></i>{description}</p></li>
                                                        
                                                        ) : null 

                                                    ) }

                                                </ul>

                                            </div>

                                        ) : '' }

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-12">

                            <div className={style.programDetails}>

                            <ul className='nav nav-tabs'>
    <li className='nav-item'>
        <button
            className={`nav-link ${detailsFlag ? 'active' : ''} ${
                programData &&
                programData.KeyFeatures &&
                (Object.values(programData.KeyFeatures).some((value) => value.trim() !== '') ||
                    (programData.useCase && programData.useCase.some((item) => item.trim() !== '')))
                    ? 'd-block'
                    : 'd-none'
            }`}
            onClick={() => {
                setInstallationFlag(false);
                setSystemRequirementsFlag(false);
                setDetailsFlag(true);
            }}
        >
            Details
        </button>
    </li>

    <li className='nav-item'>
        <button
            className={`nav-link ${systemRequirementsFlag ? 'active' : ''} ${
                programData &&
                programData.MinimumRequirements &&
                programData.MaximumRequirements &&
                (Object.values(programData.MinimumRequirements).some((value) => value.trim() !== '') ||
                    Object.values(programData.MaximumRequirements).some((value) => value.trim() !== ''))
                    ? 'd-block'
                    : 'd-none'
            }`}
            onClick={() => {
                setDetailsFlag(false);
                setInstallationFlag(false);
                setSystemRequirementsFlag(true);
            }}
        >
            System Requirements
        </button>
    </li>

    <li className='nav-item'>
        <button
            className={`nav-link ${installationFlag ? 'active' : ''} ${
                programData &&
                programData.Installation &&
                programData.Installation.some((item) => item.trim() !== '')
                    ? 'd-block'
                    : 'd-none'
            }`}
            onClick={() => {
                setDetailsFlag(false);
                setSystemRequirementsFlag(false);
                setInstallationFlag(true);
            }}
        >
            Installation
        </button>
    </li>
</ul>


                                <div className={style.detailsBox}>

                                {programData &&
    (
        (programData.KeyFeatures && Object.values(programData.KeyFeatures).some((value) => value.trim() !== '')) ||
        (programData.useCase && programData.useCase.some((item) => item.trim() !== ''))
    ) ? (
    <div className={`${style.details} ${detailsFlag ? 'd-block' : 'd-none'}`}>
        <h4 className={style.detailsTitle}>Key features</h4>

        {programData.KeyFeatures?.precisionDrafting && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>Precision Drafting:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.precisionDrafting}</p>
            </div>
        )}

        {programData.KeyFeatures?.modelingVisualization && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>3D Modeling and Visualization:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.modelingVisualization}</p>
            </div>
        )}

        {programData.KeyFeatures?.extensiveLibraries && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>Extensive Libraries:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.extensiveLibraries}</p>
            </div>
        )}

        {programData.KeyFeatures?.collaboration && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>Collaboration:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.collaboration}.</p>
            </div>
        )}

        {programData.KeyFeatures?.customAutomation && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>Custom Automation:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.customAutomation}</p>
            </div>
        )}

        {programData.KeyFeatures?.integration && (
            <div className={style.keyFeatures}>
                <h4 className={style.keyFeaturesTitle}>Integration:</h4>
                <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.integration}</p>
            </div>
        )}

        {programData.useCase?.length > 0 && (
            <div className={style.useCases}>
                <h4 className={style.useCasesTitle}>Use cases</h4>
                <ul>
                    {programData.useCase.map((cases, index) =>
                        cases.trim() !== '' ? (
                            <li key={index}>
                                <p className={style.description}>{cases}</p>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        )}
    </div>
) : null}

{programData &&
    (
        (programData.MinimumRequirements && Object.values(programData.MinimumRequirements).some((value) => value.trim() !== '')) ||
        (programData.MaximumRequirements && Object.values(programData.MaximumRequirements).some((value) => value.trim() !== ''))
    ) ? (
    <div className={`${style.systemRequirements} ${systemRequirementsFlag ? 'd-block' : 'd-none'}`}>
        {/* System requirements content */}
    </div>
) : null}

{programData?.Installation?.some((item) => item.trim() !== '') && (
    <div className={`${style.installationSteps} ${installationFlag ? 'd-block' : 'd-none'}`}>
        <h4 className={style.installationTitle}>Installation Steps</h4>
        <ol>
            {programData.Installation.map((step, index) =>
                step.trim() !== '' ? (
                    <li key={index}>
                        <p>{step}</p>
                    </li>
                ) : null
            )}
        </ol>
    </div>
)}


                                    

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className={style.currentlyNav}>

                <div className="container">

                    <h4 className={`${ allPrograms && allPrograms.length <= 1 ? 'd-none' : 'd-inline-block'}`}><i className="fa-solid fa-ghost"></i> <i className="fa-solid fa-angle-right"></i> { allPrograms.find(program => program.programCategory !== category ) ? "other programs" : 'related Programs' } </h4>

                </div>

            </section>

            <section className={style.selectCategory}>

                <div className="container">

                    { programsToDisplay && programsToDisplay.length < 1 ? 
                    
                        <p className={style.fullEmpty}><span>There is no another programs right now! <br></br> Try again in another time</span></p>
                    
                        : (

                                <div className="row gy-2">

                                    { programsToDisplay && programsToDisplay.map( (program) => {

if (!program._id) {
    console.warn('Missing _id for program:', program);
    return null;
}

                                            // console.log("every program details ", program);
                                            

                                            const sizeInBytes = program.size;
                                            let sizeFormatted = '';
    
                                            if (isNaN(sizeFormatted) || sizeFormatted <= 0) {
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
                                        
                                            return (

                                                <div className="col-md-12 col-lg-6 col-xl-4" key={program._id}>
    
                                                    <div className={style.programBox}>
    
                                                        <Link to={`../${category}/${program._id}`}>
                                                        
                                                            <div className={style.image}>
    
                                                                <img src={`http://147.79.101.225:2859/uploads/Programs/${program.programImage}`} alt="auto-desk" loading='lazy' />
    
                                                            </div>
                                                        
                                                        </Link>
    
                                                        <Link to={`../${category}/${program._id}`}><h4 className={style.programTitle}>{program.programName}</h4></Link>
    
                                                        <p className={style.programSize}>Program size: <span>{sizeFormatted}</span></p>
    
                                                        <div className={style.btns}>
    
                                                            <Link to={`../${category}/${program._id}`}>
    
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
                                                            
                                                                <p className={style.text}>{ allItemsSaved.find(item => item.programId._id === program._id) ? 'Unsave' : 'Save' }</p>
                                                            
                                                            </button>
    
                                                        </div>
    
                                                        <div className={style.programDetails}>
    
                                                            <div onClick={ () => {likeFromUser(program)} } className={`${ Array.isArray(allItemsLiked) && allItemsLiked.some(item => item.programId?._id === program._id) ? style.removeLikeButton : style.likeButton }`}>
                                                                
                                                                <input className={style.on} id="heart" type="checkbox" />

                                                                <label className={style.likeLabel} htmlFor="heart">

                                                                    <svg className={style.likeIcon} fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />

                                                                    </svg>

                                                                    <span className={style.likeText}>Likes</span>

                                                                </label>

                                                                <span className={`${style.likeCount} ${style.one}`}>{formatNumber(program.likes)}</span>

                                                                <span className={`${style.likeCount} ${style.two}`}>{formatNumber(program.likes)}</span>
                                                        
                                                            </div>
    
                                                            <div className={style.viewSave}>
    
                                                                <span className={style.views}>{formatNumber(program.views)} views</span>
    
                                                                <span><i className="fa-regular fa-heart"></i> {program.likes} </span>

                                                                <span className={style.Saved}>{allItemsSaved.find(item => item.programId._id === program._id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>) } {formatNumber(program.saved)} </span>
    
                                                            </div>
    
                                                        </div>
    
                                                    </div>
    
                                                </div>
    
                                            )
                                        
                                        // }

                                    } ) }

                                </div>

                            )

                        }

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

            <span className={style.showToggle} onClick={toggleZikrScroll}>{zikrScrollVisible && <i className="fa-solid fa-caret-up"></i>}</span>

            <div className={`${style.zikrScroll} ${zikrScrollVisible ? 'd-none' : 'd-flex'}`}>
                <span className={style.hideToggle} onClick={toggleZikrScroll}>{ !zikrScrollVisible && <i className="fa-solid fa-caret-down"></i>}</span>
                
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
