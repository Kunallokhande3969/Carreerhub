"use client";
import React, { useCallback, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.studentReducer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProtectedNav = useCallback(
    (e, path) => {
      if (!isAuthenticated) {
        e.preventDefault();
        const toastId = "auth-toast";
        if (!toast.isActive(toastId)) {
          toast.error("Please log in to access this resource!", {
            toastId,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        window.location.href = path;
      }
    },
    [isAuthenticated]
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <FcBriefcase className="text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-blue-600">Career</span>Hub
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={(e) => handleProtectedNav(e, "/jobs")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Jobs / Internships
            </button>

            <div className="flex items-center group cursor-pointer">
              <span className="text-blue-600 group-hover:text-blue-800 font-medium transition-colors">
                Online Trainings
              </span>
              <span className="ml-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <button
              onClick={(e) => handleProtectedNav(e, "/fresher-jobs")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Fresher Jobs
            </button>

            <Link
              href="/student"
              className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors"
              onClick={() => sessionStorage.setItem("showStudentToast", "true")}
            >
              Student
            </Link>

            <Link
              href="/employe"
              className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-sm hover:shadow-md transition-all"
            >
              Employer
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={(e) => {
                handleProtectedNav(e, "/jobs");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Jobs / Internships
            </button>

            <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">
              <span>Online Trainings</span>
              <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <button
              onClick={(e) => {
                handleProtectedNav(e, "/fresher-jobs");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Fresher Jobs
            </button>

            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Student
            </Link>

            <Link
              href="/employe"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Employer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;