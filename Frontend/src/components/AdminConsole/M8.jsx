import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LmsComp() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
    const [branchDetails, setBranchDetails] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch states from the first API link
        axios.get('http://localhost:8080/branches/uniqueSnames')
            .then(response => {
                setStates(response.data);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch city names from the second API link when a state is selected
        if (selectedState) {
            axios.get(`http://localhost:8080/branches/getCname/${selectedState}`)
                .then(response => {
                    setCities(response.data);
                })
                .catch(error => {
                    console.error(`Error fetching cities for state ${selectedState}`, error);
                });
        }
    }, [selectedState]);

    const handleModalShow = (selectedOption) => {
        setShowModal(true);
        setSelectedDropdownOption(selectedOption);

        // Fetch other details based on the selected city using the third API link
        if (selectedState && selectedOption) {
            axios.get(`http://localhost:8080/branches/getBranchaddByCname/${selectedOption}`)
                .then(response => {
                    // Check if the response data is an array with two elements
                    if (Array.isArray(response.data) && response.data.length === 1 && Array.isArray(response.data[0]) && response.data[0].length === 2) {
                        setBranchDetails(response.data[0]);
                    } else {
                        console.error('Unexpected response format:', response.data);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching details for ${selectedOption} in ${selectedState}:`, error);
                });
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        // Show confirmation popup
        const isConfirmed = window.confirm('Are you sure you want to delete this data?');

        if (isConfirmed) {
            // Send a DELETE request to the server with the selected option
            axios.delete(`http://localhost:8080/branches/deleteByCname/${selectedDropdownOption}`)
                .then(response => {
                    window.alert('Delete successful:', response.data);
                    handleRefresh();   
                })
                .catch(error => {
                    console.error('Error deleting data:', error);
                });
        }
    };

    const addcomp = () => {
        navigate('/addcompp');
    }

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div>
            <h1> INSTITUTE BRANCHES</h1>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container className='States'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{width:'100%'}}>
                            {states.map(state => (
                                <NavDropdown
                                    key={state}
                                    title={state}
                                    id={`${state}-dropdown`}
                                    className="me-auto"
                                    onClick={() => setSelectedState(state)}
                                >
                                    {cities.map(city => (
                                        <NavDropdown.Item key={city} onClick={() => handleModalShow(city)}>
                                            {city}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton className="Drop1">
                    <Modal.Title>{` ${selectedDropdownOption}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="Drop">
                    <Form>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Branch Address</Form.Label>
                            {branchDetails.length === 2 && (
                                <h5>{branchDetails[0]}</h5>
                            )}
                        </Form.Group>
                    </Form>
                    <hr></hr>
                    <h6>ContactNo:</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            {branchDetails.length === 2 && (
                                <h5>{branchDetails[1]}</h5>
                            )}
                        </div> 
                        <div>
                            <Button variant="outline-primary" className="me-2" onClick={addcomp}>
                                Add
                            </Button>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>                      
                    </div>
                </Modal.Body>
            </Modal>

            <Carousel style={{ width: '100%' }}>
                <Carousel.Item interval={1000}>
                    <div style={{ position: 'relative' }}>
                        <img src='https://blog.clrskills.com/wp-content/uploads/2018/09/Factors-that-Govern-Skill-Development-in-India.jpg' alt="Institute"  />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <div style={{ position: 'relative' }}>
                        <img src='https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/edu/art/5bc590227d9d7.jpeg' alt="Institute"   />
                        <div>
                            {/* Additional content if needed */}
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <div style={{ position: 'relative' }}>
                        <img src='https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/edu/art/5b4f25fa4a349.jpg' alt="Institute" />
                        <div>
                            {/* Additional content if needed */}
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default LmsComp;
