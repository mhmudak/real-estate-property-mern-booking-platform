import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PurchaseProperties from "./Pages/PurchaseProperties/PurchaseProperties";
import About from "./Pages/About/About";
import Contact from "./Pages/ContactUs/ContactUs";
import ApartmentDetails from "./Pages/ApartmentDetails/ApartmentDetails";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<PurchaseProperties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apartments/:id" element={<ApartmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
