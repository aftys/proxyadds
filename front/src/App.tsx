import { useStateContext } from "./contexts"
import {  ConfigProvider, theme } from "antd"
import Layout from "./components/Layout"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Placements from "./pages/admin/Placements"
import Schedules from "./pages/admin/Schedules"
import Advertisers from "./pages/admin/Advertisers"
import Locations from "./pages/admin/Locations"
import Campaigns from "./pages/admin/Campaigns"
import BusinessTypes from "./pages/admin/BusinessTypes"
import BusinessActivities from "./pages/admin/BusinessActivities"
import Parameters from "./pages/admin/Parameters"
import Tracking from "./pages/admin/Tracking"
import Login from "./pages/Login";
import Business from "./pages/admin/business"
import BusinessPlacement from './pages/business/placements'
import { GridLoader } from "react-spinners"
import { useEffect } from "react"
import axios from "axios"


function App() {

  
  useEffect(() => {
    const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if(token === null){
    localStorage.setItem("auth-token", "");
    token = "";
    }
    const tokenResponse = await axios.post('http://localhost:3000/login/tokenIsValid', null, {headers: {"x-auth-token": token}});
    if (tokenResponse.data) {
    const userRes = await axios.get("http://localhost:3000/login/", {
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
        token: { colorPrimary: "#22d3ee" },
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className={`h-screen w-screen ${darkMode && "dark"}`}>
        <Routes>
          <Route  path="/login"  element={<Login />} /> 
          <Route
            path="/*"
            element={
              <div className='dark:bg-app h-screen bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pt-[75px] pr-6 '>
                <Layout>
                  <Routes> {/* Nested Routes for the rest of the pages */}
                    <Route index element={<Business />} />
                    <Route path="/" element={<Business />} />
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
                  </Routes>
                </Layout>
              </div>
            }
          />
          <Route path="/">
              
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  )
}

export default App
