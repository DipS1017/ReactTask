
const jobApplicationFormSchema = {
  title: "Job Application Form",
  fields: [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
    { name: "position", label: "Position Applied For", type: "text", placeholder: "Enter position", required: true },
    { name: "resume", label: "Resume", type: "file", required: true },
  ],
};

export default jobApplicationFormSchema;
