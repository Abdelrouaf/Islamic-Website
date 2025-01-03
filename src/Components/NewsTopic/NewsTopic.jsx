import React, { useEffect, useRef, useState } from 'react';
import layout from '../Style/Layout/Layout.module.scss';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

export default function NewsTopic() {

    const navigate = useNavigate();
    const { id } = useParams(); // Get the topic ID from the URL
    const fileInputRef = useRef(null)

    // State for the current form data
    const [formData, setFormData] = useState({
        image: '',           // Set to null initially
        title: '',
        description: '',
        video: ''
    });

    const [checkData, setCheckData] = useState({
        id: '',
        image: '',           // Set to null initially
        title: '',
        description: '',
        video: ''
    });

    const [oldImage, setOldImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    // Loading state
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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

    // Fetch the specific topic data using the ID from the URL
    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`http://147.79.101.225:2859/api/news/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
                const topicData = await response.json();
                const finalData = topicData.Blog;        
                
                setFormData({
                        // Set ID from the API
                    image: finalData.image,                  // No new image uploaded initially
                    title: finalData.title,
                    description: finalData.description,
                    video: finalData.video
                });
            
                setCheckData({
                    id: finalData._id,
                    image: finalData.image,                  // No new image uploaded initially
                    title: finalData.title,
                    description: finalData.description,
                    video: finalData.video
                });

                setOldImage(finalData.image)
                setImageURL(finalData.imageName)
                setIsLoading(false); // Data has been loaded
            } catch {
                showToast('Failed to fetch topic data. Please try again', 'error')
                setIsLoading(false);
            }
        };
        if (id) fetchTopic();
    }, [id]);

    // Handle input change for text inputs
    const handleChange = (e, isQuill = false) => {
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

    // Handle image upload
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]; // Get the File object
            const imageURL = URL.createObjectURL(file); // Create a preview URL
            setFormData((prevState) => ({
                ...prevState,
                image: file,           // Store the File object
                // imageURL: imageURL     // Store the preview URL
            }));
            setImageURL(imageURL)
        }
        
    };

    const onVideoFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFormData((prevState) => ({
                ...prevState,
                video: file, // Save the file object in the formData
            }));
        }
    };

    // Remove the uploaded image
    const onCloseImage = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: oldImage,          // Reset the File object
            // imageURL: ''          // Reset the preview URL
        }));
        setImageURL(oldImage)
    };

    // State is set to true, disabling the button.
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { fetchData } = useOutletContext(); // Get the fetchData function

    // Function to check if the title already exists in the API
    const checkTitleExists = async (title, idToExclude) => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/news/');
            const data = await response.json();

            // Access the array of topics
            const existingTopics = data.News || [];

            // Check if any topic has the same title (case-insensitive)
            return existingTopics.some(
                (topic) => 
                    topic.id !== idToExclude && // Exclude the topic with idToExclude
                    topic.title.trim().toLowerCase() === title.trim().toLowerCase() // Check if the title matches
            );
        } catch {
            showToast('Error fetching existing topics:', "error")
            return false;
        }
    };

    let isPayloadChanged = false; // Flag to track if any changes are made

    // Function to handle topic Update
    const handleUpdate = async () => {

        if(isUpdating) return;
        setIsUpdating(true)

        try {
            const payload = new FormData();

            if(checkData.title !== formData.title) {
                const titleExists = await checkTitleExists(formData.title, checkData.id); // Await the result
                if(titleExists) {
                    formData.title = checkData.title
                    showToast('There is a topic with this title already exists', 'error');
                    setIsUpdating(false)
                    return
                } else {
                    payload.append('title', formData.title);
                    isPayloadChanged = true
                }
            }

            if(checkData.description !== formData.description) {
                payload.append('description', formData.description);
                isPayloadChanged = true
            }

            // payload.append('image', formData.image);
            // payload.append('video', formData.video);
    
            if(isPayloadChanged) {
                const response = await axios.put(`http://147.79.101.225:2859/api/news/${id}`, payload, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });
            
                if (response.status === 200 || response.status === 201) {
                    showToast('Topic updated successfully!', 'success')
                    fetchData();
                }else {
                    showToast(`Failed to update the topic: Unexpected error occurred while updating the topic.`, 'error');
                }
            } else {
                showToast("You can't update without changing data", 'invalid')
                setIsUpdating(false)
            }
        } catch {
            showToast('An error occurred while updating the topic', 'error');
        }
    setTimeout(() => {
        setIsUpdating(false)
    }, 6000);
    };

    // Function to handle topic deletion with confirmation
    const handleDelete = async () => {

        if(isDeleting) return;
        setIsDeleting(true)

        try {
            const response = await fetch(`http://147.79.101.225:2859/api/news/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showToast("Topic deleted successfully!", "success")
                fetchData();
                setTimeout(() => {
                    navigate('/en/dashboard/islamic/news/create'); // Navigate back after deletion
                }, 6000);
            } else {
                showToast("Failed to delete topic.", "error")
            }
        } catch {
            showToast("An error occurred while deleting the topic.", "error")
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
        
        <div className={` ${layout.box}`}>
            <div className="container">
                <div className={layout.inputs}>
                    {/* Image Upload Section */}
                    <div className="row gy-2 align-items-center justify-content-between mb-3">
                        <div className="col-2">
                            <div className={layout.inputTitle}>
                                <h4>Image</h4>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-10">
                            <div className={layout.rightInput}>
                                <div className="d-flex flex-wrap gap-4">
                                    {/* <div className={layout.uploadImage}>
                                        <input
                                            required
                                            type="file"
                                            onChange={onImageChange}
                                            name="image"
                                            accept="image/*"
                                        />
                                        <i className="fa-solid fa-plus"></i>
                                    </div> */}
                                        <div className={`${layout.uploadImage} p-2`}>
                                            <img src={`http://147.79.101.225:2859/uploads/News/${imageURL}`} alt="Uploaded"/>
                                        </div>
                                </div>
                                <p>*Upload image size 500px x 500px recommended</p>
                            </div>
                        </div>
                    </div>

                    {/* Input fields for topic details */}
                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Topic Title</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                type="text"
                                className='form-control py-2'
                                placeholder='Enter topic title'
                                id="title" // Matches formData.title
                                value={formData.title}
                                onChange={handleChange}
                                
                            />
                            
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Topic Description</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            {/* <textarea
                                className='form-control py-2'
                                placeholder='Enter topic description'
                                id="description" // Matches formData.description
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            ></textarea> */}
                            <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(content) => handleChange(content, true)}
            placeholder="enter blog description"
            modules={modules}
            id="description"
        />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>video file</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                
                                type="file"
                                accept="video/*"
                                className='form-control py-2'
                                placeholder='Enter video file'
                                id="video" // Matches formData.title
                                // value={formData.video}
                                onChange={onVideoFileChange}
                                ref={fileInputRef}
                            />
                            
                        </div>
                    </div>

                    {/* <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Surah</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                required
                                type="text"
                                className='form-control py-2'
                                placeholder='Enter the name of the surah'
                                id="surah"
                                value={formData.surah}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Surah in English</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                required
                                type="text"
                                className='form-control py-2'
                                placeholder='Enter surah in English'
                                id="contentEnglish"
                                value={formData.contentEnglish}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Surah in Arabic</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                required
                                type="text"
                                className='form-control py-2'
                                placeholder='Enter surah in Arabic'
                                id="contentArabic"
                                value={formData.contentArabic}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Number of the Verse</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                required
                                type="text"
                                className='form-control py-2'
                                placeholder='Enter number of the verse'
                                id="NumberOfVerse"
                                value={formData.NumberOfVerse}
                                onChange={handleChange}
                            />
                        </div>
                    </div> */}
                
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
                <button onClick={handleUpdate} className={`btn btn-success text-capitalize`} disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update'}</button>
                <button onClick={handleDeleteClick} className={`btn btn-danger text-capitalize`} disabled={isDeleting}>{isDeleting ? "Deleting" : 'Delete'}</button>
            </div>
        </div>
        
        {showModal && (
            <div className={layout.modalBackdrop}>
                <div className={layout.modal}>
                    <h3>Are you sure you want to delete this topic?</h3>
                    <div className={layout.modalButtons}>
                        <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                        <button className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                    </div>
                </div>
            </div>
        )}

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
    )
}