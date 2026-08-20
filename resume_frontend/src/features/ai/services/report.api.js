import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getAllInterviewReports() {
  const response = await api.get("/api/interview");

  return response.data;
}

export async function getInterviewReport(interviewId) {
  const response = await api.get(
    `/api/interview/${interviewId}`
  );

  return response.data;
}

export async function downloadResume(interviewReportId) {
  const response = await api.get(
    `/api/interview/resume/${interviewReportId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
}