const express = require("express");

const upload = require("../middlewares/file.middleware");
const { authUser } = require("../middlewares/auth.middlewares");

const {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} = require("../controllers/interview.controller");

const router = express.Router();

router.post(
  "/generate",
  authUser,
  upload.single("resume"),
  generateInterViewReportController
);

router.get("/", authUser, getAllInterviewReportsController);

router.get("/:interviewId", authUser, getInterviewReportByIdController);

router.get(
  "/resume/:interviewReportId",
  authUser,
  generateResumePdfController
);

module.exports = router;