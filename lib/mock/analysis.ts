import type { AnalysisResult } from "@/types/analysis";

export const mockAnalysis: AnalysisResult = {
  score: 25,

  issues: [
    {
      title: "Lack of specificity",
      severity: "high",
      description:
        "The prompt does not specify any features, style, or content for the personal webpage.",
    },
    {
      title: "Missing technical requirements",
      severity: "high",
      description:
        "No programming languages, frameworks, or technologies are mentioned.",
    },
    {
      title: "No output format specified",
      severity: "medium",
      description:
        "The prompt does not describe the expected output format or file types.",
    },
    {
      title: "No context or purpose",
      severity: "medium",
      description:
        "The prompt lacks information about the intended audience or purpose of the personal webpage.",
    },
  ],

  suggestions: [
    "Specify the content sections (e.g., about me, portfolio, contact).",
    "Mention preferred technologies or frameworks (e.g., HTML, CSS, React).",
    "Define the desired style or theme (e.g., minimalistic, colorful).",
    "Indicate the output format (e.g., a single HTML file, a React app).",
    "Provide context such as the webpage's purpose or target audience.",
  ],

  improvedPrompt:
    "Build me a personal webpage that includes an About Me section, a portfolio showcasing my projects, and a contact form. " +
    "Use HTML, CSS, and JavaScript with a clean and modern design. " +
    "The output should be a responsive single-page website suitable for desktop and mobile. " +
    "Please provide all necessary files and instructions for deployment.",

  explanation: [
    {
      change: "Added specific content sections and features",
      reason:
        "To give clear guidance on what the webpage should contain.",
    },
    {
      change: "Specified technologies and design style",
      reason:
        "To align development with preferred tools and aesthetics.",
    },
    {
      change: "Defined output format and responsiveness",
      reason:
        "To clarify the expected deliverable and usability across devices.",
    },
    {
      change: "Included context for purpose and audience",
      reason:
        "To help tailor the webpage for its intended users.",
    },
  ],
};