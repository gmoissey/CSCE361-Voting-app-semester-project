import './ElectionResults.scss';

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class ElectionResults extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <h1>
                    2022 Elections:
                </h1>
                <br/>
                <div>
                    <Row>
                        <Col className="left-candidate">
                            <h3>Candidate 1</h3>
                            <h3>40%</h3>
                        </Col>
                        <Col className="right-candidate">
                            <h3>Candidate 2</h3>
                            <h3>60%</h3>
                        </Col>
                    </Row>
                    <ProgressBar>
                        <ProgressBar striped variant="success" now={40} key={1} />
                        <ProgressBar striped variant="info" now={60} key={2} />
                    </ProgressBar>
                </div>
            </Container>
        );
    }
}