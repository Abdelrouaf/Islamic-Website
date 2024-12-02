import React, { useState } from 'react'
import forgetPasswordImage from '../../images/forgetPassword.png'
import { v4 as uuidv4 } from 'uuid';
import style from './ForgetPassword.module.scss'
import axios from 'axios';

export default function ForgetPassword() {

    const [focusedInput, setFocusedInput] = useState(false);

    const [userData, setUserData] = useState({
        emailConfirm: ''
    })

    const onChange = (e) => {
        const {id, value} = e.target
        setUserData( (prevState) => ({
            ...prevState,
            [id] : value
        }) )
    }

    // Confirm Email to reset Password
    const confirmEmail = async (e) => {
        e.preventDefault();
    
        const users = JSON.parse(localStorage.getItem('userData')) || []
        const emailExist = users.find( existingEmail => existingEmail.registerEmail === userData.emailConfirm ) 

        if (userData.emailConfirm === '') {
            showToast("Invalid input", 'invalid')
        } 
        // else if (emailExist) {
        //     showToast('Email founded!', 'success')
        //     localStorage.setItem('changePassword', JSON.stringify(emailExist))
        //     localStorage.setItem('forgetPassword', true);
        //     setTimeout(() => {
        //         window.location.href = '../verify-account'
        //     }, 2000);
        // } else {
        //     showToast('User not found', 'error')
        // }
    
        // try {
        //     const response = await axios.post('http://147.79.101.225:2859/api/auth/login', {
        //         email: userData.emailConfirm
        //     });

        //     if (response.status === 200) {
        //         showToast('Email Founded!', 'success');
        //         localStorage.setItem('changePassword', JSON.stringify(userData))
        //         // localStorage.setItem('forgetPassword', true);
        //         setTimeout(() => {
        //             window.location.href = '../verify-account'
        //         }, 2000);
        //     } else {
        //         showToast('User not found', 'error');
        //     }
        // } catch {
        //     showToast('An error occurred while checking for email exist', 'error');
        // }

        localStorage.setItem('changePassword', JSON.stringify(userData))
        // localStorage.setItem('forgetPassword', true);
        setTimeout(() => {
            window.location.href = '../reset-password'
        }, 2000);

    }

    // Function to show a new toast notification
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type) => {
        const newToast = { id: uuidv4(), message, type };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000); 
    };

    return (
    
        <>
        
            <section className={style.forgetPasswordSec}>

                <div className="container h-100">

                    <div className="d-flex justify-content-center align-items-center h-100">

                        <div className={style.formContent}>

                            <div className={style.forgetPasswordContainer}>

                                <div className={style.image}>

                                    <img src={forgetPasswordImage} alt="forget-password-image" loading='lazy' />

                                </div>

                                <div className={style.formContainer}>

                                    <div className={style.forgetPasswordTitles}>

                                    <h4 className={style.title}>Forget your Password</h4>

                                    <div className="d-flex justify-content-center align-items-center">

                                        <p className={style.description}>Enter your Email and we'll help you to reset your password.</p>

                                    </div>

                                    <form className={style.confirmEmail}>

                                        <div className={`${style.inputField} ${focusedInput ? style.focusedInput : ''}`}>

                                            <i className="fa-regular fa-envelope"></i>

                                            <input type="email" placeholder="Email" className={`form-control p-2`} id="emailConfirm" onFocus={() => setFocusedInput(true)} onBlur={() => setFocusedInput(false)}  value={userData.emailConfirm} onChange={onChange} />

                                        </div>

                                        <div className={style.btns}>

                                            <button type='submit' onClick={confirmEmail} className={style.confirmBtn}>Confirm</button>

                                        </div>

                                    </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
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
