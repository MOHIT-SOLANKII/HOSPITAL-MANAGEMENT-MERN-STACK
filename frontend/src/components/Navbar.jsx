/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";
import Appointment from "./../pages/Appointment";
import themeMode from "./../contexts/theme.js";

const Navbar = () => {
  return (
    <>
      {/* Header => menu + logo + search */}
      <div className="container mx-auto p-2 pt-4">
        <div className="flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="rgba(0,0,0,1)"
            className="sm:hidden dark:fill-white"
            onClick={() => {
              document.querySelector("section").classList.toggle("hidden");
            }}
          >
            <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>

          <a href="/">
            <img src="/mscare.png" alt="logo" width={150} />
          </a>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="rgba(0,0,0,1)"
          >
            <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
          </svg> */}

          <ThemeBtn />
        </div>
      </div>
      {/* List of navigation links in mobile screen */}

      <section className="hidden">
        <ul className="flex flex-col items-center pt-8 space-y-10 text-2xl bg-gray-200 dark:bg-[#0C0C0C] p-2 h-screen">
          <li className="">
            <NavLink
              to="/"
              className="p-2 mx-2 text-gray-900 dark:text-[#FFCE00] hover:text-gray-500"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment"
              className="p-2 mx-2 text-gray-800 dark:text-[#FFCE00] hover:text-gray-900"
            >
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment"
              className="p-2 mx-2 text-gray-800 dark:text-[#FFCE00] hover:text-gray-900"
            >
              Appointment
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className="p-2 mx-2 text-gray-800 dark:text-[#FFCE00] hover:text-gray-900"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <button className="bg-orange-500 dark:bg-white text-white dark:text-black px-4 py-1 rounded-lg">
              Login
            </button>
          </li>
          <li>
            <button className="bg-orange-50 dark:bg-white text-white dark:text-black px-4 py-1 rounded-lg">
              Register
            </button>
          </li>
         
        </ul>
      </section>
    </>
  );
};

export default Navbar;
