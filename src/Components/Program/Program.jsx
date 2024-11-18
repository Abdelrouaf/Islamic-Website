import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import programImage from '../../images/program1.jpeg'
import style from './Program.module.scss'

export default function Program() {

    const [run, setRun] = useState(0)

    const token = window.localStorage.getItem('accessToken')

    useEffect(() => {
        async function getData() {
            try {
                await fetch('http://147.79.101.225:2859/api/programs/', {
                    method : "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                        credentials: "include"
                })
                .then( (res) => res.json() )
                .then( (data) => console.log(data) )
                .then( err => console.error("Error is: ", err) )
            } catch (error) {
                console.error("error ", error);
            }
        };

        getData();
    }, [run]);

    const { category } = useParams();

    return (
    
        <>
        
            <section className={style.currentlyNav}>

                <div className="container">

                    <h4><i className="fa-solid fa-house"></i> <i className="fa-solid fa-angle-right"></i> {category} <i className="fa-solid fa-angle-right"></i> autoDESK </h4>

                </div>

            </section>

            <section className={style.programSec}>

                <div className="container">

                    <div className="row">

                        <div className="col-12">

                            <div className="row">

                                <div className="col-md-6">

                                    <div className={style.image}>

                                        <img src={programImage} alt="program-image" loading='lazy' />

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className={style.programOverview}>

                                        <h4 className={style.programTitle}>autoDESK - autoCAD</h4>

                                        <div className={style.downloadProgram}>
                                        
                                            <a href="#">Download</a>
                                        
                                            <b className={style.top}>click to download</b>
                                        
                                            <b className={style.bottom}>1.2MB .zip</b>
                                        
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-12">

                            <div className={style.programDetails}>

                                <ul className='nav nav-tabs'>

                                    <li className='nav-item'><button className={`nav-link active`}>details</button></li>

                                    <li className='nav-item'><button className='nav-link '>system requirements</button></li>

                                </ul>

                                <div className={style.detailsBox}>

                                    <div className={style.details}>



                                    </div>

                                    <div className={style.systemRequirements}>



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
