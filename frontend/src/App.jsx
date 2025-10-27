import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <BrowserRouter>
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 min-h-screen">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              path="/aboutme"
              element={
                <PrivateRoute>
                  <AboutMe />
                </PrivateRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
