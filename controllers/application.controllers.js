const {
  getAllApplicationsService,
  getApplicationByIdService,
  createApplicationService,
  updateApplicationService,
  deleteApplicationService,
} = require("../services/application.services");

const getAllApplicationsController = async (req, res) => {
  try {
    const { company_name, job_title, status, limit, offset } = req.query;
    const filterData = { company_name, job_title, status };
    const applications = await getAllApplicationsService(
      filterData,
      limit,
      offset,
    );
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error in getAllApplicationsController",
      error: error.message,
    });
  }
};

const getApplicationByIdController = async (req, res) => {
  console.log("getApplicationByIdController called with id:", req.params.id);
  const { id } = req.params;
  try {
    const application = await getApplicationByIdService(id);
    if (application.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error in getApplicationByIdController",
      error: error.message,
    });
  }
};

const createApplicationController = async (req, res) => {
  try {
    const applicationData = req.body;
    const result = await createApplicationService(applicationData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error in createApplicationController",
      error: error.message,
    });
  }
};

const updateApplicationController = async (req, res) => {
  console.log("starting updateApplicationController");
  try {
    const { id } = req.params;
    const applicationData = req.body;
    const result = await updateApplicationService(id, applicationData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error in updateApplicationController",
      error: error.message,
    });
  }
};

const deleteApplicationController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteApplicationService(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error in deleteApplicationController",
      error: error.message,
    });
  }
};

module.exports = {
  getAllApplicationsController,
  getApplicationByIdController,
  createApplicationController,
  updateApplicationController,
  deleteApplicationController,
};
