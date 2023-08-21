import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import AdminLayout from "./components/Layout/AdminLayout";
import BusinessLayout from "./components/Layout/BusinessLayout";
import Login from "./pages/Login";
import { useStateContext } from "./contexts";

function App() {
  const { darkMode, userData, setUserData } = useStateContext();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem("auth-user")
      if (token) {
        console.log(token)
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/business/*" element={<BusinessLayout />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
