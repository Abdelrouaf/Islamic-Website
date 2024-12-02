import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import program1 from '../../images/program1.jpeg'
import { Azkar } from 'islam.js'
import style from './Category.module.scss'

export default function Category() {

    const { category } = useParams();

    const location = useLocation()

    const { description } = location.state || {}

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
        
        {/* <section className={style.currentlyNav}>

            <div className="container">

                <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} </h4>

            </div>

        </section> */}

            <section className={style.categorySec}>

                <div className="container">

                    <div className={style.text}>

                        <h4 className={style.title}>{category}</h4>

                        <p className={style.description}>{description}</p>

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

                    <div className="row gy-2">

                        <div className="col-lg-3 d-none d-lg-block">

                            <div className={style.selectBox}>

                                <h4 className={style.categoryTitle}>Programs category</h4>

                                <ul>

                                    <li><Link to='/programs/category/architecture' state={{ description: 'Architecture software programs are essential tools for architects, designers, and students to create, visualize, and refine architectural designs.' }} className={`${ location.pathname.endsWith('architecture') ? style.programsHover : '' }`}>Architecture software</Link></li>

                                    <li><Link to='/programs/category/structure' state={{ description: 'Structure software programs offer specialized tools for planning, designing, and managing infrastructure projects.' }} className={`${ location.pathname.endsWith('structure') ? style.programsHover : '' }`}>Structure software</Link></li>

                                    <li><Link to='/programs/category/dental' state={{ description: 'Dental programs are designed to support dentists, hygienists, and dental offices with tools for diagnostics, patient management, and treatment planning.' }} className={`${ location.pathname.endsWith('dental') ? style.programsHover : '' }`}>Dental software</Link></li>

                                    <li><Link to='/programs/category/english-material' state={{ description: 'English Material contains resources for learning English, such as books, guides, grammar explanations, or vocabulary building materials.' }} className={`${ location.pathname.endsWith('english-material') ? style.programsHover : '' }`}>English Material</Link></li>

                                    <li><Link to='/programs/category/english-software' state={{ description: 'English Software designed to teach, test, or improve English skills. These could include language learning applications, typing tutors, or interactive tools.' }} className={`${ location.pathname.endsWith('english-software') ? style.programsHover : '' }`}>English software</Link></li>

                                    <li><Link to='/programs/category/english-CDS' state={{ description: 'English CDS containing English lessons, audio books, or multimedia resources aimed at improving listening and speaking skills.' }} className={`${ location.pathname.endsWith('english-CDS') ? style.programsHover : '' }`}>English CDS</Link></li>

                                    <li><Link to='/programs/category/islamic-CDS' state={{ description: 'Islamic CDS contain CDs with Islamic content, such as Quran recitations, lectures, or Nasheeds.' }} className={`${ location.pathname.endsWith('islamic-CDS') ? style.programsHover : '' }`}>Islamic CDS</Link></li>

                                    <li><Link to='/programs/category/islamic-material' state={{ description: 'Islamic Material consists of Islamic educational content, including books, articles, and guides about the Quran, Hadith, and other aspects of Islamic teachings.' }} className={`${ location.pathname.endsWith('islamic-material') ? style.programsHover : '' }`}>Islamic Material</Link></li>

                                    <li><Link to='/programs/category/different' state={{ description: 'Include a variety of unrelated programs or tools that don’t fit into the above categories. These could range from utility software to general learning applications.' }} className={`${ location.pathname.endsWith('different') ? style.programsHover : '' }`}>Different</Link></li>

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

                            <div className="row gy-2">

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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

                                <div className="col-md-12 col-lg-6 col-xl-4">

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
