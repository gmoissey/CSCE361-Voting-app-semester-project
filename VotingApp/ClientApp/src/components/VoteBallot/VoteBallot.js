import "./VoteBallot.scss";

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import VoterAPI from "../../API/VoterAPI";
import withRouter from "../router/withRouter";

class VoteBallot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            vote: {
                electionId: -1,
                voterUsername: sessionStorage.getItem('username'),
                vote: -1
            },
            selectedElection: {
                id: -1,
                candidate1: {},
                candidate2: {}
            },
            errors: [],
            loading: false,
            hasVoted: sessionStorage.getItem(`${sessionStorage.getItem('username')}HasVoted${this.props.params.id}`),
            isAuthenticated: sessionStorage.getItem('authenticated')
        };
        this.handleSubmit = this.handleVoteSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.loadElection = this.loadElection.bind(this);
        this.loadVoteBallot = this.loadVoteBallot.bind(this);
    }

    componentDidMount() {
        this.loadElection(this.props.params.id);
        this.state.vote.electionId = this.props.params.id;
        this.loadVoteBallot();
    }

    loadVoteBallot() {
        let vote = {
            VoterUsername: sessionStorage.getItem('username'),
            ElectionId: this.props.params.id
        }
        VoterAPI.findVote(vote).then((response) => {
            if(response.status == 404) return;
            this.setState({
                disabled: true,
                vote: response
            });
        });
    }

    loadElection(electionId) {
        VoterAPI.getElection(electionId).then((response) => {
            this.setState({selectedElection: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    handleVoteSubmit(event) {
        event.preventDefault();
        this.setState({errors: []});

        if(sessionStorage.getItem(`${sessionStorage.getItem('username')}hasVoted${this.props.params.id}`)) {
            this.setState({errors: ['You have already voted!']});
            return;
        }

        if (this.state.vote.vote === -1) {
            this.setState({errors: ['You must have a valid vote in order to submit.']});
            return;
        }

        if (!this.state.isAuthenticated) {
            this.setState({errors: ['You must be an authenticated voter in order to vote.']});
            return;
        }

        this.setState({loading: true});
        VoterAPI.sendVote(this.state.vote).then((response) => {
            
        }).catch((error) => {
            this.setState({errors: ["An error occurred while voting."]});
        }).finally(() => {
            this.setState({loading: false});
            sessionStorage.setItem(`${sessionStorage.getItem('username')}hasVoted${this.props.params.id}`, true);
            this.props.navigate(`/succesfulvote/${this.props.params.id}`);
        });
    }

    handleFormChange(event) {
        this.setState({
            vote: {
                ...this.state.vote,
                vote: event.target.value
            }
        });
    }

    render() { 
        return (
            <Container>
                <h1>
                    {this.state.selectedElection.title}
                </h1>
                <Form onSubmit={this.handleSubmit} className={this.state.loading ? "dontDisplay" : null}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Choose</th>
                        <th>Candidate Name</th>
                        <th>Party</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                            <td>
                                <Form.Check 
                                    type='radio'
                                    id={`default-radio`}
                                    name="vote"
                                    value="1"
                                    {
                                        ...this.state.vote.vote === 1 ? {checked: true} : null
                                    }
                                    onChange={this.handleFormChange}
                                    disabled={this.state.disabled}
                                />
                            </td>
                            <td>{this.state.selectedElection.candidate1['firstName']} {this.state.selectedElection.candidate1['lastName']}</td>
                            <td>{this.state.selectedElection.candidate1['party']}</td>
                            </tr>
                        }
                        {
                            <tr>
                            <td>
                                <Form.Check 
                                    type='radio'
                                    id={`default-radio`}
                                    name="vote"
                                    value="2"
                                    {
                                        ...this.state.vote.vote === 2 ? {checked: true} : null
                                    }
                                    onChange={this.handleFormChange}
                                    disabled={this.state.disabled}
                                />
                            </td>
                            <td>{this.state.selectedElection.candidate2['firstName']} {this.state.selectedElection.candidate2['lastName']}</td>
                            <td>{this.state.selectedElection.candidate2['party']}</td>
                            </tr>
                        }
                    </tbody>
                    </Table>
                    <Button variant="primary" type="submit" value="Submit" hidden={sessionStorage.getItem(`${sessionStorage.getItem('username')}hasVoted${this.props.params.id}`)}>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(VoteBallot);