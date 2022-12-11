import './ElectionResults.scss';

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Check2Circle } from 'react-bootstrap-icons'
import VoterAPI from "../../API/VoterAPI";
import withRouter from "../router/withRouter";

class ElectionResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            election: {
                candidate1: {},
                candidate2: {}
            },
            votes1: 0,
            votes2: 0,
            totalVotes: 0
        };
        this.loadResults = this.loadResults.bind(this);
        this.calculateVotes = this.calculateVotes.bind(this);
    }

    componentDidMount() {
        this.loadResults(this.props.params.id);
    }

    loadResults(electionId) {
        VoterAPI.getElection(electionId).then((response) => {
            this.setState({election: response});
        }).catch((error) => {
            console.log(error);
        });

        VoterAPI.getVotes().then((response) => {
            this.setState({votes: response});
        }).catch((error) => {
            console.log(error);
        });
    }

    calculateVotes() {
        this.state.votes.map((vote, index) => {
            if (vote.electionId == this.props.params.id) {
                if (vote.vote == 1) {
                    this.state.votes1++;
                } else if (vote.vote == 2) {
                    console.log(vote);
                    this.state.votes2++;
                }
                this.state.totalVotes++;
            }
        })
    }

    render() { 
        if (this.state.votes1 == 0) {
            this.calculateVotes();
        }
        return (
            <Container>
                <h1>
                    {this.state.election.title} Results:
                </h1>
                <br/>
                <div>
                    <Row>
                        <Col className="left-candidate">
                            <h3>{this.state.election.candidate1['firstName']} {this.state.election.candidate1['lastName']}</h3>
                        </Col>
                        <Col className="right-candidate">
                            <h3>{this.state.election.candidate2['firstName']} {this.state.election.candidate2['lastName']}</h3>
                        </Col>
                    </Row>
                    <ProgressBar>
                        <ProgressBar striped variant="success" now={(this.state.votes1 / this.state.totalVotes) * 100} key={1} />
                        <ProgressBar striped variant="info" now={(this.state.votes2 / this.state.totalVotes) * 100} key={2} />
                    </ProgressBar>
                    <Row>
                        <Col className="left-candidate">
                            {this.state.votes1} votes
                        </Col>
                        <Col className="right-candidate">
                        {this.state.votes2} votes
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default withRouter(ElectionResults);