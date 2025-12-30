import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PurchaseProperties from "./Pages/PurchaseProperties/PurchaseProperties";
import About from "./Pages/About/About";
import Contact from "./Pages/ContactUs/ContactUs";
import ApartmentDetails from "./Pages/ApartmentDetails/ApartmentDetails";
import MyFavorites from "./Pages/MyFavorites/MyFavorites";
import BookVisit from "./Pages/BookVisit/BookVisit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<PurchaseProperties />} />
        <Route path="/myfavorites" element={<MyFavorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apartments/:id" element={<ApartmentDetails />} />
        <Route path="/apartments/:id/book" element={<BookVisit />} />
      </Routes>
    </BrowserRouter>
  
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
