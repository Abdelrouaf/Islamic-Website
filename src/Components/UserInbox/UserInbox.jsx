import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import userImage from '../../images/man (1).png'
import adminImage from '../../images/manager.png'
import chatBackground from '../../images/chatBackground.jpg'
import seen from '../../images/seen.png'
import style from './UserInbox.module.scss'

export default function UserInbox() {

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [chatMessages, setChatMessages] = useState([])

    const [userData ,setUserData] = useState({
        _id: '',
        name: '',
        email: '',
        apprived: false,
        isAdmin: false,
        messages: []
    })

    const [loading, setLoading] = useState(true)

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
    
                console.log('Response from API:', response);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status`);
                }
    
                const data = await response.json();
                console.log('message received from API:', data.Message);

                setChatMessages(data.Message)

                setUserData( (prevState) =>({
                    ...prevState,
                    messages: data.Message || []
                }) )

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message); 
            } finally {
                setLoading(false)
            }
        }
    
        getData();
    }, [run]);

    const [text, setText] = useState("");
    const emojiRef = useRef(null);

    const handleEmojiClick = (emojiData) => {
        setText((prev) => prev + emojiData.emoji); 
    };

    const [showEmoji, setShowEmoji] = useState(false)

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('loggedInUser'))

    useEffect( () => {
        setUserData( (prevState) => ({
            ...prevState,
                _id: user.details._id,
                name: user.details.name,
                email: user.details.email,
                apprived: user.details.apprived,
                isAdmin: user.isAdmin,
                messages: prevState.messages || []
            
        }) )
    },[] )

    // Sent message Func
    const sentMessage = async (e) => {
        e.preventDefault();
    
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
            console.log('Message sent successfully:', data);  
    
            setText('');  
            setShowEmoji(false);  

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
            console.log('Updated chat data:', updatedChatData.Message);

            setChatMessages(updatedChatData.Message)
    
        } catch (error) {
            console.error('Error sending message:', error.message);  // Log error
        } finally {
            setLoading(false)
        }

        setRun( (prevRun) => prevRun + 1 )

        messageData.push(newMessage)
    
        localStorage.setItem('temporaryMessage', JSON.stringify(messageData));
    
        setText('');
        setShowEmoji(false);
    };

    const messageData = JSON.parse(localStorage.getItem('temporaryMessage')) || []

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

    const formatMessageTime = (timestamp) => {
        const messageDate = new Date(timestamp);
        if (isNaN(messageDate.getTime())) {
            return "Invalid time";  
        }
    
        const currentDate = new Date();
        const diffInMs = currentDate - messageDate; 
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); 
        const diffInHours = Math.floor(diffInMinutes / 60); 
        const diffInDays = Math.floor(diffInHours / 24); 
    
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    if (loading) {
        return  <div id="page">
        <div id="container">
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="ring" />
          <div id="h3">loading</div>
        </div>
      </div>
    }

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-comment"></i> <i className="fa-solid fa-angle-right"></i> Inbox </h4>

                </div>

            </section>
        
            <section className={style.userInboxSec}>

                <div className="container">

                    <div className={style.userDetails}>

                        <div className={style.image}>

                            <img src={adminImage} width={50} alt="user-image" loading='lazy' />

                        </div>

                        <h4 className={style.userName}>Team support</h4>

                    </div>
                
                    { !userData.isAdmin && (userData.messages.length || 0) === 0 ? 

                        <div className={style.usersBox}>
                        
                            { chatMessages && Array.isArray(chatMessages.message) && chatMessages.message.length > 0  && chatMessages.message.map( (userChat, index) => (
                            
                                <div className={style.inbox} key={userChat._id || index}>

                                    { !userChat.isAdmin ? (

                                        <div className={style.userInbox}>

                                            <div className={style.userMessage}>

                                                <div className={style.messageTiming}>

                                                    <h4 className={style.name}>{userData.name}</h4>

                                                    <p className={style.timing}>{formatMessageTime(userChat.time)}</p>

                                                </div>

                                                <h4 className={style.message}>{userChat.message}</h4>

                                            </div>

                                            <div className={style.image}>

                                                <img src={userImage} width={20} alt="user-image" loading='lazy' />

                                            </div>

                                        </div>

                                    ) : (
                                    
                                        <div className={style.adminInbox}>

                                            <div className={style.image}>

                                                <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                            </div>

                                            <div className={style.adminMessage}>

                                                <div className={style.messageTiming}>

                                                    <h4 className={style.name}>Support Team</h4>

                                                    <p className={style.timing}>{formatMessageTime(userChat.time)}</p>

                                                </div>

                                                <h4 className={style.message}>{userChat.message}</h4>

                                            </div>

                                        </div>
                                    
                                    ) }

                                    

                                    

                                </div>

                            )) }
                        
                        </div>
                    
                    : 

                        <div className={style.usersBox}>
                        
                            { userData.isAdmin ? (

                                <p className='d-flex align-items-center justify-content-center h-100 w-100 fs-5'>You are the admin 😉</p>

                            ) : '' }
                        
                        </div> 
                    
                    }
                
                    { !userData.isAdmin ? (

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

                    ) : '' }

                </div>

            </section>

        </>
    
    )
}