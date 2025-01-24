import React from "react";

function LogoPageTitle({ logoSrc, title }) {
  return (
    <>
      <div className="w-[100%] flex flex-col justify-center items-center">
        <img className="w-[60%] md:w-[30%] lg:w-[20%]" src={logoSrc} alt="logo" />
        <h2 className="text-2xl text-rose mt-[-20px]">{title}</h2>
      </div>
    </>
  );
}
export default LogoPageTitle;
