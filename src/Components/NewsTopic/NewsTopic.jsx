import React, { useEffect, useState } from 'react';
import layout from '../Style/Layout/Layout.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function NewsTopic() {

    const navigate = useNavigate();
    const { id } = useParams(); // Get the topic ID from the URL

    // State for the current form data
    const [formData, setFormData] = useState({
        image: '',           // Set to null initially
        title: '',
        description: '',
        video: ''
    });

    const [oldImage, setOldImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the specific topic data using the ID from the URL
    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/news/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
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
                setOldImage(finalData.image)
                setImageURL(finalData.image)
                setIsLoading(false); // Data has been loaded
            } catch (error) {
                console.error('Error fetching topic data:', error);
                alert('Failed to fetch topic data. Please try again later.');
                setIsLoading(false);
            }
        };
        if (id) fetchTopic();
    }, [id]);

    // Handle input change for text inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    // console.log("handle change: ",handleChange(e));
    

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

    // Remove the uploaded image
    const onCloseImage = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: oldImage,          // Reset the File object
            // imageURL: ''          // Reset the preview URL
        }));
        setImageURL(oldImage)
    };

    // Function to handle topic Update
    const handleUpdate = async () => {
        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('description', formData.description);
            // payload.append('image', formData.image);
            // payload.append('video', formData.video);
    
            const response = await axios.put(`http://localhost:8080/api/news/${id}`, payload, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
    
            // const responseData = await response.json();
            // payload.forEach((value, key) => {
            //     console.log(key, value);
            // });
            // console.log("response is: ", response.data);
            // console.log("title", formData.title);
            
        
            if (response.status === 200) {
                alert('Topic updated successfully!');
                navigate(`/en/news/topic/${id}`);
                window.location.reload();
            }else {
                console.error('API Error:', response.data);
                alert(`Failed to update topic: ${response.data.message || 'Unknown error.'}`);
            }
        } catch (error) {
            console.error('Error updating topic:', error);
            alert('An error occurred while updating the topic. Please try again.');
        }
    };
    

    // Function to handle topic deletion with confirmation
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this topic?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/news/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Topic deleted successfully!');
                    navigate('/en/news/create'); // Navigate back after deletion
                    window.location.reload();
                } else {
                    alert('Failed to delete topic.');
                }
            } catch (error) {
                console.error('Error deleting topic:', error);
                alert('An error occurred while deleting the topic. Please try again.');
            }
        }
    };

    if (isLoading) {
        return <p>Loading...</p>; // Display a loading message until the data is fetched
    }    

    return (
        <div className={` ${layout.box}`}>
            <div className="container">
                <div className={layout.inputs}>
                    {/* Image Upload Section */}
                    <div className="row align-items-center mb-3">
                        <div className="col-2">
                            <div className={layout.inputTitle}>
                                <h4>Image</h4>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className={layout.rightInput}>
                                <div className="d-flex gap-4">
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
                                            <img src={imageURL} alt="Uploaded"/>
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
                                required
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
                            <textarea
                                className='form-control py-2'
                                placeholder='Enter topic description'
                                id="description" // Matches formData.description
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={layout.inputTitle}>
                            <h4>Topic Title</h4>
                        </div>
                        <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            <input
                                
                                type="text"
                                className='form-control py-2'
                                // placeholder='Enter topic title'
                                id="video" // Matches formData.title
                                value={formData.video}
                                // onChange={handleChange}
                                readOnly
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
                <button onClick={handleUpdate} className={`btn btn-success text-capitalize`}>Update</button>
                <button onClick={handleDelete} className={`btn btn-danger text-capitalize`}>Delete</button>
            </div>
        </div>
    )
}






// import React, { useEffect, useState } from 'react'
// import layout from '../Style/Layout/Layout.module.scss'
// import { useNavigate, useParams } from 'react-router-dom'

// export default function MonotheismTopicOne() {

//     const navigate = useNavigate();
//     const { id } = useParams(); // Get the topic ID from the URL

