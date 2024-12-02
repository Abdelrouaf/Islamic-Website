import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import userImg from '../../images/man (1).png'
import adminImage from '../../images/manager.png'
import style from './Chat.module.scss'

export default function Chat() {

    // const [run, setRun] = useState(0)

    // const userToken = localStorage.getItem('accessToken')

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             // console.log('Fetching data with token:', token); // Log token
    
    //             const response = await fetch('http://147.79.101.225:2859/api/message/', {
    //                 method: "GET",
    //                 headers: {
    //                     "Authorization": `Bearer ${userToken}`
    //                 },
    //                 credentials: "include"
    //             });
    
    //             console.log('Response from API:', response); // Log raw response
    
    //             if (!response.ok) {
    //                 // Handle non-2xx HTTP status codes
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    
    //             const data = await response.json();
    //             console.log('Data received from API:', data); // Log parsed data
    //         } catch (error) {
    //             console.error("Error occurred during the fetch:", error.message); // Properly log error
    //         }
    //     }
    
    //     getData();
    // }, [run]);

    const [text, setText] = useState("");
    const emojiRef = useRef(null);

    const handleEmojiClick = (emojiData) => {
        setText((prev) => prev + emojiData.emoji); 
    };

    const [showEmoji, setShowEmoji] = useState(false)

    const [userData ,setUserData] = useState({
        _id: '',
        name: '',
        email: '',
        apprived: false,
        isAdmin: false
    })

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    useEffect( () => {
        setUserData({
            _id: user.details._id,
            name: user.details.name,
            email: user.details.email,
            apprived: user.details.apprived,
            isAdmin: user.isAdmin
        })
    },[] )

    // Sent message Func
    const sentMessage = (e) => {
        e.preventDefault();
    
        if (text.trim() === '') return;

        const messageData = JSON.parse(localStorage.getItem('temporaryAdminMessage')) || []

        const newMessage = {
            name: user.details.name,
            message: text
        };

        messageData.push(newMessage)
    
        localStorage.setItem('temporaryAdminMessage', JSON.stringify(messageData));
    
        setText('');
        setShowEmoji(false);
    };

    const messageData = JSON.parse(localStorage.getItem('temporaryAdminMessage')) || []

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmoji(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    
        <>
        
            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>Chat</h4>

                </div>

                {/* <div className="container"> */}

                    <div className={style.chatContainer}>

                        <div className="row gy-3">

                            <div className="col-md-5 col-lg-4">

                                <div className={style.users}>

                                    <div className={style.searchBox}>

                                        <span><i className="fa-solid fa-magnifying-glass"></i></span>

                                        <div className={style.input}>

                                            <input type="search" className='form-control p-2' placeholder='Search here...' />

                                        </div>

                                    </div>

                                    <div className={style.usersBox}>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.userBox}>

                                            <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                <div className={style.left}>

                                                    {/* <div className={style.image}>

                                                        <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                    </div> */}

                                                    <div className={style.names}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <span className={style.message}>Where are you?</span>

                                                    </div>

                                                </div>

                                                <div className={style.right}>

                                                    <p className={style.time}>2 min</p>

                                                    <span className={`badge text-bg-success`}>15</span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-7 col-lg-8">

                                <div className={style.chatBox}>

                                    <div className={style.userDetails}>

                                        <div className={style.image}>

                                            <img src={userImg} width={50} alt="user-image" loading='lazy' />

                                        </div>

                                        <h4 className={style.userName}>Abdelraouf</h4>

                                    </div>

                                    <div className={style.chat}>

                                        <div className={style.inbox}>

                                            <div className={style.userInbox}>

                                                <div className={style.userMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolorem sequi at.</h4>

                                                </div>

                                                <div className={style.image}>

                                                    <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                            </div>

                                            <div className={style.adminInbox}>

                                                <div className={style.image}>

                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                                <div className={style.adminMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>You</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.inbox}>

                                            <div className={style.userInbox}>

                                                <div className={style.userMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi iste odio sapiente.</h4>

                                                </div>

                                                <div className={style.image}>

                                                    <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                            </div>

                                            <div className={style.adminInbox}>

                                                <div className={style.image}>

                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                                <div className={style.adminMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>You</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.inbox}>

                                            <div className={style.userInbox}>

                                                <div className={style.userMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi iste odio sapiente.</h4>

                                                </div>

                                                <div className={style.image}>

                                                    <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                            </div>

                                            <div className={style.adminInbox}>

                                                <div className={style.image}>

                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                                <div className={style.adminMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>You</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.inbox}>

                                            <div className={style.userInbox}>

                                                <div className={style.userMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi iste odio sapiente.</h4>

                                                </div>

                                                <div className={style.image}>

                                                    <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                            </div>

                                            <div className={style.adminInbox}>

                                                <div className={style.image}>

                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                                <div className={style.adminMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>You</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                                </div>

                                            </div>

                                        </div>

                                        <div className={style.inbox}>

                                            <div className={style.userInbox}>

                                                <div className={style.userMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>Abdelraouf</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi iste odio sapiente.</h4>

                                                </div>

                                                <div className={style.image}>

                                                    <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                            </div>

                                            <div className={style.adminInbox}>

                                                <div className={style.image}>

                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                </div>

                                                <div className={style.adminMessage}>

                                                    <div className={style.messageTiming}>

                                                        <h4 className={style.name}>You</h4>

                                                        <p className={style.timing}>00:05</p>

                                                    </div>

                                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                                </div>

                                            </div>

                                        </div>

                                        { messageData.map( (data, index) => (

                                            <div className={style.inbox} key={index + 1}>

                                                <div className={style.adminInbox}>

                                                    <div className={style.image}>

                                                        <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                    </div>

                                                    <div className={style.adminMessage}>

                                                        <div className={style.messageTiming}>

                                                            <h4 className={style.name}>You</h4>

                                                            <p className={style.timing}>00:05</p>

                                                        </div>

                                                        <h4 className={style.message}>{ data.message }</h4>

                                                    </div>

                                                </div>

                                            </div>

                                        ) ) }

                                    </div>

                                    <div className={style.input}>

                                        <input type="text" className='form-control p-2' placeholder='enter message here..' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={ (e) => { if (e.key === "Enter") { sentMessage(e) } } } />

                                        <div className={style.sendEmoji}>
                                        
                                            <button type="button" className={style.emojiToggle} onClick={() => setShowEmoji(!showEmoji)} > <i className="fa-regular fa-face-smile"></i> </button>

                                            {showEmoji && (
                                            
                                                <div className={style.emojiBox} ref={emojiRef}>
                                                
                                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                                
                                                </div>
                                            
                                            )}
                                        
                                        </div>

                                        <button type='submit' onClick={sentMessage} className={style.sendMessageBtn}><i className="fa-solid fa-paper-plane"></i></button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                {/* </div> */}

            </div>
        
        </>
    
    )
}
