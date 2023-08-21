import React, { ReactElement, ReactNode } from "react";
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
import Tracking from "../../../pages/admin/Tracking";
import Campaigns from "../../../pages/admin/Campaigns";
import { useStateContext } from "../../../contexts";

function AdminLayout() {
  const { userData } = useStateContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!userData.user || userData.user.role !== 'admin') navigate('/login');
  }, [userData.token]);

  return (
    <>
      {
        (userData.user && userData.user.role === 'admin') &&
        <div className='dark:bg-app h-screen bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pt-[75px] pr-6 '>
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
              <Route path="/Tracking" element={<Tracking />} />
            </Routes>
          </main>
        </div>
      }
    </>

  );
}

export default AdminLayout;
