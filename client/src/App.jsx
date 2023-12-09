import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import CreatePost from "./components/createPost";
import YourBlog from "./components/yourBlog";
import Navbar from "./components/navbar";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  // Calls backend to see if there is a valid cookie.
  function checkLogin() {
    axios
      .get("api/checklogin", { withCredentials: true })
      
      .then(function(response) {
        setLoginStatus(response?.data?.isValid);
        console.log(response?.data?.isValid);
      })

      .catch(function(error) {
        console.log(error);
        setLoginStatus(false);
      })
  }

  return (
      <div>
        <BrowserRouter>
          <Navbar loginStatus={loginStatus} checkLogin={checkLogin}/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/login" element={<Login loginStatus={loginStatus} checkLogin={checkLogin}/>} />
            <Route exact path="/createpost" element={<CreatePost loginStatus={loginStatus}/>} />
            <Route exact path="/yourblog" element={<YourBlog loginStatus={loginStatus}/>} />
          </Routes>
        </BrowserRouter>  
      </div>
  );
}

export default App
