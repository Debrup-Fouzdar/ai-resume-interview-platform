import "../style/home.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    reports = [],
    loading,
    getReports,
  } = useInterview();

  useEffect(() => {
    getReports();
  }, []);

  return (
    <main className="dashboard-page">

      <section className="dashboard-header">
        <h1>AI Interview Prep</h1>

        <p>
          Upload your resume and get an AI-generated interview
          report tailored to your target job.
        </p>
      </section>


      <section className="dashboard-actions">

        <button
          className="button primary-button"
          onClick={() => navigate("/upload")}
        >
          Generate New Report
        </button>

      </section>


      <section className="dashboard-history">

        <h2>Previous Reports</h2>


        {loading ? (
          <p>Loading...</p>
        ) : reports.length === 0 ? (

          <p>No interview reports yet.</p>

        ) : (

          <div className="reports-list">

            {reports.map((report) => (

              <div
                key={report._id}
                className="report-card"
              >

                <h3>
                  Interview Report
                </h3>


                <p>
                  Score: {report.overallScore}/100
                </p>


                <p>
                  Created on{" "}
                  {new Date(
                    report.createdAt
                  ).toLocaleDateString()}
                </p>


                <button
                  className="button secondary-button"
                  onClick={() =>
                    navigate(`/report/${report._id}`)
                  }
                >
                  View Report
                </button>


              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
};

export default Dashboard;