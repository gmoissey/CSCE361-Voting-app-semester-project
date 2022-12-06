import './VoterSummary.scss';

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';

export class VoterSummary extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <h1>
                    2022 Elections Summary:
                </h1>
                <h3>
                    Total Votes: 2
                </h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Voter ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Voted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>Yes</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Some</td>
                        <td>Dude</td>
                        <td>Yes</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}