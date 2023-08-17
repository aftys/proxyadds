import { ReactElement, useEffect } from "react"
import { Route, useNavigate } from "react-router-dom";
import { useStateContext } from "./contexts";

interface PrivateRouteProps{
  Component:ReactElement,
  path:string
}
const PrivateRoute=({Component,path}:PrivateRouteProps)=>{
  const {userData}=useStateContext();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userData) navigate('/login')

  },[])
  return(
    <Route path={path} element={Component}/>

  )
}

export default PrivateRoute;