import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import style from '../Style/Layout/Layout.module.scss'

export default function Layout() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
      // Array of all API requests
      const apiRequests = [
        fetch('http://147.79.101.225:2859/api/faithBook/'),
        fetch('http://147.79.101.225:2859/api/faithVideo'),
        fetch('http://147.79.101.225:2859/api/lifeBlogs/'),
        fetch('http://147.79.101.225:2859/api/monotheismBlog/'),
        fetch('http://147.79.101.225:2859/api/news/'),
        fetch('http://147.79.101.225:2859/api/certificateBlog/'),
        fetch('http://147.79.101.225:2859/api/prayerBlog/'),
        fetch('http://147.79.101.225:2859/api/fastingBlog/'),
        fetch('http://147.79.101.225:2859/api/zakatBlog/'),
        fetch('http://147.79.101.225:2859/api/haijBlog/'),
        fetch('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json'),
        fetch('https://ahegazy.github.io/muslimKit/json/azkar_sabah.json')
        ];
    
        // Using Promise.all to handle multiple requests
        Promise.all(apiRequests)
            .then((responses) => Promise.all(responses.map((response) => response.json())))
            .then((data) => {
            setLoading(false)
            })
            .catch(
            setLoading(false)
            // Handle error if needed
            );
        }, []);

    if (loading) {
        return <p className={`${style.loading} ${style.section}`}>Loading, Please wait <span className={style.loader}></span></p>; 
    }  

    return (
    
        <>
        
            <Header/> 
        
            <Outlet></Outlet>
        
            <Footer />
        
        </>
    
    )
}
