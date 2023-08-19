import { useStateContext } from "./contexts"
import { ConfigProvider, theme } from "antd"
import AdminLayout from "./components/Layout/AdminLayout"
import { Routes, Route } from "react-router-dom"
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
import Business from "./pages/admin/Business"
import { useEffect } from "react"
import axios from "axios"
import BusinessLayout from "./components/Layout/BusinessLayout"


function App() {


  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        let token: string | null = localStorage.getItem("auth-user");
        if (token) {
          const tokenResponse = await axios.post('http://localhost:3000/login/tokenIsValid', null, { headers: { "x-auth-token": token } });
          if (tokenResponse.data) {
            const userRes = await axios.get("http://localhost:3000/login/", {
              headers: { "x-auth-token": token },
            });
            setUserData({
              token: token,
              user: userRes.data,
            });
          }
        }
      } catch (error) { console.log(error) }
      checkLoggedIn();
    }
  }, []);


  const { darkMode, setUserData } = useStateContext()
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
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminLayout />}/>
          <Route path="/business/*" element={<BusinessLayout />}/>
          <Route path="/">

          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  )
}

export default App
