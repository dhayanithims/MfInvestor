import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail, Image } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl,Alert } from 'react-bootstrap';

export const LoginFormInstance = React.createClass({
    getInitialState() {
        return {
            userName: "",
            password:""
        }
    },

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    },
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    },

    handleClick(e) {
        this.props.onSubmitHandler(this.state.userName, this.state.password);
        e.preventDefault();
    },

    handleRegistrationClick(e) {
        this.props.onRegistrationClickHandler();
        e.preventDefault();
    },
    render() {
       
            var validationState = null;
            if (!this.props.stateObj.isValid) {
                validationState = "error";
            }
            return (
                <div>
                <Form>
                    <h3>Account Login</h3>
                    <FormGroup controlId="formUserName">
                        <ControlLabel>User Name</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder={this.state.userName} value={this.state.userName} onChange={this.handleUserNameChange} />
                    </FormGroup>

                    <FormGroup controlId="formPassword" validationState={validationState}>
                        <ControlLabel>password</ControlLabel>
                        {' '}
                        <FormControl type="password" placeholder="" onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <FormGroup controlId="forgotPwd">
                        <a className="fp" href="#">Forgot Password?</a>
                    </FormGroup>

                    <Button className="loginBtn" bsSize="medium" type="submit" onClick={this.handleClick} block>
                        Login
                </Button>
                    <FormGroup controlId="registration">
                            <a className="fp" href="#" onClick={this.handleRegistrationClick}>New User?</a>
                    </FormGroup>
                </Form>
                <div>
                    {this.props.stateObj.isValid ? (
                        <span></span>
                    ) : (<Alert bsStyle="danger"><b>Login Failed..!! Please retry login.</b></Alert>)
                    }
                </div>

                    </div>
                
            );
        }
});

