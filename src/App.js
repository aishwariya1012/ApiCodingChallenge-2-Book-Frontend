import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Books from "./Books";
import "./App.css";
const App=()=>
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
