import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },

  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },

  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="q-card">
      <div
        className="q-card__header"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="q-card__index">
          Q{index + 1}
        </span>

        <p className="q-card__question">
          {item.question}
        </p>
                {open && (
          <div className="q-card__body">

            <div className="q-card__section">
              <span className="q-card__tag q-card__tag--answer">
                Model Answer
              </span>

              <p>{item.answer}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};


const RoadMapDay = ({ step, index }) => (
  <div className="roadmap-day">

    <div className="roadmap-day__header">

      <span className="roadmap-day__badge">
        Step {index + 1}
      </span>

    </div>

    <p className="roadmap-day__focus">
      {step}
    </p>

  </div>
);


const Report = () => {

  const { id } = useParams();

  const {
    report,
    loading,
    getReportById,
    getResumePdf,
  } = useInterview();


  const [activeTab, setActiveTab] = React.useState(
    "technical"
  );


  useEffect(() => {

    getReportById(id);

  }, [id]);


  if (loading) {
    return (
      <main className="report-page">
        <h2>Loading...</h2>
      </main>
    );
  }


  if (!report) {
    return (
      <main className="report-page">
        <h2>Report not found.</h2>
      </main>
    );
  }


  const scoreColor =
    report.overallScore >= 80
      ? "score--high"
      : report.overallScore >= 60
      ? "score--mid"
      : "score--low";
        return (
    <main className="report-page">

      <div className="interview-layout">


        <aside className="interview-nav">

          <div>

            <p className="interview-nav__label">
              Report
            </p>


            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={
                  `interview-nav__item ${
                    activeTab === item.id
                      ? "interview-nav__item--active"
                      : ""
                  }`
                }
                onClick={() => setActiveTab(item.id)}
              >

                <span className="interview-nav__icon">
                  {item.icon}
                </span>

                {item.label}

              </button>
            ))}

          </div>


        </aside>



        <div className="interview-divider" />



        <section className="interview-content">


          {activeTab === "technical" && (

            <>

              <div className="content-header">

                <h2>
                  Technical Questions
                </h2>

                <span className="content-header__count">
                  {report.technicalQuestions.length}
                </span>

              </div>



              <div className="q-list">

                {report.technicalQuestions.map(
                  (item, index) => (

                    <QuestionCard
                      key={index}
                      item={item}
                      index={index}
                    />

                  )
                )}

              </div>

            </>

          )}




          {activeTab === "behavioral" && (

            <>

              <div className="content-header">

                <h2>
                  Behavioral Questions
                </h2>

                <span className="content-header__count">
                  {report.behavioralQuestions.length}
                </span>

              </div>



              <div className="q-list">

                {report.behavioralQuestions.map(
                  (item, index) => (

                    <QuestionCard
                      key={index}
                      item={item}
                      index={index}
                    />

                  )
                )}

              </div>

            </>

          )}
                    {activeTab === "roadmap" && (

            <>

              <div className="content-header">

                <h2>
                  Preparation Plan
                </h2>

              </div>


              <div className="roadmap-list">

                {report.preparationPlan.map(
                  (step, index) => (

                    <RoadMapDay
                      key={index}
                      step={step}
                      index={index}
                    />

                  )
                )}

              </div>

            </>

          )}


        </section>




        <div className="interview-divider" />



        <aside className="interview-sidebar">


          <div className="overall-score">


            <p className="overall-score__label">
              Overall Score
            </p>


            <div
              className={`overall-score__ring ${scoreColor}`}
            >

              <span className="overall-score__value">
                {report.overallScore}
              </span>

              <span className="overall-score__pct">
                /100
              </span>

            </div>


          </div>




          <div className="sidebar-divider" />



          <div className="skill-gaps">

            <p className="skill-gaps__label">
              Skill Gaps
            </p>


            <div className="skill-gaps__list">

              {report.skillGaps.map(
                (gap, index) => (

                  <span
                    key={index}
                    className="skill-tag"
                  >
                    {gap}
                  </span>

                )
              )}

            </div>

          </div>




          <button
            className="button primary-button"
            onClick={() => getResumePdf(id)}
          >
            Download ATS Resume
          </button>



        </aside>


      </div>


    </main>
  );

};


export default Report;