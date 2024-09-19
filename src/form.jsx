
import React, { useState } from 'react';
import './form.css'; // Import the CSS file

const Form = ({ schema, onSubmit }) => {
  // Initialize state for form fields
  const [formState, setFormState] = useState(() => {
    // Initialize form state with empty values
    const initialState = {};
    schema.fields.forEach(field => {
      initialState[field.name] = '';
    });
    return initialState;
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form state as a JSON object
    console.log('Form data:', JSON.stringify(formState, null, 2));
    // Call the onSubmit callback with the form data
    onSubmit(formState);
  };

  return (
    <div className="form-container">
      <h2>{schema.title}</h2>
      <form onSubmit={handleSubmit}>
        {schema.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formState[field.name] || ''}
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={field.type !== 'file' ? formState[field.name] || '' : undefined}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

