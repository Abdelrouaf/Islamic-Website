import React, { useEffect, useRef, useState } from 'react'
import emailImg from '../../images/emailImage.png'
import { v4 as uuidv4 } from 'uuid';
import style from './VerifyAccount.module.scss'
import axios from 'axios';

export default function VerifyAccount() {

    const [focusedInput, setFocusedInput] = useState(0);
    const [verifyCode, setVerifyCode] = useState(['', '', '', ''])
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInputChange = (index, e) => {
        const value = e.target.value.slice(0, 1); 

        setVerifyCode((prevState) => {
            const newCode = [...prevState];
            newCode[index] = value;        
            return newCode;                 
        });

        e.target.value = value;

        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const [checkCode, setCheckCode] = useState(false)

    // Check Code in Submit 
    const handleCode = async (e) => {
        e.preventDefault();

        const otpCode = verifyCode.join('')
    
        if (otpCode.length !== 4) {
            showToast('Verification is incorrect', 'error')
            for (var i = 0; i < verifyCode.length; i++) {
                if (verifyCode[i] === '') {
                    inputRefs.current[i].focus();
                    break;
                }
            }
            return;
        }

        try {

            const verifyUser = JSON.parse(localStorage.getItem('verifyUser'));
            const changePassword = JSON.parse(localStorage.getItem('changePassword'));

            let email;
            let href
            if (verifyUser) {
                email = verifyUser.registerEmail;
                href = '../sign'
            } else if (changePassword) {
                email = changePassword.emailConfirm;
                href = '../reset-password'
            }

            const response = await axios.post('http://147.79.101.225:2859/api/auth/verifyOTP', {
                email: email,
                otp: otpCode
            });
            if (response.status === 200 || response.status === 201) {
                showToast('Verification is correct!', 'success');
                setCheckCode(true)
                setTimeout(() => {
                    window.location.href = href
                }, 4000);
            } else {
                showToast('Verification is Incorrect', 'error');
            }
        } catch {
            showToast('An error occurred while processing the request', 'error');
        }
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
        
            <section className={style.verifyAccountSec}>

                <div className="container h-100">

                    <div className="h-100 d-flex justify-content-center align-items-center">

                        <div className={style.formContent}>

                            <div className={style.verifyAcc}>

                                <div className={style.image}>

                                    <img src={emailImg} alt="email-image" loading='lazy' />

                                </div>

                                <div className={style.formContainer}>

                                    <div className={style.emailTitles}>

                                    <h4 className={style.title}>Please verify account</h4>

                                    <div className='d-flex justify-content-center align-items-center'>

                                        <p className={style.description}>Enter the four digit code we sent to your email address to verify your new account: </p>

                                    </div>

                                    <form className={style.verifyReg}>

                                        <div className={style.inputField}>

                                        {[0, 1, 2, 3].map((index) => (
                                            <input
                                                key={index}
                                                type="number"
                                                min="0"
                                                max="9"
                                                onInput={(e) => handleInputChange(index, e)}
                                                className={`form-control p-2 ${focusedInput === index ? style.focusedInput : ''}`}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                id={`verifyCode-${index}`}
                                                onFocus={() => setFocusedInput(index)}
                                            />
                                        ))}

                                        </div>

                                        <div className={style.btns}>

                                            <button type='submit' onClick={handleCode} className={style.confirmBtn} disabled={checkCode}>{checkCode ? 'Verification...' : 'Verify & Confirm'}</button>

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
