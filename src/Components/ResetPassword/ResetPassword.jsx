import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import resetPasswordImage from '../../images/resetPassword.png'
import style from './ResetPassword.module.scss'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const [changePasswordSignUpType, setChangePasswordSignUpType] = useState(false)
    const [changePasswordSignUpSecType, setChangePasswordSignUpSecType] = useState(false)

    // Data of Sign up
    const [userData, setUserData] = useState({
        // registerEmail: JSON.parse(localStorage.getItem('changePassword')).emailConfirm,
        registerEmail: JSON.parse(localStorage.getItem('loggedInUser')).details.email,
        registerPassword: '',
        registerPasswordSec: ''
    })

    const [isTouched, setIsTouched] = useState({
        registerPassword: false,
        registerPasswordSec: false,
    });

    // Validate Password
    const [passwordFeedback, setPasswordFeedback] = useState('')
    const [passwordFeedbackColor, setPasswordFeedbackColor] = useState('');

    // Password match feedback state
    const [passwordMatchFeedback, setPasswordMatchFeedback] = useState('');

    // Check if submit
    const [isSubmitting, setIsSubmitting] = useState(false)

    // On change Sign Up Form
    const onChange = (e) => {
        const {id, value} = e.target;

        setIsTouched((prevTouched) => ({
            ...prevTouched,
            [id]: true
        }));

        setUserData( (prevState) => ({
            ...prevState,
            [id]: value
        }) )

        if (id === 'registerPassword') {
            // Validate the password directly
            const len = 8;
            const lowChar = /[a-z]/.test(value);
            const uppChar = /[A-Z]/.test(value);
            const nums = /[1-9]/.test(value);
            const specChar = /[!@#$%^&*]/.test(value);
    
            if (value.length < len) {
                setPasswordFeedback(`Password must be at least ${len} characters `);
                setPasswordFeedbackColor('red');
            } else if (!lowChar || !uppChar || !nums || !specChar) {
                setPasswordFeedback(`Password must have lower, upper, numbers, and special characters`);
                setPasswordFeedbackColor('red');
            } else {
                setPasswordFeedback(`Password is strong!`);
                setPasswordFeedbackColor('green');
            }
            setUserData((prevState) => ({
                ...prevState,
                [id]: value
            }));
        } 
    
        // Check if passwords match
        if ((id === 'registerPassword' || id === 'registerPasswordSec') && isTouched.registerPasswordSec) {
            const firstPassword = id === 'registerPassword' ? value : userData.registerPassword;
            const secondPassword = id === 'registerPasswordSec' ? value : userData.registerPasswordSec;
    
            if (firstPassword !== secondPassword) {
                setPasswordMatchFeedback('Passwords do not match');
            } else {
                setPasswordMatchFeedback('Passwords match');
            }
        }
    }

    const isPasswordValid = userData.registerPassword.length >= 8 && 
                            /[a-z]/.test(userData.registerPassword) &&
                            /[A-Z]/.test(userData.registerPassword) &&
                            /[0-9]/.test(userData.registerPassword) &&
                            /[!@#$%^&*]/.test(userData.registerPassword);
    const isPasswordMatch = userData.registerPassword === userData.registerPasswordSec;

    // Reset Password
    const resetPassword = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);
    
        if (!userData.registerPassword) {
            showToast('Invalid input, All inputs are required', 'invalid');
            setIsSubmitting(false)
            return
        }

        // Password validation
        const len = 8;
        const lowChar = /[a-z]/.test(userData.registerPassword);
        const uppChar = /[A-Z]/.test(userData.registerPassword);
        const nums = /[1-9]/.test(userData.registerPassword);
        const specChar = /[!@#$%^&*]/.test(userData.registerPassword);

        if (userData.registerPassword.length < len) {
            setPasswordFeedback(`Password must be at least ${len} characters.`);
            setPasswordFeedbackColor('red');
            showToast('Password is too short.', 'invalid');
            return;
        } else if (!lowChar || !uppChar || !nums || !specChar) {
            setPasswordFeedback(`Password must include lowercase, uppercase, numbers, and special characters.`);
            setPasswordFeedbackColor('red');
            showToast('Password is weak.', 'invalid');
            return;
        }

        if (!isPasswordMatch) {
            showToast('Passwords do not match', 'invalid');
            return;
        }

        const users = JSON.parse(localStorage.getItem('userData')) || []
        // const userExist = users.some(existingUser => existingUser.registerEmail === userData.registerEmail)
        // if (!userExist) {
        //     showToast('User does not exist', 'invalid');
        //     return
        // }

        // Find the user and update their password
        // const updatedUsers = users.map(user => {
        //     if (user.registerEmail === userData.registerEmail) {
        //         // Update the registerPassword field with the new password
        //         return { ...user, registerPassword: userData.registerPassword };
        //     }
        //     return user;
        // });

        // localStorage.setItem('userData', JSON.stringify(updatedUsers));

        try {
            const response = await axios.put('http://147.79.101.225:2859/api/auth/changepassword', {
                email: JSON.parse(localStorage.getItem('loggedInUser')).details.email,
                newPassword: userData.registerPassword
            });

            if (response.status === 200) {
                showToast('Password reset successfully!', 'success');
                // localStorage.setItem('loggedInUser', JSON.stringify(response.data))
                localStorage.removeItem('changePassword');
                // setTimeout(() => {
                //     window.location.href = '../sign'
                // }, 2000);
                resetForm()
            } else {
                showToast(`Password doesn't change`, 'error');
                setIsSubmitting(false)
            }
        } catch {
            showToast('An error occurred while changing password', 'error');
            setIsSubmitting(false)
        }
        setIsSubmitting(false)
    }

    // Reset Form
    const resetForm = () => {
        setUserData({
            registerPassword: '',
            registerPasswordSec: ''
        })
        setPasswordFeedback('');
        setPasswordMatchFeedback('');
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

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user) {
            navigate('/sign');
        }
    }, [navigate]);

    return (
    
        <>

            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-lock"></i> <i className="fa-solid fa-angle-right"></i> change password </h4>

                </div>

            </section>

            <section className={style.resetPasswordSec}>

                <div className="container h-100">

                    <div className="d-flex justify-content-center align-items-center h-100">

                        <div className={style.formContent}>

                            <div className={style.resetPasswordContainer}>

                                <div className={style.image}>

                                    <img src={resetPasswordImage} alt="reset-password-image" loading='lazy' />

                                </div>

                                <div className={style.formContainer}>

                                    <div className={style.resetPasswordTitles}>

                                        <h4 className={style.title}>Reset Password</h4>

                                        <div className="d-flex justify-content-center align-items-center">

                                            <p className={style.description}>Enter a new password below to change your password.</p>

                                        </div>

                                        <form className={style.changePasswordForm}>

                                            <div className={style.inputField}>

                                                <i className="fa-solid fa-lock"></i>

                                                <input type={changePasswordSignUpType ? 'text' : 'password'} placeholder="Password" className={`form-control p-2 ${isTouched.registerPassword && (isPasswordValid? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} value={userData.registerPassword} onChange={onChange} id="registerPassword" />

                                                { changePasswordSignUpType ? <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye"></i> }

                                            </div>

                                            { passwordFeedback.length > 0 && ( 
                                            <div style={{ color: passwordFeedbackColor }}> <p>{passwordFeedback}</p> </div>
                                            )  }

                                            <div className={style.inputField}>

                                                <i className="fa-solid fa-lock"></i>

                                                <input type={changePasswordSignUpSecType ? 'text' : 'password'} placeholder="Confirm Password" className={`form-control p-2 ${isTouched.registerPasswordSec && (isPasswordMatch? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} value={userData.registerPasswordSec} onChange={onChange} id="registerPasswordSec" />

                                                { changePasswordSignUpSecType ? <i onClick={ () => setChangePasswordSignUpSecType(!changePasswordSignUpSecType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignUpSecType(!changePasswordSignUpSecType) } className="fa-regular fa-eye"></i> }

                                            </div>

                                            <small style={{ color: passwordMatchFeedback === 'Passwords match' ? 'green' : 'red' }}>
                                                {passwordMatchFeedback}
                                            </small>

                                            <div className={style.btns}>

                                                <button type='submit' onClick={resetPassword} className={style.confirmBtn} disabled={isSubmitting}>{ !isSubmitting ? "Reset Password" : "Resetting"}</button>

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
