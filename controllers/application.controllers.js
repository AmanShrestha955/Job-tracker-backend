const {
  getAllApplicationsService,
  getApplicationByIdService,
  createApplicationService,
  updateApplicationService,
  deleteApplicationService,
} = require("../services/application.services");

const getAllApplicationsController = async (req, res) => {
  try {
    const { search, status, limit, offset } = req.query;
    const filterData = { search, status };
    const applications = await getAllApplicationsService(
      filterData,
      limit,
      offset,
    );
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      error: "error in getAllApplicationsController",
    });
  }
};

const getApplicationByIdController = async (req, res) => {
  console.log("getApplicationByIdController called with id:", req.params.id);
  const { id } = req.params;
  try {
    const application = await getApplicationByIdService(id);
    console.log(application.length);
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    const errorStatus = error.statusCode || 500;
    res.status(errorStatus).json({
      message: error.message,
      error: "error in getApplicationByIdController",
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
    const errorStatus = error.statusCode || 500;
    res.status(errorStatus).json({
      message: error.message,
      error: "error in createApplicationController",
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
    const errorStatus = error.statusCode || 500;
    res.status(errorStatus).json({
      message: error.message,
      error: "error in updateApplicationController",
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
    const errorStatus = error.statusCode || 500;
    res.status(errorStatus).json({
      message: error.message,
      error: "error in deleteApplicationController",
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
