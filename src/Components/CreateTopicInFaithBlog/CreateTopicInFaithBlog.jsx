import React, { useRef, useState } from 'react';
import layout from '../Style/Layout/Layout.module.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function CreateTopicInFaithBlog() {
    const navigate = useNavigate();

    const fileInputRef = useRef(null)

    // State for the current form data
    const [formData, setFormData] = useState({
        id: uuidv4(), 
        title: '',
        author: '',
        description: '',
        videoName: '',
    });

    // Handle input change for text inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const onVideoFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFormData((prevState) => ({
                ...prevState,
                videoName: file, // Save the file object in the formData
            }));
        }
    };

// Function to check if the title already exists in the API
const checkTitleExists = async (title) => {
    try {
        const response = await fetch('http://147.79.101.225:2859/api/faithVideo/');
        const data = await response.json();

        // Access the array of topics
        const existingTopics = data.VideoBlog || [];

        // Check if any topic has the same title (case-insensitive)
        return existingTopics.some(
            (topic) => topic.title.trim().toLowerCase() === title.trim().toLowerCase()
        );
    } catch {
        showToast('Error fetching existing topics:', "error")
        return false;
    }
};

const [isSubmitting, setIsSubmitting] = useState(false);

const { fetchData } = useOutletContext(); // Get the fetchData function

// Save data to the API with title uniqueness check
const saveData = async () => {
    const { title, author, description, videoName } = formData;

    // Validate required fields (optional but recommended)
    if (!title || !description || !author || !videoName || (videoName && !(videoName instanceof File))) {
        showToast('Invalid input, All inputs are required', 'invalid');
        return;
    }

    // Prevent double submissions
    if (isSubmitting) return;  // <-- Check if submission is in progress
    setIsSubmitting(true);     // <-- Set submission in progress

    try {
        // Step 1: Check if the title already exists
        const titleExists = await checkTitleExists(title);

        if (titleExists) {
            showToast('A topic with this title already exists', 'error');
            setIsSubmitting(false)
            return; // Stop the function if the title already exists
        }

        // Step 2: Proceed to add the new topic since the title is unique
        const form = new FormData(); // Create a FormData object for file upload

        form.append('title', title);
        form.append('author', author);
        form.append('description', description);
        form.append('videoName', videoName);

        // Using Axios to make the POST request
        const response = await axios.post('http://147.79.101.225:2859/api/faithVideo/', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Handle the response
        if (response.status === 200 || response.status === 201) {
            showToast('Topic added successfully!', 'success');
            fetchData();
        } else {
            showToast(`Failed to add the topic: Unexpected error occurred while adding the topic.`, 'error');
        }
    } catch {
        showToast('An error occurred while adding the topic', 'error');
    }

    // Reset formData after attempting to save
    setFormData({
        title: '',
        author: '',
        description: '',
        videoName: ''
    });

    if(fileInputRef) fileInputRef.current.value = ''

    setIsSubmitting(false)
};

    const [toasts, setToasts] = useState([]);

    // Function to show a new toast notification
    const showToast = (message, type) => {
        const newToast = { id: uuidv4(), message, type }; // Create a unique ID for each toast

        // Add the new toast to the list of toasts
        setToasts((prevToasts) => [...prevToasts, newToast]);

        // Remove the toast after 6 seconds
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000); // Keep the toast for 6 seconds
    };

    return (
        <div >
        
        <div className={` ${layout.box}`}>
            <div className="container">
                <form onSubmit={(e) => { e.preventDefault(); saveData(); }}>
                    <div className={layout.inputs}>
                    
                        <div className="mb-4">
                    
                            <div className={layout.inputTitle}>
                            
                                <h4>blog title</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter blog title' id="title"
                                    value={formData['title']}
                                    onChange={handleChange} />
                            
                            </div>
                            
                        </div>
                    
                        <div className="mb-4">
                    
                            <div className={layout.inputTitle}>
                            
                                <h4>blog author</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter blog author' id="author"
                                    value={formData['author']}
                                    onChange={handleChange} />
                            
                            </div>
                            
                        </div>

                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>blog description</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <textarea className='form-control py-2' placeholder='enter blog description' id="description"
                                    value={formData['description']}
                                    onChange={handleChange}></textarea>
                            
                            </div>
                        
                        </div>
                    
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4> video file</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="file" className='form-control py-2' placeholder='enter video file' accept="video/*" id="videoName"
                                    onChange={onVideoFileChange} 
                                    ref={fileInputRef} />
                            
                            </div>
                            
                        </div>

                        {/* <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>surah</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter the name of the surah' id="surah"
                                    value={formData['surah']}
                                    onChange={handleChange} />
                            
                            </div>
                        
                        </div>
                    
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>surah in english</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter surah in english' id="contentEnglish"
                                    value={formData['contentEnglish']}
                                    onChange={handleChange} />
                            
                            </div>
                        
                        </div>
                    
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>surah in arabic</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter surah in arabic' id="contentArabic"
                                    value={formData['contentArabic']}
                                    onChange={handleChange}/>
                            
                            </div>
                        
                        </div>
                        
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>numbere of vesrse</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter number of verse' id="NumberOfVerse"
                                    value={formData['NumberOfVerse']}
                                    onChange={handleChange}/>
                            
                            </div>
                        
                        </div> */}
                
                    </div>
                    
                    {/* Buttons */}
                    <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
                        <button type="reset" className={`btn btn-outline-success ${layout.backBtn}`}>
                            Reset
                        </button>
                        <button type="submit" className={`btn btn-success ${layout.saveBtn}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving..' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
        <div id="toastBox" className={layout.toastBox}>
            {toasts.map((toast) => (
                <div key={toast.id} className={`${layout.tast} ${toast.type} ${layout[toast.type]} ${layout.show}`}>
                    <i className={`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'error' ? 'fa-times-circle' : toast.type === 'invalid' ? 'fa-exclamation-circle' : ''}`}></i>
                    {toast.message}
                    <div className={layout.progress}></div>
                </div>
            ))}
        </div>
        
        </div>
    );
}