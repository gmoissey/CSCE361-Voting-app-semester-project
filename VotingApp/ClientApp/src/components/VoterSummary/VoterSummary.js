import './VoterSummary.scss';

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import withRouter from '../router/withRouter';
import VoterAPI from '../../API/VoterAPI';

class VoterSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            voters: [],
            election: {},
            count: 0
        };
        this.loadVotes = this.loadVotes.bind(this);
        this.loadVoters = this.loadVoters.bind(this);
        this.loadElection = this.loadElection.bind(this);
    };

    componentDidMount() {
        this.loadVotes();
        this.loadVoters();
        this.loadElection(this.props.params.id);
    }

    loadVotes() {
        VoterAPI.getVotes().then((response) => {
            this.setState({votes: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    loadVoters() {
        VoterAPI.getPerson().then((response) => {
            this.setState({voters: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    loadElection(electionId) {
        VoterAPI.getElection(electionId).then((response) => {
            this.setState({election: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() { 
        return (
            <Container>
                <h1>
                    {this.state.election.title} Summary:
                </h1>
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
                        {
                            this.state.voters.map((voter, index) => {
                                if (sessionStorage.getItem(`${voter.username}hasVoted${this.props.params.id}`)) {
                                    return (
                                        <tr>
                                            <td>{voter.username}</td>
                                            <td>{voter.firstName}</td>
                                            <td>{voter.lastName}</td>
                                            <td>Yes</td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr>
                                            <td>{voter.username}</td>
                                            <td>{voter.firstName}</td>
                                            <td>{voter.lastName}</td>
                                            <td>No</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default withRouter(VoterSummary);