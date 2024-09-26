import React, { useEffect, useState } from 'react'
import style from '../Style/Layout/Layout.module.scss'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function EditSawm() {

    const [topics, setTopics] = useState([]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/fastingBlog/');
                const data = await response.json();

                setTopics(data.FastingBlog || []); 
                // console.log("id is: ", data.FastingBlog);
                
            } catch (error) {
                console.error('Error fetching the topics:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

 // Function to handle deletion of all topics
    const handleDeleteAll = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete ALL topics? This action cannot be undone.');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/fastingBlog/`, {
                    method: 'DELETE',
                });
                
                if (response.ok) {
                    alert('All topics deleted successfully!');
                    navigate('/en/pillars/prayer/create'); // Navigate to the list page after deletion
                } else {
                    const responseData = await response.json();
                    console.error('API Response Error:', responseData);
                    alert(`Failed to delete all topics: ${responseData.message}`);
                }
            } catch (error) {
                console.error('Error deleting all topics:', error);
                alert('An error occurred while deleting all topics. Please try again.');
            }
        }
};


    return (
    
        <div className={style.box}>
        
        <div className={style.HeadingTitle}>
        
            <h4>Sawm</h4>
        
        </div>
    
        <div className="container">
        
            <div className="row justify-content-evenly align-items-center">
        
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
                
                    <Outlet></Outlet>
                
                </div>
            
            </div>
        
        </div>
    

    
    </div>
    

    )
}