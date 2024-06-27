/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { departments } from "./../utils/DoctorDepartment";

const Departments = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1500 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]}>
        {departments.map((department, index) => (
          <div
            key={index}
            className="container mx-auto h-72 w-[70%] flex justify-center items-center rounded-2xl relative "
          >
            <img
              src={department.image}
              alt={department.name}
              className="absolute top-0 left-0 h-full w-full z-10 rounded-2xl "
            />
            <div className="z-20 bg-white dark:bg-slate-900 w-[80%] h-[20%] rounded-3xl flex justify-center items-center absolute bottom-8">
              <div className="text-2xl font-semibold uppercase dark:text-[#FFCE00] opacity-80">
                {department.name}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Departments;
