import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import style from './UpdateProgram.module.scss'
import axios from 'axios'

export default function UpdateProgram() {

    const {id} = useParams()

    // const { category } = useParams();

    const navigate = useNavigate(null)

    const [isLoading, setIsLoading] = useState(false);

    const [overviews, setOverviews] = useState(['']);

    // Make overviews in array
    const handleInputChange = (index, value) => {

        const updatedOverviews = [...overviews];
    
        updatedOverviews[index] = value;

            if (index === overviews.length - 1 && value.trim() !== '') {
            
                updatedOverviews.push('');
            
            }

        setOverviews(updatedOverviews);
        setProgramData( (prevState) => ({
            ...prevState,
            description: updatedOverviews
        }) )
    };

    const [useCases, setUseCases] = useState([''])

    // Make use cases in array
    const handleUseCase = (value, index) => {

        const updatedUseCase = [...useCases]

        updatedUseCase[value] = index

        if ( value === useCases.length - 1 && index.trim() !== '' ) {
            updatedUseCase.push('')
        }

        setUseCases(updatedUseCase)

        setProgramData( (prevState) => ({
            ...prevState,
            useCase: updatedUseCase
        }) )

    }

    const [installationStep, setInstallationStep] = useState([''])

    // Make Installation step in array
    const handleInstallationStep = (value, index) => {

        const updatedInstallationStep = [...installationStep]

        updatedInstallationStep[value] = index

        if ( value === installationStep.length - 1 && index.trim() !== ''  ) {
        
            updatedInstallationStep.push('')
        
        }

        setInstallationStep(updatedInstallationStep)

        setProgramData( (prevState) => ({
            ...prevState,
            Installation: updatedInstallationStep
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
        const updatedMinReq = { ...minRequirements, [id]: value };
        setMinRequirements(updatedMinReq);
        setProgramData( (prevState) => ({
            ...prevState,
            MinimumRequirements: updatedMinReq
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
        const updatedMaxReq = { ...maxRequirements, [id]: value };
        setMaxRequirements(updatedMaxReq);
        setProgramData( (prevState) => ({
            ...prevState,
            MaximumRequirements: updatedMaxReq
        }) )
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
        const updatedKeyFeatures = { ...keyFeatures, [id]: value };
        setKeyFeatures(updatedKeyFeatures);
    
        setProgramData((prevState) => ({
            ...prevState,
            KeyFeatures: updatedKeyFeatures
        }));
    }

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

    const [checkData, setCheckData] = useState({
        id: '',
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
        if (programData.description && programData.description.length > 0) {
            setOverviews([...programData.description]);
        }
        if (programData.useCase && programData.useCase.length > 0) {
            setUseCases([...programData.useCase]);
        }
        if (programData.Installation && programData.Installation.length > 0) {
            setInstallationStep([...programData.Installation]);
        }
    }, [programData.description], [programData.useCase], [programData.Installation]);


    const userToken = localStorage.getItem('accessToken')

    useEffect( () => {
        const fetchProgram = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://147.79.101.225:2859/api/programs/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                })

                
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }

                const data = await response.json();
                const program = data.Program; 
            
                setKeyFeatures({
                    precisionDrafting: program.KeyFeatures['precisionDrafting'],
                    modelingVisualization: program.KeyFeatures['modelingVisualization'],
                    extensiveLibraries: program.KeyFeatures['extensiveLibraries'],
                    collaboration: program.KeyFeatures['collaboration'],
                    customAutomation: program.KeyFeatures['customAutomation'],
                    integration: program.KeyFeatures['integration']
                })

                setMinRequirements({
                    minOperatingSystem: program.MinimumRequirements['minOperatingSystem'],
                    minProcessor: program.MinimumRequirements['minProcessor'],
                    minRAM: program.MinimumRequirements['minRAM'],
                    minGPU: program.MinimumRequirements['minGPU'],
                    minStorage: program.MinimumRequirements['minStorage'],
                    minDisplay: program.MinimumRequirements['minDisplay']
                })

                setMaxRequirements({
                    maxOperatingSystem: program.MaximumRequirements['maxOperatingSystem'],
                    maxProcessor: program.MaximumRequirements['maxProcessor'],
                    maxRAM: program.MaximumRequirements['maxRAM'],
                    maxGPU: program.MaximumRequirements['maxGPU'],
                    maxStorage: program.MaximumRequirements['maxStorage'],
                    maxDisplay: program.MaximumRequirements['maxDisplay']
                })

                setProgramData({
                    programCategory: program.programCategory || '',
                    programImage: program.programImage || '',
                    programFile: program.programFile || '',
                    programName: program.programName || '',
                    description: program.description || [],
                    KeyFeatures: program.KeyFeatures || {},
                    useCase: program.useCase || [],
                    MinimumRequirements: program.MinimumRequirements || {},
                    MaximumRequirements: program.MaximumRequirements || {},
                    Installation: program.Installation || []
                })

                setCheckData({
                    id: program._id,
                    programCategory: program.programCategory || '',
                    programImage: program.programImage || '',
                    programFile: program.programFile || '',
                    programName: program.programName || '',
                    description: program.description || [],
                    KeyFeatures: program.KeyFeatures || {},
                    useCase: program.useCase || [],
                    MinimumRequirements: program.MinimumRequirements || {},
                    MaximumRequirements: program.MaximumRequirements || {},
                    Installation: program.Installation || []
                })

            } catch (error) {
                showToast(`Error fetching program: ${error.message}`, "error");
            } finally {
                setIsLoading(false); 
            }
        }

        fetchProgram()
    },[id, userToken] )

    const onChange = (e) => {
        const {id, value} = e.target
        setProgramData( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    // Function to check if the title already exists in the API
    const checkTitleExists = async (programName, idToExclude) => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/programs/',{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await response.json();

            const existingProgram = data.Programs || [];

            return existingProgram.some(
                (program) => 
                    program._id !== idToExclude && 
                    program.programName.trim().toLowerCase() === programName.trim().toLowerCase() 
            );
        } catch {
            showToast('Error fetching existing program:', "error")
            return false;
        }
    };

    let isPayloadChanged = false;

    // State is set to true, disabling the button.
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Function to handle topic Update
    const handleUpdate = async () => {

        if(isUpdating) return;
        setIsUpdating(true)

        try {
            const titleExists = await checkTitleExists(programData.programName, id);
            if(titleExists) {
                showToast('There is a program with this title already exists', 'error');
                setIsUpdating(false)
                return
            }

            if (programData.programCategory !== checkData.programCategory) {
                isPayloadChanged = true
            }

            if (programData.programName !== checkData.programName) {
                isPayloadChanged = true
            }

            if (programData.description !== checkData.description) {
                isPayloadChanged = true
            }

            if (programData.KeyFeatures !== checkData.KeyFeatures) {
                isPayloadChanged = true
            }

            if (programData.useCase !== checkData.useCase) {
                isPayloadChanged = true
            }

            if (programData.MinimumRequirements !== checkData.MinimumRequirements) {
                isPayloadChanged = true
            }

            if (programData.MaximumRequirements !== checkData.MaximumRequirements) {
                isPayloadChanged = true
            }

            if (programData.Installation !== checkData.Installation) {
                isPayloadChanged = true
            }

            if (isPayloadChanged) {
                const response = await axios.put(`http://147.79.101.225:2859/api/programs/${id}`, programData, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            
                if (response.status === 200 || response.status === 201) {
                    showToast('Program updated successfully!', 'success')
                }else {
                    showToast(`Failed to update the program: Unexpected error occurred while updating the program.`, 'error');
                }
            } else {
                showToast("You can't update without changing data", 'invalid')
                setIsUpdating(false)
            }
        } catch {
            showToast('An error occurred while updating the program', 'error');
        }
    setTimeout(() => {
        setIsUpdating(false)
    }, 6000);
    };

    const [showModal, setShowModal] = useState(false);

    // Function to handle topic deletion with confirmation
    const handleDelete = async () => {

        if(isDeleting) return;
        setIsDeleting(true)

        try {
            const response = await fetch(`http://147.79.101.225:2859/api/programs/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                showToast("Program deleted successfully!", "success")
                setTimeout(() => {
                    navigate('../dashboard');
                }, 6000);
            } else {
                showToast("Failed to delete program.", "error")
            }
        } catch {
            showToast("An error occurred while deleting the program.", "error")
        }
        setShowModal(false); // Close modal after delete
        setTimeout(() => {
            setIsDeleting(false)
        }, 6000);
    }

    // Function to show the modal
    const handleDeleteClick = () => {
        setShowModal(true); // Show the confirmation modal
    };

    // Function to cancel delete and hide the modal
    const handleCancelDelete = () => {
        setShowModal(false); // Hide the confirmation modal
    };

    const [toasts, setToasts] = useState([]);
    const [isPageVisible, setIsPageVisible] = useState(true);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        if (!isPageVisible) return;  // Only show toasts if the page is visible

        const newToast = { id: uuid(), message, type };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000);
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
        setIsPageVisible(document.visibilityState === "visible");
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);
    
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

            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>Update Program</h4>

                </div>

                <div className="container">

                    <div className={` ${style.box}`}>
                    
                        <div className="container">
                        
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                            
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
                                            
                                                    <option value="Different">
                                                        Different
                                                    </option>
                                                
                                            </select>
                                        
                                        </div>
                                        
                                    </div>
                                
                                    <div className="mb-4">
                                
                                        <div className={style.inputTitle}>
                                        
                                            <h4>Program Name</h4>
                                        
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
                                
                                    <button onClick={handleUpdate} className={`btn btn-success text-capitalize`} disabled={isUpdating}>
                                    
                                        {isUpdating ? 'Updating...' : 'Update'}
                                    
                                    </button>
                                
                                    <button onClick={handleDeleteClick} className={`btn btn-danger text-capitalize`} disabled={isDeleting}>
                                    
                                        {isDeleting ? "Deleting" : 'Delete'}
                                    
                                    </button>
                                
                                </div>
                            
                            </form>
                        
                        </div>
                    
                    </div>

                </div>

            </div>

            {showModal && (
                <div className={style.modalBackdrop}>
                    <div className={style.modal}>
                        <h3>Are you sure you want to delete this topic?</h3>
                        <div className={style.modalButtons}>
                            <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                            <button className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        
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
