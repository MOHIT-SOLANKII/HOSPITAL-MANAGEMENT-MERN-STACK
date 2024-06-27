/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
import Navbar from "../components/Navbar";
import InfiniteScroll from "../components/InfiniteScroll";
import DoctorsList from "../components/DoctorsList";


const Home = () => {
  return (
    <>
      <Navbar />
      {/* <MessageForm /> */}
      <DoctorsList />
      {/* <Departments /> */}
      
      {/* <Hero />
       <Biography />
      <Departments />
      <MessageForm /> */}
    </>
  );
};

export default Home;
