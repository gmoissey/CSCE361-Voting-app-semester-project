import "./RegistrationPage.scss";

import React, { Component } from "react";

import { Navigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import VoterAPI from "../../API/VoterAPI";
import Spinner from 'react-bootstrap/Spinner';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                FirstName: '',
                LastName: '',
                Username: '',
                PasswordHash: '',
                DOB: '',
                Party: ''
            },
            errors: [],
            loading: false,
            isAuthenticated: false
        };
        this.handleSubmit = this.handleRegisterSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
    
    handleRegisterSubmit(event) {
        event.preventDefault();
        this.setState({errors: []});

        if(!this.validateAge(this.state.person.DOB)) {
            this.setState({errors: ['You must be 18 years old to register.']});
            return;
        }
        
        this.setState({loading: true});
        VoterAPI.registerPerson(this.state.person).then((response) => {
            this.setState({isAuthenticated: true});
            sessionStorage.setItem('authenticated', true);
            sessionStorage.setItem('username', this.state.person.Username);
            this.render();
        }).catch((error) => {
            this.setState({errors: ["An error occurred while registering."]});
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    handleFormChange(event) {
        this.setState({
            person: {
                ...this.state.person,
                [event.target.name]: event.target.value
            }
        });
      }

    validateAge(dob) {
        if(dob === '') return false;

        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    }

    render() { 
        if(this.state.isAuthenticated) {  
            return <Navigate to="/" />
        }
        return (
            <Container className="page-container d-flex justify-content-center align-items-center">
            <Card className="main-card">
                <Card.Body>
                    <Card.Text>
                        <h2>
                            Registration
                        </h2>
                        <Spinner animation="border" variant="primary" className={this.state.loading ? null : "dontDisplay"}/>
                        <Form onSubmit={this.handleSubmit} className={this.state.loading ? "dontDisplay" : null}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>Firt Name</Form.Label>
                                <Form.Control type="text" name="FirstName" onChange={this.handleFormChange} placeholder="first name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="LastName" onChange={this.handleFormChange} placeholder="last name" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" name="Username" onChange={this.handleFormChange} placeholder="username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Affiliated Party</Form.Label>
                                <Form.Control type="text" name="Party" onChange={this.handleFormChange} placeholder="party" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="PasswordHash" onChange={this.handleFormChange} placeholder="strong password" />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridVoterId">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="date" name="DOB" onChange={this.handleFormChange} placeholder="" />
                                </Form.Group>
                            </Row>

                            {
                                this.state.errors.length > 0 ? 
                                <Alert displaukey='danger' variant='danger'>
                                    {
                                    this.state.errors.map((error, index) => {
                                        return <p key={index}>{error}</p>;
                                    }
                                    )}
                                </Alert>
                                : null
                            }
                            <Button variant="primary" type="submit" value="Submit">
                                Register
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Container>
            
        );
    }
}

export default RegistrationPage;