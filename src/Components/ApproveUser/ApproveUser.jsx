import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import style from './ApproveUser.module.scss'

export default function ApproveUser() {

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
                    throw new Error(`HTTP error! status: `);
                }
            
                const data = await response.json();
                setUserData(data)
                setIsLoading(false)
                // console.log('Data received from API:', data);
            } catch {
                // console.error("Error occurred during the fetch:", error.message);
                showToast("Error occurred during the fetch", 'error')
                setIsLoading(false)
            }
        }
    
        getData();
    }, [run]);

    // Confirm user
    const confirmUser = async (id) => {
    
        try {
            const response = await fetch(`http://147.79.101.225:2859/api/user/${id}`, {
                method: "PUT",
                body: JSON.stringify({ apprived: true }),
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: `);
            }
        
            const data = await response.json();

            let existingUserData = JSON.parse(localStorage.getItem('loggedInUser'));

            if (existingUserData) {
                existingUserData = { 
                    ...existingUserData, 
                    apprived: true 
                };
            }

            localStorage.setItem('loggedInUser', JSON.stringify(existingUserData));
            // console.log('Data received from API:', data);
        } catch {
            // console.error("Error occurred during the fetch:", error.message);
            showToast("Error occurred during the fetch", 'error')
        }

        setRun((prevRun) => prevRun + 1);

    }

    useEffect( () => {
        if (userData.length < 1 ) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [] )

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

    const approvedUsers = userData.filter(user => user.apprived);
    const unapprovedUsers = userData.filter(user => !user.apprived);

    // console.log("un ", unapprovedUsers);
    

    return (
    
        <>
        
            { unapprovedUsers.length < 1 ? (
            
                <p className={style.loading}>All user approved!</p>
            
            ) : (
            
                <div className={style.box}>

                    <div className={style.HeadingTitle}>

                        <h4>List of waiting users</h4>

                    </div>

                    <div className="container">

                        <div className='table-responsive'>

                            <table className='table table-dark table-hover table-striped text-center'>

                                <thead>

                                    <tr>

                                        <th>#</th>

                                        <th>userName</th>

                                        <th>user email</th>

                                        {/* <th>approved</th> */}

                                        <th>confirm</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    { userData.map( (user, index) => 
                                    
                                        user.apprived ? '' : 
                                            (
                                                <tr key={user._id}>

                                                    <td>{index + 1}</td>

                                                    <td>{user.name}</td>

                                                    <td>{user.email}</td>

                                                    {/* <td>{user.apprived ? "Approved" : 'Not approved'}</td> */}

                                                    <td><i onClick={ () => confirmUser(user._id) } className="fa-regular fa-circle-check" style={{cursor: "pointer"}}></i></td>

                                                </tr>
                                            )

                                        

                                    )  }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            ) }
        
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
