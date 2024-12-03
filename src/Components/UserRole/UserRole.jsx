import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import style from './UserRole.module.scss'

export default function UserRole() {

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [userData, setUserData] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                // console.log('Fetching data with token:', token); // Log token
    
                const response = await fetch('http://147.79.101.225:2859/api/user/', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }

                setIsLoading(false)
            
                const data = await response.json();
                setUserData(data)
                // console.log('Data received from API:', data);
            } catch {
                // console.error("Error occurred during the fetch:", error.message);
                showToast("Error occurred during the fetch", 'error')
                setIsLoading(false)
            }
        }
    
        getData();
    }, [run]);

    // Make the user as administrator
    const makeUserAdmin = async (id) => {
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/user/${id}`, {
                method: "PUT",
                body: JSON.stringify({ isAdmin: true }),
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status`);
            }
        
            const data = await response.json();
            // console.log('Data received from API:', data);

            let existingUserData = JSON.parse(localStorage.getItem('loggedInUser'));

            if (existingUserData) {
                existingUserData = { 
                    ...existingUserData, 
                    isAdmin: true 
                };
            }

            localStorage.setItem('loggedInUser', JSON.stringify(existingUserData));

        } catch {
            showToast("Error occurred during the fetch", 'error')
        }

        setRun((prevRun) => prevRun + 1);
    }

    // Make admin  user
    const makeAdminUser = async (id) => {
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/user/${id}`, {
                method: "PUT",
                body: JSON.stringify({ isAdmin: false }),
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status`);
            }
        
            const data = await response.json();
            // console.log('Data received from API:', data);

            let existingUserData = JSON.parse(localStorage.getItem('loggedInUser'));

            if (existingUserData) {
                existingUserData = { 
                    ...existingUserData, 
                    isAdmin: false 
                };
            }

            localStorage.setItem('loggedInUser', JSON.stringify(existingUserData));

        } catch {
            showToast("Error occurred during the fetch", 'error')
        }

        setRun((prevRun) => prevRun + 1);
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
        return <p className={style.loading}>Loading, Please wait <span className={style.loader}></span></p>; 
    }  

    return (
    
        <>
        
            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>User role</h4>

                </div>

                <div className="container">

                    <div className='table-responsive'>

                        <table className='table table-dark table-hover table-striped text-center'>

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>userName</th>

                                    <th>user email</th>

                                    <th>role</th>

                                </tr>

                            </thead>

                            <tbody>

                                { userData.map( (user, index) => 
                                
                                    // user.isAdmin ? "" : (
                                    
                                        <tr key={user._id}>
    
                                            <td>{index + 1}</td>
    
                                            <td>{user.name}</td>
    
                                            <td>{user.email}</td>
    
                                            <td>

                                                {user.isAdmin ? (

                                                    <button onClick={ () => makeAdminUser(user._id) } className='btn btn-danger'>Make the admin user</button>

                                                ) : (

                                                    <button onClick={ () => makeUserAdmin(user._id) } className='btn btn-success'>Make the user admin</button>

                                                ) }
                                                                                        
                                            </td>
    
                                        </tr>
                                    // ) 
                                
                                ) }

                            </tbody>

                        </table>

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