//     // State for the current form data
//     const [formData, setFormData] = useState({
//         id: '', 
//         image: null,
//         imageURL: '',
//         title: '',
//         description: '',
//         surah: '',
//         contentEnglish: '',
//         contentArabic: '',
//         NumberOfVerse: ''
//     });

//     // Loading state
//     const [isLoading, setIsLoading] = useState(true);

//     // Fetch the specific topic data using the ID from the URL
//     useEffect(() => {
//         const fetchTopic = async () => {
//             try {
//                 const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`);
//                 const topicData = await response.json();
//                 const finalData = topicData.Blog;
//                 setFormData({
//                     id: finalData._id, // Set ID from the API
//                     image: finalData.image,
//                     imageURL: finalData.image, // Assuming image is a URL
//                     title: finalData.title,
//                     description: finalData.description,
//                     surah: finalData.surah,
//                     contentEnglish: finalData.contentEnglish,
//                     contentArabic: finalData.contentArabic,
//                     NumberOfVerse: finalData.NumberOfVerse
//                 });
//                 setIsLoading(false); // Data has been loaded
//             } catch (error) {
//                 console.error('Error fetching topic data:', error);
//             }
//         };

//         if (id) fetchTopic();
//     }, [id]);

//     // Handle input change for text inputs
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [id]: value
//         }));
//     };

//     // Handle image upload
//     const onImageChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             const imageURL = URL.createObjectURL(event.target.files[0]);
//             setFormData((prevState) => ({
//                 ...prevState,
//                 image: file,
//                 imageURL: imageURL
//             }));
//         }
//     };

//     // Remove the uploaded image
//     const onCloseImage = () => {
//         setFormData((prevState) => ({
//             ...prevState,
//             image: null,
//             imageURL: ''
//         }));
//     };

//     const handleUpdate = async () => {
//         try {
//             const payload = new FormData();
//             payload.append('title', formData.title);       // Map to backend's 'title'
//             payload.append('description', formData.description);  // Map to backend's 'description'
//             payload.append('surah', formData.surah);
//             payload.append('contentEnglish', formData.contentEnglish);
//             payload.append('contentArabic', formData.contentArabic);
//             payload.append('NumberOfVerse', formData.NumberOfVerse); // Ensure correct casing
    
//             // Append image only if a new image is uploaded
//             if (formData.image) {
//                 payload.append('image', formData.image); // 'image' is a File object
//             }
    
//             // Log FormData contents for debugging
//             const formDataEntries = {};
//             for (let pair of payload.entries()) {
//                 formDataEntries[pair[0]] = pair[1];
//             }
//             console.log('Updating with payload:', formDataEntries);
    
//             const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${formData.id}`, {
//                 method: 'PUT',
//                 body: payload, // Pass FormData as body
//             });
    
//             const responseData = await response.json();
    
//             if (response.ok) {
//                 alert('Topic updated successfully!');
//                 navigate(`/en/monotheism/topic/${formData.id}`); // Navigate to the updated topic page
//                 window.location.reload();
//             } else {
//                 console.error('API Error:', responseData);
//                 alert(`Failed to update topic: ${responseData.message || 'Unknown error.'}`);
//             }
//         } catch (error) {
//             console.error('Error updating topic:', error);
//             alert('An error occurred while updating the topic. Please try again.');
//         }
//     };
    
