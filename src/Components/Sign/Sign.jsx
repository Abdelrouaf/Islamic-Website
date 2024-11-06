import React, { useState } from 'react'
import style from './Sign.module.scss'

export default function Sign() {

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

    // Validate Password

    const [passwordFeedback, setPasswordFeedback] = useState('')
    const [passwordFeedbackColor, setPasswordFeedbackColor] = useState('');

    const validatePassword = (e) => {
        const password = e.target.value

        const len = 8;
        const lowChar = /[a-z]/.test(password);
        const uppChar = /[A-Z]/.test(password);
        const nums = /[1-9]/.test(password)
        const specChar = /[!@#$%^&*]/.test(password)

        if ( password.length < len ) {
            setPasswordFeedback(`Password must be at least ${len} characters `)
            setPasswordFeedbackColor('red');
        } else if ( !lowChar || ! uppChar || !nums || !specChar ) {
            setPasswordFeedback(`Password must has lower, upper, numbers and special characters `)
            setPasswordFeedbackColor('red');
        } else {
            setUserData({'password': password})
            setPasswordFeedback(`Password is strong!`)
            setPasswordFeedbackColor('green');
        }
    }

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = (e) => {
        const {id, value} = e.target;
        setUserData( (prevState) => ({
            ...prevState,
            [id]: value
        }) )
    }

    console.log("wfe ", userData);
    

    return (
    
        <>
        
            <section className={style.formContainer}>

                <div className="container h-100">

                    <div className="h-100 d-flex justify-content-center align-items-center">

                        <div className={style.formContent} id="formContent">

                            <div className={`${style.signInBox} ${!isSignUpActive ? style.active : ''}`}>

                                <div className="row h-100">

                                    <div className="col-sm-12 col-md-7 align-self-center">

                                        <form id="signInForm">

                                            <h4 className={style.title}>Sign in to EzBuyHub</h4>

                                            <div className={style.social}>

                                                <span><i className="fa-brands fa-facebook-f"></i></span>

                                                <span><i className="fa-brands fa-google-plus-g"></i></span>
                                            
                                                <span><i className="fa-brands fa-linkedin-in"></i></span>

                                            </div>

                                            <p className={style.paragraph}>or use your email account</p>

                                            <div className={style.inputField}>

                                                <i className="fa-regular fa-envelope"></i>

                                                <input type="email" placeholder="Email" className="form-control p-2" id="userEmail" name="userEmail" />

                                            </div>

                                            <div className={style.inputField}>

                                                <i className="fa-solid fa-lock"></i>

                                                <input type={changePasswordSignInType ? 'text' : 'password'} placeholder="Password" className="form-control p-2" name="userPassword" />

                                                { changePasswordSignInType ? <i onClick={ () => setChangePasswordSignInType(!changePasswordSignInType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignInType(!changePasswordSignInType) } className="fa-regular fa-eye"></i> }

                                            </div>

                                            <a href="#" className={style.forgetPassword}>forget your password</a>

                                            <div className={style.btns}>

                                                <button className={style.signBtn}>sign in</button>

                                            </div>

                                        </form>

                                    </div>

                                    <div className="d-sm-none d-md-block col-md-5">

                                        <div className={style.signDesign}>

                                            <div className={style.box}>
                                            
                                                <h4 className={style.title}>Hello, Friend!</h4>

                                                <p className={style.paragraph}>Enter your personal details and start journey with us</p>

                                                <button onClick={handleSignUpClick} className={style.signBtn}>sign up</button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className={`${style.signUpBox} ${isSignUpActive ? style.active : ''}`}>

                                <div className="row h-100">

                                    <div className="d-sm-none d-md-block col-md-5">

                                        <div className={style.signDesign}>

                                            <div className={style.box}>

                                                <h4 className={style.title}>Welcome Back!</h4>

                                                <p className={style.paragraph}>To keep connected with us please login with your personal info</p>

                                                <button onClick={handleSignInClick} className={style.signBtn}>sign in</button>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-7 align-self-center">

                                        <form id="signUpForm">

                                            <h4 className={style.title}>Create Account</h4>

                                            <div className={style.social}>

                                                <span><i className="fa-brands fa-facebook-f"></i></span>

                                                <span><i className="fa-brands fa-google-plus-g"></i></span>
                                            
                                                <span><i className="fa-brands fa-linkedin-in"></i></span>

                                            </div>

                                            <p className={style.paragraph}>or use your email registration</p>

                                            <div className={style.inputField}>

                                                <i className="fa-regular fa-user"></i>

                                                <input type="text" placeholder="Name" className="form-control p-2" id="registerName" value={userData['name']} onChange={onChange} />

                                            </div>

                                            <div className={style.inputField}>

                                                <i className="fa-regular fa-envelope"></i>

                                                <input type="email" placeholder="Email" className="form-control p-2" id="registerEmail" name="userEmail" value={userData['email']} onChange={onChange} />

                                            </div>

                                            <div className={style.inputField}>

                                                <i className="fa-solid fa-lock"></i>

                                                <input type={changePasswordSignUpType ? 'text' : 'password'} placeholder="Password" className="form-control p-2" onChange={validatePassword} onInput={validatePassword} id="registerPassword" name="userPassword" />

                                                { changePasswordSignUpType ? <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye-slash"></i> : <i onClick={ () => setChangePasswordSignUpType(!changePasswordSignUpType) } className="fa-regular fa-eye"></i> }

                                            </div>
                                        
                                            { passwordFeedback.length > 0 && ( 
                                                <div style={{ color: passwordFeedbackColor }}> {passwordFeedback} </div>
                                            )  }

                                            <div className={style.btns}>

                                                <button className={style.signBtn}>sign up</button>    

                                            </div>

                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
        </>
    
    )

}