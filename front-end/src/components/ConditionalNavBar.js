import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

function ConditionalNavigationBar({ noNavRoutes }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

  const toggleNav = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (noNavRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <>
          <button onClick={toggleNav} className="lg:hidden fixed top-4 left-4 z-30 text-rose">
            <HiOutlineMenuAlt1 size="32" />
          </button>
          {isOpen && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleNav}></div>
              <NavigationBar small={true} />
            </>
          )}
        </>
      ) : (
        <NavigationBar small={false} />
      )}
    </>
  );
}

export default ConditionalNavigationBar;
