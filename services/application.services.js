const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../models/application.models");

//   all allplications with optional filters for company_name, job_title, and status
const getAllApplicationsService = async (filterData, limits, offset) => {
  // filterData is an object containing company_name, job_title, and status
  const { company_name, job_title, status } = filterData;

  conditions = [];
  values = [];

  if (company_name) {
    conditions.push("company_name LIKE ?");
    values.push(`%${company_name}%`);
  }
  if (job_title) {
    conditions.push("job_title LIKE ?");
    values.push(`%${job_title}%`);
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
  return result;
};

// create a new application
const createApplicationService = async (applicationData) => {
  const { company_name, job_title, job_type, status, applied_date, notes } =
    applicationData;
  if (!company_name || !job_title || !job_type || !status || !applied_date) {
    throw new Error("Missing required fields");
  }

  if (company_name.length < 2) {
    throw new Error("Company name must be at least 2 characters long");
  }

  const result = await createApplication([
    company_name,
    job_title,
    job_type,
    status,
    applied_date,
    notes,
  ]);
  return result;
};

// update an existing application
const updateApplicationService = async (id, applicationData) => {
  const { company_name, job_title, job_type, status, applied_date, notes } =
    applicationData;
  if (company_name !== undefined && company_name.length < 2) {
    throw new Error("Company name must be at least 2 characters long");
  }
  const result = await updateApplication(id, applicationData);
  return result;
};

// delete an application
const deleteApplicationService = async (id) => {
  const result = await deleteApplication([id]);
  return result;
};

module.exports = {
  getAllApplicationsService,
  getApplicationByIdService,
  createApplicationService,
  updateApplicationService,
  deleteApplicationService,
};
