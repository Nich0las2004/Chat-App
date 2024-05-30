import React from "react";
import { Link } from "react-router-dom";

type Props = {
  isVisible: boolean;
};

const RegisterSuccess: React.FC<Props> = ({ isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className="bg-black fixed inset-0 p-6 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 w-4/12 rounded-md  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                User was Registered Successfully!
              </h3>
              <div className="py-10 text-center">
                <Link to="/login">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK TO LOGIN
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterSuccess;
