
import React, { useState } from 'react';
import Form from './form'; 
import contactFormSchema from './contactFormSchema';
import profileFormSchema from './profileFormSchema';
import jobApplicationFormSchema from './jobApplicationForm';

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState('contact');

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  const getFormSchema = () => {
    switch (selectedForm) {
      case 'profile':
        return profileFormSchema;
      case 'job':
        return jobApplicationFormSchema;
      case 'contact':
      default:
        return contactFormSchema;
    }
  };

  const handleFormSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <div>
      <label>Select Form: </label>
      <select value={selectedForm} onChange={handleFormChange}>
        <option value="contact">Contact Form</option>
        <option value="profile">Profile Form</option>
        <option value="job">Job Application Form</option>
      </select>

      <Form schema={getFormSchema()} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default FormSelector;
