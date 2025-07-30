"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";

const imageData = [
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/int_opps-student.png.webp",
    alt: "Internship Opportunities",
    title: "Internship Opportunities",
    description: "Gain real-world experience with top companies",
    cta: "Find Internships",
    href: "/student/internships"
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
    alt: "Experienced Hiring",
    title: "Career Launcher",
    description: "Kickstart your professional journey with dream roles",
    cta: "Explore Jobs",
    href: "/student/jobs"
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
    alt: "PGC Banner",
    title: "Career Growth",
    description: "Upskill with our professional development resources",
    cta: "Learn More",
    href: "/student/courses"
  },
];

const Main = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProtectedNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      if (!toast.isActive("auth-error")) {
        toast.error("Please log in to access resources.", {
          toastId: "auth-error",
        });
      }
    }
  };

  if (!isClient) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          Make Your <span className="text-blue-600">Dream Career</span> A Reality
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Discover opportunities that align with your aspirations and skills
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {imageData.map((item, idx) => (
          <Link
            key={idx}
            href={isAuthenticated ? item.href : "#"}
            onClick={(e) => handleProtectedNav(e, item.href)}
            className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-80 sm:h-96 block"
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-500 ${
                  hoveredCard === idx ? "scale-105" : "scale-100"
                }`}
                priority={idx === 0}
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
              <div
                className={`transition-all duration-300 ${
                  hoveredCard === idx ? "translate-y-0" : "translate-y-8"
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="mb-4 opacity-90 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>

              <div
                className={`inline-flex items-center font-medium bg-white text-gray-800 px-4 py-2 rounded-full transition-all duration-300 ${
                  hoveredCard === idx
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                } hover:bg-gray-100 hover:text-blue-600 w-max`}
              >
                {item.cta} <FiArrowRight className="ml-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          href={isAuthenticated ? "/student" : "#"}
          onClick={(e) => handleProtectedNav(e, "/student")}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full text-base sm:text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Explore All Opportunities <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default Main;