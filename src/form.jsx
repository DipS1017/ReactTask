
import React, { useState } from 'react';
import './form.css'; // Import the CSS file

const Form = ({ schema, onSubmit }) => {
  // Initialize state for form fields
  const [formState, setFormState] = useState(() => {
    const initialState = {};
    schema.fields.forEach(field => {
      if (field.type === 'checkbox') {
        initialState[field.name] = false;  // Initialize checkbox as false
      } else if (field.type === 'file') {
        initialState[field.name] = null;   // Initialize file as null
      } else {
        initialState[field.name] = '';     // Initialize other inputs as empty strings
      }
    });
    return initialState;
  });
  
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, type } = e.target;

    switch (type) {
      case 'checkbox':
        setFormState(prevState => ({
          ...prevState,
          [name]: e.target.checked   // Set state for checkbox
        }));
        break;
        
      case 'file':
        setFormState(prevState => ({
          ...prevState,
          [name]: e.target.files.length > 0 ? e.target.files : null   // Handle multiple files if needed
        }));
        break;
        
      case 'date':
        setFormState(prevState => ({
          ...prevState,
          [name]: e.target.value   // Handle date picker input
        }));
        break;

      default:
        setFormState(prevState => ({
          ...prevState,
          [name]: e.target.value   // Default case for text, textarea, and other types
        }));
        break;
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    schema.fields.forEach(field => {
      if (field.required && !formState[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formState);  // File input will be an object, not JSON.stringify
      onSubmit(formState);
    }
  };

  return (
    <div className="form-container">
      <h2>{schema.title}</h2>
      <form onSubmit={handleSubmit}>
        {schema.fields.map(field => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formState[field.name] || ''}
                onChange={handleChange}
              />
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                checked={formState[field.name] || false}
                onChange={handleChange}
              />
            ) : field.type === 'file' ? (
              <input
                type="file"
                name={field.name}
                id={field.name}
                multiple={field.multiple}   // Support multiple files if the schema has `multiple: true`
                onChange={handleChange}
              />
            ) : field.type === 'date' ? (
              <input
                type="date"
                name={field.name}
                id={field.name}
                value={formState[field.name] || ''}
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                value={formState[field.name] || ''}
                onChange={handleChange}
              />
            )}
            {errors[field.name] && <p className="error">{errors[field.name]}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

