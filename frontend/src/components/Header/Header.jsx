import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    const header = headerRef.current;
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    // Listen for login/logout changes
    const syncUser = () => setUsername(localStorage.getItem("username"));
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/home");
  };

  return (
    <header ref={headerRef} className="transition-all shadow-md duration-300">
      <nav className="container mx-auto px-5 flex justify-between items-center py-2">
        <div className="h-8 md:h-12 flex items-center">
          <Link to="/home" className="text-2xl font-bold text-sky-700 font-poppins tracking-wide">TripSphere</Link>
        </div>
        <div className="flex gap-2 md:hidden">
          <BiMenu className="w-8 h-8 cursor-pointer" onClick={handleMenuToggle} />
        </div>
        {isMenuOpen && (
          <div className="md:hidden fixed text-center top-0 h-screen right-0 w-2/3 bg-gray-100 duration-300 p-4 shadow-md z-40">
            <IoClose className="w-8 h-8 cursor-pointer absolute top-4 right-0 mr-6 text-gray-600 hover:text-black" onClick={handleMenuToggle} />
            <ul className="flex flex-col item-center h-full justify-center gap-10">
              <Link to="/home" onClick={handleMenuToggle} className="text-sky-700 font-semibold">Home</Link>
              <Link to="/packages" onClick={handleMenuToggle} className="text-sky-700 font-semibold">Packages</Link>
              <Link to="/contact" onClick={handleMenuToggle} className="text-sky-700 font-semibold">Contact</Link>
              {!username ? (
                <>
                  <Link to="/login" onClick={handleMenuToggle} className="text-sky-700 font-semibold">Login</Link>
                  <Link to="/register" onClick={handleMenuToggle} className="text-sky-700 font-semibold">Register</Link>
                </>
              ) : (
                <>
                  <span className="font-semibold text-sky-700">{username}</span>
                  <button onClick={() => { handleLogout(); handleMenuToggle(); }} className="text-red-600 font-semibold">Logout</button>
                </>
              )}
            </ul>
          </div>
        )}
        <ul className="md:flex hidden space-x-4 items-center">
          <Link to="/home" className="text-sky-700 font-semibold">Home</Link>
          <Link to="/packages" className="text-sky-700 font-semibold">Packages</Link>
          <Link to="/contact" className="text-sky-700 font-semibold">Contact</Link>
          {!username ? (
            <>
              <Link to="/login" className="text-sky-700 font-semibold">Login</Link>
              <Link to="/register" className="text-sky-700 font-semibold">Register</Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-sky-700">{username}</span>
              <button onClick={handleLogout} className="ml-2 text-red-600 font-semibold">Logout</button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
