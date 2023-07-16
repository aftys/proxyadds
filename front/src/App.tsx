import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useStateContext } from "./contexts"

function App() {

    const { darkMode } = useStateContext()
  return (
    <div className={`h-screen w-screen ${darkMode && "dark"}`}>
      <div className='dark:bg-app bg-gray-50 w-screen min-h-screen relative flex flex-col items-center'>
      <Sidebar/>
      <Navbar/>
      </div>
      </div>
  )
}

export default App
