import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import programImage from '../../images/program1.jpeg'
import { Azkar } from 'islam.js'
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
    
                console.log('Response from API:', response);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();
                console.log('Data received from API:', data.Program);

                setProgramData(data.Program)
                setIsLoading(false);

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
                setIsLoading(false);
            }
        };

        getData();
    }, [run]);

    const sizeInBytes = programData.size;
    let sizeFormatted = '';

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

    if (isLoading) {
        return <p className={style.loading}>Loading, Please wait <span className={style.loader}></span></p>; 
    }  

    console.log("progriam file ", programData.programFile);
    

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
                                        
                                            <a href={programData.programFile} target='_blank' download>Download</a>
                                        
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
