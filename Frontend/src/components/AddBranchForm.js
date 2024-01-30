import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const AddBranchForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    sname: '',
    cname: '',
    branchadd: '',
    contact: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const sendDataToBackend = () => {
      axios
        .post('http://localhost:8080/branches/addBranch', JSON.stringify(formData), {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
          // Reset form and state after successful submission
          setFormData({
            sname: '',
            cname: '',
            branchadd: '',
            contact: '',
          });
          setErrors({});
          setIsFormSubmitted(false);

          // Show the success modal
          handleShow();
        })
        .catch((error) => {
          console.error('Error adding branch:', error);
          // Handle error if needed
        });
    };

    if (isFormSubmitted) {
      sendDataToBackend();
    }
  }, [isFormSubmitted, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform client-side validation
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If there are no validation errors, set the form as submitted
    if (Object.keys(validationErrors).length === 0) {
      setIsFormSubmitted(true);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.sname.trim()) {
      errors.sname = 'State Name is required';
    }

    if (!data.cname.trim()) {
      errors.cname = 'City Name is required';
    }

    if (!data.branchadd.trim()) {
      errors.branchadd = 'Address is required';
    }

    if (!data.contact.trim()) {
      errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/i.test(data.contact)) {
      // Validate as a 10-digit phone number
      errors.contact = 'Please enter a valid 10-digit phone number';
    }

    return errors;
  };

  return (
    <div className='container'>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Branch Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your content here */}
          <p>Branch Added Successfully</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='row justify-content-center mt-5' >
        <div className='col-md-6'>
          <div className='card'>
          <h2 className='card-title'>Add Branch Form</h2>
            <div className='card-body'  style={{textAlign:'left'}}>
              
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor="sname" className='form-label'>State Name:</label>
                  <input
                    type="text"
                    id="sname"
                    name="sname"
                    value={formData.sname}
                    onChange={handleInputChange}
                    className={`form-control ${errors.sname ? 'is-invalid' : ''}`}
                    placeholder="Enter State Name"
                  />
                  {errors.sname && <div className="invalid-feedback">{errors.sname}</div>}
                </div>

                <div className='mb-3'>
                  <label htmlFor="cname" className='form-label'>City Name:</label>
                  <input
                    type="text"
                    id="cname"
                    name="cname"
                    value={formData.cname}
                    onChange={handleInputChange}
                    className={`form-control ${errors.cname ? 'is-invalid' : ''}`}
                    placeholder="Enter City Name"
                  />
                  {errors.cname && <div className="invalid-feedback">{errors.cname}</div>}
                </div>

                <div className='mb-3'>
                  <label htmlFor="branchadd" className='form-label'>Address:</label>
                  <input
                    type="text"
                    id="branchadd"
                    name="branchadd"
                    value={formData.branchadd}
                    onChange={handleInputChange}
                    className={`form-control ${errors.branchadd ? 'is-invalid' : ''}`}
                    placeholder="Enter Address"
                  />
                  {errors.branchadd && <div className="invalid-feedback">{errors.branchadd}</div>}
                </div>

                <div className='mb-3'>
                  <label htmlFor="contact" className='form-label'>Contact:</label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                    placeholder="Enter Contact Number"
                  />
                  {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                </div>

                <div className='mb-3 text-center'>
                  <button type="submit" className='btn btn-primary'>Add Branch</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBranchForm;
