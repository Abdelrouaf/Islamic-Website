import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import style from './AddProgram.module.scss'
import axios from 'axios';

export default function AddProgram() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dataInLocalStorage = JSON.parse(localStorage.getItem('categoryData')) || []

    // Make overviews in array
    const [overviews, setOverviews] = useState(['']);

    const handleInputChange = (index, value) => {
    
        const updatedOverviews = [...overviews];
    
        updatedOverviews[index] = value;

            if (index === overviews.length - 1 && value.trim() !== '') {
            
                updatedOverviews.push('');
            
            }

        setOverviews(updatedOverviews);
    };

    // Make use cases in array
    const [useCases, setUseCases] = useState([''])

    const handleUseCase = (value, index) => {
    
        const updatedUseCase = [...useCases]

        updatedUseCase[value] = index

        if ( value === useCases.length - 1 && index.trim() !== '' ) {
            updatedUseCase.push('')
        }

        setUseCases(updatedUseCase)

    }

    // Make Installation step in array
    const [installationStep, setInstallationStep] = useState([''])

    const handleInstallationStep = (value, index) => {

        const updatedInstallationStep = [...installationStep]

        updatedInstallationStep[value] = index

        if ( value === installationStep.length - 1 && index.trim() !== ''  ) {
        
            updatedInstallationStep.push('')
        
        }

        setInstallationStep(updatedInstallationStep)

    }

    const [keyFeatures, setKeyFeatures] = useState({
        precisionDrafting: '',
        modelingVisualization: '',
        extensiveLibraries: '',
        collaboration: '',
        customAutomation: '',
        integration: ''
    })

    const onKeyFeaturesChange = (e) => {
        const {id, value} = e.target
        setKeyFeatures( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const [minRequirements, setMinRequirements] = useState({
        minOperatingSystem: '',
        minProcessor: '',
        minRAM: '',
        minGPU: '',
        minStorage: '',
        minDisplay: ''
    })

    const onMinRequirementsChange = (e) => {
        const {id, value} = e.target
        setMinRequirements( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const [maxRequirements, setMaxRequirements] = useState({
        maxOperatingSystem: '',
        maxProcessor: '',
        maxRAM: '',
        maxGPU: '',
        maxStorage: '',
        maxDisplay: ''
    })

    const onMaxRequirementsChange = (e) => {
        const {id, value} = e.target
        setMaxRequirements( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const [imageURL, setImageURL] = useState('')

    const [programData, setProgramData] = useState({
        programCategory: '',
        programImage: '',
        programFile: '',
        programName: '',
        description: overviews,
        KeyFeatures: keyFeatures,
        useCase: useCases,
        MinimumRequirements: minRequirements,
        MaximumRequirements: maxRequirements,
        Installation: installationStep
    })

    useEffect(() => {
        setProgramData((prevData) => ({
            ...prevData,
            description: overviews,
            KeyFeatures: keyFeatures,
            useCase: useCases,
            MinimumRequirements: minRequirements,
            MaximumRequirements: maxRequirements,
            Installation: installationStep
        }));
    
        
    }, [overviews, keyFeatures, useCases, minRequirements, maxRequirements, installationStep]);

    const onChange = (e) => {
        const {id, value} = e.target
        setProgramData( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const onImageChange = (e) => {
        if ( e.target.files && e.target.files[0] ) {
            const file = e.target.files[0]
            const imageURL = URL.createObjectURL(file)
            setProgramData( (prevState) => ({
                ...prevState,
                programImage: file
            }) )
            setImageURL(imageURL)
        }
    }

    const onFileChange = (e) => {
        if ( e.target.files && e.target.files[0] ) {
            const file = e.target.files[0]
            const fileURL = URL.createObjectURL(file)
            setProgramData( (prevState) => ({
                ...prevState,
                programFile: file
            }) )
            // setImageURL(imageURL)
        }
    }

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null)

    const deleteFile = () => {
        setProgramData( (prevState) => ({
            ...prevState,
            programFile: ''
        }) )
    
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const userToken = localStorage.getItem('accessToken')

// Function to check if the title already exists in the API
const checkTitleExists = async (programName) => {
    try {
        const response = await fetch('http://147.79.101.225:2859/api/programs/', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
        });
        const data = await response.json();

        const existingPrograms = data.Programs || [];

        return existingPrograms.some(
            (topic) => topic.programName.trim().toLowerCase() === programName.trim().toLowerCase()
        );
    } catch {
        showToast("Error fetching existing topics", "error")
        return false;
    }
};

    // Save Data 
    const saveData = async () => {
    
        if (
            !programData.programCategory.trim() ||
            !programData.programImage ||
            (programData.programImage && !(programData.programImage instanceof File)) ||
            !programData.programFile ||
            (programData.programFile && !(programData.programFile instanceof File)) ||
            !programData.programName.trim() ||
            !programData.description.some((item) => item.trim() !== '') ||
            !Object.values(programData.KeyFeatures).some((value) => value.trim() !== '') || 
            !programData.useCase.some((item) => item.trim() !== '') || 
            !Object.values(programData.MinimumRequirements).some((value) => value.trim() !== '') || 
            !Object.values(programData.MaximumRequirements).some((value) => value.trim() !== '') || 
            !programData.Installation.some((item) => item.trim() !== '') 
        ) {
            showToast('Invalid input, All input required', 'invalid');
            setIsSubmitting(false);
            return;
        }

        if (isSubmitting) return;
            setIsSubmitting(true);

        try {

            const titleExists = await checkTitleExists(programData.programName);

            if (titleExists) {
                showToast('A Program with this title already exists', 'error');
                setIsSubmitting(false)
                return;
            }

            const response = await axios.post('http://147.79.101.225:2859/api/programs/', 
                programData ,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )

            if ( response.status === 200 || response.status === 201 ) {
                showToast("Program added successfully!", 'success')
                resetData();
            } else {
                showToast(`Failed to add the program: Unexpected error occurred while adding the program.`, 'error');
            }

        } catch {
            showToast('An error occurred while adding the program', 'error');
        }

        // const data = JSON.parse(localStorage.getItem('programData')) || []

        // const existTitle = data.some((existingTitle) => existingTitle.programName === programData.programName )

        // if ( existTitle ) {
        //     showToast('Title already exist', 'error')
        //     return;
        // }

        // data.push(programData)

        // localStorage.setItem('programData', JSON.stringify(data))

        setIsSubmitting(false)

    }

    // Reset Data 
    const resetData = () => {
    
        setOverviews([''])
    
        setKeyFeatures({
            precisionDrafting: '',
            modelingVisualization: '',
            extensiveLibraries: '',
            collaboration: '',
            customAutomation: '',
            integration: ''
        })
    
        setUseCases([''])
    
        setMinRequirements({
            minOperatingSystem: '',
            minProcessor: '',
            minRAM: '',
            minGPU: '',
            minStorage: '',
            minDisplay: ''
        })
    
        setMaxRequirements({
            maxOperatingSystem: '',
            maxProcessor: '',
            maxRAM: '',
            maxGPU: '',
            maxStorage: '',
            maxDisplay: ''
        })
    
        setInstallationStep([''])
    
        setProgramData({
            programCategory: '',
            programImage: '',
            programFile: '',
            programName: '',
            description: overviews,
            KeyFeatures: keyFeatures,
            useCase: useCases,
            MinimumRequirements: minRequirements,
            MaximumRequirements: maxRequirements,
            Installation: installationStep,
        });
    
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }

        setIsSubmitting(false);
    };

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
        return <p className={style.loading}>Loading, Please wait... <span className={style.loader}></span></p>; 
    } 

    return (
    
        <>

            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>Add Program</h4>

                </div>

                <div className="container">

                    <div className={` ${style.box}`}>
                    
                        <div className="container">
                        
                            <form onSubmit={(e) => { e.preventDefault(); saveData() }}>
                            
                                <div className={style.inputs}>
                                
                                    <div className="mb-4 d-flex align-items-center gap-3">
                                    
                                        <div className={style.inputTitle}>
                                        
                                            <h4>Select Program Category:</h4>
                                        
                                        </div>
                                    
                                        <div className={` ${style.rightInput} ${style.input}`}>
                                        
                                            <select className={`form-select w-auto py-2`} id='programCategory' value={programData['programCategory']} onChange={onChange}>
                                            
                                                <option value="" disabled>
                                                    choose a category
                                                </option>

                                                <option value="Architecture-Software">
                                                    Architecture software
                                                </option>

                                                <option value="Structure-Software">
                                                    Structure software
                                                </option>

                                                <option value="Dental-Software">
                                                    Dental software
                                                </option>

                                                <option value="English-Material">
                                                    English Material
                                                </option>

                                                <option value="English-Software">
                                                    English software
                                                </option>

                                                <option value="English-CDS">
                                                    English CDS
                                                </option>

                                                <option value="Islamic-CDS">
                                                    Islamic CDS
                                                </option>

                                                <option value="Islamic-Material">
                                                    Islamic Material
                                                </option>
                                            
                                                {/* {dataInLocalStorage.map((category, index) => ( */}
                                                
                                                    <option value="Different">
                                                        Different
                                                    </option>
                                                
                                                {/* ))} */}
                                            
                                            </select>
                                        
                                        </div>
                                        
                                    </div>
                                
                                    <div className="row gy-2 align-items-center justify-content-between mb-3">
                                    
                                        <div className="col-2">
                                        
                                            <div className={style.inputTitle}>
                                            
                                                <h4>Image</h4>
                                            
                                            </div>
                                        
                                        </div>
                                    
                                        <div className="col-sm-12 col-md-10">
                                        
                                            <div className={style.rightInput}>
                                            
                                                <div className='d-flex gap-4'>
                                                
                                                    <div className={style.uploadImage}>
                                                    
                                                        <input
                                                            type="file"
                                                            onChange={onImageChange}
                                                            name='storeLogo'
                                                            accept="image/*"
                                                            id='programImage' 
                                                            ref={imageInputRef}
                                                        />
                                                    
                                                        <i className="fa-solid fa-plus"></i>
                                                    
                                                    </div>
                                                
                                                    { programData.programImage && (
                                                    
                                                        <div className={`${style.uploadImage} p-2`}>
                                                        
                                                            <img src={imageURL} alt="Uploaded" loading='lazy' />
                                                        
                                                        </div>
                                                    
                                                    ) } 
                                                
                                                </div>
                                            
                                            </div>
                                        
                                        </div>
                                        
                                        {/* <div className={`my-3 ${style.inputTitle}`}>
                                        
                                            <h4>Upload program file</h4>
                                        
                                        </div>
                                    
                                        <div className={`w-100 ${style.rightInput}`}>
                                        
                                            <div className={`${style.fileContainer} w-100 `}> 
                                            
                                                <div className={style.fileHeader}> 
                                                
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> 
                                                    
                                                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g>
                                                    
                                                    </svg> 
                                                    
                                                    <p>{ programData.programFile === '' ? 'Browse File to upload!' : 'File added' }</p>
                                                
                                                    <input type="file" onChange={onFileChange} id={style['programFile']} ref={fileInputRef} /> 
                                                
                                                </div> 
                                            
                                                <label htmlFor="file" className={style.fileFooter}> 
                                                
                                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></g></svg> 
                                            
                                                <p>{ programData.programFile === '' ? "Not selected file" : programData.programFile.name }</p> 
                                            
                                                <svg onClick={deleteFile} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} /> <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" /> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} /> </g></svg>
                                            
                                                </label> 
                                            
                                                
                                            
                                            </div>

                                        </div> */}
                                    
                                    </div>
                                
                                    <div className="mb-4">
                                
                                        <div className={style.inputTitle}>
                                        
                                            <h4>Program name</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            <input type="text" className='form-control py-2' placeholder='enter Program title' id="programName"
                                                value={programData['programName']}
                                                onChange={onChange} 
                                                />
                                        
                                        </div>
                                        
                                    </div>
                                
                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Program overview</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            {overviews.map((overview, index) => (
                                            
                                                <div key={index}>
                                                
                                                    <label htmlFor={`Overview ${index + 1}`}>{`Overview ${index + 1}`}</label>

                                                    <input
                                                        key={index}
                                                        type="text"
                                                        value={overview}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                        placeholder={`Overview ${index + 1}`}
                                                        className='form-control py-2 my-2'
                                                        id={`Overview ${index + 1}`}
                                                    />
                                                
                                                </div>
                                            
                                            ))}
                                        
                                        </div>
                                    
                                    </div>
                            
                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Key Features</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            <div>

                                                <label htmlFor="precisionDrafting">Precision Drafting</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Precision Drafting' id="precisionDrafting"
                                                value={keyFeatures['precisionDrafting']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>
                                        
                                            <div>

                                                <label htmlFor="modelingVisualization">3D Modeling and Visualization</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Modeling and Visualization' id="modelingVisualization"
                                                value={keyFeatures['modelingVisualization']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="extensiveLibraries">Extensive Libraries</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Extensive Libraries' id="extensiveLibraries"
                                                value={keyFeatures['extensiveLibraries']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="collaboration">Collaboration</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Collaboration' id="collaboration"
                                                value={keyFeatures['collaboration']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="customAutomation">Custom Automation</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Custom Automation' id="customAutomation"
                                                value={keyFeatures['customAutomation']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="integration">Integration</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Integration' id="integration"
                                                value={keyFeatures['integration']}
                                                onChange={onKeyFeaturesChange} 
                                                />

                                            </div>

                                        </div>
                                    
                                    </div>
                                
                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Program use cases</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            {useCases.map((useCase, index) => (
                                            
                                                <div key={index}>
                                                
                                                    <label htmlFor={`useCase ${index + 1}`}>{`Use Case ${index + 1}`}</label>

                                                    <input
                                                        key={index}
                                                        type="text"
                                                        value={useCase}
                                                        onChange={(e) => handleUseCase(index, e.target.value)}
                                                        placeholder={`Use Case ${index + 1}`}
                                                        className='form-control py-2 my-2'
                                                        id={`useCase ${index + 1}`}
                                                    />
                                                
                                                </div>
                                            
                                            ))}
                                        
                                        </div>
                                    
                                    </div>

                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Minimum System Requirements</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            <div>

                                                <label htmlFor="minOperatingSystem">Operating System</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Operating System' id="minOperatingSystem"
                                                value={minRequirements['minOperatingSystem']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>
                                        
                                            <div>

                                                <label htmlFor="minProcessor">Processor</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Processor' id="minProcessor"
                                                value={minRequirements['minProcessor']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="minRAM">RAM</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter RAM' id="minRAM"
                                                value={minRequirements['minRAM']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="minGPU">GPU</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter GPU' id="minGPU"
                                                value={minRequirements['minGPU']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="minStorage">Storage</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Storage' id="minStorage"
                                                value={minRequirements['minStorage']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="minDisplay">Display</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Display' id="minDisplay"
                                                value={minRequirements['minDisplay']}
                                                onChange={onMinRequirementsChange} 
                                                />

                                            </div>

                                        </div>
                                    
                                    </div>

                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Recommended System Requirements</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            <div>

                                                <label htmlFor="maxOperatingSystem">Operating System</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Operating System' id="maxOperatingSystem"
                                                value={maxRequirements['maxOperatingSystem']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>
                                        
                                            <div>

                                                <label htmlFor="maxProcessor">Processor</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Processor' id="maxProcessor"
                                                value={maxRequirements['maxProcessor']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="maxRAM">RAM</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter RAM' id="maxRAM"
                                                value={maxRequirements['maxRAM']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="maxGPU">GPU</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter GPU' id="maxGPU"
                                                value={maxRequirements['maxGPU']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="maxStorage">Storage</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Storage' id="maxStorage"
                                                value={maxRequirements['maxStorage']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>

                                            <div>

                                                <label htmlFor="maxDisplay">Display</label>

                                                <input type="text" className='form-control py-2 my-2' placeholder='enter Display' id="maxDisplay"
                                                value={maxRequirements['maxDisplay']}
                                                onChange={onMaxRequirementsChange} 
                                                />

                                            </div>

                                        </div>
                                    
                                    </div>

                                    <div className="mb-4">
                                    
                                        <div className={`d-flex justify-content-center align-items-center ${style.inputTitle}`}>
                                        
                                            <h4 className={style.multiUse}>Program Installation Steps</h4>
                                        
                                        </div>
                                    
                                        <div className={`${style.rightInput} ${style.input} w-100`}>
                                        
                                            {installationStep.map((step, index) => (
                                            
                                                <div key={index}>
                                                
                                                    <label htmlFor={`installationStep ${index + 1}`}>{`Installation Step ${index + 1}`}</label>

                                                    <input
                                                        key={index}
                                                        type="text"
                                                        value={step}
                                                        onChange={(e) => handleInstallationStep(index, e.target.value)}
                                                        placeholder={`Installation Step ${index + 1}`}
                                                        className='form-control py-2 my-2'
                                                        id={`installationStep ${index + 1}`}
                                                    />
                                                
                                                </div>
                                            
                                            ))}
                                        
                                        </div>
                                    
                                    </div>

                                    <div className={`my-3 ${style.inputTitle}`}>
                                        
                                            <h4>Upload program file</h4>
                                        
                                        </div>
                                    
                                        <div className={`mb-3 w-100 ${style.rightInput}`}>
                                        
                                            <div className={`${style.fileContainer} w-100 `}> 
                                            
                                                <div className={style.fileHeader}> 
                                                
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> 
                                                    
                                                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g>
                                                    
                                                    </svg> 
                                                    
                                                    <p>{ programData.programFile === '' ? 'Browse File to upload!' : 'File added' }</p>
                                                
                                                    <input type="file" onChange={onFileChange} id={style['programFile']} ref={fileInputRef} /> 
                                                
                                                </div> 
                                            
                                                <label htmlFor="file" className={style.fileFooter}> 
                                                
                                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></g></svg> 
                                            
                                                <p>{ programData.programFile === '' ? "Not selected file" : programData.programFile.name }</p> 
                                            
                                                <svg onClick={deleteFile} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} /> <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" /> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} /> </g></svg>
                                            
                                                </label> 
                                            
                                                
                                            
                                            </div>

                                        </div>

                                </div>
                                
                                <div className={`d-flex justify-content-end align-items-center gap-3 ${style.btns}`}>
                                
                                    <button type="reset" onClick={resetData} className={`btn btn-outline-success ${style.backBtn}`}>
                                        Reset
                                    </button>
                                
                                    <button type="submit" className={`btn btn-success ${style.saveBtn}`} disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving..' : 'Save'}
                                    </button>
                                
                                </div>
                            
                            </form>
                        
                        </div>
                    
                    </div>

                </div>

            </div>
        
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
