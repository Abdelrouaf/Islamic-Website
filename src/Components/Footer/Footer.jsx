import React, { useState } from 'react'
import logo from '../../images/logo-color-removebg-preview (1).png'
import { Link } from 'react-router-dom'
import style from './Footer.module.scss'

export default function Footer() {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the mailto link
        const mailtoLink = `mailto:bodi.halaby654@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        // Open the mailto link
        window.location.href = mailtoLink;
    };

    return (
    
        <footer className={`${style.footer}`}>
        
            <div className="container">
            
                <div className={style.upperFooter}>

                    <div className="row align-items-baseline text-center">

                        <div className="col-md-6 col-lg-3">

                            <div className={style.footerBox}>

                                <div className={style.logo}>
                                
                                    <a href="#"><img src={logo} alt="" /></a>
                                
                                </div>

                                <p className={style.paragraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, hic?</p>

                                <div className={style.right}>

                                    <span>social: </span>

                                    <div className={style.social}>

                                        <a href="#" ><i className="fa-brands fa-facebook"></i></a>

                                        <a href="#"><i className="fa-brands fa-youtube"></i></a>

                                        <a href="#"><i className="fa-brands fa-instagram"></i></a>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 col-lg-3">

                            <div className={style.footerBox}>

                                <h4>Quick Links</h4>

                                <ul>

                                    <li><Link to='pillars'>pillars</Link></li>

                                    <li><Link to='monotheism'>monotheism</Link></li>

                                    <li><Link to='news'>news</Link></li>

                                    <li><Link to='faith'>faith</Link></li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-md-6 col-lg-3">

                            <div className={style.footerBox}>

                                <h4>more Links</h4>

                                <ul>

                                    <li><Link to='quran'>quran</Link></li>

                                    <li><Link to='azkar'>azkar</Link></li>

                                    <li><Link to='islam'>about islam</Link></li>

                                </ul>

                            </div>

                            </div>

                        <div className="col-md-6 col-lg-3">

                            <div className={style.footerBox}>

                                <h4>get in touch</h4>

                                <form className={style.form} onSubmit={handleSubmit}>
                                
                                    <div className={style.inputBox}>
                                    
                                        <label>Message:</label>
                                    
                                        <textarea
                                            className='form-control'
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Your message ..."
                                            required
                                        />

                                    </div>

                                    <div className={style.btns}>

                                    <button type="submit" className={style.downloadBtn}>Send </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            
                <div className={style.lowerFooter}>

                    <div className="text-center">

                        <p className={`${style.paragraph}`}>copyright &copy; 2024 Taw3ya</p>

                    </div>

                </div>

            </div>
        
        </footer>
    
    )
}
