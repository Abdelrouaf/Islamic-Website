import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import userImg from '../../images/man (1).png'
import adminImage from '../../images/manager.png'
import style from './Chat.module.scss'

export default function Chat() {

    const [run, setRun] = useState(0)

    const userToken = localStorage.getItem('accessToken')

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        async function getData() {
            try {    
                const response = await fetch('http://147.79.101.225:2859/api/message/admin', {
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
                console.log('Data received from API:', data.Messages);

                setAllUsers(data.Messages)

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
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
    const sentMessage = async (e, userId) => {
        e.preventDefault();
    
        if (text.trim() === '') return;

        const messageData = JSON.parse(localStorage.getItem('temporaryAdminMessage')) || []

        const newMessage = {
            name: user.details.name,
            message: text
        };

        const messageText = {
            message: text,
        };

        try {
            const response = await fetch(`http://147.79.101.225:2859/api/message/replay/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(messageText),
            });
    
            console.log('Response status:', response);
            console.log('Response text:', await response.text());

            if (!response.ok) {
                throw new Error(`Failed to send message, status ${response.status}`);
            }

            
            
    
            const data = await response.json(); 
            console.log('Message sent successfully:', data);
    
            setText(''); 
            setShowEmoji(false);  
    
        } catch (error) {
            console.error('Error sending message:', error.message);  // Log error
        }

        setRun( (prevRun) => prevRun + 1 )

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
    
        if (diffInMinutes < 1) {
            return `now`;
        }

        // If the difference is less than 1 hour, show minutes
        if (diffInMinutes < 60) {
            return `${diffInMinutes} min`;
        }
    
        // If the difference is less than 1 day, show the hour in natural format (e.g., 2:00 PM)
        if (diffInDays < 1) {
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${formattedHours}:${formattedMinutes} ${ampm}`;
        }
    
        // If the difference is more than 1 day, show the date in "day month" format (e.g., 2 Dec)
        // const day = messageDate.getDate();
        // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const month = monthNames[messageDate.getMonth()];
        // return `${day} ${month}`;

        // If the difference is more than 1 day, show the date in "MM/DD/YY" format (e.g., 12/02/24)
        const month = messageDate.getMonth() + 1;
        const day = messageDate.getDate();
        const year = messageDate.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    };

    // // Assuming `allUsers` is the data you receive from the API
    // const groupedMessages = allUsers.reduce((acc, userMessages) => {
    //     const { userId, message } = userMessages;

    //     // Filter messages where isAdmin is false
    //     const filteredMessages = message.filter((msg) => !msg.isAdmin);

    //     if (filteredMessages.length > 0) { 
    //         // If userId already exists in the accumulator, add message count
    //         if (acc[userId]) {
    //             acc[userId].count += message.length;
    //             acc[userId].lastMessage = message[message.length - 1].message;
    //             acc[userId].createdAt = userMessages.updatedAt || userMessages.createdAt; // Use the correct timestamp
    //         } else {
    //             acc[userId] = {
    //                 count: message.length,
    //                 lastMessage: message[message.length - 1].message,
    //                 createdAt: userMessages.updatedAt || userMessages.createdAt, // Add timestamp here
    //             };
    //         }
    //     }

    //     return acc;
    // }, {});

    const groupedMessages = allUsers.reduce((acc, userMessages) => {
        const { userId, message, createdAt, updatedAt, _id } = userMessages;
    
        // Skip processing if userId is null or undefined
        if (!userId) return acc;
    
        // Use email or another unique property of `userId` as the key
        const uniqueKey = userId._id;
    
        // Filter messages where isAdmin is false
        const filteredMessages = message.filter((msg) => !msg.isAdmin);
    
        if (filteredMessages.length > 0) {
            if (acc[uniqueKey]) {
                acc[uniqueKey].count += filteredMessages.length;
                acc[uniqueKey].lastMessage =
                    filteredMessages.length > 0
                        ? filteredMessages[filteredMessages.length - 1].message
                        : null;
                acc[uniqueKey].createdAt = updatedAt || createdAt;
            } else {
                acc[uniqueKey] = {
                    userName: userId.name,
                    count: filteredMessages.length,
                    lastMessage:
                        filteredMessages.length > 0
                            ? filteredMessages[filteredMessages.length - 1].message
                            : null,
                    createdAt: updatedAt || createdAt,
                    _id,
                };
            }
        }
    
        return acc;
    }, {});
    

    console.log("all usres", allUsers);
    
    

    const [userChat, setUserChat] = useState({
        id: '',
        userId: {
            name: '',
            email: '',
            isAdmin: false
        },
        createdAt: '',
        updatedAt: '',
        messages: [],
    })

    // show user chat
    const showUserChat = async (userId) => {

        try {
            // Send the message data via a POST request
            const response = await fetch(`http://147.79.101.225:2859/api/message/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error(`Failed to send message, status: ${response.status}`);
            }
    
            const data = await response.json();  // Parse the response data
            console.log('DATA from user:', data.Message);  // Log success message

            setUserChat({
                id: data.Message._id,
                userId: {
                    name: data.Message.userId.name,
                    email: data.Message.userId.email,
                    isAdmin: data.Message.userId.isAdmin,
                },
                createdAt: data.Message.createdAt,
                updatedAt: data.Message.updatedAt,
                messages: data.Message.message,
            })
    
        } catch (error) {
            console.error('Error sending message:', error.message);  // Log error
        }
    }

    console.log('caht ysr', userChat);
    

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

                                        { allUsers.length > 0 && Object.keys(groupedMessages).map( (uniqueKey) => {

                                            const { userName, count, lastMessage, createdAt, _id } = groupedMessages[uniqueKey];

                                            return (

                                                <div onClick={ () => showUserChat(_id) } className={style.userBox} key={uniqueKey}>

                                                    <div className="d-block d-lg-flex align-items-center justify-content-between">

                                                        <div className={style.left}>

                                                            {/* <div className={style.image}>

                                                                <img src={userImg} width={40} alt="user-image" loading='lazy' />

                                                            </div> */}

                                                            <div className={style.names}>

                                                                <h4 className={style.name}>{userName}</h4>

                                                                <span className={style.message}>{lastMessage}</span>

                                                            </div>

                                                        </div>

                                                        <div className={style.right}>

                                                            <p className={style.time}>{formatMessageTime(createdAt)}</p>

                                                            <span className={`badge text-bg-success`}>{count}</span>

                                                        </div>

                                                    </div>

                                                </div>

                                            )

                                        } ) }

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-7 col-lg-8">

                                { userChat.messages.length > 0 ? 

                                    (
                                        <div className={style.chatBox}>

                                            <div className={style.userDetails}>

                                                <div className={style.image}>

                                                    <img src={userImg} width={50} alt="user-image" loading='lazy' />

                                                </div>

                                                <h4 className={style.userName}>{userChat.userId.name}</h4>

                                            </div>

                                            <div className={style.chat}>

                                                <div className={style.inbox}>

                                                {userChat && userChat.messages && userChat.messages.map( (message, index) => (

                                                    <div className={style.userInbox} key={index}>

                                                        <div className={style.userMessage}>

                                                            <div className={style.messageTiming}>

                                                                <h4 className={style.name}>{userChat.userId.name}</h4>

                                                                <p className={style.timing}>00:05</p>

                                                            </div>

                                                            <h4 className={style.message}>{message.message}</h4>

                                                        </div>

                                                        <div className={style.image}>

                                                            <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                        </div>

                                                    </div>

                                                ) )}

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

                                                {/* { messageData.map( (data, index) => (

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

                                                ) ) } */}

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

                                                <button type='submit' onClick={ (e) => sentMessage(e, userChat.id)} className={style.sendMessageBtn}><i className="fa-solid fa-paper-plane"></i></button>

                                            </div>

                                        </div>
                                    
                                    ) : 
                                    
                                        <div className={style.chatBox}>

                                            <div className={`${style.chat} ${style.chatHeight}`}></div>

                                        </div> 
                                
                                } 

                                

                            </div>

                        </div>

                    </div>

                {/* </div> */}

            </div>
        
        </>
    
    )
}
