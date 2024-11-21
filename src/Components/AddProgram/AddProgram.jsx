import React, { useEffect, useState } from 'react'
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
    
        console.log("data ", programData);
        
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

        const form = new FormData();

        form.append('programCategory', programData.programCategory)
        form.append('programImage', programData.programImage)
        form.append('programFile', programData.programFile)
        form.append('programName', programData.programName)
        form.append('description', programData.description)
        form.append('KeyFeatures', programData.KeyFeatures)
        form.append('useCase', programData.useCase)
        form.append('MinimumRequirements', programData.MinimumRequirements)
        form.append('MaximumRequirements', programData.MaximumRequirements)
        form.append('Installation', programData.Installation)

        try {

            const response = await axios.post('http://147.79.101.225:2859/api/programs/', 
                programData ,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )

            console.log("res ", response);
            

        } catch (error) {
            console.error("error is ", error);
            console.log("error ", error)
            showToast('error ', 'error')
        }

        const data = JSON.parse(localStorage.getItem('programData')) || []

        const existTitle = data.some((existingTitle) => existingTitle.programName === programData.programName )

        if ( existTitle ) {
            showToast('Title already exist', 'error')
            return;
        }

        setIsSubmitting(true)

        data.push(programData)

        localStorage.setItem('programData', JSON.stringify(data))
        showToast("Program added successfully!", 'success')

        resetData();

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
        
            { dataInLocalStorage.length > 1 ? (

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
                                                        Select a category
                                                    </option>
                                                
                                                    {dataInLocalStorage.map((category, index) => (
                                                    
                                                        <option key={index} value={category.title}>
                                                        {category.title}
                                                        </option>
                                                    
                                                    ))}
                                                
                                                </select>
                                            
                                            </div>
                                            
                                        </div>
                                    
                                        <div className="row align-items-center justify-content-between mb-3">
                                        
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
                                        
                                            <div className="col-2">
                                            
                                            <div className={style.inputTitle}>
                                            
                                                <h4>File</h4>
                                            
                                            </div>
                                        
                                            </div>
                                        
                                            <div className="col-sm-12 col-md-10">
                                            
                                                <div className={style.rightInput}>
                                                
                                                    <div className='d-flex gap-4'>
                                                    
                                                        <div className={style.uploadImage}>
                                                        
                                                            <input
                                                                type="file"
                                                                onChange={onFileChange}
                                                                // name='storeLogo'
                                                                // accept="image/*"
                                                                id='programFile' 
                                                            />
                                                        
                                                            <i className="fa-solid fa-plus"></i>
                                                        
                                                        </div>
                                                    
                                                    </div>
                                                
                                                </div>
                                            
                                            </div>

                                        </div>
                                    
                                        <div className="mb-4">
                                    
                                            <div className={style.inputTitle}>
                                            
                                                <h4>Program title</h4>
                                            
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

            ) : (

                <>
                
                    <p className={`${style.loading} text-danger`}>You have to add Category First.</p>
                
                </>

            ) }
        
        
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
