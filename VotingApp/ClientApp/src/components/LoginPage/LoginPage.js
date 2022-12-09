import "./LoginPage.scss";

import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import VoterAPI from "../../API/VoterAPI";

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                Username: '',
                PasswordHash: ''
            },
            errors: [],
            loading: false,
            isAuthenticated: false
        };
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        this.setState({errors: []});
        
        this.setState({loading: true});

        VoterAPI.loginPerson(this.state.person).then((response) => {
            this.setState({isAuthenticated: true});
            sessionStorage.setItem('authenticated', true);
            sessionStorage.setItem('username', this.state.person.Username);
            this.render();
        }).catch((error) => {
            debugger;
            this.setState({errors: ["An error occurred while logging in."]});
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
                            Login
                        </h2>
                        <Spinner animation="border" variant="primary" className={this.state.loading ? null : "dontDisplay"}/>
                        <Form onSubmit={this.handleLoginSubmit} className={this.state.loading ? "dontDisplay" : null}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="id" name="Username" onChange={this.handleFormChange} placeholder="username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="PasswordHash" onChange={this.handleFormChange} placeholder="password" />
                            </Form.Group>
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
                                Login
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Container>
        );
    }
}