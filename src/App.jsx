import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from './component/home/Home';
import Movie from './component/movie/Movie';
import Tv from './component/tv/Tv';
import Layout from './component/layout/Layout';
import Name from './component/Name/Name';
import People from './component/people/People';
import Login from './component/login/Login';
import Register from './component/register/Register';
import { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode"
export default function App() {

  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("userToken") !== null) {
      saveUserToken();
    }
  },[])

  function saveUserToken() {
    let encodeData = localStorage.getItem("userToken");
    let decodeData = jwtDecode(encodeData);
    console.log(decodeData);
    setTokenData(decodeData);
  }

  let routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout tokenData= {tokenData}/>,
      children: [
        {path: "Home", element: <Home/> ,index: true},
        {path: "Movie" ,element: <Movie/>},
        {path: "Tv" ,element: <Tv/>},
        {path: "Name" ,element: <Name/>},
        {path: "People" ,element: <People/>},
        {path: "Login" ,element: <Login saveUserToken= {saveUserToken}/>},
        {path: "Register" ,element: <Register/>}
      ]
    }
  ])

  return (
    <>
      < RouterProvider router= {routing}/>
    </>
  );
}

