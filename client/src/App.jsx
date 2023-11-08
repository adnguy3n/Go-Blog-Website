import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>  
      </div>
  );
}

export default App
