import React, { useState } from 'react';
import layout from '../Style/Layout/Layout.module.scss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique ID generation
import axios from 'axios';

export default function CreateTopicInHaij() {
    const navigate = useNavigate();

    // State for the current form data
    const [formData, setFormData] = useState({
        id: uuidv4(), // Generate new ID for new topic
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
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
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
        const response = await fetch('http://localhost:8080/api/haijBlog/');
        const data = await response.json();

        // Access the array of topics
        const existingTopics = data.HaijBlog || [];

        // Check if any topic has the same title (case-insensitive)
        return existingTopics.some(
            (topic) => topic.title.trim().toLowerCase() === title.trim().toLowerCase()
        );
    } catch (error) {
        console.error('Error fetching existing topics:', error);
        // In case of error, assume title does not exist to prevent blocking user
        return false;
    }
};

// Save data to the API with title uniqueness check
const saveData = async () => {
    const { title, description, image } = formData;

    // Validate required fields (optional but recommended)
    if (!title || !description || !image) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        // Step 1: Check if the title already exists
        const titleExists = await checkTitleExists(title);

        if (titleExists) {
            alert('A topic with this title already exists. Please choose a different title.');
            return; // Stop the function if the title already exists
        }

        // Step 2: Proceed to add the new topic since the title is unique
        const form = new FormData(); // Create a FormData object for file upload

        form.append('title', title);
        form.append('description', description);
        form.append('image', image);

        // Using Axios to make the POST request
        const response = await axios.post('http://localhost:8080/api/haijBlog/', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Handle the response
        if (response.status === 200 || response.status === 201) {
            alert('Topic added successfully to the API!');
            window.location.reload(); // Reload the page after a successful addition (optional)
        } else {
            console.error('API Response Error:', response.data);
            alert(`Failed to add the topic to the API: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
        alert('An error occurred while adding the topic. Check console for details.');
    }

    // Reset formData after attempting to save
    setFormData({
        image: '',
        imageURL: '',
        title: '',
        description: '',
    });
};

    return (
        <div className={` ${layout.box}`}>
            <div className="container">
                <form onSubmit={(e) => { e.preventDefault(); saveData(); }}>
                    <div className={layout.inputs}>
                        <div className="row align-items-center mb-3">
                            <div className="col-2">
                                <div className={layout.inputTitle}>
                                    <h4>Image</h4>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className={layout.rightInput}>
                                    <div className='d-flex gap-4'>
                                        <div className={layout.uploadImage}>
                                            <input
                                                required
                                                type="file"
                                                onChange={onImageChange}
                                                name='storeLogo'
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
                            
                                <h4>topic title</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <input required type="text" className='form-control py-2' placeholder='enter topic title' id="title"
                                    value={formData['title']}
                                    onChange={handleChange} />
                            
                            </div>
                            
                        </div>
                    
                        <div className="mb-4">
                        
                            <div className={layout.inputTitle}>
                            
                                <h4>topic description</h4>
                            
                            </div>
                        
                            <div className={`${layout.rightInput} ${layout.input} w-100`}>
                            
                                <textarea className='form-control py-2' placeholder='enter topic description' id="description"
                                    value={formData['description']}
                                    onChange={handleChange}></textarea>
                            
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
                        <button type="submit" className={`btn btn-success ${layout.saveBtn}`}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


// {[ 
//     { label: 'Topic Title', id: 'title', type: 'text', placeholder: 'Enter topic title' },
//     { label: 'Topic Description', id: 'description', type: 'textarea', placeholder: 'Enter topic description' },
//     { label: 'Surah', id: 'surah', type: 'text', placeholder: 'Enter the name of the surah' },
//     { label: 'Surah in English', id: 'contentEnglish', type: 'text', placeholder: 'Enter surah in English' },
//     { label: 'Surah in Arabic', id: 'contentArabic', type: 'text', placeholder: 'Enter surah in Arabic' },
//     {/* { label: 'Number of the Verse', id: 'NumberOfVerse', type: 'text', placeholder: 'Enter number of the verse' } // Match API field name */}
// ].map(({ label, id, type, placeholder }) => (
//     <div key={id} className="mb-4">
//         <div className='inputTitle'>
//             <h4>{label}</h4>
//         </div>
//         <div className='rightInput input w-100'>
//             {type === 'textarea' ? (
//                 <textarea
//                     className='form-control py-2'
//                     id={id}
//                     placeholder={placeholder}
//                     value={formData[id]}
//                     onChange={handleChange}
//                 />
//             ) : (
//                 <input
                    
//                     type={type}
//                     className='form-control py-2'
//                     id={id}
//                     placeholder={placeholder}
//                     value={formData[id]}
//                     onChange={handleChange}
//                 />
//             )}
//         </div>
//     </div>
// ))}