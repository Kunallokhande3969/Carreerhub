"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FiExternalLink, FiCheckCircle, FiBriefcase, FiClock } from "react-icons/fi";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";

const Page = () => {
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  // Filter out duplicates
  const uniqueJobs = jobs?.filter((job, index, self) =>
    index === self.findIndex((j) => j._id === job._id)
  );

  const uniqueInternships = internships?.filter((internship, index, self) =>
    index === self.findIndex((i) => i._id === internship._id)
  );

  const ApplyJobHandler = async (id) => {
    setLoading(prev => ({...prev, [id]: true}));
    await dispatch(asyncapplyjobstudent(id));
    setLoading(prev => ({...prev, [id]: false}));
  };

  const ApplyInternshipHandler = async (id) => {
    setLoading(prev => ({...prev, [id]: true}));
    await dispatch(asyncapplyinternshipstudent(id));
    setLoading(prev => ({...prev, [id]: false}));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Jobs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Available Jobs for <span className="text-blue-600">{student?.firstname}</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500 to-transparent ml-4"></div>
        </div>

        {uniqueJobs?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueJobs.map((job) => (
              <div 
                key={job._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {job.jobtype}
                    </span>
                  </div>

                  <div className="my-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiBriefcase className="mr-2" />
                      <span>Openings: {job.openings}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills?.split(',').map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{job.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/student/auth/readjob/${job._id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                    >
                      View Details <FiExternalLink className="ml-1" />
                    </Link>

                    {!job.students?.includes(student?._id) ? (
                      <button
                        onClick={() => ApplyJobHandler(job._id)}
                        disabled={loading[job._id]}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          loading[job._id] 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white shadow-sm`}
                      >
                        {loading[job._id] ? 'Applying...' : 'Apply Now'}
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium">
                        <FiCheckCircle className="mr-2" /> Applied
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Available Internships for <span className="text-blue-600">{student?.firstname}</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500 to-transparent ml-4"></div>
        </div>

        {uniqueInternships?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No internships available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueInternships.map((internship) => (
              <div 
                key={internship._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.profile}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {internship.internshiptype}
                    </span>
                  </div>

                  <div className="my-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiBriefcase className="mr-2" />
                      <span>Openings: {internship.openings}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiClock className="mr-2" />
                      <span>Duration: {internship.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills?.split(',').map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/student/auth/read/${internship._id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                    >
                      View Details <FiExternalLink className="ml-1" />
                    </Link>

                    {!internship.students?.includes(student?._id) ? (
                      <button
                        onClick={() => ApplyInternshipHandler(internship._id)}
                        disabled={loading[internship._id]}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          loading[internship._id] 
                            ? 'bg-purple-400 cursor-not-allowed' 
                            : 'bg-purple-600 hover:bg-purple-700'
                        } text-white shadow-sm`}
                      >
                        {loading[internship._id] ? 'Applying...' : 'Apply Now'}
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium">
                        <FiCheckCircle className="mr-2" /> Applied
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