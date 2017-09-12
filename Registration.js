import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail, Image } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';

export const RegnFormInstance = React.createClass({
    getInitialState() {
        return {
            userName: "",
            password: ""
        }
    },

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    },
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    },

    handleClick(e) {
        this.props.onSubmitHandler();
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
                    <h3>Create Account</h3>
                    <FormGroup controlId="formUserName">
                        <ControlLabel>User Name</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="" value={this.state.userName} onChange={this.handleUserNameChange} />
                    </FormGroup>
                    <FormGroup controlId="formEmail">
                        <ControlLabel>Email</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="" value="" onChange="" />
                    </FormGroup>
                    <FormGroup controlId="newPassword" validationState={validationState}>
                        <ControlLabel>New Password</ControlLabel>
                        {' '}
                        <FormControl type="password" placeholder="" onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" validationState={validationState}>
                        <ControlLabel>Confirm Password</ControlLabel>
                        {' '}
                        <FormControl type="password" placeholder="" onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <Button bsStyle="primary" bsSize="medium" type="submit" onClick={this.handleClick} block>
                        Create Account
                    </Button>
                </Form>
            </div>

        );
    }
});

