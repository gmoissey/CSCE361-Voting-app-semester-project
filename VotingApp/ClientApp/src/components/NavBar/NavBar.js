import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.scss';

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAuthenticated: sessionStorage.getItem('authenticated') === 'true'
         };
    }

    logout() { 
        sessionStorage.setItem('authenticated', false);
        sessionStorage.setItem('username', '');
        this.setState({isAuthenticated: false});
    }

    render() { 
        return (
            <Navbar className="navbar-light navbar-expand-md py-3 shadow-sm">
            <Container>
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <span className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-rounded bs-icon-primary me-2 bs-icon">
                        <svg
                        className="bi bi-arrow-up-right-square"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        >
                        <path
                            fillRule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                        />
                        </svg>
                    </span>
                    <span>VoterPortal</span>
                </a>
                <button
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navcol-2"
                >
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon" />
                </button>
                <div id="navcol-2" className="collapse navbar-collapse">
                    {
                        this.state.isAuthenticated ? 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logout} href="/">Logout</a>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                            <a className="nav-link active" href="/register">
                                Register
                            </a>
                            </li>
                        
                            <a className="btn btn-primary ms-md-2" role="button" href="/login">
                                Login
                            </a>
                        </ul>

                    }
                </div>
            </Container>
            </Navbar>
        );
    }
}