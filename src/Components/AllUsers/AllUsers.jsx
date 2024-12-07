import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import style from './AllUsers.module.scss'

export default function AllUsers() {

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [userData, setUserData] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
    
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

                setIsLoading(false)
            
                const data = await response.json(); 
                setUserData(data)
            } catch {
                // console.error("Error occurred during the fetch:", error.message);
                showToast("Error occurred during the fetch", 'error')
                setIsLoading(false)
            }
        }
    
        getData();
    
        // Set the interval to refresh the data every 3 seconds
        const intervalId = setInterval(() => {
            getData();
        }, 10000);

        // Cleanup the interval when the component unmounts or `run` changes
        return () => {
            clearInterval(intervalId);
        };
    
    }, [run]);

    console.log(userData);
    

    // Delete user
    const deleteUser = async (id) => {

        try {
            const response = await fetch(`http://147.79.101.225:2859/api/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
                credentials: "include"
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status:`);
            }
        
        } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
                showToast("Error occurred during the fetch", 'error')
        }

        setRun((prevRun) => prevRun + 1);
    }

    const [searchQuery, setSearchQuery] = useState('');

    // Filter the users based on the search query
    const filteredUsers = userData && userData.length > 0 
    ? userData.filter(user => {
        // Ensure `user.name` and `user.email` exist before checking
        const nameMatch = user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const emailMatch = user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || emailMatch;
    })
    : [];

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

    return (
    
        <>
        
            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>All users</h4>

                </div>

                <div className="container">

                    <div className={`d-flex align-items-center mb-3 ${style.input}`}>

                        <i className="fa-solid fa-magnifying-glass"></i>

                        <input type="search" className='form-control p-2' placeholder='search here..' value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value) } />

                    </div>

                    { filteredUsers.length > 0 && <div className='table-responsive'>

                        <table className='table table-dark table-hover table-striped text-center'>

                            <thead>

                                <tr>

                                    <th>#</th>

                                    {/* <th><input type="checkbox" className='w-auto'  /></th> */}

                                    {/* <th>user id</th> */}

                                    <th>userName</th>

                                    <th>user email</th>

                                    <th>user downloads</th>

                                    <th>approved</th>

                                    <th>role</th>

                                    <th>delete user</th>

                                </tr>

                            </thead>

                            <tbody>

                                { userData && filteredUsers.map( (user, index) => (
                                    <tr key={user._id}>

                                        <td>{index + 1}</td>

                                        {/* <td><input type="checkbox" className='w-auto'  /></td> */}

                                        {/* <td>{user._id}</td> */}

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>05</td>

                                        <td>{user.apprived ? "Approved" : 'Not approved'}</td>

                                        <td>{ user.isAdmin ? 'admin' : 'user' }</td>

                                        <td> <i onClick={ () => deleteUser(user._id) } className="fa-solid fa-trash-can" style={{cursor: "pointer"}}></i> </td>

                                    </tr>
                                ) ) }

                            </tbody>

                        </table>

                    </div> }

                    { filteredUsers.length === 0 && <p className={`${style.fullEmpty} mt-5`}><span>There is no name or email matched! <br></br> Try another one</span></p> }

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
