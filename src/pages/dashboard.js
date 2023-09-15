"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { ChartPie } from '@heroicons/react/solid';
import { Bar, Doughnut } from "react-chartjs-2";

import "./dashboard.css";
import ProfileButton from "./profileButton";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Hooks
  const [doughnutData, setDoughnutData] = useState({ datasets: [] });
  const [barData, setBarData] = useState({ datasets: [] });
  const [userProfile, setUserProfile] = useState({});

  const mangaDexUrl = "https://api.mangadex.org";

  const anthemOfTheHeartDetail = {
    name: "The Anthem of the Heart",
    id: "23ce7ffb-9b10-44f8-b1b4-64ad1ce663c1",
  };
  const dororoDetail = {
    name: "Dororo",
    id: "51faffdd-bdc5-41fb-a230-d377f0bd2f33",
  };
  const jujutsuKaisenDetail = {
    name: "Jujutsu Kaisen",
    id: "c52b2ce3-7f95-469c-96b0-479524fb7a1a",
  };
  const mobPsychoDetail = {
    name: "Mob Psycho 100",
    id: "736a2bf0-f875-4b52-a7b4-e8c40505b68a",
  };
  const noragamiDetail = {
    name: "Noragami",
    id: "e5ce88e2-8c46-482d-8acf-5c6d5a64a585",
  };

  const mangaDetails = [
    anthemOfTheHeartDetail,
    dororoDetail,
    jujutsuKaisenDetail,
    mobPsychoDetail,
    noragamiDetail,
  ];

  const doughnutOptions = {
    borderRadius: 15,
    cutout: 95,
    borderJoinStyle: "round",
    borderAlign: "center",
    spacing: -20,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    borderRadius: 4,
    maxBarThickness: 30,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "black",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        categoryPercentage: 0.6,  // Adjust the category percentage (default is 0.8)
        barPercentage: 10,      // Adjust the bar percentage (default is 0.9)
      },
      y: {
        grid: {
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
    },
    legend: {
      display: true,
      labels: { usePointStyle: true },
    },
  };


  const setupBarChart = async () => {
    const mangaRatings = {};

    for (const mangaDetail of mangaDetails) {
      const response = await fetch(
        `${mangaDexUrl}/statistics/manga/${mangaDetail["id"]}`,
        {
          method: "GET",
        }
      );

      const mangaData = await response.json();
      let statistics = mangaData["statistics"];
      let ratings = statistics[mangaDetail["id"]]["rating"];

      mangaRatings[mangaDetail["name"]] = {
        average: ratings["average"],
        bayesian: ratings["bayesian"],
      };
    }

    const labels = mangaDetails.map((mangaDetail) => mangaDetail.name);

    setBarData({
      labels,
      datasets: [
        {
          label: "Average",
          data: labels.map((mangaName) => mangaRatings[mangaName]["average"]),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Bayesian",
          data: labels.map((mangaName) => mangaRatings[mangaName]["bayesian"]),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  };

  const setupDoughnutChart = async () => {
    const response = await fetch(
      `${mangaDexUrl}/manga/${noragamiDetail["id"]}/feed`,
      {
        method: "GET",
      }
    );

    const mangaData = await response.json();
    let chapters = mangaData["data"];
    const maxChapters = 5;

    chapters.sort(
      (a, b) => b["attributes"]["pages"] - a["attributes"]["pages"]
    );

    let i = 0;
    const chapterTitles = [];
    const chapterPages = [];

    while (chapterTitles.length < maxChapters) {
      const attributes = chapters[i]["attributes"];

      // Exclude chapters with poor titles
      if (
        attributes["title"] &&
        attributes["title"] !== "" &&
        attributes["title"] !== "4- Koma"
      ) {
        chapterTitles.push(attributes["title"]);
        chapterPages.push(attributes["pages"]);
      }

      i++;
    }

    setDoughnutData({
      labels: chapterTitles,
      datasets: [
        {
          label: "# of Pages",
          data: chapterPages,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const newOrExistingProfile = () => {
    if (Object.keys(userProfile).length !== 0) {
      const userDetails = userProfile["data"];

      return (
        <div className="px-4 flex flex-col flex-start">
          <h3 className="font-figtree text-2xl">{userDetails.name}</h3>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <p>{userDetails.phoneNumber}</p>
            </div>
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <p>{userDetails.instagram}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p>{userDetails.email}</p>
            </div>
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="outline"
                viewBox="0 0 24 24">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              <p>{userDetails.youtube}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-y-3">
            <ProfileButton callback={handleCallback} />
            <h3 className="font-figtree font-semibold text-secondary">
              Add Profile
            </h3>
          </div>
        </div>
      );
    }
  };

  const handleCallback = (data) => {
    setUserProfile({ data });
  };

  useEffect(() => {
    // TODO: Uncomment these calls
    setupBarChart();
    setupDoughnutChart();
  }, []);

  return (
    <div className="mr-20 ml-6">
      <style> @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Figtree:wght@600&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap");
      </style>
      <div className="flex flex-row min-h-full min-w-full bg-dashboard-bg">
        <div className="navi border rounded-2xl border-transparent min-h-[80%] ml-8 my-8 mr-10 p-10 pt-12 pr-12 flex flex-col justify-between items-start">
          <div className="flex flex-col flex-start gap-y-10">
            <h1 className="font-montserrat font-bold text-4xl text-white">
              Board.
            </h1>
            <div className="flex flex-row gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>

              <h3 className="font-montserrat font-bold text-white">Dashboard</h3>
            </div>
            <div className="flex flex-row gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>

              <h3 className="font-montserrat text-white">Transactions</h3>
            </div>
            <div className="flex flex-row gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>

              <h3 className="font-montserrat text-white">Schedules</h3>
            </div>
            <div className="flex flex-row gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-montserrat text0white text-white">Users</h3>
            </div>
            <div className="flex flex-row gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <h3 className="font-montserrat text-white">Settings</h3>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-3">
            <h3 className="font-montserrat text-white">Help</h3>
            <h3 className="font-montserrat text-white">Contact Us</h3>
          </div>
        </div>
        <div className="flex flex-col ml-12 min-w-[75%]">
          <header className="mt-12">
            <div className="flex flex-row justify-between">
              <h2 className="font-montserrat font-bold text-2xl">Dashboard</h2>
              <div className="flex justify-end items-center gap-x-2">
                <div className="border rounded-lg border-transparent bg-white h-12 flex flex-row items-center">
                  <input
                    className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Search..."
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#858585] w-[30px] h-[30px] pr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>

                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>

                <p>USER_PFP</p>
              </div>
            </div>
          </header>
          <div className="flex flex-row justify-between mt-6">
            <div className="total-box border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-[#7FCD93] rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <p className="font-lato text-sm">Total Revenues</p>
              <div className="flex flex-row justify-between gap-x-12">
                <h3 className="font-opensans font-bold text-3xl">$2,129,430</h3>
                <div className="border rounded-2xl border-transparent bg-growth-bubble flex items-center px-2 py-1">
                  <p className="font-figtree font-xs font-semibold text-growth-detail">
                    +2.5%
                  </p>
                </div>
              </div>
            </div>
            <div className="total-box border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-[#DEBF85] rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>

              <p className="font-lato text-sm">Total Transactions</p>
              <div className="flex flex-row justify-between gap-x-12">
                <h3 className="font-opensans font-bold text-3xl">1,520</h3>
                <div className="border rounded-2xl border-transparent bg-growth-bubble flex items-center px-2 py-1">
                  <p className="font-figtree font-xs font-semibold text-growth-detail">
                    +1.7%
                  </p>
                </div>
              </div>
            </div>
            <div className="total-box border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-[#ECA4A4] rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>

              <p className="font-lato text-sm">Total Likes</p>
              <div className="flex flex-row justify-between  gap-x-12">
                <h3 className="font-opensans font-bold text-3xl">9,721</h3>
                <div className="border rounded-2xl border-transparent bg-growth-bubble flex items-center px-2 py-1">
                  <p className="font-figtree font-xs font-semibold text-growth-detail">
                    +1.4%
                  </p>
                </div>
              </div>
            </div>
            <div className="total-box border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-[#A9B0E5] rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>

              <p className="font-lato text-sm">Total Users</p>
              <div className="flex flex-row justify-between  gap-x-12">
                <h3 className="font-opensans font-bold text-3xl">9,721</h3>
                <div className="border rounded-2xl border-transparent bg-growth-bubble flex items-center px-2 py-1">
                  <p className="font-figtree font-xs font-semibold text-growth-detail">
                    +4.2%
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start mt-10 px-5 py-4 h-[30%]">
            <Bar options={barOptions} data={barData} />
          </div>
          <div className="flex flex-row justify-between min-w-fit mt-10 mb-12">
            <div className="misc-row border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              <div className="flex flex-col flex-start max-h-[88%]">
                <h3 className="font-montserrat font-bold text-xl">
                  Largest Noragami Chapters
                </h3>
                <Doughnut options={doughnutOptions} data={doughnutData} />
              </div>
            </div>
            <div className="misc-row border rounded-xl bg-white border-2 shadow-md flex flex-col flex-start px-5 py-4">
              {newOrExistingProfile()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
