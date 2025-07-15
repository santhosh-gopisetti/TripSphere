import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

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

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
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
              <Link to="/home" onClick={handleMenuToggle}>Home</Link>
              <Link to="/packages" onClick={handleMenuToggle}>Packages</Link>
              <Link to="/contact" onClick={handleMenuToggle}>Contact</Link>
            </ul>
          </div>
        )}
        <ul className="md:flex hidden space-x-4">
          <Link to="/home">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
