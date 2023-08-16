import { useStateContext } from "./contexts"
import {  ConfigProvider, theme } from "antd"
import Layout from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import Placements from "./pages/Placements"
import Schedules from "./pages/Schedules"
import Advertisers from "./pages/Advertisers"
import Locations from "./pages/Locations"
import Campaigns from "./pages/Campaigns"
import BusinessTypes from "./pages/BusinessTypes"
import BusinessActivities from "./pages/BusinessActivities"
import Parameters from "./pages/Parameters"
import Tracking from "./pages/Tracking"
import Logout from "./pages/Logout"
import Login from "./pages/Login"
import Business from "./pages/Business"

import { GridLoader } from "react-spinners"
import { useEffect, useState } from "react"
import axios from "axios"



function App() {

  
  useEffect(() => {
    const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if(token === null){
    localStorage.setItem("auth-token", "");
    token = "";
    }
    const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
    if (tokenResponse.data) {
    const userRes = await axios.get("http://localhost:5000/users/", {
    headers: { "x-auth-token": token },
    });
    setUserData({
    token,
    user: userRes.data,
    });
    }
    }
    checkLoggedIn();
    }, []);


  const { darkMode, userData, setUserData } = useStateContext()
  const { defaultAlgorithm, darkAlgorithm } = theme;
  return (

    <ConfigProvider
      theme={{
        token: { colorPrimary: '#22d3ee' },
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      <div className={`h-screen w-screen ${darkMode && "dark"}`}>
        <div className='dark:bg-app h-screen bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pt-[75px] pr-6 '>
          <Layout>
            <> 
             <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Businesses" element={<Business />} />
                <Route path="/Placements" element={<Placements />} />
                <Route path="/Businesses/:id/Schedules" element={<Schedules />} />
                <Route path="/Advertisers" element={<Advertisers />} />
                <Route path="/Locations" element={<Locations />} />
                <Route path="/Campaigns" element={<Campaigns />} />
                <Route path="/BusinessTypes" element={<BusinessTypes />} />
                <Route path="/BusinessActivities" element={<BusinessActivities />} />
                <Route path="/Parameters" element={<Parameters />} />
                <Route path="/Tracking" element={<Tracking />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/LogIn" element={<Login />} />
                <Route path="*" element={<Business />} />
              </Routes>
            </>
          </Layout>  
          
        </div>

      </div>
    </ConfigProvider>

  )
}


export default App
