import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import CreatePost from "./components/createPost";

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/post" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>  
      </div>
  );
}

export default App
