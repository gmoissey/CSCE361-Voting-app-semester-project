import "./LoginPage.scss";

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export class LoginPage extends Component {
    render() { 
        return (
            <Container className="page-container d-flex justify-content-center align-items-center">
            <Card className="main-card">
                <Card.Body>
                    <Card.Text>
                        <h2>
                            Login
                        </h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Voter ID</Form.Label>
                                <Form.Control type="id" placeholder="Enter ID" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Voting Session ID</Form.Label>
                                <Form.Control type="id" placeholder="Enter Session ID" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
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