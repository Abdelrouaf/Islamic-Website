import React from 'react'
import { Link } from 'react-router-dom'
import program1 from '../../images/program1.jpeg'
import style from './SaveItems.module.scss'

export default function SaveItems() {



    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-bookmark"></i>  <i className="fa-solid fa-angle-right"></i> My Saved items </h4>

                </div>

            </section>

            <section className={style.selectCategory}>

                <div className="row gy-2">

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                {/* <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button> */}

                                <div className={`${style.likeButton}`}>
                                
                                    <input className={style.on} id="heart" type="checkbox" />
                                
                                    <label className={style.likeLabel} htmlFor="heart">
                                    
                                    <svg className={style.likeIcon} fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    
                                    </svg>
                                
                                    <span className={style.likeText}>Likes</span>
                                
                                    </label>
                                
                                    <span className={`${style.likeCount} ${style.one}`}>68</span>
                                
                                    <span className={`${style.likeCount} ${style.two}`}>69</span>
                                
                                </div>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-4">

                        <div className={style.programBox}>

                            <Link to={`../program-autoDESK`}>
                            
                                <div className={style.image}>

                                    <img src={program1} alt="auto-desk" loading='lazy' />

                                </div>
                            
                            </Link>

                            <Link to={`../program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                            <p className={style.programSize}>Program size: <span>512 MB</span></p>

                            <div className={style.btns}>

                                <Link to={`../program-autoDESK`}>

                                    <button className={style.viewBtn}>
                                    
                                        View
                                    
                                        <span className={style.arrow}>
                                        
                                            <svg fill="rgb(183, 128, 255)" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                                        
                                        </span>

                                    </button>
                                
                                </Link>

                                <button className={style.bookmarkBtn}>
                                
                                    <span className={style.IconContainer}>
                                    
                                        <svg viewBox="0 0 384 512" height="0.9em" className={style.icon}>
                                    
                                        <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                        ></path>
                                    
                                        </svg>
                                    
                                    </span>
                                
                                    <p className={style.text}>Save</p>
                                
                                </button>


                            </div>

                            <div className={style.programDetails}>

                                <button className={style.like}>
                                
                                    <span className={style.icon}>
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className={`${style.bi} ${style.biHeart}`} viewBox="0 0 16 16">

                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />

                                    </svg>

                                    </span>

                                    <span className={style.title}>i love it</span>

                                </button>

                                <div className={style.viewSave}>

                                    <span className={style.views}>1.2k views</span>

                                    <span className={style.Saved}><i className="fa-regular fa-bookmark"></i> 50</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
        </>
    
    )
}