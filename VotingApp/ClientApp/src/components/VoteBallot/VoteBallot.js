import "./VoteBallot.scss";

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export class VoteBallot extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <h1>
                    2022 Mayor Election
                </h1>
                <Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Choose</th>
                        <th>Candidate Name</th>
                        <th>Party</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['Candidate John', 'Candidate Another'].map((candidate) =>(
                            <tr>
                            <td>
                                <Form.Check 
                                    type='radio'
                                    id={`default-radio`}
                                    name="election"
                                    value={candidate}
                                />
                            </td>
                            <td>{candidate}</td>
                            <td>Some Party</td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                </Form>
                <Button variant="primary">Submit</Button>
            </Container>
        );
    }
}