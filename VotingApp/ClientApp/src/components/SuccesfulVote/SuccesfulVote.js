import "./SuccesfulVote.scss";
import Button from 'react-bootstrap/Button';

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import withRouter from "../router/withRouter";

class SuccesfulVote extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleSummaryButtonPress = this.handleSummaryButtonPress.bind(this);
        this.handleBallotButtonPress = this.handleBallotButtonPress.bind(this);
    }

    handleSummaryButtonPress(event) {
        this.props.navigate(`/VoterSummary/${this.props.params.id}`);
    }

    handleBallotButtonPress(event) {
        this.props.navigate(`/VoteBallot/${this.props.params.id}`);
    }

    render() { 
        return (
            <Container>
                <h1>
                    2022 Election
                </h1>
                <h3>
                    Thanks for voting!
                </h3>
                <div className="gap-3">
                    <Button variant="primary m" size="md" onClick={this.handleBallotButtonPress}>
                        View Ballot
                    </Button>  
                    <Button variant="secondary" size="md" onClick={this.handleSummaryButtonPress}>
                        View Summary
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(SuccesfulVote);