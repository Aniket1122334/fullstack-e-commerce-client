import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { RiSecurePaymentFill, RiHandCoinFill } from "react-icons/ri";
import { GiCheckedShield } from "react-icons/gi";
import "../css/Services.css";

const Services = () => {
  return (
    <div className="service-box flex flex-col items-center w-full min-h-[30rem] bg-gray-50 py-36">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800 animate-fade-in pb-16">
        Our Services
      </h3>
      <div className="service-inner-box flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center p-6 w-full sm:w-[45%] md:w-[22%] bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 animate-bounce-in">
          <FaTruckFast className="text-3xl sm:text-4xl text-indigo-600" />
          <p className="mt-4 text-base sm:text-lg font-medium text-center text-gray-700">
            Super Fast and Free Delivery
          </p>
        </div>
        <div className="flex flex-col items-center p-6 w-full sm:w-[45%] md:w-[22%] bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 animate-bounce-in">
          <GiCheckedShield className="text-3xl sm:text-4xl text-indigo-600" />
          <p className="mt-4 text-base sm:text-lg font-medium text-center text-gray-700">
            Non-contact Shipping
          </p>
        </div>
        <div className="flex flex-col items-center p-6 w-full sm:w-[45%] md:w-[22%] bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 animate-bounce-in">
          <RiHandCoinFill className="text-3xl sm:text-4xl text-indigo-600" />
          <p className="mt-4 text-base sm:text-lg font-medium text-center text-gray-700">
            Money-back Guaranteed
          </p>
        </div>
        <div className="flex flex-col items-center p-6 w-full sm:w-[45%] md:w-[22%] bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 animate-bounce-in">
          <RiSecurePaymentFill className="text-3xl sm:text-4xl text-indigo-600" />
          <p className="mt-4 text-base sm:text-lg font-medium text-center text-gray-700">
            Super Secure Payment System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
