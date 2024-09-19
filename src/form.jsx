
import React, { useState } from 'react';
import './form.css'; // Import the CSS file

const Form = ({ schema, onSubmit }) => {
  // Initialize state for form fields
  const [formState, setFormState] = useState(() => {
    const initialState = {};
    schema.fields.forEach(field => {
      initialState[field.name] = '';
    });
    return initialState;
  });  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };  // Validate form fields
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
      console.log('Form data:', JSON.stringify(formState, null, 2));
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

