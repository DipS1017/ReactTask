
const profileFormSchema = {
  title: "Profile Form",
  fields: [
    { name: "username", label: "Username", type: "text", placeholder: "Enter your username", required: true },
    { name: "age", label: "Age", type: "number", placeholder: "Enter your age", required: true },
    { name: "bio", label: "Bio", type: "textarea", placeholder: "Tell us about yourself", required: false },
  ],
};

export default profileFormSchema;
