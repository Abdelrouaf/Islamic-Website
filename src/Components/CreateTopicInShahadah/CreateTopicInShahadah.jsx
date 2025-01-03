import React, { useEffect, useState } from 'react';
import layout from '../Style/Layout/Layout.module.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid'; 
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import axios from 'axios';

export default function CreateTopicInShahadah() {
    const navigate = useNavigate();

    // State for the current form data
    const [formData, setFormData] = useState({
        id: uuid(), 
        image: '',
        imageURL:'',
        title: '',
        description: '',
        // surah: '',
        // contentEnglish: '',
        // contentArabic: '',
        // NumberOfVerse: '' // Match API field name
    });

    // Handle input change for text inputs
    const handleChange = (e, isQuill = false) => {
        // if (editorContent !== undefined) {
        //     // This is the case for TinyMCE's onEditorChange
        //     setFormData((prevFormData) => ({
        //         ...prevFormData,
        //         description: editorContent, // Update the description field
        //     }));
        // }
        if (isQuill) {
            setFormData((prevState) => ({
                ...prevState,
                description: e,
            }));
        } else {
            const { id, value } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                [id]: value
            }));
        }
        
    };

    const modules = {
        toolbar: [
          // Add font and size dropdowns
          [{ font: [] }, { size: [] }],

          [ { 'header': [1, 2, 3, 4, 5, 6, false] } ],
          
          // Add text formatting options
          ["bold", "italic", "underline", "strike"], // Text styles
          [{ color: [] }, { background: [] }], // Text and background colors
          
          // Add list and alignment options
          [{ list: "ordered" }, { list: "bullet" }], // Ordered and unordered lists
          [{ align: [] }], // Text alignment
          [{ 'script': 'sub' }, { 'script': 'super' }],
    
          [{ 'indent': '-1' }, { 'indent': '+1' }],

          [ { 'direction': 'rtl' } ],

          // Add image, video, and link options
          ["link", "video"],
    
          // Add a code block and quote option
          ["blockquote", "code-block"],
    
          // Add undo and redo functionality
          ["clean"], // Remove formatting
        ],
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(event.target.files[0]);
            setFormData((prevState) => ({
                ...prevState,
                image: file, // Save the file object in the formData
                imageURL: imageURL
            }));
        }
    };
    
    

    // Remove the uploaded image
    const onCloseImage = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: ''
        }));
    };

// Function to check if the title already exists in the API
const checkTitleExists = async (title) => {
    try {
        const response = await fetch('http://147.79.101.225:2859/api/certificateBlog/', {
            method: 'GET',
            credentials: 'include', // Ensures cookies or credentials are sent with the request
        });
        const data = await response.json();

        // Access the array of topics
        const existingTopics = data.CertificateBlog || [];

        // Check if any topic has the same title (case-insensitive)
        return existingTopics.some(
            (topic) => topic.title.trim().toLowerCase() === title.trim().toLowerCase()
        );
    } catch {
        showToast("Error fetching existing topics", "error")
        return false;
    }
};

const [isSubmitting, setIsSubmitting] = useState(false);

const { fetchData } = useOutletContext(); // Get the fetchData function

// Save data to the API with title uniqueness check
const saveData = async () => {
    const { title, description, image } = formData;

    // Validate required fields (optional but recommended)
    if (!title || !description || !image || (image && !(image instanceof File))) {
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
            setIsSubmitting(false);
            return; // Stop the function if the title already exists
        }

        // Step 2: Proceed to add the new topic since the title is unique
        const form = new FormData(); // Create a FormData object for file upload

        form.append('title', title);
        form.append('description', description);
        form.append('image', image);

        // Using Axios to make the POST request
        const response = await axios.post(
            'http://147.79.101.225:2859/api/certificateBlog/',
            form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true, // If the server requires credentials like cookies
                }
        );

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
        image: '',
        imageURL: '',
        title: '',
        description: '',
    });

    setIsSubmitting(false);  // <-- Reset submission status after API call
};

const [toasts, setToasts] = useState([]);

// Function to show a new toast notification
const showToast = (message, type) => {

    const newToast = { id: uuid(), message, type };

    setToasts((prevToasts) => [...prevToasts, newToast]);

};

// Function to manually remove a toast
const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
};

    return (
        <>
        
        <div className={` ${layout.box}`}>
            <div className="container">
                <form onSubmit={(e) => { e.preventDefault(); saveData(); }}>
                    <div className={layout.inputs}>
                        <div className="row gy-2 align-items-center justify-content-between mb-3">
                            <div className="col-2">
                                <div className={layout.inputTitle}>
                                    <h4><span style={{color: 'red'}}>* </span>Image</h4>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-10">
                                <div className={layout.rightInput}>
                                    <div className='d-flex gap-4'>
                                        <div className={layout.uploadImage}>
                                            <input
                                                type="file"
                                                onChange={onImageChange}
                                                name='storeLogo'
                                                accept="image/*"
                                                id='image' // Ensure this ID matches your state
                                            />
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                        {formData.image && (
                                            <div className={`${layout.uploadImage} p-2`}>
                                                {/* <i onClick={onCloseImage} className='close fa-solid fa-rectangle-xmark'></i> */}
                                                <img src={formData.imageURL} alt="Uploaded" />
                                            </div>
                                        )}
                                    </div>
                                    {/* <p>*upload image size 500px x 500px recommended</p> */}
                                </div>
                            </div>
                        </div>
                    
                        <div className="mb-4">
                    
                            <div className={layout.inputTitle}>
                            
                                <h4><span style={{color: 'red'}}>* </span>topic title</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input type="text" className='form-control py-2' placeholder='enter topic title' id="title"
                                    value={formData['title']}
                                    onChange={handleChange} />
                            
                            </div>
                            
                        </div>
                    
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4><span style={{color: 'red'}}>* </span>topic description</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                {/* <textarea className='form-control py-2' placeholder='enter topic description' id="description"
                                    value={formData['description']}
                                    onChange={handleChange}></textarea> */}

<ReactQuill
            theme="snow"
            value={formData['description']}
            onChange={(content) => handleChange(content, true)}
            placeholder="enter blog description"
            modules={modules}
            id="description"
        />

{/* <Editor
                apiKey="abj3vot1fn1h78eoev03org4gnykxta3vkqos95mdifnlatt" // Optional: replace with your TinyMCE API key
                initialValue={formData.description}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(content) => handleChange(null, content)}
            /> */}
                            
                            </div>
                        
                        </div>
                
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
                    {toast.message}                    <button
                        className={layout.closeButton}
                        onClick={() => closeToast(toast.id)}
                        style={{background: 'transparent', border: 'none', position: 'absolute', right: '0', top: '0', margin: '-10px'}}
                    >
                        <i className="fa-solid fa-circle-xmark" style={{color: 'red', background: 'white', borderRadius: '50%', fontSize: '20px'}}></i>
                    </button>
                    <div className={layout.progress}></div>
                </div>
            ))}
        </div>
        
        </>
    );
}