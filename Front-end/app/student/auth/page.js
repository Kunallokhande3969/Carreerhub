"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";

const Page = () => {
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer
  );
  const dispatch = useDispatch();

  // Remove duplicates
  const uniqueJobs = jobs?.filter(
    (job, index, self) => index === self.findIndex((j) => j._id === job._id)
  );
  const uniqueInternships = internships?.filter(
    (internship, index, self) =>
      index === self.findIndex((i) => i._id === internship._id)
  );

  // Handlers
  const ApplyJobHandler = (id) => {
    dispatch(asyncapplyjobstudent(id));
  };
  const ApplyInternshipHandler = (id) => {
    dispatch(asyncapplyinternshipstudent(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Available Jobs for {student?.firstname}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {uniqueJobs &&
          uniqueJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Skills:</span> {job.skills}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Job Type:</span> {job.jobtype}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Openings:</span> {job.openings}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  <span className="font-semibold">Description:</span> {job.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/student/auth/readjob/${job._id}`}
                  className="text-blue-600 font-medium hover:underline flex items-center"
                >
                  View Details <FiArrowRight className="ml-1" />
                </Link>

                {student && !job.students.includes(student._id) ? (
                  <button
                    onClick={() => ApplyJobHandler(job._id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
                  >
                    Apply Job
                  </button>
                ) : (
                  <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-sm">
                    <FiCheckCircle className="mr-2" />
                    Applied
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Available Internships for {student?.firstname}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueInternships &&
          uniqueInternships.map((internship) => (
            <div
              key={internship._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {internship.profile}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Skills:</span> {internship.skills}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Type:</span> {internship.internshiptype}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Openings:</span> {internship.openings}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Duration:</span> {internship.duration}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/student/auth/read/${internship._id}`}
                  className="text-blue-600 font-medium hover:underline flex items-center"
                >
                  View Details <FiArrowRight className="ml-1" />
                </Link>

                {student && !internship.students.includes(student._id) ? (
                  <button
                    onClick={() => ApplyInternshipHandler(internship._id)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-transform shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center"
                  >
                    Apply Internship
                  </button>
                ) : (
                  <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-sm">
                    <FiCheckCircle className="mr-2" />
                    Applied
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
