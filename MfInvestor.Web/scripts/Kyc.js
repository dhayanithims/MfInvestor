import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail, Image } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, Alert, Col, HelpBlock } from 'react-bootstrap';

export const KycFormInstance = React.createClass({
    getInitialState() {
        return {
            pan: "",
            adhar: ""
        }
    },

    handlePanChange(event) {
        this.setState({ pan: event.target.value });
    },
    handleAdharChange(event) {
        this.setState({ adhar: event.target.value });
    },

    handleClick(e) {
        //this.props.onSubmitHandler();
        e.preventDefault();
    },

    render() {

        var validationState = null;
        if (!this.props.stateObj.isValid) {
            validationState = "error";
        }
        return (
            <div className="rightBar">
                <Form horizontal>
                    <Col smOffset={1}><p>Please fill following details to submit your KYC</p></Col>
                    <FormGroup controlId="formPAN">
                        <Col smOffset={1} sm={2}>
                        <ControlLabel>PAN</ControlLabel>
                            </Col>
                        <Col sm={5}>
                            <FormControl type="text" placeholder="" value={this.state.pan} onChange={this.handlePanChange} />
                            </Col>
                    </FormGroup>
                    <FormGroup controlId="formAdhar">
                        <Col smOffset={1} sm={2}>
                        <ControlLabel>Adhar No</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" placeholder="" value="" onChange={this.handleAdharChange} />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formBank" >
                        <Col smOffset={1} sm={2}>
                        <ControlLabel>Bank Details</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" placeholder="" onChange="" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formSignatureImage" >
                        <Col smOffset={1} sm={2}>
                            <ControlLabel>Upload Signature</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl type="file" placeholder="" onChange="" />
                        </Col>
                        <HelpBlock>Upload an image of your signature</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={1} sm={2}>
                            <Button bsStyle="primary" bsSize="medium" type="submit" onClick={this.handleClick} block>
                                Submit KYC
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>

        );
    }
});

