import axios from 'axios'
import React, { useEffect } from 'react'

export default function Program() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const response = await axios.get('http://147.79.101.225:2859/api/programs/', {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                });

                console.log(response);

            } catch (error) {
                console.error("error ", error);
            }
        };

        fetchData();
    }, []);

    return (
    
        <>
        
            <h4>hello</h4>
        
        </>
    
    )
}
