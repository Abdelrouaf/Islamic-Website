import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ProgramsLayout from '../ProgramsLayout/ProgramsLayout'
import style from './Sign.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sign({ onClose }) {

    // Hover button
    const [buttonHover, setButtonHover] = useState(false)

    // Toggle between Sign Form
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    const [changePasswordSignInType, setChangePasswordSignInType] = useState(false)
    const [changePasswordSignUpType, setChangePasswordSignUpType] = useState(false)
    const [changePasswordSignUpSecType, setChangePasswordSignUpSecType] = useState(false)

    const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false)
    const [isSubmittingSignIn, setIsSubmittingSignIn] = useState(false)

    // Validate Password
    const [passwordFeedback, setPasswordFeedback] = useState('')
    const [passwordFeedbackColor, setPasswordFeedbackColor] = useState('');

    // Data of Sign up
    const [userData, setUserData] = useState({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPasswordSec: ''
    })

    const [isTouched, setIsTouched] = useState({
        registerName: false,
        registerEmail: false,
        registerPassword: false,
        registerPasswordSec: false,
    });

    // Password match feedback state
    const [passwordMatchFeedback, setPasswordMatchFeedback] = useState('');

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
        // else {
        //     setUserData( (prevState) => ({
        //         ...prevState,
        //         [id]: value
        //     }) )
        // }
    
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

    // Form validation states
    const isNameValid = userData.registerName.length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.registerEmail);
    const isPasswordValid = userData.registerPassword.length >= 8 && 
                            /[a-z]/.test(userData.registerPassword) &&
                            /[A-Z]/.test(userData.registerPassword) &&
                            /[0-9]/.test(userData.registerPassword) &&
                            /[!@#$%^&*]/.test(userData.registerPassword);
    const isPasswordMatch = userData.registerPassword === userData.registerPasswordSec;

    // Handle Sign Up Form
    const saveData = async (e) => {
    
        e.preventDefault();
    
        if (userData.registerName.length < 3) {
            showToast('Name must be at least 3 characters long', 'invalid');
            setIsSubmittingSignUp(false)
            return;
        }

        if (!userData.registerEmail || !userData.registerPassword) {
            showToast('Invalid input, All inputs are required', 'invalid');
            setIsSubmittingSignUp(false)
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
            setIsSubmittingSignUp(false);
            return;
        }

        if (isSubmittingSignUp) return;  // <-- Check if submission is in progress
        setIsSubmittingSignUp(true);

        const users = JSON.parse(localStorage.getItem('userData')) || []

        try {
            const response = await axios.post('http://147.79.101.225:2859/api/auth/register', {
                name: userData.registerName,
                email: userData.registerEmail,
                password: userData.registerPassword,
                city: 'few'
            });

            if (response.status === 400 || response.status === 401 || response.data.message === 'Sorry this Email is used before' ) {
                showToast('User already exist!', 'error');
            } else if (response.status === 200 || response.status === 201) {
                showToast('Sign up successfully!', 'success');
                const { registerPasswordSec, ...userDataToSave } = userData;
                users.push(userDataToSave)
                // localStorage.setItem('userData', JSON.stringify(users))
                localStorage.setItem('verifyUser', JSON.stringify(userData))
                setTimeout(() => {
                    window.location.href = '../programs'
                }, 2000);
                resetForm();
                setIsSubmittingSignUp(true);
                // console.log("message error ", response.data.message);
            } else {
                showToast('Error during sign up', 'error');
            }

        } catch {
            showToast('An error occurred while processing the request', 'error');
        } finally {
            setIsSubmittingSignUp(false);
        }
    
        setIsSubmittingSignUp(false)
    } 

    // Clear Data after submission
    const resetForm = () => {
        setUserData({
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            registerPasswordSec: ''
        });
        setPasswordFeedback('');
    };

    // Data of Sign In
    const [user, setUser] = useState({
        userEmail: '',
        userPassword: ''
    })

    const onChangeSignIn = (e) => {
        const {id, value} = e.target
        setUser( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    const [userToken, setUserToken] = useState('')

    const navigate = useNavigate();

    const checkData = async (e) => {
        if (e) e.preventDefault();

        const users = JSON.parse(localStorage.getItem('userData')) || []
        const emailExist = users.find(existingEmail => existingEmail.registerEmail === user.userEmail)

        if (isSubmittingSignIn) return;
        setIsSubmittingSignIn(true);

        try {

            if (user.userEmail === '' || user.userPassword === '') {
                showToast("Invalid input", 'invalid')
                setIsSubmittingSignIn(false);
            } 

            const response = await axios.post('http://147.79.101.225:2859/api/auth/login', {
                email: user.userEmail,
                password: user.userPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            if (response.status === 200) {
                const token = response.data.token;
                setUserToken(token)
                window.localStorage.setItem('accessToken', token);
                document.cookie = `accessToken = ${token}`
                showToast('Sign in successfully!', 'success');
                localStorage.setItem('loggedInUser', JSON.stringify(response.data));
                localStorage.setItem('userIn', true);
                setTimeout(() => {
                    if (response.data.isAdmin) {
                        navigate('../en', { state: { token } });
                    } else {
                        navigate('../programs', { state: { token } });
                    }
                }, 2000);
            } else if(response.status === 403) {
                showToast(`You should active your account first`, 'error')
                setTimeout(() => {
                    window.location.href = '../verify-account'
                }, 2000);
            } else if (response.status === 401) {
                showToast('Email or Password is incorrect', 'error');
                return
            }
        } catch {
            showToast('An error occurred while logging in', 'error');
            setIsSubmittingSignIn(false);
        } finally {
            setIsSubmittingSignIn(false);
        }

        ResetSignIn()
        setIsSubmittingSignIn(false);
    }

    // Reset Sign In Form
    const ResetSignIn = () => {
        setUser({
            userEmail: '',
            userPassword: ''
        })
    } 

    useEffect(() => {
        const verifyUser = JSON.parse(localStorage.getItem('verifyUser'));
        if (verifyUser) {
            setUser({
                userEmail: verifyUser.registerEmail,
                userPassword: verifyUser.registerPassword
            });
            checkData();  
            localStorage.removeItem('verifyUser');
        }
    }, []);

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
        
            <div className={style.overlay}>

                <section className={style.formContainer}>

                    <div className="container h-100">

                        <div className="h-100 d-flex justify-content-center align-items-center">

                            <div className={style.formContent} id="formContent">

                                <div className={`${style.signInBox} ${!isSignUpActive ? style.active : ''}`}>

                                    <div className="row h-100">

                                        <div className="col-sm-12 col-md-7 align-self-center">

                                            <form id="signInForm">

                                                <h4 className={style.title}>Sign in to Nextgen Knowledge</h4>

                                                {/* <div className={style.social}>

                                                    <span><i className="fa-brands fa-facebook-f"></i></span>

                                                    <span><i className="fa-brands fa-google-plus-g"></i></span>
                                                
                                                    <span><i className="fa-brands fa-linkedin-in"></i></span>

                                                </div> */}

                                                <p className={style.paragraph}>you have to sign first to go to programs</p>

                                                <div className={style.inputField}>

                                                    <i className="fa-regular fa-envelope"></i>

                                                    <input type="email" placeholder="Email" className="form-control p-2" id="userEmail" name="userEmail" onChange={onChangeSignIn} value={user.userEmail}/>

                                                </div>

                                                <div className={style.inputField}>

                                                    <i className="fa-solid fa-lock"></i>

                                                    <input type={changePasswordSignInType ? 'text' : 'password'} placeholder="Password" className="form-control p-2" id="userPassword" onChange={onChangeSignIn} value={user.userPassword} />

                                                    { changePasswordSignInType ? <i onClick={ () => setChangePasswordSignInType(!changePasswordSignInType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignInType(!changePasswordSignInType) } className="fa-regular fa-eye"></i> }

                                                </div>

                                                <div className="d-flex justify-content-evenly align-items-center gap-3">

                                                    <Link to='../forget-password' className={style.forgetPassword}>forget your password?</Link>

                                                    <Link to='../verify-account' className={style.activateAccount}>Activate your account</Link>

                                                </div>

                                                <div className={`${style.btns} d-flex d-md-block mt-5 mt-md-4`}>

                                                    <button type='submit' onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={checkData} className={style.signBtn} disabled={isSubmittingSignIn}>{ isSubmittingSignIn ? 'signing in...' : 'sign in'} <span className={buttonHover ? style.iconHover : style.icon}>{buttonHover ? ( <i className="fa-solid fa-arrow-right"></i> ) : ( <i className="fa-solid fa-chevron-right"></i> ) }</span></button>

                                                    <button type='button' onClick={(e) => { e.preventDefault(); handleSignUpClick(e); }}  className={`${style.signBtn} d-block d-md-none`}>sign up</button>

                                                </div>

                                            </form>

                                        </div>

                                        <div className="d-none d-md-block col-md-5">

                                            <div className={style.signDesign}>

                                                <div className={style.box}>
                                                
                                                    <h4 className={style.title}>Hello, Friend!</h4>

                                                    <p className={style.paragraph}>Enter your personal details and start journey with us</p>

                                                    <button type='button' onClick={(e) => { e.preventDefault(); handleSignUpClick(e); }}  className={style.signBtn}>sign up</button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className={`${style.signUpBox} ${isSignUpActive ? style.active : ''}`}>

                                    <div className="row h-100">

                                        <div className="d-none d-md-block col-md-5">

                                            <div className={style.signDesign}>

                                                <div className={style.box}>

                                                    <h4 className={style.title}>Welcome Back!</h4>

                                                    <p className={style.paragraph}>To keep connected with us please login with your personal info</p>

                                                    <button type='button' onClick={(e) => { e.preventDefault(); handleSignInClick(e); }}  className={style.signBtn}>sign in</button>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-sm-12 col-md-7 align-self-center">

                                            <form id="signUpForm">

                                                <h4 className={style.title}>Create Account</h4>

                                                {/* <div className={style.social}>

                                                    <span><i className="fa-brands fa-facebook-f"></i></span>

                                                    <span><i className="fa-brands fa-google-plus-g"></i></span>
                                                
                                                    <span><i className="fa-brands fa-linkedin-in"></i></span>

                                                </div> */}

                                                <p className={style.paragraph}>You have to sign first to go to programs</p>

                                                <div className={style.inputField}>

                                                    <i className="fa-regular fa-user"></i>

                                                    <input type="text" placeholder="Name" className={`form-control p-2 ${isTouched.registerName && (isNameValid ? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} id="registerName" value={userData.registerName} onChange={onChange} />

                                                </div>

                                                <div className={style.inputField}>

                                                    <i className="fa-regular fa-envelope"></i>

                                                    <input type="email" placeholder="Email" className={`form-control p-2 ${isTouched.registerEmail && (isEmailValid ? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} id="registerEmail" value={userData.registerEmail} onChange={onChange} />

                                                </div>

                                                <div className={style.inputField}>

                                                    <i className="fa-solid fa-lock"></i>

                                                    <input type={changePasswordSignUpType ? 'text' : 'password'} placeholder="Password" className={`form-control p-2 ${isTouched.registerPassword && (isPasswordValid? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} value={userData.registerPassword} onChange={onChange} id="registerPassword" />

                                                    { changePasswordSignUpType ? <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye"></i> }

                                                </div>
                                        
                                                {/* { passwordFeedback.length > 0 && ( 
                                                    <div style={{ color: passwordFeedbackColor }}> <p>{passwordFeedback}</p> </div>
                                                )  } */}

                                                <div className={style.inputField}>

                                                    <i className="fa-solid fa-lock"></i>

                                                    <input type={changePasswordSignUpSecType ? 'text' : 'password'} placeholder="Confirm Password" className={`form-control p-2 ${isTouched.registerPasswordSec && (isPasswordMatch? `is-valid ${style.isValid}` : `is-invalid ${style.isInvalid}`)}`} value={userData.registerPasswordSec} onChange={onChange} id="registerPasswordSec" />

                                                    { changePasswordSignUpSecType ? <i onClick={ () => setChangePasswordSignUpSecType(!changePasswordSignUpSecType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignUpSecType(!changePasswordSignUpSecType) } className="fa-regular fa-eye"></i> }

                                                </div>

                                                {/* <small style={{ color: passwordMatchFeedback === 'Passwords match' ? 'green' : 'red' }}>
                                                    {passwordMatchFeedback}
                                                </small> */}

                                                <div className={`${style.btns} d-flex d-md-block`}>

                                                    <button type='submit' onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={saveData} className={style.signBtn} disabled={isSubmittingSignUp}>{ isSubmittingSignUp ? 'signing up...' : 'sign up'} <span className={buttonHover ? style.iconHover : style.icon}>{buttonHover ? ( <i className="fa-solid fa-arrow-right"></i> ) : ( <i className="fa-solid fa-chevron-right"></i> ) }</span></button>    

                                                    <button type='button' onClick={(e) => { e.preventDefault(); handleSignInClick(e); }}  className={`${style.signBtn} d-block d-md-none`}>sign in</button>

                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* <button onClick={onClose}>Close</button> */}

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

            {/* <ProgramsLayout token={localStorage.getItem('accessToken')} /> */}

        </>
    
    )

}