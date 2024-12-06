import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import userImg from '../../images/man (1).png'
import adminImage from '../../images/manager.png'
import chatBackground from '../../images/chatBackground.jpg'
import seen from '../../images/seen.png'
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

                setAllUsers(data.Messages)

            } catch (error) {
                console.error("Error occurred during the fetch:", error.message);
            }
        }
    
        getData();

        // Set the interval to refresh the data every 3 seconds
        const intervalId = setInterval(() => {
            getData();
        }, 3000);

        // Cleanup the interval when the component unmounts or `run` changes
        return () => {
            clearInterval(intervalId);
        };

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

            const userInfo = data.Message.userId
            ? {
                  name: data.Message.userId.name || '', // Use fallback if `name` is missing
                  email: data.Message.userId.email || '', // Use fallback if `email` is missing
                  isAdmin: data.Message.userId.isAdmin || false, // Use fallback if `isAdmin` is missing
                }
            : {
                    name: '',
                    email: '',
                    isAdmin: false,
                };

            setUserChat({
                id: data.Message._id,
                userId: userInfo,
                createdAt: data.Message.createdAt,
                updatedAt: data.Message.updatedAt,
                messages: data.Message.message,
            })
    
        } catch (error) {
            console.error('Error sending message:', error.message);  // Log error
        }
    }

    // Sent message Func
    const sentMessage = async (e, userId) => {
        e.preventDefault();

        if (!userId) {
            console.error("Error: userId is undefined or empty.");
            return;
        }
    
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
            const response = await fetch(`http://147.79.101.225:2859/api/message/reply/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(messageText),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to send message, status ${response.status}`);
            }
    
            const data = await response.json(); 
    
            setText(''); 
            setShowEmoji(false);  

            // Fetch updated chat data after successfully sending the message
        const updatedChatResponse = await fetch(`http://147.79.101.225:2859/api/message/${userId}`, {
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

        const userInfo = updatedChatData.Message.userId
            ? {
                name: updatedChatData.Message.userId.name || '',
                email: updatedChatData.Message.userId.email || '',
                isAdmin: updatedChatData.Message.userId.isAdmin || false,
            }
        : {
                name: '',
                email: '',
                isAdmin: false,
            };

        setUserChat({
            id: updatedChatData.Message._id,
            userId: userInfo,
            createdAt: updatedChatData.Message.createdAt,
            updatedAt: updatedChatData.Message.updatedAt,
            messages: updatedChatData.Message.message,
        });
    
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

        if (diffInDays === 1) {
            return `Yesterday`;
        }
    
        // If the difference is more than 1 day, show the date in "day month" format (e.g., 2 Dec)
        // const day = messageDate.getDate();
        // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const month = monthNames[messageDate.getMonth()];
        // return `${day} ${month}`;

        // If the difference is more than 1 day, show the date in "MM/DD/YY" format (e.g., 12/02/24)
        const month = messageDate.getMonth() + 1;
        const day = messageDate.getDate();
        const year = messageDate.getFullYear().toString();
        // const year = messageDate.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    };

    const groupedMessages = allUsers.reduce((acc, userMessages) => {
        const { userId, message, createdAt, updatedAt, _id } = userMessages;
    
        // Ensure userId exists and is unique
        const uniqueKey = userId?._id || _id; // Use fallback if userId is missing
    
        if (!uniqueKey) {
            console.warn("Skipping user with missing unique identifier:", userMessages);
            return acc;
        }
    
        // Parse the dates and handle invalid dates
        const parseDate = (dateStr) => {
            const parsedDate = Date.parse(dateStr);
            return isNaN(parsedDate) ? new Date() : new Date(parsedDate); // Default to current date if invalid
        };
    
        // Find the last admin message index
        const lastAdminIndex = message.map((msg) => msg.isAdmin).lastIndexOf(true);
    
        // Count user messages after the last admin reply
        const userMessageCount = message
            .slice(lastAdminIndex + 1) // Get messages after the last admin reply
            .filter((msg) => !msg.isAdmin).length;
    
        // Get the last message and sender details
        const lastMessageData = message[message.length - 1];
        const lastMessage = lastMessageData?.message || "No messages";
        const lastSenderIsAdmin = lastMessageData?.isAdmin || false;
    
        acc[uniqueKey] = {
            userName: userId?.name || "Unknown User",
            count: userMessageCount, // Count messages after the last admin reply
            lastMessage,
            createdAt: updatedAt || createdAt || "Unknown date",
            updatedAt: parseDate(updatedAt || createdAt || "Unknown date"), // Ensure valid date is used for sorting
            _id,
        };
    
        return acc;
    }, {});

    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter users based on the search query
    const filteredUsers = Object.keys(groupedMessages).filter((uniqueKey) => {
        const { userName } = groupedMessages[uniqueKey];
        return userName.toLowerCase().includes(searchQuery.toLowerCase()); // Case-insensitive search
    });

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

                                            <input type="search" className='form-control p-2' placeholder='Search here...' value={searchQuery} onChange={handleSearchChange} />

                                        </div>

                                    </div>

                                    <div className={style.usersBox}>

                                        {/* { allUsers.length > 0 && Object.keys(groupedMessages).sort((a, b) => { */}
                                            { filteredUsers.length > 0 && filteredUsers.sort((a, b) => {
                                            const updatedA = groupedMessages[a].updatedAt;
                                            const updatedB = groupedMessages[b].updatedAt;

                                            // Sorting by updatedAt, with the most recent updates first
                                            return updatedB - updatedA; // Sorts in descending order
                                            }).map( (uniqueKey) => {

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

                                                                <span className={style.message}>{ count === 0 ? <> <img src={seen} width={15} alt="seen-image" loading='lazy' /> {lastMessage} </> : lastMessage }</span>

                                                            </div>

                                                        </div>

                                                        <div className={style.right}>

                                                            <p className={style.time}>{formatMessageTime(createdAt)}</p>

                                                            <span className={`badge text-bg-success`}>{ count === 0 ? '' : count }</span>

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

                                                <h4 className={style.userName}>{ userChat.userId.name === '' ? 'Unknown User' : userChat.userId.name }</h4>

                                            </div>

                                            <div className={style.chat} >

                                                <div className={style.inbox}>

                                                {userChat && userChat.messages && userChat.messages.map( (message, index) => (

                                                    <div key={message._id}>
                                                    
                                                        { !message.isAdmin ? (

                                                            <div className={style.userInbox} >

                                                            <div className={style.userMessage}>

                                                                <div className={style.messageTiming}>

                                                                    <h4 className={style.name}>{ userChat.userId.name === '' ? 'Unknown User' : userChat.userId.name }</h4>

                                                                    <p className={style.timing}>{formatMessageTime(message.time)}</p>

                                                                </div>

                                                                <h4 className={style.message}>{message.message}</h4>

                                                            </div>

                                                            <div className={style.image}>

                                                                <img src={userImg} width={20} alt="user-image" loading='lazy' />

                                                            </div>

                                                            </div>

                                                        ) : (

                                                            <div className={style.adminInbox}>

                                                                <div className={style.image}>

                                                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                                                </div>

                                                                <div className={style.adminMessage}>

                                                                    <div className={style.messageTiming}>

                                                                        <h4 className={style.name}>You</h4>

                                                                        <p className={style.timing}>{formatMessageTime(message.time)}</p>

                                                                    </div>

                                                                    <h4 className={style.message}>{message.message}</h4>

                                                                </div>

                                                            </div>

                                                        ) }

                                                        
                                                    
                                                    </div>
) )}
                                                </div>

                                            </div>

                                            <div className={style.input}>

                                                <input type="text" className='form-control p-2' placeholder='enter message here..' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={ (e) => { if (e.key === "Enter") { sentMessage(e, userChat.id) } } } />

                                                <div className={style.sendEmoji}>
                                                
                                                    <button type="button" className={style.emojiToggle} onClick={() => setShowEmoji(!showEmoji)} > <i className="fa-regular fa-face-smile"></i> </button>

                                                    {showEmoji && (
                                                    
                                                        <div className={style.emojiBox} ref={emojiRef}>
                                                        
                                                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                                                        
                                                        </div>
                                                    
                                                    )}
                                                
                                                </div>

                                                <button type='submit' onClick={ (e) => { if (!userChat.id) { console.error("Error: chat id is not set."); return; } sentMessage(e, userChat.id)}} className={style.sendMessageBtn}><i className="fa-solid fa-paper-plane"></i></button>

                                            </div>

                                        </div>
                                    
                                    ) : 
                                    
                                        <div className={style.chatBox}>

                                            <div className={`${style.chat} ${style.chatHeight}`} style={{ backgroundImage: `url(${chatBackground})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity: '.3' }}></div>

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
