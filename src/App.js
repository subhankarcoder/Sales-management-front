import logo from "./logo.svg";
import "./App.css";
import SignUp from "./pages/SignLogPage/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddStatus from "./pages/AddStatus/AddStatus";
import Login from "./pages/SignLogPage/Login";
import Records from "./pages/Records/Records";
import UpdateStatus from "./components/UpdateStatus/UpdateStatus";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/add" element={ <AddStatus />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/record" element={ <Records />} />
          <Route path="/update" element={ <UpdateStatus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
