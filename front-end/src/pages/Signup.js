import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleBtnClick() {
    console.log("signup as: ", name, username, email, password);
    axiosInstance
      .post("/signup", {
        name,
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("User created successfully");
        navigate("/home");
      })
      .catch((error) => {
        // console.log("a real error", error.message);
        console.log("Error in signup", error.response.data.message);
        // toast.error("User creation failed! Try agin!");
        toast.error(error.response.data.message);
      });
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className="w-[90%] flex flex-col justify-center items-center gap-4 p-8 mx-auto md:w-[60%] lg:w-[40%]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Create an account" />
      <div className=" w-[80%] flex flex-col justify-center items-center gap-4">
        <InputField inputfieldName="Name" handleChange={handleNameChange} />
        <InputField
          inputfieldName="Username"
          handleChange={handleUsernameChange}
        />
        <InputField
          inputfieldName="Email"
          inputType="email"
          handleChange={handleEmailChange}
        />
        <InputField
          inputfieldName="Password"
          inputType="password"
          handleChange={handlePasswordChange}
        />
      </div>
      <SubmitButton placeholder="Signup" handleClick={handleBtnClick} />
      <div className="text-ebony-700 font-bold text-center">
        Already have an account?{" "}
        <Link className="text-rose underline hover:text-ebony" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
