import Navbar from "../../Navbar";
import Placements from "../../../pages/business/placements";
import { Route, Routes, useNavigate } from "react-router-dom";
import CampainAds from "../../../pages/business/campaignsAds";
import { useStateContext } from "../../../contexts";
import React, { useEffect, useState } from "react";
import axios from "axios";


function BusinessLayout() {
  const {setUserData } = useStateContext();
  const navigate = useNavigate()

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      if (token) {
        const tokenResponse = await axios.post(
          "http://localhost:3000/login/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }  
        );
        if (tokenResponse.data) {
          const userRes = await axios.get("http://localhost:3000/login/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token: token,
            user: userRes.data,
          });
          console.log(userRes)
          if (userRes.data.role !== 'business') {
            navigate('/login')
          }
        } else {
          navigate('/login')
        }
      }else{
        navigate('/login')
      }
    } catch (error) {
      navigate('/login')
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
        <div className='dark:bg-app  bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] py-[75px] pr-6 '>
          <Navbar />
          <main className="flex flex-col gap-4 p-32 ">
            <Routes>
              <Route index element={<Placements />} />
              <Route path="/Placements" element={<Placements />} />
              <Route path="/Placements/:placementId" element={<CampainAds />} />
            </Routes>
          </main>
        </div>
    </>
  );
}

export default BusinessLayout;
