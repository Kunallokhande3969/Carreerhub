"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";

const Page = () => {
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer
  );
  const dispatch = useDispatch();

  const ApplyJobHandler = (id) => {
    dispatch(asyncapplyjobstudent(id));
  };

  const ApplyInternshipHandler = (id) => {
    dispatch(asyncapplyinternshipstudent(id));
  };

  useEffect(() => {}, [student]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, {student && student.firstname}!</h1>
        <p className="text-blue-100">Browse and apply to exciting opportunities below</p>
      </div>

      {/* Jobs Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Jobs <span className="text-blue-600">({jobs?.length || 0})</span>
          </h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            New opportunities daily
          </div>
        </div>

        {jobs && jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No jobs available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((j) => (
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100" key={j._id}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{j.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {j.jobtype}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Openings: {j.openings}</span>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">REQUIRED SKILLS</h4>
                      <div className="flex flex-wrap gap-2">
                        {j.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">{j.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <Link
                      href={`/student/auth/readjob/${j._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                    >
                      View details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {!j.students.includes(student && student._id) ? (
                      <button
                        onClick={() => ApplyJobHandler(j._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Apply
                      </button>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Internships Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Internships <span className="text-blue-600">({internships?.length || 0})</span>
          </h2>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Great learning opportunities
          </div>
        </div>

        {internships && internships.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No internships available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((i) => (
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100" key={i._id}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{i.profile}</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                      {i.internshiptype}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{i.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Openings: {i.openings}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">REQUIRED SKILLS</h4>
                      <div className="flex flex-wrap gap-2">
                        {i.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <Link
                      href={`/student/auth/read/${i._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                    >
                      View details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {!i.students.includes(student && student._id) ? (
                      <button
                        onClick={() => ApplyInternshipHandler(i._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Apply
                      </button>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;