//     // Function to handle topic deletion with confirmation
//     const handleDelete = async () => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this topic?');
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`, {
//                     method: 'DELETE',
//                 });

//                 if (response.ok) {
//                     alert('Topic deleted successfully!');
//                     navigate('/en/monotheism/main'); // Navigate back after deletion
//                     window.location.reload();
//                 } else {
//                     alert('Failed to delete topic.');
//                 }
//             } catch (error) {
//                 console.error('Error deleting topic:', error);
//             }
//         }
//     };

//     if (isLoading) {
//         return <p>Loading...</p>; // Display a loading message until the data is fetched
//     }

//     console.log("here is formData", formData);
    

//     return (
//         <div className={` ${layout.box}`}>
        
//             <div className="container">
            
//                 <div className="inputs">
                
//                 <div className="row align-items-center mb-3">
//                         <div className="col-2">
//                             <div className="inputTitle">
//                                 <h4>image</h4>
//                             </div>
//                         </div>
//                         <div className="col-10">
//                             <div className="rightInput">
//                                 <div className="d-flex gap-4">
//                                     <div className="uploadImage">
//                                         <input
//                                             required
//                                             type="file"
//                                             onChange={onImageChange}
//                                             name="image"
//                                         />
//                                         <i className="fa-solid fa-plus"></i>
//                                     </div>
//                                     {formData.image && (
//                                         <div className="uploadImage p-2">
//                                             <i
//                                                 onClick={onCloseImage}
//                                                 className="close fa-solid fa-rectangle-xmark"
//                                             ></i>
//                                             <img src={formData.imageURL} alt="" />
//                                         </div>
//                                     )}
//                                 </div>
//                                 <p>*upload image size 500px500px recommended</p>
//                             </div>
//                         </div>
//                     </div>
                
//                     <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>topic title</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <input required type="text" className='form-control py-2' placeholder='enter topic title' id="title"
//                                 value={formData.title}
//                                 onChange={handleChange} />
                        
//                         </div>
                        
//                     </div>
                
//                     <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>topic description</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <textarea className='form-control py-2' placeholder='enter topic description' id="description"
//                                 value={formData.description}
//                                 onChange={handleChange}></textarea>
                        
//                         </div>
                    
//                     </div>
                
//                     <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>surah</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <input required type="text" className='form-control py-2' placeholder='enter the name of the surah' id="surah"
//                                 value={formData.surah}
//                                 onChange={handleChange} />
                        
//                         </div>
                    
//                     </div>
                
//                     <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>surah in english</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <input required type="text" className='form-control py-2' placeholder='enter surah in english' id="contentEnglish"
//                                 value={formData.contentEnglish}
//                                 onChange={handleChange} />
                        
//                         </div>
                    
//                     </div>
                
//                     <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>surah in arabic</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <input required type="text" className='form-control py-2' placeholder='enter surah in arabic' id="contentArabic"
//                                 value={formData.contentArabic}
//                                 onChange={handleChange}/>
                        
//                         </div>
                    
//                     </div>
                
//                     {/* <div className="mb-4">
                    
//                         <div className='inputTitle'>
                        
//                             <h4>number of the verse</h4>
                        
//                         </div>
                    
//                         <div className='rightInput input w-100'>
                        
//                             <input required type="text" className='form-control py-2' placeholder='enter num of the verse' id="NumberOfVerse"
//                                 value={formData.NumberOfVerse}
//                                 onChange={handleChange} />
                        
//                         </div>
                    
//                     </div> */}
                
//                 </div>
            
//             </div>
        
//             <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
                
//                 <button onClick={handleUpdate} className={`btn btn-success text-capitalize`}>update</button>
            
//                 <button onClick={handleDelete} className={`btn btn-danger text-capitalize`}>delete</button>
            
//             </div>
        
//         </div>
//     )
// }






// import React, { useState, useEffect } from 'react';
// import layout from '../Style/Layout/Layout.scss';
// import { useNavigate, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique ID generation

// export default function MonotheismTopicOne() {

//     const navigate = useNavigate();
//     const { id } = useParams(); // Get the topic ID from the URL

//     // State for the current form data
//     const [formData, setFormData] = useState({
//         id: uuidv4(), // Generate a unique ID for the topic
//         image: null,
//         title: '',
//         description: '',
//         surah: '',
//         contentEnglish: '',
//         contentArabic: '',
//         NumberOfVerse: ''
//     });

//     // Fetch the specific topic data using the ID from the URL
//     useEffect(() => {
//         const fetchTopic = async () => {
//             try {
//                 const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`);
//                 const topicData = await response.json();
//                 setFormData({
//                     id: topicData._id, // Set ID from the API
//                     image: topicData.image, // Assuming image is a URL
//                     title: topicData.title,
//                     description: topicData.description,
//                     surah: topicData.surah,
//                     contentEnglish: topicData.contentEnglish,
//                     contentArabic: topicData.contentArabic,
//                     NumberOfVerse: topicData.NumberOfVerse
//                 });
//             } catch (error) {
//                 console.error('Error fetching topic data:', error);
//             }
//         };

