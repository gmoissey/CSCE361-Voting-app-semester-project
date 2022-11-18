import "./SuccesfulVote.scss";
import Button from 'react-bootstrap/Button';

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';

export class SuccesfulVote extends Component {
    state = {  } 
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
                    <Button variant="primary m" size="md">
                        View Ballot
                    </Button>
                    <Button variant="secondary" size="md">
                        View Results
                    </Button>
                </div>
            </Container>
        );
    }
}