import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";


const UploadResume = () => {

  const navigate = useNavigate();


  const {
    generateReport,
    loading,
  } = useInterview();



  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!resume) {

      setError("Please upload your resume.");

      return;

    }


    setError("");



    try {

      const report = await generateReport({

        resumeFile: resume,

        selfDescription,

        jobDescription,

      });



      if (report?._id) {

        navigate(`/report/${report._id}`);

      } else {

        setError(
          "Something went wrong while generating your report."
        );

      }


    } catch (err) {

      console.error(err);

      setError(
        "Failed to generate report. Please try again."
      );

    }

  };



  return (

    <main className="upload-page">


      <div className="upload-container">


        <h1>
          Generate Interview Report
        </h1>



        <form onSubmit={handleSubmit}>


          <div className="input-group">


            <label htmlFor="resume">
              Resume (PDF)
            </label>


            <input

              id="resume"

              type="file"

              accept=".pdf"

              onChange={(e) => {

                setResume(e.target.files[0]);

                setError("");

              }}

            />


          </div>





          <div className="input-group">


            <label htmlFor="selfDescription">

              Tell us about yourself

            </label>



            <textarea

              id="selfDescription"

              rows={6}

              value={selfDescription}

              onChange={(e) =>
                setSelfDescription(e.target.value)
              }

              placeholder="Tell us about yourself..."

            />


          </div>






          <div className="input-group">


            <label htmlFor="jobDescription">

              Job Description

            </label>




            <textarea

              id="jobDescription"

              rows={10}

              value={jobDescription}

              onChange={(e) =>
                setJobDescription(e.target.value)
              }

              placeholder="Paste the job description..."

            />


          </div>




          {error && (

            <p className="form-error">
              {error}
            </p>

          )}
           {loading && (

           <div className="ai-loading">

              <div className="loader"></div>

             <p>
             AI is analysing your resume and preparing your interview report...
             </p>

             </div>

              )}





          <button

            className="button primary-button"

            type="submit"

            disabled={loading}

          >

           {loading

               ? "Analysing Resume..."

                    : "Generate Interview Report"

             }  

          </button>



        </form>



      </div>



    </main>

  );

};



export default UploadResume;