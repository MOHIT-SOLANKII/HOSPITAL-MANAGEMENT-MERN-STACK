/* eslint-disable no-unused-vars */
import {React,useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../GlobalStyle.js";
import { ThemeProvider } from "./contexts/theme.js";
import ThemeBtn from "./components/ThemeBtn.jsx";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  // actual change in theme

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.body.className = themeMode === 'light' ? '' : 'bg-[#0C0C0C]';
  }, [themeMode]);

  return (
    <>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/appointment" element={<Appointment />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
          <ToastContainer position="top-center" />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
