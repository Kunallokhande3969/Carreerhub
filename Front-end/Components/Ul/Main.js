"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const imageData = [
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/int_opps-student.png.webp",
    alt: "Internship Opportunities",
    title: "International Remote Internship Opportunities",
    description: "Gain real-world experience with top teams & earn up to ₹3 lacs stipend!",
    cta: "Find Jobs",
    secondaryCta: "Apply now"
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
    alt: "Experienced Hiring",
    title: "Author/Executor",
    description: "High-profile positions with salaries up to ₹30 LPA",
    cta: "Find Internships",
    secondaryCta: "Apply now"
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
    alt: "PGC Banner",
    title: "Online Counties with Guaranteed Management resources",
    cta: "Know more",
    outlineButton: true,
    secondaryCta: "Apply now"
  },
];

const Main = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  const handleProtectedNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      if (!toast.isActive("auth-error")) {
        toast.error("Please log in to access resources.", {
          toastId: "auth-error",
        });
      }
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-grow">
        <div className="text-center mb-16">
    <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-blue-600 text-4xl">Career</span>Hub
              </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Make Your <span className="text-blue-600">Dream Career</span> A Reality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover opportunities that align with your aspirations and skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {imageData.map((item, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  hoveredCard === idx ? "scale-110" : "scale-100"
                }`}
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                <div
                  className={`transition-all duration-500 ${
                    hoveredCard === idx ? "translate-y-0" : "translate-y-10"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="mb-4 opacity-90">{item.description}</p>
                  )}
                </div>

                <div
                  className={`flex flex-wrap gap-3 transition-all duration-500 ${
                    hoveredCard === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <button
                    onClick={(e) => handleProtectedNav(e, "/student")}
                    className={`inline-flex items-center font-semibold ${
                      item.outlineButton
                        ? "border-2 border-white text-black  hover:bg-white  hover:text-black"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    } px-6 py-2 rounded-full transition-all`}
                  >
                    {item.cta} {!item.outlineButton && <FiArrowRight className="ml-2" />}
                  </button>

                  {item.secondaryCta && (
                    <button
                      onClick={(e) => handleProtectedNav(e, "/apply")}
                      className="inline-flex items-center font-semibold border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      {item.secondaryCta}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={(e) => handleProtectedNav(e, "/student")}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Opportunities <FiArrowRight className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Main;