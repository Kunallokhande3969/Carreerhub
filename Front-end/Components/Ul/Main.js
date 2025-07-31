"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";

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

  const careerCards = [
    {
      src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/int_opps-student.png.webp",
      alt: "Internship Opportunities",
      title: "International Remote Internship Opportunities",
      description:
        "Gain real-world experience with top teams & earn up to ₹3 lacs stipend!",
      primaryAction: "Internships",
      secondaryAction: "Apply now",
    },
    {
      src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
      alt: "Experienced Hiring",
      title: "Author/Executor",
      description: "High-profile positions with salaries up to ₹30 LPA",
      primaryAction: "Find Jobs",
      secondaryAction: "Apply now",
    },
    {
      src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
      alt: "Career Development",
      title: "Online Courses with Guaranteed Placement",
      description:
        "Upskill with professional development resources and get guaranteed placement assistance.",
      primaryAction: "Know more",
      secondaryAction: "Apply now",
      isOutline: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-blue-600">Career</span>Hub
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make Your <span className="text-blue-600">Dream Career</span> A
              Reality
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities that align with your aspirations and skills
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {careerCards.map((card, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] min-h-[320px] flex bg-gray-200 transform hover:scale-[1.02] will-change-transform"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container with Smooth Scale Effect */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.alt}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.15,0.75,0.5,1)] ${
                      hoveredCard === index ? "scale-110" : "scale-100"
                    }`}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.classList.add("bg-blue-50");
                    }}
                  />
                </div>

                {/* Gradient Overlay with Smooth Transition */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all duration-500 ${
                    hoveredCard === index ? "opacity-80" : "opacity-60"
                  }`}
                />

                {/* Content with Smooth Transitions */}
                <div className="relative z-10 flex flex-col justify-end p-6 text-white w-full">
                  <div
                    className={`transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      hoveredCard === index ? "translate-y-0" : "translate-y-6"
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-md">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base mb-4 drop-shadow-md opacity-90">
                      {card.description}
                    </p>
                  </div>

                  {/* Buttons with Staggered Animation */}
                  <div
                    className={`flex gap-3 mt-4 ${
                      hoveredCard === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    } transition-all duration-300 ease-out delay-75`}
                  >
                    <button
                      onClick={(e) => handleProtectedNav(e, "/student")}
                      className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                        card.isOutline
                          ? "border-2 border-white text-white hover:bg-white hover:text-black"
                          : "bg-white text-gray-900 hover:bg-gray-100"
                      } transform hover:scale-105 flex items-center justify-center`}
                    >
                      {card.primaryAction}
                      {!card.isOutline && (
                        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleProtectedNav(e, "/apply")}
                      className="flex-1 py-2 px-4 rounded-full font-medium border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                    >
                      {card.secondaryAction}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={(e) => handleProtectedNav(e, "/student")}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Explore All Opportunities
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
