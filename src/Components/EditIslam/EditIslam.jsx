import React, { useEffect, useState } from 'react'
import style from '../Style/Layout/Layout.module.scss'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'; 

export default function EditIslam() {

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from the API when the component mounts

    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/lifeBlogs/');
            const data = await response.json();
            
            setTopics(data.LifeBlog || []); 
            setIsLoading(false)
        } catch {
            showToast('Error fetching the topics.', 'error')
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();

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
            
                <h4>Islam</h4>
            
            </div>
        
            <div className="container">
            
                <div className="row gy-2 justify-content-evenly align-items-center">
            
                    <div className="col-lg-4">
                    
                        <ul className={`${style.listMenu} mb-3 pb-2`}>
                
                            {/* <li>
                            
                                <NavLink to='main' className={({isActive}) => { return ( ` link ` + (isActive ? ` linkActive `: `  ` ) ) } }><i className="fa-solid fa-earth-americas"></i>main</NavLink>
                            
                            </li> */}
                        
                            <li>
                            
                                <NavLink to='create' className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkActive} `: `  ` ) ) } }><i className="fa-solid fa-folder-plus"></i>create</NavLink>
                            
                            </li>
                        
                            {topics.length > 0 ? (
                            
                                topics.map( (topic, index) => (
                                
                                    <li key={topic._id}>
                                    
                                        <NavLink to={`topic/${topic._id}`} className={({isActive}) => { return ( ` ${style.link} ` + (isActive ? ` ${style.linkActive} `: `  ` ) ) } }><i className="fa-regular fa-image"></i>{topic.title}</NavLink>
                                    
                                    </li>
                                
                                ) )
                            
                            ) : ''}
                        
                        </ul>
                    
                    </div>
                
                    <div className="col-lg-8">
                    
                        <Outlet context={{ fetchData }}></Outlet>
                    
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