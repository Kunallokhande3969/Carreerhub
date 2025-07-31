"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image"; // Next.js optimized Image

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
      description: "Gain real-world experience with top teams & earn up to ₹3 lacs stipend!",
      primaryAction: "Find Internships",
      secondaryAction: "Apply now"
    },
    {
      src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
      alt: "Experienced Hiring",
      title: "Author/Executor",
      description: "High-profile positions with salaries up to ₹30 LPA",
      primaryAction: "Find Jobs",
      secondaryAction: "Apply now"
    },
    {
      src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
      alt: "Career Development",
      title: "Online Courses with Guaranteed Placement",
      description: "Upskill with professional development resources and get guaranteed placement assistance.",
      primaryAction: "Know more",
      secondaryAction: "Apply now",
      isOutline: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-blue-600">Career</span>Hub
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make Your <span className="text-blue-600">Dream Career</span> A Reality
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities that align with your aspirations and skills
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {careerCards.map((card, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 min-h-[320px] flex"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background (with fallback color) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gray-200">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredCard === index ? "scale-105" : "scale-100"
                    }`}
                    loading="lazy"
                    quality={80}
                    priority={index === 0}
                  />
                </div>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-all duration-500 ${
                  hoveredCard === index ? "opacity-90" : "opacity-80"
                }`} />
                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-end p-6 text-white w-full">
                  <div className={`transition-all duration-500 ${
                    hoveredCard === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-95"
                  }`}>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 whitespace-normal overflow-hidden text-ellipsis">{card.title}</h3>
                    {card.description && (
                      <p className="text-sm md:text-base mb-4 whitespace-normal overflow-hidden text-ellipsis">
                        {card.description}
                      </p>
                    )}
                  </div>
                  <div className={`flex flex-wrap gap-3 transition-all duration-500 ${
                    hoveredCard === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}>
                    <button
                      onClick={(e) => handleProtectedNav(e, "/student")}
                      className={`inline-flex items-center font-medium ${
                        card.isOutline
                          ? "border-2 border-white text-white hover:bg-white hover:text-black"
                          : "bg-white text-gray-900 hover:bg-gray-100"
                      } px-5 py-2 rounded-full transition-colors duration-300`}
                    >
                      {card.primaryAction} {!card.isOutline && <FiArrowRight className="ml-1.5" />}
                    </button>
                    <button
                      onClick={(e) => handleProtectedNav(e, "/apply")}
                      className="inline-flex items-center font-medium border-2 border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full text-base md:text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore All Opportunities <FiArrowRight className="ml-2" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
