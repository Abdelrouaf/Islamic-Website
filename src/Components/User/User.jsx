import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import man from '../../images/man (1).png'
import { Azkar } from 'islam.js'
import style from './User.module.scss'

export default function User() {

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

    const azkar = new Azkar()

    const [dataZikr, setDataZikr] = useState([]);
    // const movingZikrRef = useRef(null);

    useEffect(() => {
        const allAzkar = azkar.getAll()
        setDataZikr(allAzkar);
    }, []);

    const [zikrScrollVisible, setZikrScrollVisible] = useState(false)

    const toggleZikrScroll = () => {
        setZikrScrollVisible(!zikrScrollVisible)
    }

    return (
    
        <>
        
            <section className={style.profileSec}>

                <div className="container h-100">

                <div className="row gy-3 h-100">

                    <div className="col-lg-3">

                        <div className={`d-flex justify-content-between flex-column h-100 ${style.leftBox}`}>

                            <div className={style.quickLinks}>

                                <ul>

                                    <li><Link to='' className={ location.pathname.endsWith('/user') ? style.linkActive : '' }><i className="fa-solid fa-user"></i> profile</Link></li>

                                    <li><Link to='save-items' className={ location.pathname.startsWith('/programs/user/save-items') ? style.linkActive : '' }><i className="fa-solid fa-bookmark"></i> saved items</Link></li>

                                    <li><Link to='inbox' className={ location.pathname.startsWith('/programs/user/inbox') ? style.linkActive : '' }><i className="fa-solid fa-comment"></i> inbox</Link></li>

                                    <li><Link to='change-password' className={ location.pathname.startsWith('/programs/user/change-password') ? style.linkActive : '' }><i className="fa-solid fa-lock"></i> password</Link></li>

                                </ul>

                            </div>

                            <div className={style.profileBox}>

                                <div className={style.profileData}>

                                    <div className={style.image}>

                                        <img src={man} width={40} alt="user-profile-image" loading='lazy' />

                                    </div>

                                    <div className={style.userTitles}>

                                        <h4>{userData.name}</h4>

                                        <span>view profile</span>

                                    </div>

                                </div>

                                {/* <div className={style.setting}>

                                    <span><i className="fa-solid fa-gear"></i></span>

                                </div> */}

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-9">

                        <Outlet></Outlet>

                    </div>

                </div>

                </div>

            </section>

            <span className={style.showToggle} onClick={toggleZikrScroll}>{zikrScrollVisible && <i className="fa-solid fa-caret-up"></i>}</span>

            <div className={`${style.zikrScroll} ${zikrScrollVisible ? 'd-none' : 'd-flex'}`}>
                <span className={style.hideToggle} onClick={toggleZikrScroll}>{ !zikrScrollVisible && <i className="fa-solid fa-caret-down"></i>}</span>
                
                <div className={style.scrollContent} onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = 'paused';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                    }}>

                    {Array.from(dataZikr.entries()).map( ([zkar, items], index) => (

                            <div key={index} className={style.box}>

                                <ul>

                                    {items.map((item, key) => (
                                    
                                        <span key={key}>
                                            
                                            <li>
                                            <h4 >{zkar}</h4>
                                                <p>{item.zikr}</p>
                                                
                                            </li>
                                        
                                        </span>
                                    ))}

                                </ul>

                            </div>
                    
                    ) )}

                </div>
            
            </div>
        
        </>
    
    )
}
