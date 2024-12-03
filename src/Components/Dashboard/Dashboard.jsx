import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns/format';
import style from './Dashboard.module.scss'

// Chart.js setup
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {

    const [viewsData, setViewsData] = useState([0, 0, 0, 0, 0, 0, 0]); // For Views (Mon-Sun)
    const [likesData, setLikesData] = useState([0, 0, 0, 0, 0, 0, 0]); // For Likes (Mon-Sun)

    const [programs, setPrograms] = useState([]);

    const userToken = localStorage.getItem('accessToken');

    const fetchData = async () => {
        try {
            const response = await fetch('http://147.79.101.225:2859/api/programs/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('HTTP error! status');
            }

            const data = await response.json();
            setPrograms(data);

            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            const views = new Array(7).fill(0); // Initialize for 7 days of the week
            const likes = new Array(7).fill(0); // Initialize for 7 days of the week

            data.forEach(program => {
                let programDate;
                
                // Check if _id is a MongoDB ObjectId and extract timestamp
                try {
                    if (program._id && typeof program._id === 'string' && program._id.length === 24) {
                        // Extract timestamp from the first 8 characters of the ObjectId (hexadecimal)
                        const timestamp = parseInt(program._id.substring(0, 8), 16) * 1000;
                        programDate = new Date(timestamp); // Convert the timestamp to a Date object
                    } else {
                        // If _id is not a valid ObjectId, attempt to parse as date string
                        programDate = new Date(program._id);
                    }

                    // Check if the date is valid
                    if (isNaN(programDate)) {
                        console.error('Invalid date for program:', program._id);
                        return; // Skip processing this invalid entry
                    }
                } catch (error) {
                    console.error('Error parsing date for program:', program._id, error);
                    return; // Skip processing this invalid entry
                }

                const dayIndex = programDate.getDay(); // Get the day index (0 for Sun, 6 for Sat)
                views[dayIndex] += program.views;
                likes[dayIndex] += program.likes;
            });

            setViewsData(views);
            setLikesData(likes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    console.log(programs);
    

    useEffect(() => {
        fetchData()
    }, []);
    
  // Chart Data Setup for Views
  const viewsChartDataDays = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: viewsData,
        borderColor: '#ffcc00', // Choose a color for Views chart
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart Data Setup for Likes
  const likesChartDataDays = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: likesData,
        borderColor: '#ff6384', // Choose a color for Likes chart
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart Data Setup for Views
  const viewsChartData = {
    labels: Array.from({ length: 12 }, (_, index) => format(new Date(new Date().getFullYear(), index), 'MMM yyyy')),
    datasets: [
      {
        label: 'Views',
        data: viewsData,
        borderColor: '#ffcc00',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart Data Setup for Likes
  const likesChartData = {
    labels: Array.from({ length: 12 }, (_, index) => format(new Date(new Date().getFullYear(), index), 'MMM yyyy')),
    datasets: [
      {
        label: 'Likes',
        data: likesData,
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

                <Line data={viewsChartDataDays} />
                <Line data={viewsChartData} />
                <Line data={likesChartData} />
                <Line data={likesChartDataDays} />

                </div>

            </div>
        
        </>
    
    )
}
