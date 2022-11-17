import "./VotingMenu.scss";

import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

export class VotingMenu extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <h1 className="mg-4">
                    Current Active Elections:
                </h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Election Title</th>
                        <th>Start Data</th>
                        <th>End Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>2022 Mayor Election</td>
                        <td>May 24</td>
                        <td>May 25</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>2022 Board Election</td>
                        <td>August 28</td>
                        <td>August 29</td>
                        </tr>
                    </tbody>
                    </Table>
            </Container>
        );
    }
}