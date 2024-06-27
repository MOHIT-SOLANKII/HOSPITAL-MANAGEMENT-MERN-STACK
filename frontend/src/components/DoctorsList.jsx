/* eslint-disable no-unused-vars */
import React from "react";
import { doctors } from "../utils/dummyDoctors";
const DoctorsList = () => {
  return (
    <>
      <div className="mx-10 mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:mx-20">
        {/* Card Component */}
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="h-[380px] max-w-[500px] rounded-lg relative hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 hover:z-30 duration-1000"
            >
                
                <img src={doctor.docAvatar} alt={doctor.firstName} className="absolute h-full w-full rounded-lg z-10 " />
                
                <div className="absolute h-[100px] w-full rounded-full bottom-0 flex flex-col justify-evenly items-center z-20 mb-5 bg-slate-300 dark:bg-slate-900">

                    <div className="w-full text-center text-3xl font-bold opacity-80 dark:text-[#FFCE00]">{doctor.firstName} { doctor.lastName}</div>
                    <div className="w-full text-center text-3xl font-bold text-orange-800 dark:text-[#FFCE90]">{ doctor.doctorDepartment}</div>


                </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default DoctorsList;
