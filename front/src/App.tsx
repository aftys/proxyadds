import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useStateContext } from "./contexts"

function App() {

  const { darkMode } = useStateContext()
  return (
    <div className={`h-screen w-screen ${darkMode && "dark"}`}>
      <div className='dark:bg-app bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pr-[15px] pt-[75px] '>
        <Sidebar />
        <Navbar />
        <div className="bg-gray-300/10 w-full h-72 rounded-xl" />
      </div>
    </div>
  )
}

export default App
