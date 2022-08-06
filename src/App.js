import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParkingForm from "./pages/ParkingForm";
import ParkingLot from "./pages/ParkingLot";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ParkingForm />} />
        <Route path="/parking_lot" element={<ParkingLot />} />
      </Routes>
    </Router>
  );
}

export default App;