//         if (id) fetchTopic();
//     }, [id]);

//     // Handle input change for text inputs
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [id]: value
//         }));
//     };

//     // Handle image upload
//     const onImageChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const imageUrl = URL.createObjectURL(event.target.files[0]);
//             setFormData((prevState) => ({
//                 ...prevState,
//                 image: imageUrl
//             }));
//         }
//     };

//     // Remove the uploaded image
//     const onCloseImage = () => {
//         setFormData((prevState) => ({
//             ...prevState,
//             image: null
//         }));
//     };

//     // Save data to localStorage
//     // const saveData = () => {
//     //     const savedTopics = localStorage.getItem('monotheismTopics');
//     //     const topicsArray = savedTopics ? JSON.parse(savedTopics) : []; // Retrieve existing topics or initialize an empty array

//     //     // Check if the topic with the same ID already exists
//     //     const existingIndex = topicsArray.findIndex(topic => topic.id === formData.id);

//     //     if (existingIndex !== -1) {
//     //         // Update the existing topic with the same ID
//     //         topicsArray[existingIndex] = formData;
//     //         alert('Topic updated successfully!');
//     //     } else {
//     //         // Add a new topic to the array
//     //         topicsArray.push(formData);
//     //         alert('Topic added successfully!');
//     //     }

//     //     // Save the updated topics array to localStorage
//     //     localStorage.setItem('monotheismTopics', JSON.stringify(topicsArray));

//     //     // Reset form after saving
//     //     setFormData({
//     //         id: uuidv4(), // Generate a new ID for the next topic
//     //         image: null,
//     //         title: '',
//     //         description: '',
//     //         surah: '',
//     //         contentEnglish: '',
//     //         contentArabic: '',
//     //         NumberOfVerse: ''
//     //     });
//     // };

//     console.log(formData.image)

//     return (
//         <div className={` ${layout.box}`}>
//             <div className="container">
//                 <div className="inputs">
//                     <div className="row align-items-center mb-3">
//                         <div className="col-2">
//                             <div className='inputTitle'>
//                                 <h4>image</h4>
//                             </div>
//                         </div>
//                         <div className="col-10">
//                             <div className='rightInput'>
//                                 <div className='d-flex gap-4'>
//                                     <div className='uploadImage'>
//                                         <input
//                                             required
//                                             type="file"
//                                             onChange={onImageChange}
//                                             name='storeLogo'
//                                             id='StoreLogo'
//                                         />
//                                         <i className="fa-solid fa-plus"></i>
//                                     </div>
//                                     {formData.image && (
//                                         <div className='uploadImage p-2'>
//                                             <i onClick={onCloseImage} className='close fa-solid fa-rectangle-xmark'></i>
//                                             <img src={`blob:${formData.image}`} alt="Uploaded" />
//                                         </div>
//                                     )}
//                                 </div>
//                                 <p>*upload image size 500px x 500px recommended</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Input fields for topic details */}
//                     {[
//                         { label: 'topic title', id: 'title', type: 'text', placeholder: 'enter topic title' },
//                         { label: 'topic description', id: 'description', type: 'textarea', placeholder: 'enter topic description' },
//                         { label: 'surah', id: 'surah', type: 'text', placeholder: 'enter the name of the surah' },
//                         { label: 'surah in english', id: 'contentEnglish', type: 'text', placeholder: 'enter surah in english' },
//                         { label: 'surah in arabic', id: 'contentArabic', type: 'text', placeholder: 'enter surah in arabic' },
//                         { label: 'number of the verse', id: 'NumberOfVerse', type: 'text', placeholder: 'enter num of the verse' }
//                     ].map(({ label, id, type, placeholder }) => (
//                         <div key={id} className="mb-4">
//                             <div className='inputTitle'>
//                                 <h4>{label}</h4>
//                             </div>
//                             <div className='rightInput input w-100'>
//                                 {type === 'textarea' ? (
//                                     <textarea
//                                         className='form-control py-2'
//                                         id={id}
//                                         placeholder={placeholder}
//                                         value={formData[id]}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     <input
//                                         required
//                                         type={type}
//                                         className='form-control py-2'
//                                         id={id}
//                                         placeholder={placeholder}
//                                         value={formData[id]}
//                                         onChange={handleChange}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Buttons */}
//             <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
//                 <button onClick={() => navigate(-1)} className={`btn btn-outline-success ${layout.backBtn}`}>
//                     back
//                 </button>
//                 <button className={`btn btn-success ${layout.saveBtn}`}>
//                     save
//                 </button>
//             </div>
//         </div>
//     );
// }




