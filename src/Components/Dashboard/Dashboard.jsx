import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import style from "./Dashboard.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [viewsData, setViewsData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [likesData, setLikesData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [savedData, setSavedData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [downloadsData, setDownloadsData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [monthlyData, setMonthlyData] = useState({
    views: [],
    likes: [],
    saved: [],
    downloads: [],
  });
  const [labels, setLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [programNames, setProgramNames] = useState([]);

  const [allPrograms, setAllPrograms] = useState([]);

  const userToken = localStorage.getItem("accessToken");

  // Fetch and process data
  const fetchData = async () => {
    try {
      const response = await fetch("http://147.79.101.225:2859/api/programs/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const monthlyViews = new Array(12).fill(0);
      const monthlyLikes = new Array(12).fill(0);
      const monthlySaved = new Array(12).fill(0);
      const monthlyDownloads = new Array(12).fill(0);

      {
        data &&
          data.forEach((program) => {
            const programDate = new Date(program.updatedAt); // Assuming `program.date` is a valid date string
            const monthIndex = programDate.getMonth(); // Get month (0-11)

            monthlyViews[monthIndex] += program.views || 0;
            monthlyLikes[monthIndex] += program.likes || 0;
            monthlySaved[monthIndex] += program.saved || 0;
            monthlyDownloads[monthIndex] += program.downloads || 0;
          });
      }

      setMonthlyData({
        views: monthlyViews,
        likes: monthlyLikes,
        saved: monthlySaved,
        downloads: monthlyDownloads,
      });

      // The rest of your data processing logic (weekly data, program names, etc.)
      const programMetrics = {};
      {
        data &&
          data.forEach((program) => {
            if (!programMetrics[program.programName]) {
              programMetrics[program.programName] = {
                views: 0,
                likes: 0,
                saved: 0,
                downloads: 0,
              };
            }
            programMetrics[program.programName].views += program.views || 0;
            programMetrics[program.programName].likes += program.likes || 0;
            programMetrics[program.programName].saved += program.saved || 0;
            programMetrics[program.programName].downloads +=
              program.downloads || 0;
          });
      }

      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);
      const likes = names.map((name) => programMetrics[name].likes);
      const saved = names.map((name) => programMetrics[name].saved);
      const downloads = names.map((name) => programMetrics[name].downloads);

      setProgramNames(names.slice(0, 10));
      setViewsData(views.slice(0, 10));
      setLikesData(likes.slice(0, 10));
      setSavedData(saved.slice(0, 10));
      setDownloadsData(downloads.slice(0, 10));
      setAllPrograms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chart Data Setup
  const createChartData = (label, data, color) => ({
    labels: programNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createMonthlyChartData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const pieChartData = {
    labels: ["Views", "Likes", "Saved", "Downloads"],
    datasets: [
      {
        label: "Total Metrics",
        data: [
          viewsData.reduce((a, b) => a + b, 0),
          likesData.reduce((a, b) => a + b, 0),
          savedData.reduce((a, b) => a + b, 0),
          downloadsData.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: ["#ffcc00", "#ff6384", "#36a2eb", "#4bc0c0"],
      },
    ],
  };

  const radarChartData = {
    labels: ["Views", "Likes", "Saved", "Downloads"],
    datasets: [
      {
        label: "Program Metrics",
        data: [
          viewsData.reduce((a, b) => a + b, 0),
          likesData.reduce((a, b) => a + b, 0),
          savedData.reduce((a, b) => a + b, 0),
          downloadsData.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: "#ffcc0066",
        borderColor: "#ffcc00",
        borderWidth: 2,
      },
    ],
  };

  const createCombinedChartData = (labels, datasets) => ({
    labels: labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color,
      backgroundColor: dataset.color + "66",
      fill: true,
      tension: 0.1,
    })),
  });

  const [userStats, setUserStats] = useState([]);
  const [dailyUserCount, setDailyUserCount] = useState([]); // Store daily user counts
  const [monthlyUserCount, setMonthlyUserCount] = useState([]); // Store monthly user counts

  // Helper function to calculate days and months since user creation
  const calculateTimeDifference = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifference = currentDate - createdDate;
    const days = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert to days
    const months = Math.floor(days / 30.44); // Approximate months (average days per month)

    return { days, months };
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://147.79.101.225:2859/api/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      // Calculate time difference for each user
      const stats = data.map((user) => {
        const { diffDays, diffMonths } = calculateTimeDifference(
          user.createdAt
        );
        return {
          name: user.name,
          createdAt: user.createdAt,
          diffDays,
          diffMonths,
        };
      });
      setUserStats(stats);

      // Count users per day and per month
      const dailyCount = {};
      const monthlyCount = {};

      {
        stats &&
          stats.forEach(({ createdAt }) => {
            const createdDate = new Date(createdAt);
            const dayKey = createdDate.toISOString().split("T")[0]; // Get 'YYYY-MM-DD' format
            const monthKey = `${
              createdDate.getMonth() + 1
            }-${createdDate.getFullYear()}`; // Get 'MM-YYYY' format

            // Increment daily count
            dailyCount[dayKey] = (dailyCount[dayKey] || 0) + 1;
            // Increment monthly count
            monthlyCount[monthKey] = (monthlyCount[monthKey] || 0) + 1;
          });
      }

      // Set daily and monthly counts
      setDailyUserCount(dailyCount);
      setMonthlyUserCount(monthlyCount);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Create daily chart data
  const createDailyChartData = (dailyUserCount) => {
    const labels = Object.keys(dailyUserCount);
    const data = Object.values(dailyUserCount);
    return {
      labels: labels,
      datasets: [
        {
          label: "Users Created Per Day",
          data: data,
          borderColor: "#36a2eb",
          backgroundColor: "#36a2eb66",
          fill: true,
          tension: 0.1,
        },
      ],
    };
  };

  // Create monthly chart data
  const createMonthlyChartUserData = (monthlyUserCount) => {
    const labels = Object.keys(monthlyUserCount);
    const data = Object.values(monthlyUserCount);
    return {
      labels: labels,
      datasets: [
        {
          label: "Users Created Per Month",
          data: data,
          borderColor: "#ffcc00",
          backgroundColor: "#ffcc0066",
          fill: true,
          tension: 0.1,
        },
      ],
    };
  };

  const [viewsMonotheismData, setViewsMonotheismData] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [monthlyMonotheismData, setMonthlyMonotheismData] = useState({
    views: [],
  });
  const [monotheismLabels, setMonotheismLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [MonotheismNames, setMonotheismNames] = useState([]);
  const [totalViews, setTotalViews] = useState(0); // Total Views for all programs

  // Fetch and process data
  const fetchMonotheismData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/monotheismBlog/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.monothesimBlog &&
          data.monothesimBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setMonotheismNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsMonotheismData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyMonotheismData({ views: monthlyViews });

      setTotalViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMonotheismData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartMonotheismData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartMonotheismData = (label, data, color) => ({
    labels: MonotheismNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyFaithBookData, setMonthlyFaithBookData] = useState({
    views: [],
  });
  const [totalFaithBookViews, setTotalFaithBookViews] = useState(0); // Total Views for all programs

  const [viewsFaithBookData, setViewsFaithBookData] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [faithBookLabels, setFaithBookLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [faithBookNames, setFaithBookNames] = useState([]);

  // Fetch and process data
  const fetchFaithBookData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/faithBook/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.bookBlog &&
          data.bookBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setFaithBookNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsFaithBookData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyFaithBookData({ views: monthlyViews });

      setTotalFaithBookViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFaithBookData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartFaithBookData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartFaithBookData = (label, data, color) => ({
    labels: faithBookNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyFaithBlogData, setMonthlyFaithBlogData] = useState({
    views: [],
  });
  const [totalFaithBlogViews, setTotalFaithBlogViews] = useState(0); // Total Views for all programs
  const [viewsFaithBlogData, setViewsFaithBlogData] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [faithBlogLabels, setFaithBlogLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [faithBlogNames, setFaithBlogNames] = useState([]);

  // Fetch and process data
  const fetchFaithBlogData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/faithVideo/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.FaithBlog &&
          data.FaithBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setFaithBlogNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsFaithBlogData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyFaithBlogData({ views: monthlyViews });

      setTotalFaithBlogViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFaithBlogData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartFaithBlogData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartFaithBlogData = (label, data, color) => ({
    labels: faithBlogNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyNewsData, setMonthlyNewsData] = useState({ views: [] });
  const [totalNewsViews, setTotalNewsViews] = useState(0); // Total Views for all programs
  const [viewsNewsData, setViewsNewsData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [newsLabels, setNewsLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [newsNames, setNewsNames] = useState([]);

  // Fetch and process data
  const fetchNewsData = async () => {
    try {
      const response = await fetch("http://147.79.101.225:2859/api/news/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.News &&
          data.News.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setNewsNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsNewsData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyNewsData({ views: monthlyViews });

      setTotalNewsViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartNewsData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartNewsData = (label, data, color) => ({
    labels: newsNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyIslamData, setMonthlyIslamData] = useState({ views: [] });
  const [totalIslamViews, setTotalIslamViews] = useState(0); // Total Views for all programs
  const [viewsIslamData, setViewsIslamData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [islamLabels, setIslamLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [islamNames, setIslamNames] = useState([]);

  // Fetch and process data
  const fetchIslamData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/lifeBlogs/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.LifeBlog &&
          data.LifeBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setIslamNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsIslamData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyIslamData({ views: monthlyViews });

      setTotalIslamViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIslamData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartIslamData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartIslamData = (label, data, color) => ({
    labels: islamNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyShahadahData, setMonthlyShahadahData] = useState({ views: [] });
  const [totalShahadahViews, setTotalShahadahViews] = useState(0); // Total Views for all programs
  const [viewsShahadahData, setViewsShahadahData] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [shahadahLabels, setShahadahLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [shahadahNames, setShahadahNames] = useState([]);

  // Fetch and process data
  const fetchShahadahData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/certificateBlog/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.CertificateBlog &&
          data.CertificateBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setShahadahNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsShahadahData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyShahadahData({ views: monthlyViews });

      setTotalShahadahViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchShahadahData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartShahadahData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartShahadahData = (label, data, color) => ({
    labels: shahadahNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyPrayerData, setMonthlyPrayerData] = useState({ views: [] });
  const [totalPrayerViews, setTotalPrayerViews] = useState(0); // Total Views for all programs
  const [viewsPrayerData, setViewsPrayerData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [prayerLabels, setPrayerLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [prayerNames, setPrayerNames] = useState([]);

  // Fetch and process data
  const fetchPrayerData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/prayerBlog/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.PrayerBlog &&
          data.PrayerBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setPrayerNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsPrayerData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyPrayerData({ views: monthlyViews });

      setTotalPrayerViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPrayerData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartPrayerData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartPrayerData = (label, data, color) => ({
    labels: prayerNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlySawmData, setMonthlySawmData] = useState({ views: [] });
  const [totalSawmViews, setTotalSawmViews] = useState(0); // Total Views for all programs
  const [viewsSawmData, setViewsSawmData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [sawmLabels, setSawmLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [sawmNames, setSawmNames] = useState([]);

  // Fetch and process data
  const fetchSawmData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/fastingBlog/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.FaithBlog &&
          data.FastingBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.createdAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setSawmNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsSawmData(views.slice(0, 10)); // Limit to 10 views

      setMonthlySawmData({ views: monthlyViews });

      setTotalSawmViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSawmData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartSawmData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartSawmData = (label, data, color) => ({
    labels: sawmNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyZakatData, setMonthlyZakatData] = useState({ views: [] });
  const [totalZakatViews, setTotalZakatViews] = useState(0); // Total Views for all programs
  const [viewsZakatData, setViewsZakatData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [zakatLabels, setZakatLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [zakatNames, setZakatNames] = useState([]);

  // Fetch and process data
  const fetchZakatData = async () => {
    try {
      const response = await fetch(
        "http://147.79.101.225:2859/api/zakatBlog/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.ZakatBlog &&
          data.ZakatBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.updatedAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setZakatNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsZakatData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyZakatData({ views: monthlyViews });

      setTotalZakatViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchZakatData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartZakatData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartZakatData = (label, data, color) => ({
    labels: zakatNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const [monthlyHaijData, setMonthlyHaijData] = useState({ views: [] });
  const [totalHaijViews, setTotalHaijViews] = useState(0); // Total Views for all programs
  const [viewsHaijData, setViewsHaijData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [haijLabels, setHaijLabels] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [haijNames, setHaijNames] = useState([]);

  // Fetch and process data
  const fetchHaijData = async () => {
    try {
      const response = await fetch("http://147.79.101.225:2859/api/haijBlog/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("HTTP error! status");
      }

      const data = await response.json();

      const programMetrics = {};
      const monthlyViews = new Array(12).fill(0);
      let totalViewsCount = 0;
      {
        data.HaijBlog &&
          data.HaijBlog.forEach((topic) => {
            if (topic.title) {
              // Accumulate views for each topic
              if (!programMetrics[topic.title]) {
                programMetrics[topic.title] = { views: 0 };
              }
              programMetrics[topic.title].views += topic.Views || 0;

              totalViewsCount += topic.Views || 0;

              // Extract month from the updatedAt timestamp
              if (topic.updatedAt) {
                const monthIndex = new Date(topic.updatedAt).getMonth(); // Get the month (0-based index)
                monthlyViews[monthIndex] += topic.Views || 0; // Add views to the correct month
              }
            }
          });
      }

      // Extract names (titles) and views
      const names = Object.keys(programMetrics);
      const views = names.map((name) => programMetrics[name].views);

      // Update the state with the titles and views
      setHaijNames(names.slice(0, 10)); // Limit to 10 titles
      setViewsHaijData(views.slice(0, 10)); // Limit to 10 views

      setMonthlyHaijData({ views: monthlyViews });

      setTotalHaijViews(totalViewsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHaijData();
  }, []);

  // Update this function to reflect correct month labels
  const createMonthlyChartHaijData = (label, data, color) => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // These are the fixed month labels
    datasets: [
      {
        label,
        data: data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  const createChartHaijData = (label, data, color) => ({
    labels: haijNames,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color + "66",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  return (
    <div className={style.box}>
      <div className={style.HeadingTitle}>
        <h4 className='my-4'>Dashboard</h4>
      </div>

      <div className="container">
        {/* Line Charts */}
        <h5>Programs Statistics designed in Line</h5>

        <div className="row gy-2">
          <div className="col-lg-6">
            <div className={style.shadow}>

            <Line data={createChartData("Views", viewsData, "#ffcc00")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Line data={createChartData("Likes", likesData, "#ff6384")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Line data={createChartData("Saved", savedData, "#36a2eb")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Line
              data={createChartData("Downloads", downloadsData, "#4bc0c0")}
            />

            </div>
          </div>
        </div>
        <h5>Programs Statistics designed in Bar Charts</h5>
        <div className="row align-items-center justify-content-between gy-2">
          <div className="col-lg-6">
            <div className={style.shadow}>

            <Bar
              data={createCombinedChartData(programNames, [
                { label: "Views", data: viewsData, color: "#ffcc00" },
                { label: "Likes", data: likesData, color: "#ff6384" },
                { label: "Saved", data: savedData, color: "#36a2eb" },
                { label: "Downloads", data: downloadsData, color: "#4bc0c0" },
              ])}
            />

            </div>
          </div>

          <div className="col-lg-6">
              <div className={style.shadow}>

              <Line
              data={createCombinedChartData(programNames, [
                { label: "Views", data: viewsData, color: "#ffcc00" },
                { label: "Likes", data: likesData, color: "#ff6384" },
                { label: "Saved", data: savedData, color: "#36a2eb" },
                { label: "Downloads", data: downloadsData, color: "#4bc0c0" },
              ])}
            />

              </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Bar
              data={createCombinedChartData(
                [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                [
                  {
                    label: "Monthly Views",
                    data: monthlyData.views,
                    color: "#ffcc00",
                  },
                  {
                    label: "Monthly Likes",
                    data: monthlyData.likes,
                    color: "#ff6384",
                  },
                  {
                    label: "Monthly Saved",
                    data: monthlyData.saved,
                    color: "#36a2eb",
                  },
                  {
                    label: "Monthly Downloads",
                    data: monthlyData.downloads,
                    color: "#4bc0c0",
                  },
                ]
              )}
            />

            </div>
          </div>

          <div className="col-lg-4">
            <div className={style.shadow}>

            <h5>Programs Statistics designed in Pie Chart</h5>

<Pie data={pieChartData} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>
            <Bar data={createChartData("Views", viewsData, "#ffcc00")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Bar data={createChartData("Likes", likesData, "#ff6384")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Bar data={createChartData("Saved", savedData, "#36a2eb")} />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>
            <Bar
              data={createChartData("Downloads", downloadsData, "#4bc0c0")}
            />

            </div>
          </div>
          <div className="col-lg-6">
          <div className={style.shadow}>

          <h5>Monthly Programs Statistics</h5>

<Bar
  data={createMonthlyChartData(
    "Monthly Views",
    monthlyData.views,
    "#ffcc00"
  )}
/>

          </div>
          </div>

          <div className="col-lg-6">
          <div className={style.shadow}>

          <Bar
              data={createMonthlyChartData(
                "Monthly Likes",
                monthlyData.likes,
                "#ff6384"
              )}
            />

          </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <Bar
              data={createMonthlyChartData(
                "Monthly Saved",
                monthlyData.saved,
                "#36a2eb"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">

              <div className={style.shadow}>

              <Bar
              data={createMonthlyChartData(
                "Monthly Downloads",
                monthlyData.downloads,
                "#4bc0c0"
              )}
            />

              </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-2 justify-content-center align-items-center">
          
          <div className="col-lg-4">
          <div className={style.shadow}>

          <h5 className="my-3">Monthly Overview (Doughnut)</h5>
          <Doughnut data={pieChartData} />

          </div>
          </div>
        </div>

<div className={style.shadow}>

<h5>Line Charts</h5>

<Line data={createDailyChartData(dailyUserCount)} />

</div>

        <div className={style.shadow}>

        <Line data={createMonthlyChartUserData(monthlyUserCount)} />

        </div>

<div className={style.shadow}>


<h5>Other Metrics</h5>
        <Bar data={createMonthlyChartUserData(monthlyUserCount)} />

</div>
      </div>

      <div className="container">
        <div className="row gy-2">
          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Monotheism: {totalViews}</h4>
            {monthlyMonotheismData.views.length > 0 && (
              <Bar
                data={createMonthlyChartMonotheismData(
                  "Monthly Views",
                  monthlyMonotheismData.views,
                  "#ffcc00"
                )}
              />
            )}

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View monotheism topic views</h4>
            <Bar
              data={createChartMonotheismData(
                "Views",
                viewsMonotheismData,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
              <div className={style.shadow}>

              <h4 className='my-4'>Total Views of Faith books: {totalFaithBookViews}</h4>
            <Bar
              data={createMonthlyChartFaithBookData(
                "Monthly Views",
                monthlyFaithBookData.views,
                "#ffcc00"
              )}
            />

              </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View faith topic views book</h4>
            <Bar
              data={createChartFaithBookData(
                "Views",
                viewsFaithBookData,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Faith blogs: {totalFaithBlogViews}</h4>
            <Bar
              data={createMonthlyChartFaithBlogData(
                "Monthly Views",
                monthlyFaithBlogData.views,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View FaithBlog topic views</h4>
            <Bar
              data={createChartFaithBlogData(
                "Views",
                viewsFaithBlogData,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of News: {totalNewsViews}</h4>
            <Bar
              data={createMonthlyChartNewsData(
                "Monthly Views",
                monthlyNewsData.views,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View News topic views</h4>
            <Bar
              data={createChartNewsData("Views", viewsNewsData, "#ffcc00")}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Islam: {totalIslamViews}</h4>
            <Bar
              data={createMonthlyChartIslamData(
                "Monthly Views",
                monthlyIslamData.views,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View Islam topic views</h4>
            <Bar
              data={createChartIslamData("Views", viewsIslamData, "#ffcc00")}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Shahadah: {totalShahadahViews}</h4>
            <Bar
              data={createMonthlyChartShahadahData(
                "Monthly Views",
                monthlyShahadahData.views,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View Shahadah topic views</h4>
            <Bar
              data={createChartShahadahData(
                "Views",
                viewsShahadahData,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Prayer: {totalPrayerViews}</h4>
            <Bar
              data={createMonthlyChartPrayerData(
                "Monthly Views",
                monthlyPrayerData.views,
                "#ffcc00"
              )}
            />

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View Prayer topic views</h4>

<Bar
  data={createChartPrayerData("Views", viewsPrayerData, "#ffcc00")}
/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Sawm: {totalSawmViews}</h4>

<Bar
  data={createMonthlyChartSawmData(
    "Monthly Views",
    monthlySawmData.views,
    "#ffcc00"
  )}
/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View Sawm topic views</h4>

<Bar
  data={createChartSawmData("Views", viewsSawmData, "#ffcc00")}
/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>Total Views of Zakat: {totalZakatViews}</h4>

<Bar
  data={createMonthlyChartZakatData(
    "Monthly Views",
    monthlyZakatData.views,
    "#ffcc00"
  )}
/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className={style.shadow}>

            <h4 className='my-4'>View Zakat topic views</h4>

<Bar
  data={createChartZakatData("Views", viewsZakatData, "#ffcc00")}
/>

            </div>
          </div>

          <div className="col-lg-6">

              <div className={style.shadow}>

              <h4 className='my-4'>Total Views of Haij: {totalHaijViews}</h4>

<Bar
  data={createMonthlyChartHaijData(
    "Monthly Views",
    monthlyHaijData.views,
    "#ffcc00"
  )}
/>

              </div>

          </div>

          <div className="col-lg-6">

              <div className={style.shadow}>

              <h4 className='my-4'>View Haij topic views</h4>

<Bar
  data={createChartHaijData("Views", viewsHaijData, "#ffcc00")}
/>

              </div>

          </div>
        </div>
      </div>
    </div>
  );
}
