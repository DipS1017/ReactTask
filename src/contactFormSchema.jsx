
const contactFormSchema = {
  title: "Contact Form",
  fields: [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email", required: true },
    { name: "message", label: "Message", type: "textarea", placeholder: "Enter your message", required: true },
  ],
};

export default contactFormSchema;
