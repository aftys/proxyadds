import Navbar from "../../Navbar";
import Placements from "../../../pages/business/placements";
import { Route, Routes, useNavigate } from "react-router-dom";
import CampainAds from "../../../pages/business/campaignsAds";
import { useStateContext } from "../../../contexts";
import React from "react";


function BusinessLayout() {
  const { userData } = useStateContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!userData.user || userData.user.role !== 'business') navigate('/login');
  }, [navigate, userData.user]);
  return (
    <>
      {
        (userData.user && userData.user.role === 'business') &&
        <div className='dark:bg-app h-screen bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pt-[75px] pr-6 '>
          <Navbar />
          <main className="flex flex-col gap-4 ">
            <Routes>
              <Route index element={<Placements />} />
              <Route path="/Placements" element={<Placements />} />
              <Route path="/Placements/:placementId" element={<CampainAds />} />
            </Routes>
          </main>
        </div>}
    </>
  );
}

export default BusinessLayout;
