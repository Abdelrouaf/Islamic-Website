import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import style from './AddCategory.module.scss'

export default function AddCategory() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [categoryData, setCategoryData] = useState({
        id: uuid(),
        image: '',
        imageURL: '',
        title: '',
        description: ''
    })

    const onChange = (e) => {
        const {id, value} = e.target;
        setCategoryData( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imageURL = URL.createObjectURL(file);
            setCategoryData( (prevState) => ({
                ...prevState,
                image: file,
                imageURL: imageURL
            }) )
        }
    } 

    const saveData = () => {
    
        if (!categoryData.image && !categoryData.title && !categoryData.description) {
            showToast('Invalid input', 'invalid')
            setIsSubmitting(false)
            return;
        }

        const data = JSON.parse(localStorage.getItem('categoryData')) || []

        const existTitle = data.some((existingTitle) => existingTitle.title === categoryData.title )

        if ( existTitle ) {
            showToast('Title already exist', 'error')
            return;
        }

        setIsSubmitting(true)

        data.push(categoryData)

        localStorage.setItem('categoryData', JSON.stringify(data))
        showToast("Category added successfully!", 'success')

        resetData();

    }

    const resetData = () => {
        setCategoryData({
            image: '',
            imageURL: '',
            title: '',
            description: ''
        })
        setIsSubmitting(false)
    }

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
            
                <h4>Add Category</h4>
            
            </div>
        
            <div className="container">
            
                <div className={` ${style.box}`}>
                
                    <div className="container">
                    
                        <form onSubmit={(e) => { e.preventDefault(); saveData(); }}>
                        
                            <div className={style.inputs}>
                            
                                <div className="row gy-2 align-items-center justify-content-between mb-3">
                                
                                    <div className="col-2">
                                    
                                        <div className={style.inputTitle}>
                                        
                                            <span style={{color: 'red'}}>*</span><h4>Image</h4>
                                        
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
                                                        id='image' 
                                                    />
                                                
                                                    <i className="fa-solid fa-plus"></i>
                                                
                                                </div>
                                            
                                                { categoryData.image && (
                                                
                                                    <div className={`${style.uploadImage} p-2`}>
                                                    
                                                        <img src={categoryData.imageURL} alt="Uploaded" loading='lazy' />
                                                    
                                                    </div>
                                                
                                                )  }
                                            
                                            </div>
                                        
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            
                                <div className="mb-4">
                            
                                    <div className={style.inputTitle}>
                                    
                                        <h4>category title</h4>
                                    
                                    </div>
                                
                                    <div className={`${style.rightInput} ${style.input} w-100`}>
                                    
                                        <input type="text" className='form-control py-2' placeholder='enter category title' id="title"
                                            value={categoryData['title']}
                                            onChange={onChange} 
                                            />
                                    
                                    </div>
                                    
                                </div>
                            
                                <div className="mb-4">
                                
                                    <div className={style.inputTitle}>
                                    
                                        <h4>category description</h4>
                                    
                                    </div>
                                
                                    <div className={`${style.rightInput} ${style.input} w-100`}>
                                    
                                        <textarea className='form-control py-2' placeholder='enter category description' id="description"
                                            value={categoryData['description']}
                                            onChange={onChange}>
                                            </textarea>
                                    
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
