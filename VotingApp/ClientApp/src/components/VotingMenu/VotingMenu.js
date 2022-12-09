import "./VotingMenu.scss";

import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import VoterAPI from '../../API/VoterAPI';

export class VotingMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elections: []
        };

        this.loadElections = this.loadElections.bind(this);
    }

    componentDidMount() {
        this.loadElections();
    }

    loadElections() {
        VoterAPI.getElections().then((response) => {
            this.setState({elections: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    
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
                        <th>Candidate 1</th>
                        <th>Candidate 2</th>
                        <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.elections.map((election, index) => {
                                if(new Date(election.endDate) > new Date()) return;
                                return (
                                    <tr>
                                        <td>{election.id}</td>
                                        <td>{election.title}</td>
                                        <td>{election.candidate1["firstName"] + " " + election.candidate1["lastName"]}</td>
                                        <td>{election.candidate2["firstName"] + " " + election.candidate2["lastName"]}</td>
                                        <td>{election.endDate}</td>
                                    </tr>
                                );
                            }
                        )
                        }
                    </tbody>
                </Table>

                <h1 className="mg-4">
                    Past Elections:
                </h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Election Title</th>
                        <th>Candidate 1</th>
                        <th>Candidate 2</th>
                        <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.elections.map((election, index) => {
                                if(new Date(election.endDate) <= new Date()) return;
                                return (
                                    <tr>
                                        <td>{election.id}</td>
                                        <td>{election.title}</td>
                                        <td>{election.candidate1["firstName"] + " " + election.candidate1["lastName"]}</td>
                                        <td>{election.candidate2["firstName"] + " " + election.candidate2["lastName"]}</td>
                                        <td>{election.endDate}</td>
                                    </tr>
                                );
                            }
                        )
                        }
                    </tbody>
                </Table>

                    
            </Container>
        );
    }
}