import React from "react";
function SubmitButton({ placeholder, link, handleClick }) {
  // function handleClick() {
  //   console.log("the button is clicked");
  // }
  return (
    <div className="w-[80%] my-2 p-2">
      {/* <Link to={link}> */}
      <button className="w-[100%] p-2 bg-ebony border-ebony rounded-lg text-rose-700 font-semibold hover:bg-rose-700 hover:text-ebony hover:border-rose-700" onClick={handleClick}>
        {placeholder}
      </button>
      {/* </Link> */}
    </div>
  );
}
export default SubmitButton;
