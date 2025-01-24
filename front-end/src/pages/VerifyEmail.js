import React from "react";
import SubmitButton from "../components/SubmitButton";
import LogoPageTitle from "../components/LogoPageTitle";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  function handleContinueClick() {
    console.log("continue clicked");
    navigate("/");
  }
  return (
    <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[60%] lg:w-[40%]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Verify Your Email" />

      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="text-ebony-700 font-bold">
          We sent a code to {email}
        </div>
        <div className="w-[80%] flex flex-row gap-4 justify-evenly items-center">
          <input
            className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose"
            type="text"
            maxLength="1"
          />
          <input
            className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose"
            type="text"
            maxLength="1"
          />
          <input
            className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose"
            type="text"
            maxLength="1"
          />
          <input
            className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose"
            type="text"
            maxLength="1"
          />
        </div>
        <SubmitButton
          placeholder="Continue"
          handleClick={handleContinueClick}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
