"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";
import { toast } from "react-toastify";

const JobsPage = () => {
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer
  );
  const dispatch = useDispatch();
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [appliedInternships, setAppliedInternships] = useState(new Set());

  // Initialize applied items on component mount
  useEffect(() => {
    if (student) {
      const jobSet = new Set(student.jobs.map((job) => job.toString()));
      const internshipSet = new Set(
        student.internships.map((internship) => internship.toString())
      );
      setAppliedJobs(jobSet);
      setAppliedInternships(internshipSet);
    }
  }, [student]);

  const ApplyJobHandler = async (id) => {
    if (appliedJobs.has(id)) {
      toast.warning("You've already applied to this job");
      return;
    }

    try {
      await dispatch(asyncapplyjobstudent(id));
      setAppliedJobs((prev) => new Set(prev).add(id));
      toast.success("Job application submitted successfully!");
    } catch (error) {
      toast.error("Failed to apply for job");
    }
  };

  const ApplyInternshipHandler = async (id) => {
    if (appliedInternships.has(id)) {
      toast.warning("You've already applied to this internship");
      return;
    }

    try {
      await dispatch(asyncapplyinternshipstudent(id));
      setAppliedInternships((prev) => new Set(prev).add(id));
      toast.success("Internship application submitted successfully!");
    } catch (error) {
      toast.error("Failed to apply for internship");
    }
  };

  // Filter out duplicate jobs/internships
  const uniqueJobs = jobs
    ? jobs.filter(
        (job, index, self) => index === self.findIndex((j) => j._id === job._id)
      )
    : [];

  const uniqueInternships = internships
    ? internships.filter(
        (internship, index, self) =>
          index === self.findIndex((i) => i._id === internship._id)
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Available Opportunities for {student?.firstname}
      </h2>

      {/* Jobs Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Available Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueJobs.length > 0 ? (
            uniqueJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2">{job.title}</h4>
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-medium">Skills:</span> {job.skills}
                  </p>
                  <p>
                    <span className="font-medium">Job Type:</span> {job.jobtype}
                  </p>
                  <p>
                    <span className="font-medium">Openings:</span>{" "}
                    {job.openings}
                  </p>
                  <p className="line-clamp-2">
                    <span className="font-medium">Description:</span>{" "}
                    {job.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/student/auth/readjob/${job._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                  {appliedJobs.has(job._id) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => ApplyJobHandler(job._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No jobs available at the moment</p>
          )}
        </div>
      </section>

      {/* Internships Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Available Internships</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueInternships.length > 0 ? (
            uniqueInternships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2">
                  {internship.profile}
                </h4>
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-medium">Skills:</span>{" "}
                    {internship.skills}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {internship.internshiptype}
                  </p>
                  <p>
                    <span className="font-medium">Openings:</span>{" "}
                    {internship.openings}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span>{" "}
                    {internship.duration}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/student/auth/read/${internship._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                  {appliedInternships.has(internship._id) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => ApplyInternshipHandler(internship._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No internships available at the moment
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
