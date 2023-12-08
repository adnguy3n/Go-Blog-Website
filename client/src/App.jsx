import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import CreatePost from "./components/createPost";
import YourBlog from "./components/yourBlog";
import Navbar from "./components/navbar";

function App() {

  return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/yourblog" element={<YourBlog />} />
          </Routes>
        </BrowserRouter>  
      </div>
  );
}

export default App
