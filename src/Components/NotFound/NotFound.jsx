import React from 'react'
import pageNotFound from '../../images/pageNotFound.png'
import { useNavigate } from 'react-router-dom';
import style from './NotFound.module.scss'

export default function NotFound() {
    let navigate = useNavigate();

    return (
        <>
        
            <div className={style.error}>
            
                <div className={style.image}>
                
                    <img src={pageNotFound} alt="" />
                
                </div>
            
                <div className='d-flex justify-content-center align-items-center'>
                
                    <p className='text-center w-75'>The page you are looking for could not be found. The link to this address may be outdated or we may have moved the since you last bookmarked it.</p>
                
                </div>
            
                <button onClick={ () => { navigate(-1) } } className={`btn ${style.readBtn} mt-4`}>Go back</button>
            
            </div>
        
        </>
    )
}
