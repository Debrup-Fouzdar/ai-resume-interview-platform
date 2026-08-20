import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InterviewContext } from "../interview.context";

import {
  getAllInterviewReports,
  getInterviewReport,
  downloadResume,
} from "../services/report.api";

import { generateInterviewReport } from "../services/interview.api";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { id: interviewId } = useParams();

  if (!context) {
    throw new Error(
      "useInterview must be used within an InterviewProvider"
    );
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;

 const generateReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {

  setLoading(true);

  let response = null;


  try {

    const formData = new FormData();


    formData.append(
      "resume",
      resumeFile
    );


    formData.append(
      "selfDescription",
      selfDescription
    );


    formData.append(
      "jobDescription",
      jobDescription
    );



    response = await generateInterviewReport(
      formData
    );


    setReport(
      response.interviewReport
    );


  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }


  return response?.interviewReport;

};

  const getReportById = async (reportId) => {
    setLoading(true);

    let response = null;

    try {
      response = await getInterviewReport(reportId);
      setReport(response.interviewReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response?.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);

    let response = null;

    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return response?.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);

    try {
      const pdf = await downloadResume(interviewReportId);

      const url = window.URL.createObjectURL(
        new Blob([pdf], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_${interviewReportId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};