import React from "react";
import ReactDOM from "react-dom";
import { Carousel, Panel, PanelGroup, Table, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, Alert, Col, InputGroup } from 'react-bootstrap';

export const InvestForm = React.createClass({
    getInitialState() {
        return {
            fundName: "",
            fundId: "0",
            schemeName: "",
            schemeId: "0",
            amount: "",
            schemeSelectList: []
        }
    },

    getSchemeSelectList(fundId) {
        let schemeSelectList = [];
        for (let i = 0; i < this.props.fundSchemeObj.length; i++) {
            if (fundId == this.props.fundSchemeObj[i].fundId) {
                schemeSelectList = this.props.fundSchemeObj[i].schemeList;
            }
        }
        return schemeSelectList;
    },
    handleFundChange(event) {
        let schemeList = this.getSchemeSelectList(event.target.value);
        this.setState({ fundId: event.target.value, schemeSelectList: schemeList});
    },
    handleSchemeChange(event) {
        this.setState({ schemeId: event.target.value });
    },

    handleClick(e) {
        //this.props.onSubmitHandler();
        e.preventDefault();
    },

    handleAmountChange(e) {
        this.setState({ amount: e.target.value });
    },

    render() {

        var validationState = null;
        
        return (
            <div className="rightBar">
                <Form horizontal>
                    <Col smOffset={1}><p>Please choose the fund and scheme for investing</p></Col>
                    <FormGroup controlId="formFundsSelect">
                        <Col smOffset={1} sm={2}>
                            <ControlLabel>Funds</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl defaultValue={this.state.fundId} componentClass="select" placeholder="Funds" onChange={this.handleFundChange}>
                                <option value="0">...Select Funds...</option>
                                {this.props.fundSchemeObj.map(fundObj => { return (<option value={fundObj.fundId}>{fundObj.fundName}</option>); })}
                        </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formSchemeSelect">
                        <Col smOffset={1} sm={2}>
                            <ControlLabel>Schemes</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <FormControl defaultValue={this.state.schemeId} componentClass="select" placeholder="Schemes" onChange={this.handleSchemeChange}>
                                <option value="0">...Select Schemes...</option>
                                {this.state.schemeSelectList.map(schemeObj => { return (<option value={schemeObj.schemeId}>{schemeObj.schemeName}</option>); })}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formAmountText">
                        <Col smOffset={1} sm={2}>
                            <ControlLabel>Amount</ControlLabel>
                        </Col>
                        <Col sm={5}>
                            <InputGroup>
                                <InputGroup.Addon><code>&#8377;</code></InputGroup.Addon>
                                <FormControl type="text" placeholder="" value={this.state.amount} onChange={this.handleAmountChange} />
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={1} sm={2}>
                            <Button bsStyle="primary" bsSize="medium" type="submit" onClick={this.handleClick} block>
                                Invest
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>

        );
    }
});