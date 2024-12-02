import React, { useEffect } from 'react'
import ProgramsHeader from '../ProgramsHeader/ProgramsHeader'
import ProgramsFooter from '../ProgramsFooter/ProgramsFooter'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function ProgramsLayout( ) {

    const navigate = useNavigate(null)

    const location = useLocation();

    const token = location.state ? location.state.token : null;

    

    // console.log('Token received in Programs:', token);

    function checkUserIn() {
        if ( localStorage.getItem('userIn') === 'false' || localStorage.getItem('userIn') === null ) {
            // window.location.href = '/';
            navigate('/')
        }
    }
    checkUserIn();

    useEffect(() => {
        if (token) {
          // Proceed with logic once the token is available
        }
    }, [token]);

    // console.log('layout ', token);
    

    return (
    
        <>
        
            <ProgramsHeader />
        
            <Outlet context={{token}}> </Outlet>

            <ProgramsFooter />

        </>
    
    )
}
