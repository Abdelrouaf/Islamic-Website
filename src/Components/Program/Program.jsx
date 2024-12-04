import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import programImage from '../../images/program1.jpeg'
import { Azkar } from 'islam.js'
import { v4 as uuid } from 'uuid'
import style from './Program.module.scss'

export default function Program() {

    const { id, category } = useParams()

    const location = useLocation()

    const [run, setRun] = useState(0)

    const token = window.localStorage.getItem('accessToken')

    const [isLoading, setIsLoading] = useState(true);

    const [programData, setProgramData] = useState([])

    useEffect(() => {
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

        getData();
    }, [run]);

    const [allPrograms, setAllPrograms] = useState([])

    useEffect(() => {
        async function getData() {
            try {    
                if ( category === "All-Categories" ) {
                    const response = await fetch(`http://147.79.101.225:2859/api/programs/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        credentials: "include"
                    });
    
                    if (!response.ok) {
                        showToast('Failed to get item', 'error');
                    }
        
                    const data = await response.json();
    
                    setAllPrograms(data)
                    setIsLoading(false);

                } else {
                    const response = await fetch(`http://147.79.101.225:2859/api/programs/category?category=${category}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        credentials: "include"
                    });
    
                    if (!response.ok) {
                        showToast('Failed to get item', 'error');
                    }
        
                    const data = await response.json();
    
                    setAllPrograms(data.Programs)
                    setIsLoading(false);
                }

            } catch {
                showToast('Error in fetch categories', 'error');
                setIsLoading(false);
            }
        }
    
        getData();

        // Set the interval to refresh the data every 3 seconds
        const intervalId = setInterval(() => {
            getData();
        }, 1000);

        // Cleanup the interval when the component unmounts or `run` changes
        return () => {
            clearInterval(intervalId);
        };
        
    }, [category]);

    const [allItemsSaved, setAllItemsSaved] = useState([])

    useEffect( () => {
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

        // Set the interval to refresh the data every 3 seconds
        const intervalId = setInterval(() => {
            fetchAllSavedPrograms();
        }, 1000);

        // Cleanup the interval when the component unmounts or `run` changes
        return () => {
            clearInterval(intervalId);
        };

    }, [] )

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
                    // If the item is already saved, set deleteFromSave to true
                    setDeleteFromSave(true);
                    await deleteItem(existingItem._id);
                    return;
                }
            }
    
            // If deleteFromSave is false, save the item
            if (!deleteFromSave) {
                await saveItem(program);
            }
    
            // Fetch updated list of programs
            await fetchPrograms(category);
    
        } catch {
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
                body: JSON.stringify(program),
            });
    
            if (!response.ok) {
                showToast('Failed to save item', 'error');
            }
            showToast('Item saved successfully!', 'success');
        } catch {
            showToast('Error saving item', 'error');
        }
    };
    
    // Function to delete the item
    const deleteItem = async (saveId) => {
    
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/saveitem/${saveId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });
    
            if (!response.ok) {
                showToast('Failed to delete item', 'error');
            }
            showToast('Item deleted successfully!', 'success');
        
        } catch {
            showToast('Error deleting item', 'error');
        }
    };
    
    // Function to fetch programs after saving or deleting an item
    const fetchPrograms = async (category) => {
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/programs${category === "All-Categories" ? '' : `/category?category=${category}`}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });
    
            if (!response.ok) {
                showToast('Failed to fetch programs', 'error');
            }
    
            const data = await response.json();
            const programs = category === "All-Categories" ? data : data.Programs;
            setAllPrograms(programs);
            setIsLoading(false);
        } catch {
            showToast('Error fetching programs', 'error');
        }
    };

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

                    <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} <i className="fa-solid fa-angle-right"></i> autoDESK </h4>

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

                                        { programData.description.length > 0 ? (

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

                                    <li className='nav-item'><button className={`nav-link ${detailsFlag ? 'active' : ''} ${ (Object.values(programData.KeyFeatures).some((value) => value.trim() !== '') || programData.useCase.some((item) => item.trim() !== '')) ? 'd-block' : 'd-none' } `} onClick={ () => {setInstallationFlag(false); setSystemRequirementsFlag(false); setDetailsFlag(true)} } >details</button></li>

                                    <li className='nav-item'><button className={`nav-link ${systemRequirementsFlag ? 'active' : ''} ${ (Object.values(programData.MinimumRequirements).some((value) => value.trim() !== '') || Object.values(programData.MaximumRequirements).some((value) => value.trim() !== '') ) ? 'd-block' : 'd-none' } `} onClick={ () => {setDetailsFlag(false); setInstallationFlag(false); setSystemRequirementsFlag(true)} } >system requirements</button></li>

                                    <li className='nav-item'><button className={`nav-link ${installationFlag ? 'active' : ''} ${ programData.Installation.some((item) => item.trim() !== '')  ? 'd-block' : 'd-none' } `} onClick={ () => {setDetailsFlag(false); setSystemRequirementsFlag(false); setInstallationFlag(true)} } >Installation</button></li>

                                </ul>

                                <div className={style.detailsBox}>

                                    { (Object.values(programData.KeyFeatures).some((value) => value.trim() !== '') || programData.useCase.some((item) => item.trim() !== '')) ? (

                                        <div className={`${style.details} ${detailsFlag ? 'd-block' : 'd-none'}`}>

                                            <h4 className={style.detailsTitle}>Key features</h4>

                                            { programData.KeyFeatures.precisionDrafting ? (

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>Precision Drafting:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.precisionDrafting}</p>

                                                </div>

                                            ) : '' }

                                            { programData.KeyFeatures.modelingVisualization ? (

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>3D Modeling and Visualization:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.modelingVisualization}</p>

                                                </div>

                                            ) : ''  }

                                            { programData.KeyFeatures.extensiveLibraries ? ( 

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>Extensive Libraries:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.extensiveLibraries}</p>

                                                </div>

                                            ) : '' }

                                            { programData.KeyFeatures.collaboration ? (

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>Collaboration:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.collaboration}.</p>

                                                </div>

                                            ) : '' }

                                            { programData.KeyFeatures.customAutomation ? (

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>Custom Automation:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.customAutomation}</p>

                                                </div>

                                            ) : '' }

                                            { programData.KeyFeatures.integration ? (

                                                <div className={style.keyFeatures}>

                                                    <h4 className={style.keyFeaturesTitle}>Integration:</h4>

                                                    <p className={style.keyFeaturesDesc}>{programData.KeyFeatures.integration}</p>

                                                </div>

                                            ) : '' }

                                            { programData.useCase.length > 0 ? (

                                                <div className={style.useCases}>

                                                    <h4 className={style.useCasesTitle}>Use cases</h4>

                                                    <ul>

                                                        { programData.useCase.map( (cases, index) => 
                                                        
                                                            cases.trim() !== '' ? (

                                                            <li key={index}><p className={style.description}>{cases}</p></li>

                                                            ) : ''

                                                        ) }

                                                    </ul>

                                                </div>

                                            ) : '' }

                                            

                                        </div>

                                    ) : ''  }

                                    { (Object.values(programData.MinimumRequirements).some((value) => value.trim() !== '') || Object.values(programData.MaximumRequirements).some((value) => value.trim() !== '') ) ? (

                                        <div className={`${style.systemRequirements} ${systemRequirementsFlag ? 'd-block' : 'd-none'}`}>

                                            <div className={style.minimumRequirements}>

                                                <h4 className={style.systemRequirementsTitle}>Minimum Requirements</h4>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Operating System:</h4>

                                                    <h4 className={style.requirementsDesc}>Windows 10 (64-bit) or macOS Big Sur.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Processor:</h4>

                                                    <h4 className={style.requirementsDesc}>2.5–2.9 GHz processor.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>RAM:</h4>

                                                    <h4 className={style.requirementsDesc}>8 GB.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>GPU:</h4>

                                                    <h4 className={style.requirementsDesc}>Basic 1 GB GPU supporting DirectX 11.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Storage:</h4>

                                                    <h4 className={style.requirementsDesc}>10 GB free disk space.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Display:</h4>

                                                    <h4 className={style.requirementsDesc}>1920x1080 resolution.</h4>

                                                </div>

                                            </div>

                                            <div className={style.recommendedRequirements}>

                                                <h4 className={style.systemRequirementsTitle}>Recommended Requirements</h4>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Operating System:</h4>

                                                    <h4 className={style.requirementsDesc}>Windows 11 (64-bit) or macOS Ventura.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Processor:</h4>

                                                    <h4 className={style.requirementsDesc}>3+ GHz multi-core processor.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>RAM:</h4>

                                                    <h4 className={style.requirementsDesc}>16 GB or more.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>GPU:</h4>

                                                    <h4 className={style.requirementsDesc}>4 GB GPU with DirectX 12 support.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Storage:</h4>

                                                    <h4 className={style.requirementsDesc}>20 GB SSD for faster performance.</h4>

                                                </div>

                                                <div className={style.requirements}>

                                                    <h4 className={style.requirementsTitle}>Display:</h4>

                                                    <h4 className={style.requirementsDesc}>4K resolution support for professional clarity.</h4>

                                                </div>

                                            </div>

                                        </div>

                                    ) : '' }

                                    { programData.Installation.some((item) => item.trim() !== '')  ? (

                                        <div className={`${style.installationSteps} ${installationFlag ? 'd-block' : 'd-none'}`}>

                                            <h4 className={style.installationTitle}>Installation Steps</h4>

                                            <ol>

                                                { programData.Installation.map( (step, index) =>
                                                
                                                    step.trim() !== '' ? (

                                                        <li key={index}><p>{step}</p></li>

                                                    ) : ''
                                                
                                                ) }

                                            </ol>

                                        </div>

                                    ) : '' }

                                    

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-ghost"></i> <i className="fa-solid fa-angle-right"></i> related Programs </h4>

                </div>

            </section>

            <section className={style.selectCategory}>

                <div className="container">

                    { allPrograms.length <= 1 ? 
                    
                        <p className={style.fullEmpty}><span>There is no another programs right now! <br></br> Try again in another time</span></p>
                    
                        : (

                                <div className="row gy-2">

                                    { allPrograms && allPrograms.map( (program, index) => {

                                        if ( program._id !== programData._id ) {

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
    
                                                            <button onClick={ () => saveProgram(program) } className={style.bookmarkBtn}>
                                                            
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
    
                                                            <button  onClick={ () => likeProgram(program) } className={style.like}>
                                                            
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
    
                                                                <span className={style.views}>{formatNumber(program.views)} views</span>
    
                                                                <span><i className="fa-regular fa-heart"></i> {program.likes} </span>

                                                                <span className={style.Saved}>{allItemsSaved.find(item => item.programId._id === program._id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>) } {formatNumber(program.saved)} </span>
    
                                                            </div>
    
                                                        </div>
    
                                                    </div>
    
                                                </div>
    
                                            )
                                        
                                        }

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
