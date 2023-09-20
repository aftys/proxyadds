import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Business from "../../../pages/admin/Business";
import Placements from "../../../pages/admin/Placements";
import Schedules from "../../../pages/admin/Schedules";
import Advertisers from "../../../pages/admin/Advertisers";
import Locations from "../../../pages/admin/Locations";
import BusinessTypes from "../../../pages/admin/BusinessTypes";
import BusinessActivities from "../../../pages/admin/BusinessActivities";
import Parameters from "../../../pages/admin/Parameters";
import ListTrackings from "../../../pages/admin/ListTracking";
import Campaigns from "../../../pages/admin/Campaigns";
import { useStateContext } from "../../../contexts";
import axios from "axios";
import CampaignTrackings from "../../../pages/admin/CampaignTrackings";

function AdminLayout() {
  const { userData, setUserData } = useStateContext();

  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem("auth-token");
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
          console.log("test")
          if (userRes.data.role !== "admin") {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);


  return (
    <>
        <div className='dark:bg-app   bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] py-[75px] pr-6 '>
          <Sidebar />
          <Navbar />
          <main className="flex flex-col gap-4 ">
            <Routes>
              <Route index element={<Business />} />
              <Route path="/Businesses" element={<Business />} />
              <Route path="/Placements" element={<Placements />} />
              <Route path="/Businesses/:id/Schedules" element={<Schedules />} />
              <Route path="/Advertisers" element={<Advertisers />} />
              <Route path="/Locations" element={<Locations />} />
              <Route path="/Campaigns" element={<Campaigns />} />
              <Route path="/BusinessTypes" element={<BusinessTypes />} />
              <Route path="/BusinessActivities" element={<BusinessActivities />} />
              <Route path="/Parameters" element={<Parameters />} />
              <Route path="/tracking" element={<ListTrackings />} />
              <Route path="/tracking/:id" element={<CampaignTrackings />} />
            </Routes>
          </main>
        </div>
    </>
  );
}

export default AdminLayout;
