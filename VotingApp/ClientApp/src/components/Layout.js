import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavBar } from './NavBar/NavBar'

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBar />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
