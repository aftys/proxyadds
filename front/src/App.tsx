import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useStateContext } from "./contexts"
// import TableGrid from "./components/Table"
import { Button, ConfigProvider, theme } from "antd"
import {useState} from "react"
import AntModal from "./components/Modals/Ant"
import MyComponent from "./pages/business"
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
          <Sidebar />
          <Navbar />
          <div className=" max-w-screen-md w-full flex flex-col gap-4 ">
            {/* <Button>Ajouter</Button> */}
            <AntModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            {/* <TableGrid  /> */}
            < MyComponent />

          </div>
        </div>

      </div>
    </ConfigProvider>
  )
}

export default App
