import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import userImage from '../../images/man (1).png'
import adminImage from '../../images/manager.png'
import style from './UserInbox.module.scss'

export default function UserInbox() {

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

        const messageData = JSON.parse(localStorage.getItem('temporaryMessage')) || []

        const newMessage = {
            name: user.details.name,
            message: text
        };

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

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-comment"></i> <i className="fa-solid fa-angle-right"></i> Inbox </h4>

                </div>

            </section>
        
            <section className={style.userInboxSec}>

                <div className="container">

                    <div className={style.usersBox}>

                        <div className={style.inbox}>

                            <div className={style.userInbox}>

                                <div className={style.userMessage}>

                                    <div className={style.messageTiming}>

                                        <h4 className={style.name}>{userData.name}</h4>

                                        <p className={style.timing}>00:05</p>

                                    </div>

                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                </div>

                                <div className={style.image}>

                                    <img src={userImage} width={20} alt="user-image" loading='lazy' />

                                </div>

                            </div>

                            <div className={style.adminInbox}>

                                <div className={style.image}>

                                    <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                </div>

                                <div className={style.adminMessage}>

                                    <div className={style.messageTiming}>

                                        <h4 className={style.name}>Support Team</h4>

                                        <p className={style.timing}>00:05</p>

                                    </div>

                                    <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                </div>

                            </div>

                        </div>

                        { messageData.map( (data, index) => (

                            <div className={style.inbox} key={index + 1}>

                                <div className={style.userInbox}>

                                    <div className={style.userMessage}>

                                        <div className={style.messageTiming}>

                                            <h4 className={style.name}>{userData.name}</h4>

                                            <p className={style.timing}>00:05</p>

                                        </div>

                                        <h4 className={style.message}>{ data.message }</h4>

                                    </div>

                                    <div className={style.image}>

                                        <img src={userImage} width={20} alt="user-image" loading='lazy' />

                                    </div>

                                </div>

                                {/* <div className={style.adminInbox}>

                                    <div className={style.image}>

                                        <img src={adminImage} width={20} alt="user-image" loading='lazy' />

                                    </div>

                                    <div className={style.adminMessage}>

                                        <div className={style.messageTiming}>

                                            <h4 className={style.name}>Support Team</h4>

                                            <p className={style.timing}>00:05</p>

                                        </div>

                                        <h4 className={style.message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio autem reiciendis, quos cum earum veritatis!</h4>

                                    </div>

                                </div> */}

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

            </section>

        </>
    
    )
}