/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {};

  return (
    <>
      <div className="mx-[7%] border-2 border-gray-200 h-auto rounded-lg shadow-sm shadow-orange-200 flex-row dark:bg-[#222831]">
        <h1 className="text-center text-3xl font-bold mt-6 mb-10 dark:text-[#FFCE00] ">
          Send Us A Message
        </h1>
        
        <div className="">
          <form
            onSubmit={handleMessage}
            className="flex flex-col space-y-10 items-center
          "
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-3/4 h-14 px-2 rounded-lg border-2 border-gray-200 shadow-sm shadow-green-200 hover:border-green-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-3/4 h-14 px-2 rounded-lg border-2 border-gray-200 shadow-sm shadow-green-200 hover:border-green-300"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4 h-14 px-2 rounded-lg border-2 border-gray-200 shadow-sm shadow-green-200 hover:border-green-300"
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-3/4 h-14 px-2 rounded-lg border-2 border-gray-200 shadow-sm shadow-green-200 hover:border-green-300"
            />
            <textarea
              rows={7}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-3/4 px-2 py-2 rounded-lg border-2 border-gray-200 shadow-sm shadow-green-200 hover:border-green-300"
            />
            `
            <button type="submit" className="border-1 border-">
              Send
            </button>
            `
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
