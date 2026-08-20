const Groq = require("groq-sdk");

const puppeteer = require("puppeteer");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});





async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {

  const prompt = `
You are an expert technical interviewer.

Analyze the candidate resume and job description.

Generate an interview preparation report.

Return ONLY valid JSON.

The JSON must follow this structure:

{
  "overallScore": number,

  "technicalQuestions": [
    {
      "question": "string",
      "answer": "string"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "string",
      "answer": "string"
    }
  ],

  "skillGaps": [
    "string"
  ],

  "preparationPlan": [
    "string"
  ]
}


Resume:
${resume}


Self Description:
${selfDescription}


Job Description:
${jobDescription}
`;


  const response = await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    response_format: {
      type: "json_object",
    },

  });


  return JSON.parse(
    response.choices[0].message.content
  );

}

async function generatePdfFromHtml(html) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html);

  const pdf = await page.pdf({
    format: "A4",
  });

  await browser.close();

  return pdf;
}

async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const resumeSchema = z.object({
    html: z.string(),
  });

  const prompt = `
Generate a professional ATS-friendly HTML resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await groq.chat.completions.create({

  model: "llama-3.3-70b-versatile",

  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],

  response_format: {
    type: "json_object",
  },

});


const html = JSON.parse(
  response.choices[0].message.content
);

  return generatePdfFromHtml(html.html);
}

module.exports = {
  generateInterviewReport,
  generateResumePdf,
};