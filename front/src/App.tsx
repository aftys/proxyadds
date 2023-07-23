
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useStateContext } from "./contexts"
// import TableGrid from "./components/Table"
import { Button, ConfigProvider, theme } from "antd"
import {useState} from "react"
import AntModal from "./components/Modals/Ant"
import MyComponent from "./pages/Business"
import Layout from "./components/Layout/layout"
import { Routes, Route } from "react-router-dom"
import Businesses from "./pages/Business"
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


function App() {

  const { darkMode } = useStateContext()

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isModalOpen,setIsModalOpen] = useState(false);
  return (
    <ConfigProvider
      theme={{token: { colorPrimary: '#22d3ee'},
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
      <div className={`h-screen w-screen ${darkMode && "dark"}`}>
        <div className='dark:bg-app bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pt-[75px] '>
          <Layout>
            <>
            {/* <Button>Ajouter</Button> */}
            {/* <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}><Step/></AntModal> */}
            {/* <TableGrid  /> */}
            {/* < MyComponent /> */}
            <Routes>
              <Route path="/" element={<Businesses />}/>
              <Route path="/Businesses" element={<Businesses />}/>
              <Route path="/Placements" element={<Placements />} />
              <Route path="/Schedules" element={<Schedules />} /> 
              <Route path="/Advertisers" element={<Advertisers/>} />
              <Route path="/Locations" element={<Locations/>} />
              <Route path="/Campaigns" element={<Campaigns/>}/>
              <Route path="/BusinessTypes" element={<BusinessTypes/>} />
              <Route path="/BusinessActivities" element={<BusinessActivities/>} />
              <Route path="/Parameters" element={<Parameters/>} />
              <Route path="/Tracking" element={<Tracking/>} />
              <Route path="/Logout" element={<Logout/>} />
              <Route path="/LogIn" element={  <Login />}/>
              <Route path="*" element={<Businesses />} />

            </Routes>
            </>
           </Layout>
        </div>

      </div>
    </ConfigProvider>
  )
}


export default App
