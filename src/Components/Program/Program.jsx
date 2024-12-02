import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import programImage from '../../images/program1.jpeg'
import { Azkar } from 'islam.js'
import style from './Program.module.scss'

export default function Program() {

    const [run, setRun] = useState(0)

    const token = window.localStorage.getItem('accessToken')

    // console.log("fw ", token);
    

    useEffect(() => {
        async function getData() {
            try {
                await fetch('http://147.79.101.225:2859/api/programs/', {
                    method : "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                        credentials: "include"
                })
                .then( (res) => res.json() )
                // .then( (data) => console.log(data) )
                .then( err => console.error("Error is: ", err) )
            } catch (error) {
                console.error("error ", error);
            }
        };

        getData();
    }, [run]);

    const { category } = useParams();

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

                                        <img src={programImage} alt="program-image" loading='lazy' />

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className={style.programOverview}>

                                        <h4 className={style.programTitle}>autoDESK - autoCAD</h4>

                                        <div className={style.downloadProgram}>
                                        
                                            <a href="#">Download</a>
                                        
                                            <b className={style.top}>click to download</b>
                                        
                                            <b className={style.bottom}>1.2MB .zip</b>
                                        
                                        </div>

                                        <div className={style.overview}>

                                            <h4 className={style.overviewTitle}>overview:</h4>

                                            <ul>

                                                <li><p><i className="fa-solid fa-check"></i>AutoCAD is a professional software for 2D and 3D computer-aided design (CAD).</p></li>

                                                <li><p><i className="fa-solid fa-check"></i>It is widely used by architects, engineers, and construction professionals for drafting, designing, and modeling.</p></li>

                                            </ul>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-12">

                            <div className={style.programDetails}>

                                <ul className='nav nav-tabs'>

                                    <li className='nav-item'><button className={`nav-link ${detailsFlag ? 'active' : ''}`} onClick={ () => {setInstallationFlag(false); setSystemRequirementsFlag(false); setDetailsFlag(true)} } >details</button></li>

                                    <li className='nav-item'><button className={`nav-link ${systemRequirementsFlag ? 'active' : ''} `} onClick={ () => {setDetailsFlag(false); setInstallationFlag(false); setSystemRequirementsFlag(true)} } >system requirements</button></li>

                                    <li className='nav-item'><button className={`nav-link ${installationFlag ? 'active' : ''} `} onClick={ () => {setDetailsFlag(false); setSystemRequirementsFlag(false); setInstallationFlag(true)} } >Installation</button></li>

                                </ul>

                                <div className={style.detailsBox}>

                                    <div className={`${style.details} ${detailsFlag ? 'd-block' : 'd-none'}`}>

                                        <h4 className={style.detailsTitle}>Key features</h4>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>Precision Drafting:</h4>

                                            <p className={style.keyFeaturesDesc}>Tools to create detailed 2D drawings.</p>

                                        </div>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>3D Modeling and Visualization:</h4>

                                            <p className={style.keyFeaturesDesc}>Advanced tools for creating 3D models and rendering them.</p>

                                        </div>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>Extensive Libraries:</h4>

                                            <p className={style.keyFeaturesDesc}>Pre-built templates, blocks, and objects.</p>

                                        </div>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>Collaboration:</h4>

                                            <p className={style.keyFeaturesDesc}>Cloud storage and sharing tools for project collaboration.</p>

                                        </div>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>Custom Automation:</h4>

                                            <p className={style.keyFeaturesDesc}>Use of scripts and plugins to automate repetitive tasks.</p>

                                        </div>

                                        <div className={style.keyFeatures}>

                                            <h4 className={style.keyFeaturesTitle}>Integration:</h4>

                                            <p className={style.keyFeaturesDesc}>Compatibility with other Autodesk products (e.g., Revit, Inventor).</p>

                                        </div>

                                        <div className={style.useCases}>

                                            <h4 className={style.useCasesTitle}>Use cases</h4>

                                            <ul>

                                                <li><p className={style.description}>Architectural designs and blueprints.</p></li>

                                                <li><p className={style.description}>Mechanical component modeling.</p></li>

                                                <li><p className={style.description}>Electrical schematics and plumbing diagrams.</p></li>

                                                <li><p className={style.description}>Civil engineering project layouts.</p></li>

                                            </ul>

                                        </div>

                                    </div>

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

                                    <div className={`${style.installationSteps} ${installationFlag ? 'd-block' : 'd-none'}`}>

                                        <h4 className={style.installationTitle}>Installation Steps</h4>

                                        <ol>

                                            <li><p>Download the installer specific to your operating system.</p></li>

                                            <li><p>Run the installer and follow on-screen instructions.</p></li>

                                            <li><p>Enter your product key and license (if applicable).</p></li>

                                            <li><p>Complete the setup and restart your system.</p></li>

                                        </ol>

                                    </div>

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
