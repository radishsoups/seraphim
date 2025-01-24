import React from "react";
import LogoPageTitle from "../components/LogoPageTitle";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/signup");
  }
  return (
    <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[60%] lg:w-[40%]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Welcome to Seraphim!" />
      <SubmitButton
        placeholder="Login"
        handleClick={handleLogin}
      ></SubmitButton>
      <SubmitButton
        placeholder="Signup"
        handleClick={handleSignup}
      ></SubmitButton>
    </div>
  );
};

export default LandingPage;
