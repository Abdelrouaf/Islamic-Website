import React from 'react'
import { Link, useParams } from 'react-router-dom'
import program1 from '../../images/program1.jpeg'
import style from './Category.module.scss'

export default function Category() {

    const { category } = useParams();

    return (
    
        <>
        
        {/* <section className={style.currentlyNav}>

            <div className="container">

                <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} </h4>

            </div>

        </section> */}

            <section className={style.categorySec}>

                <div className="container">

                    <div className={style.text}>

                        <h4 className={style.title}>{category}</h4>

                        <p className={style.description}>Architecture software programs are essential tools for architects, designers, and students to create, visualize, and refine architectural designs.</p>

                    </div>

                </div>

            </section>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} </h4>

                </div>

            </section>

            <section className={style.selectCategory}>

                <div className="container">

                    <div className="row">

                        <div className="col-lg-3 d-none d-lg-block">

                            <div className={style.selectBox}>

                                <h4 className={style.categoryTitle}>Programs category</h4>

                                <ul>

                                    <li><Link>Architecture software</Link></li>

                                    <li><Link>Structure software</Link></li>

                                    <li><Link>Dental software</Link></li>

                                    <li><Link>English Material</Link></li>

                                    <li><Link>English software</Link></li>

                                    <li><Link>English CDS</Link></li>

                                    <li><Link>Islamic CDS</Link></li>

                                    <li><Link>Islamic Material</Link></li>

                                    <li><Link>Different</Link></li>

                                </ul>

                            </div>

                            <div className={style.selectBox}>

                                <h4 className={style.categoryTitle}>Architecture Programs</h4>

                                <ul>

                                    <li><Link>program 1</Link></li>

                                    <li><Link>program 2</Link></li>

                                    <li><Link>program 3</Link></li>

                                    <li><Link>program 4</Link></li>

                                    <li><Link>program 5</Link></li>

                                    <li><Link>program 6</Link></li>

                                    <li><Link>program 7</Link></li>

                                    <li><Link>program 8</Link></li>

                                    <li><Link>program 9</Link></li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-lg-9">

                            <div className="row">

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                                <div className="col-md-6 col-lg-4">

                                    <div className={style.programBox}>

                                        <Link to={`../${category}/program-autoDESK`}>
                                        
                                            <div className={style.image}>

                                                <img src={program1} alt="auto-desk" loading='lazy' />

                                            </div>
                                        
                                        </Link>

                                        <Link to={`../${category}/program-autoDESK`}><h4 className={style.programTitle}>AutoDesk AutoCAD</h4></Link>

                                        <p className={style.programSize}>Program size: <span>512 MB</span></p>

                                        <div className={style.btns}>

                                            <Link to={`../${category}/program-autoDESK`}>

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

                        </div>

                        </div>

                </div>

            </section>

        </>
    
    )
}
