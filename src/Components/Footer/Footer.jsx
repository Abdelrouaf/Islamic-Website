import React, { useEffect, useState } from 'react'
// import logo from '../../images/logo-color-removebg-preview (1).png'
import logo from '../../images/GLogo.png'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import style from './Footer.module.scss'

export default function Footer() {

    const [isRTL, setIsRTL] = useState(false);

    // Function to detect the language and set direction
    const detectLanguage = () => {
      // Example: Check if the current language is Arabic
      const currentLang = document.documentElement.lang || "en";
      setIsRTL(currentLang === "ar"); // Adjust based on actual language detection logic
    };
  
     // Run detection on mount
     useEffect(() => {
      detectLanguage();
    }, []);

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [userData ,setUserData] = useState({
        _id: '',
        name: '',
        email: '',
        apprived: false,
        isAdmin: false,
        messages: []
    })

    useEffect(() => {
        async function getData() {
            try {
    
                const response = await fetch('http://147.79.101.225:2859/api/message/', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    },
                    credentials: "include"
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();

                setUserData( (prevState) =>({
                    ...prevState,
                    messages: data.Message || []
                }) )

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message); 
            }
        }
    
        getData();
    }, [run]);

    const [text, setText] = useState("");

    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
    
        if (user && user.details) {
            setUserData((prevState) => ({
                ...prevState,
                _id: user.details._id,
                name: user.details.name,
                email: user.details.email,
                apprived: user.details.apprived,
                isAdmin: user.isAdmin,
                messages: prevState.messages || []
            }));
        } 
    }, []);
    

    // Sent message Func
    const sentMessage = async (e) => {
        e.preventDefault();
    
        if (!userToken || !user || !user.details) {
            showToast("Please sign in first to send a message.", 'error'); 
            return;
        }
    
        if (text.trim() === '') return;

        const messageData = JSON.parse(localStorage.getItem('temporaryMessage')) || []

        const newMessage = {
            name: user.details.name,
            message: text
        };

        const messageText = {
            message: text, 
        };

        try {
            const response = await fetch('http://147.79.101.225:2859/api/message/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',  
                },
                credentials: 'include',
                body: JSON.stringify(messageText),  
            });
    
            if (!response.ok) {
                throw new Error(`Failed to send message, status`);
            }
    
            const data = await response.json();  
    
            setText('');  

            // Fetch updated chat data after successfully sending the message
            const updatedChatResponse = await fetch(`http://147.79.101.225:2859/api/message/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
                credentials: 'include',
            });

            if (!updatedChatResponse.ok) {
                throw new Error(`Failed to fetch updated chat data, status: ${updatedChatResponse.status}`);
            }

            const updatedChatData = await updatedChatResponse.json();
        
            showToast("Message sent successfully.", 'success'); 
        
        } catch (error) {
            console.error('Error sending message:', error.message);  // Log error
        }

        setRun( (prevRun) => prevRun + 1 )

        messageData.push(newMessage)
    
        localStorage.setItem('temporaryMessage', JSON.stringify(messageData));
    
        setText('');
    };

    // Function to show a new toast notification
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type) => {
        const newToast = { id: uuid(), message, type };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, 6000); 
    };

    return (
    
        <>
    
            <footer className={`${style.footer}`} style={{direction: 'ltr'}}>
            
                <div className="container">
                
                    <div className={style.upperFooter}>

                        <div className="row gy-2 align-items-baseline text-center">

                            <div className="col-md-6 col-lg-3">

                                <div className={style.footerBox}>

                                    <div className={style.logo}>
                                    
                                    <Link className="navbar-brand" to='/'>
                            
                                        <div className={style.image}>
                                        
                                            <img src={logo} width={100} alt="" /> 
                                        
                                        </div>
                                    
                                        <span>Purpose of Life</span>
                                    
                                    </Link>
                                    
                                    </div>

                                    {/* <p className={style.paragraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, hic?</p> */}

                                    <div className={style.right}>

                                        {/* <span>social: </span> */}

                                        <div className={style.social}>

                                            {/* <a href="#" ><i className="fa-brands fa-facebook"></i></a>

                                            <a href="#"><i className="fa-brands fa-youtube"></i></a>

                                            <a href="#"><i className="fa-brands fa-instagram"></i></a> */}

                                            <div className={style.socialLoginIcons}>
                                                <div className={style.socialContainer}>
                                                    <div className={`${style.icon} ${style.socialIcon11}`}>
                                                    <svg
                                                        viewBox="0 0 512 512"
                                                        height="1.7em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={style.svgIcontwit}
                                                        fill="white"
                                                    >
                                                        <path
                                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                    <div className={style.socialIcon1}>
                                                    <svg
                                                        viewBox="0 0 512 512"
                                                        height="1.7em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className={style.svgIcontwit}
                                                        fill="white"
                                                    >
                                                        <path
                                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                </div>
                                                <div className={style.socialContainer}>
                                                    <div className={`${style.icon} ${style.socialIcon22}`}>
                                                    <svg
                                                        fill="white"
                                                        className={style.svgIcon}
                                                        viewBox="0 0 448 512"
                                                        height="1.5em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                    <div className={style.socialIcon2}>
                                                    <svg
                                                        fill="white"
                                                        className={style.svgIcon}
                                                        viewBox="0 0 448 512"
                                                        height="1.5em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                </div>
                                                <div className={style.socialContainer}>
                                                    <div className={`${style.icon} ${style.socialIcon33}`}>
                                                    <svg
                                                        viewBox="0 0 384 512"
                                                        fill="white"
                                                        height="1.6em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                    <div className={style.socialIcon3}>
                                                    <svg
                                                        viewBox="0 0 384 512"
                                                        fill="white"
                                                        height="1.6em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                                        ></path>
                                                    </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6 col-lg-3">

                                <div className={style.footerBox}>

                                    <h4>Quick Links</h4>

                                    <ul>

                                        <li><Link to='quran'>quran</Link></li>

                                        <li><Link to='azkar'>azkar</Link></li>

                                        <li><Link to='monotheism'>monotheism</Link></li>

                                        <li><Link to='islam'>about islam</Link></li>

                                        <li><Link to='pillars'>pillars</Link></li>

                                    </ul>

                                </div>

                            </div>

                            <div className="col-md-6 col-lg-3">

                                <div className={style.footerBox}>

                                    <h4>more Links</h4>

                                    <ul>

                                        <li><Link to='faith'>faith</Link></li>

                                        <li><Link to='news'>news</Link></li>

                                        <li><Link to={`${ user && userToken ? `/programs` : `/sign` }`}>programs</Link></li>

                                        <li><Link to={`${ user && userToken ? `/programs/category/All-Categories` : `/sign` }`}>programs categories</Link></li>

                                        <li><Link to='sign'>sign in</Link></li>

                                    </ul>

                                </div>

                                </div>

                                <div className="col-md-6 col-lg-3">

    <div className={style.footerBox}>

        <h4>get in touch</h4>

        <form className={style.form}>
        
            { isRTL && <div className={style.inputBox} style={{direction: 'ltr'}}>
            
            <label>Message:</label>
        
            <textarea
                className='form-control'
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                onKeyDown={ (e) => { if (e.key === "Enter") { sentMessage(e) } } }
                placeholder="Your message ..."
                style={{direction: 'rtl'}}
                required
            />

        </div> }

        { !isRTL && <div className={style.inputBox}>
            
            <label>Message:</label>
        
            <textarea
                className='form-control'
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                onKeyDown={ (e) => { if (e.key === "Enter") { sentMessage(e) } } }
                placeholder="Your message ..."
                required
                style={{direction: 'ltr'}}
            />

        </div> }

            <div className={style.btns}>

            <button type='submit' onClick={sentMessage} className={style.sendMessageBtn}><i className="fa-solid fa-paper-plane"></i></button>

            </div>

        </form>

    </div>

    </div>

                        </div>

                    </div>
                
                    {/* <div className={style.lowerFooter}>

                        <div className="text-center">

                            <p className={`${style.paragraph}`}>copyright &copy; 2024 Taw3ya</p>

                        </div>

                    </div> */}

                </div>
            
            </footer>
        
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
