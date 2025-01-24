import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  user,
  loggedIn,
  //onFollow,
  //hasFollowed,
  toggleBlogs,
  toggleCommunities,
}) => {
  const [profileUser, setProfileUser] = useState({});
  const [profileLoggedIn, setProfileLoggedIn] = useState(false);

  useEffect(() => {
    setProfileUser(user);
    setProfileLoggedIn(loggedIn);
  }, [user, loggedIn]);

  return (
    <div className="flex flex-col justify-center items-center border-none rounded-xl p-4 w-full md:w-4/5 m-auto bg-lavender_blush-900 shadow-md shadow-[#fedae7] min-h-[300px]">
      <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
        <img
          className="w-32 h-32 md:w-44 md:h-44 rounded-lg shadow-sm shadow-[#fedae7] bg-ebony-800 object-cover m-4"
          src={profileUser.profilePicture}
          alt="Profile"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.src = '/default_pic.png'; 
          }}
        />
        <div className="w-[90%] md:w-[60%] flex flex-col">
          {profileLoggedIn ? (
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
              <p className="flex gap-2 text-sm sm:text-md md:text-lg pl-2 mb-2">
                <span className="font-bold text-ebony">{profileUser.name}</span>
                <span className="text-rose opacity-75">@{profileUser.username}</span>
              </p>
              <div className="flex flex-row gap-2">
                <Link to="/settings">
                  <div className="py-1 px-2 mb-1 border border-rose text-rose rounded-md hover:border-ebony hover:text-ebony text-xs lg:text-sm text-center">
                    Settings
                  </div>
                </Link>
                <Link to="/editprofile">
                  <div className="py-1 px-2 mb-1 border border-rose text-rose rounded-md hover:border-ebony hover:text-ebony text-xs lg:text-sm text-center">
                    Edit Profile
                  </div>
                </Link>
                {/* <SubmitButton
                  placeholder="Log out"
                  handleClick={handleLogout}
                /> */}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center">
              <p className="flex gap-2 text-sm sm:text-md md:text-lg pl-2">
                <span className="font-bold text-ebony">{profileUser.name}</span>
                <span className="text-rose opacity-75">@{profileUser.username}</span>
              </p>
              {/*
              <button
                className={`py-1 px-2 mb-1 border rounded-md text-xs md:text-sm ${
                  hasFollowed
                    ? "bg-rose text-lavender_blush-900 font-bold border-rose"
                    : "border-rose text-rose hover:border-ebony hover:text-ebony"
                }`}
                onClick={onFollow}
              >
                {hasFollowed ? "Following" : "Follow"}
              </button>
              */}
            </div>
          )}

          <div className="w-full h-auto flex flex-col justify-evenly px-2 py-2 rounded-md gap-1">
            {profileUser.about && (
              <p className="text-xs md:text-sm lg:text-md text-ebony">
                {profileUser.about}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-6 flex flex-col sm:flex-row justify-evenly items-center border-t border-rose-800 text-md text-rose">
        <button
          onClick={toggleCommunities}
          className="w-full sm:w-auto pt-2 px-4 sm:px-12 border-b sm:border-b-0 border-rose-800 hover:text-ebony transition duration-200 ease-in-out"
        >
          Communities
        </button>
        <button
          onClick={toggleBlogs}
          className="w-full sm:w-auto pt-2 px-4 sm:px-12 hover:text-ebony transition duration-200 ease-in-out"
        >
          Blogs
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
