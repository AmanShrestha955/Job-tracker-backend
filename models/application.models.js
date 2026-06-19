const pool = require("../config/db.js");

const getAllApplications = async (conditions, values, limits, offset) => {
  let query =
    "SELECT id, company_name, job_title, applied_date FROM applications";
  let countQuery = "SELECT COUNT(*) as TOTAL FROM applications";
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
    countQuery += " WHERE " + conditions.join(" AND ");
  }
  if (limits !== undefined) {
    query += " LIMIT ?";
    values.push(limits);
    if (offset !== undefined) {
      query += " OFFSET ?";
      values.push(offset);
    }
  }
  console.log(query);
  console.log(values);
  const [applications] = await pool.execute(query, values);
  const [countResult] = await pool.execute(countQuery, values);

  console.log(applications);
  console.log(countResult[0].TOTAL);
  return { applications, total: countResult[0].TOTAL };
};

const getApplicationById = async (value) => {
  let query = "SELECT * FROM applications WHERE id = ?";
  const [application] = await pool.execute(query, value);
  console.log(application);
  return application[0];
};

const createApplication = async (value) => {
  let query =
    "INSERT INTO applications (company_name, job_title, job_type, status, applied_date, notes) VALUES (?, ?,?, ?, ?, ?)";

  const [result] = await pool.execute(query, value);
  console.log(result);
  return result;
};

const updateApplication = async (id, applicationData) => {
  const allowedFields = [
    "company_name",
    "job_title",
    "job_type",
    "status",
    "applied_date",
    "notes",
  ];

  const values = [];
  const fields = [];

  allowedFields.forEach((field) => {
    if (applicationData[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(applicationData[field]);
    }
  });

  const query = `UPDATE applications SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await pool.execute(query, [...values, id]);

  console.log(result);

  return result;
};

const deleteApplication = async (value) => {
  let query = "DELETE FROM applications WHERE id = ?";
  const [result] = await pool.execute(query, value);
  console.log(result);

  return result;
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
