const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },

    selfDescription: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    technicalQuestions: [
      {
        question: String,
        answer: String,
      },
    ],

    behavioralQuestions: [
      {
        question: String,
        answer: String,
      },
    ],

    skillGaps: [String],

    preparationPlan: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);