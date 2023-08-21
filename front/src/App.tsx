import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import AdminLayout from "./components/Layout/AdminLayout";
import BusinessLayout from "./components/Layout/BusinessLayout";
import Login from "./pages/Login";
import { useStateContext } from "./contexts";

function App() {
  const { darkMode } = useStateContext();
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
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/business/*" element={<BusinessLayout />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
