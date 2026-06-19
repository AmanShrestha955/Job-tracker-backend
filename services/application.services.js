const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../models/application.models");
const AppError = require("../utils/appError");

//   all allplications with optional filters for company_name, job_title, and status
const getAllApplicationsService = async (filterData, limits, offset) => {
  // filterData is an object containing company_name, job_title, and status
  const { search, status } = filterData;
  console.log(search, status);

  conditions = [];
  values = [];

  if (search) {
    conditions.push("(company_name LIKE ? OR job_title LIKE ?)");
    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }
  if (status) {
    conditions.push("status = ?");
    values.push(status);
  }
  const { applications, total } = await getAllApplications(
    conditions,
    values,
    limits,
    offset,
  );

  const totalPages = limits ? Math.ceil(total / limits) : 1;
  const currentPage = offset && limits ? Math.floor(offset / limits) + 1 : 1;
  return { applications, total, currentPage, totalPages };
};

// get application by id
const getApplicationByIdService = async (id) => {
  const result = await getApplicationById([id]);
  if (result.length === 0) {
    throw new AppError("Application not found", 404);
  }
  return result;
};

// create a new application
const createApplicationService = async (applicationData) => {
  const { company_name, job_title, job_type, status, applied_date, notes } =
    applicationData;
  if (!company_name || !job_title || !job_type || !status || !applied_date) {
    throw new AppError("Missing required fields", 400);
  }

  if (company_name.length < 2) {
    throw new AppError("Company name must be at least 2 characters long", 400);
  }

  const validJobTypes = ["Internship", "Full-time", "Part-time"];
  const validStatuses = ["Applied", "Interviewing", "Offer", "Rejected"];

  if (!validJobTypes.includes(job_type)) {
    throw new AppError(
      `job_type must be one of: ${validJobTypes.join(", ")}`,
      400,
    );
  }

  if (!validStatuses.includes(status)) {
    throw new AppError(
      `status must be one of: ${validStatuses.join(", ")}`,
      400,
    );
  }

  const result = await createApplication([
    company_name,
    job_title,
    job_type,
    status,
    applied_date,
    notes,
  ]);

  if (result.affectedRows === 0) {
    throw new AppError("could not create application", 500);
  }
  return { message: "application created successfully" };
};

// update an existing application
const updateApplicationService = async (id, applicationData) => {
  const { company_name, job_title, job_type, status, applied_date, notes } =
    applicationData;

  if (Object.keys(applicationData).length === 0) {
    throw new AppError("No fields provided to update", 400);
  }

  if (company_name !== undefined && company_name.length < 2) {
    throw new AppError("Company name must be at least 2 characters long", 400);
  }

  const existing = await getApplicationByIdService(id);
  if (!existing) {
    throw new AppError("Application not found", 404);
  }

  const result = await updateApplication(id, applicationData);

  if (result.affectedRows === 0) {
    throw new AppError("Could not update application", 500);
  }

  return { message: "Application updated successfully" };
};

// delete an application
const deleteApplicationService = async (id) => {
  const existing = await getApplicationByIdService(id);
  if (!existing) {
    throw new AppError("Application not found", 404);
  }

  const result = await deleteApplication([id]);
  if (result.affectedRows === 0) {
    throw new AppError("Could not delete application", 500);
  }

  return { message: "Application deleted successfully" };
};

module.exports = {
  getAllApplicationsService,
  getApplicationByIdService,
  createApplicationService,
  updateApplicationService,
  deleteApplicationService,
};
