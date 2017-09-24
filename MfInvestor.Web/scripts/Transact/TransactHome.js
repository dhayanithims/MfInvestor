import React from "react";
import ReactDOM from "react-dom";
import { Carousel, Panel, PanelGroup, Table, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { InvestForm } from './Invest.js'
const fundSchemeObj = [
    {
        fundName: "Axis",
        fundId: "1001",
        schemeList: [
            {
                schemeName: "Axis-ELSS - Moderate risk",
                schemeId: "1234",
                schemeType: "ELSS"
            },
            {
                schemeName: "Axis-ELSS - Low risk",
                schemeId: "1235",
                schemeType: "ELSS"
            }
        ]
    },
    {
        fundName: "Hdfc",
        fundId: "1002",
        schemeList: [
            {
                schemeName: "HDFC-ELSS - Moderate risk",
                schemeId: "1236",
                schemeType: "ELSS"
            },
            {
                schemeName: "HDFC-ELSS - Low risk",
                schemeId: "1237",
                schemeType: "ELSS"
            }
        ]
    }
]

export const TransactHomeForm = () => {
    return (
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" animation={false}>
            <Tab eventKey={1} title="Invest"><InvestForm fundSchemeObj={fundSchemeObj} /></Tab>
            <Tab eventKey={2} title="Redeem">redeem</Tab>
            <Tab eventKey={3} title="Switch">switch</Tab>
            <Tab eventKey={4} title="SIP">SIP</Tab>
        </Tabs>
    );
}