// import React, { useState, useEffect } from 'react';
// import layout from '../Style/Layout/Layout.scss';
// import { useNavigate, useParams } from 'react-router-dom';

// export default function MonotheismTopicOne() {
//     const navigate = useNavigate();
//     const { id } = useParams(); // Get the topic ID from the URL

//     // State for the current form data
//     const [formData, setFormData] = useState({
//         id: '', 
//         image: '',
//         title: '',
//         description: '',
//         surah: '',
//         contentEnglish: '',
//         contentArabic: '',
//         // NumberOfVerse: ''
//     });

//     // Loading state
//     const [isLoading, setIsLoading] = useState(true);

//     // Fetch the specific topic data using the ID from the URL
//     useEffect(() => {
//         const fetchTopic = async () => {
//             try {
//                 const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`);
//                 const topicData = await response.json();
//                 const finalData = topicData.Blog;
//                 setFormData({
//                     id: finalData._id, // Set ID from the API
//                     image: finalData.image, // Assuming image is a URL
//                     title: finalData.title,
//                     description: finalData.description,
//                     surah: finalData.surah,
//                     contentEnglish: finalData.contentEnglish,
//                     contentArabic: finalData.contentArabic,
//                     // NumberOfVerse: finalData.NumberOfVerse
//                 });
//                 setIsLoading(false); // Data has been loaded
//             } catch (error) {
//                 console.error('Error fetching topic data:', error);
//             }
//         };

//         if (id) fetchTopic();
//     }, [id]);

//     // Handle input change for text inputs
//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [id]: value
//         }));
//     };

//     // Handle image upload
//     const onImageChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             const imageUrl = URL.createObjectURL(event.target.files[0]);
//             setFormData((prevState) => ({
//                 ...prevState,
//                 image: imageUrl
//             }));
//         }
//     };

//     // Remove the uploaded image
//     const onCloseImage = () => {
//         setFormData((prevState) => ({
//             ...prevState,
//             image: null
//         }));
//     };

//     const handleUpdate = async () => {
//         try {
//             const payload = new FormData();
//             payload.append('title', formData.title);
//             payload.append('description', formData.description);
//             payload.append('surah', formData.surah);
//             payload.append('contentEnglish', formData.contentEnglish);
//             payload.append('contentArabic', formData.contentArabic);
//             // payload.append('NumberOfVerse', formData.NumberOfVerse);
//             if (formData.image) {
//                 payload.append('image', formData.image);
//             }
    
//             console.log('Updating with payload:', Object.fromEntries(payload.entries()));
    
//             const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`, {
//                 method: 'PUT',
//                 body: payload,
//             });
    
