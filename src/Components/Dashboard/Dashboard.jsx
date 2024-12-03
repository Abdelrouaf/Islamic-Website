import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import style from './Dashboard.module.scss'

// Chart.js setup
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {

    const [salesData, setSalesData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [usersData, setUsersData] = useState([]);

    const [statsData, setStatsData] = useState([])

    const userToken = localStorage.getItem('accessToken')

    const fetchData = async () => {
        try {
            
            const response = await fetch('http://147.79.101.225:2859/api/programs/', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status`);
            }
        
            const data = await response.json()

            // console.log("data ", data);
            setStatsData(data)
            

        } catch {
            // showToast("Error in fetching programs.", 'error')
        }
    }

    console.log("fdasdc ", statsData);
    

    useEffect(() => {

        fetchData()
        
        setSalesData(statsData);
        setRevenueData(statsData);
        setUsersData(statsData);
      }, []);
    
      // Chart Data Setup
      const salesChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Sales',
            data: salesData,
            borderColor: '#4caf50',
            fill: false,
            tension: 0.1,
          },
        ],
      };
    
      const revenueChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Revenue',
            data: revenueData,
            borderColor: '#3e95cd',
            fill: false,
            tension: 0.1,
          },
        ],
      };
    
      const usersChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'New Users',
            data: usersData,
            borderColor: '#ff6384',
            fill: false,
            tension: 0.1,
          },
        ],
      };



    return (
    
        <>
        
            <div className={style.box}>

                <div className={style.HeadingTitle}>

                    <h4>Dashboard</h4>

                </div>

                <div className="container">

                <div className="stats-cards">
        <div className="stat-card">
          <h2>Total Sales</h2>
          <p>{salesData.reduce((acc, num) => acc + num, 0)} units</p>
        </div>
        <div className="stat-card">
          <h2>Total Revenue</h2>
          <p>${revenueData.reduce((acc, num) => acc + num, 0)}</p>
        </div>
        <div className="stat-card">
          <h2>New Users</h2>
          <p>{usersData.reduce((acc, num) => acc + num, 0)} users</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Sales Over the Week</h3>
          <Line data={salesChartData} />
        </div>
        <div className="chart">
          <h3>Revenue Over the Week</h3>
          <Line data={revenueChartData} />
        </div>
        <div className="chart">
          <h3>New Users Over the Week</h3>
          <Line data={usersChartData} />
        </div>
      </div>

                </div>

            </div>
        
        </>
    
    )
}
