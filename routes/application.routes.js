const {
  getAllApplicationsController,
  getApplicationByIdController,
  createApplicationController,
  updateApplicationController,
  deleteApplicationController,
} = require("../controllers/application.controllers");

applicationRouter = require("express").Router();

applicationRouter.get("/", getAllApplicationsController);
applicationRouter.get("/:id", getApplicationByIdController);
applicationRouter.post("/", createApplicationController);
applicationRouter.patch("/:id", updateApplicationController);
applicationRouter.delete("/:id", deleteApplicationController);

module.exports = applicationRouter;
