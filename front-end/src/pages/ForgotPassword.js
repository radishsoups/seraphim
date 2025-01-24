import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isContinued, setIsContinued] = useState(false);
  // const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };
  const handleNewpasswordChange = (e) => {
    setNewpassword(e.target.value);
    // console.log(newpassword);
  };
  const handleConfirmpasswordChange = (e) => {
    setConfirmpassword(e.target.value);
    // console.log(confirmpassword);
  };
  const handleContinueClick = (e) => {
    e.preventDefault();
    setSubmittedEmail(email);
    axiosInstance
      .post("/continueReset", {
        email: email,
      })
      .then((res) => {
        setIsContinued(true);
      })
      .catch((err) => {
        console.log("Invalid eamil");
        toast.error("Invalid email");
      });
  };
  const handleResetClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/reset", {
        email: email,
        newpassword: newpassword,
        confirmpassword: confirmpassword,
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[60%] lg:w-[40%]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Forgot Password?" />
      <div className="w-[80%] flex flex-col gap-4">
        <InputField
          inputfieldName="Email"
          inputType="email"
          value={email}
          handleChange={handleEmailChange}
        />
      </div>
      {!isContinued && (
        <SubmitButton
          placeholder="Continue"
          handleClick={handleContinueClick}
        />
      )}
      {isContinued && submittedEmail && (
        <div className="w-[80%] flex flex-col gap-4 justify-center items-center">
          <InputField
            inputfieldName="New Password"
            inputType="password"
            value={newpassword}
            handleChange={handleNewpasswordChange}
          />
          <InputField
            inputfieldName="Confirm Password"
            inputType="password"
            value={confirmpassword}
            handleChange={handleConfirmpasswordChange}
          />
          <SubmitButton placeholder="Reset" handleClick={handleResetClick} />
        </div>
      )}
      <Link
        className="text-rose underline font-bold hover:text-ebony"
        to="/login"
      >
        Back to Login
      </Link>
    </div>
  );
}
