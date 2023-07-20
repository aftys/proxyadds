import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useStateContext } from "./contexts"
import TableGrid from './components/Table'

function App() {

  const { darkMode } = useStateContext()
  return (
    <div className={`h-screen w-screen ${darkMode && "dark"}`}>
      <div className='dark:bg-app bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[85px] pr-[15px] pt-[75px] '>
        <Sidebar />
        <Navbar />
        {/* <div className="bg-black w-full h-72 rounded-xl" /> */}
        <TableGrid />
      </div>
    </div>
  )
}

export default App