//             if (response.ok) {
//                 alert('Topic updated successfully!'); // Alert for successful update
//                 navigate(`/en/monotheism/topic/${id}`);
//                 window.location.reload();
//             } else {
//                 const errorData = await response.json();
//                 console.error('API Error:', errorData);
//                 alert(`Failed to update topic: ${errorData.message || 'Unknown error.'}`);
//             }
//         } catch (error) {
//             console.error('Error updating topic:', error);
//             alert('An error occurred while updating the topic. Please try again.');
//         }
//     };
    
    
    

//     // Function to handle topic deletion with confirmation
//     const handleDelete = async () => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this topic?');
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`https://gradproject-e6s8.onrender.com/api/monotheismBlog/${id}`, {
//                     method: 'DELETE',
//                 });

//                 if (response.ok) {
//                     alert('Topic deleted successfully!');
//                     navigate('/en/monotheism/main'); // Navigate back after deletion
//                     window.location.reload();
//                 } else {
//                     alert('Failed to delete topic.');
//                 }
//             } catch (error) {
//                 console.error('Error deleting topic:', error);
//             }
//         }
//     };

//     if (isLoading) {
//         return <p>Loading...</p>; // Display a loading message until the data is fetched
//     }

//     return (
//         <div className={` ${layout.box}`}>
//             <div className="container">
//                 <div className="inputs">
//                     <div className="row align-items-center mb-3">
//                         <div className="col-2">
//                             <div className='inputTitle'>
//                                 <h4>image</h4>
//                             </div>
//                         </div>
//                         <div className="col-10">
//                             <div className='rightInput'>
//                                 <div className='d-flex gap-4'>
//                                     <div className='uploadImage'>
//                                         <input
//                                             required
//                                             type="file"
//                                             onChange={onImageChange}
//                                             name='storeLogo'
//                                             id='StoreLogo'
//                                         />
//                                         <i className="fa-solid fa-plus"></i>
//                                     </div>
//                                     {formData.image && (
//                                         <div className='uploadImage p-2'>
//                                             <i onClick={onCloseImage} className='close fa-solid fa-rectangle-xmark'></i>
//                                             <img src={formData.image} alt="Uploaded" />
//                                         </div>
//                                     )}
//                                 </div>
//                                 <p>*upload image size 500px x 500px recommended</p>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Input fields for topic details */}
//                     {[
//                         { label: 'topic title', id: 'title', type: 'text', placeholder: 'enter topic title' },
//                         { label: 'topic description', id: 'description', type: 'textarea', placeholder: 'enter topic description' },
//                         { label: 'surah', id: 'surah', type: 'text', placeholder: 'enter the name of the surah' },
//                         { label: 'surah in english', id: 'contentEnglish', type: 'text', placeholder: 'enter surah in english' },
//                         { label: 'surah in arabic', id: 'contentArabic', type: 'text', placeholder: 'enter surah in arabic' },
//                         {/* { label: 'number of the verse', id: 'NumberOfVerse', type: 'text', placeholder: 'enter num of the verse' } */}
//                     ].map(({ label, id, type, placeholder }) => (
//                         <div key={id} className="mb-4">
//                             <div className='inputTitle'>
//                                 <h4>{label}</h4>
//                             </div>
//                             <div className='rightInput input w-100'>
//                                 {type === 'textarea' ? (
//                                     <textarea
//                                         className='form-control py-2'
//                                         id={id}
//                                         placeholder={placeholder}
//                                         value={formData[id]}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     <input
                                        
//                                         type={type}
//                                         className='form-control py-2'
//                                         id={id}
//                                         placeholder={placeholder}
//                                         value={formData[id]}
//                                         onChange={handleChange}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Buttons */}
//             <div className={`d-flex justify-content-end align-items-center gap-3 ${layout.btns}`}>
//                 <button onClick={handleUpdate} className={`btn btn-success text-capitalize`}>
//                     update
//                 </button>
//                 <button onClick={handleDelete} className={`btn btn-danger text-capitalize`}>
//                     delete
//                 </button>
//             </div>
//         </div>
//     );
// }
