import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import CreatePost from "./components/createPost";
import YourBlog from "./components/yourBlog";
import GetPost from "./components/getPost";
import EditPost from "./components/editPost";

function App() {
const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    checkLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calls backend to see if there is a valid cookie.
  function checkLogin() {
    axios
      .get("api/checklogin")
      
      .then(function(response) {
        if (response?.data?.isValid) {
          localStorage.setItem("loggedIn", response?.data?.isValid);
          setLoginStatus(true);
        } else {
          logout();
        }
      })

      .catch(function(error) {
        console.log(error);
        logout();
      })
  }

  function logout() {
    axios.get("api/logout");
    localStorage.removeItem("loggedIn");
    setLoginStatus(false);
  }

  return (
      <div>
        <BrowserRouter>
          <Navbar loginStatus={loginStatus} checkLogin={checkLogin}/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/login" element={<Login checkLogin={checkLogin}/>} />
            <Route exact path="/createpost" element={<CreatePost logout={logout}/>} />
            <Route exact path="/yourblog" element={<YourBlog logout={logout} />} />
            <Route exact path="/getpost/:post_id" element={<GetPost />} />
            <Route exact path="/edit/:post_id" element={<EditPost logout={logout} />} />
          </Routes>
        </BrowserRouter>  
      </div>
  );
}

export default App
