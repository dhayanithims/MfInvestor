import React from "react";
import ReactDOM from "react-dom";
import { Carousel, Panel, PanelGroup, Table, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonGroup, Button} from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { KycFormInstance } from './Kyc.js';
import { ProfileFormInstance } from './Profile.js';
import { DashBoardFormInstance } from './DashBoard.js';

export const HomeInstance = (props) => {
    if (props.isLoggedOut==="true") {
        return (
            <Carousel interval="5000">
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="assets/images/carousel-blue.jpg" />
                    <Carousel.Caption>
                        <h3>Why Mutual Funds</h3>
                        <p>Invest in MF and save tax at the same time</p>
                        <p>Gain long term wealth by investing right</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="assets/images/carousel-blue.jpg" />
                    <Carousel.Caption>
                        <h3>Fund houses</h3>
                        <p>Axis bank, Birla sun life, Hdfc.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="assets/images/carousel-blue.jpg" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    } else {
        return (<HomeTabsInstance />);
    }
}

const TableInstance = (props) => {
    return (
        <Table striped bordered condensed hover className="tableElement">
            <thead>
                <tr className="bg-primary">
                    <th>#</th>
                    <th>Scheme Name</th>
                    <th>Scheme Type</th>
                    <th>1 Year return</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>{props.fundName} Scheme 1</td>
                    <td>ELSS - High Risk</td>
                    <td> 10% </td>
                    <td><a href="#" onClick="" >Buy</a></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>{props.fundName} Scheme 2</td>
                    <td>ELSS - Medium Risk</td>
                    <td> 20% </td>
                    <td><a href="#" onClick="" >Buy</a></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{props.fundName} Scheme 3</td>
                    <td>ELSS - Low Risk</td>
                    <td> 15% </td>
                    <td><a href="#" onClick="" >Buy</a></td>
                </tr>
            </tbody>
        </Table>
);
}

const ListgroupInstance = ()=>{
    return (
        <ListGroup>
        <ListGroupItem>Panel 2</ListGroupItem>
    </ListGroup>
);
}
const FundsPanelInstance = () => {
    return (
        <PanelGroup defaultActiveKey="2" accordion >
            <Panel header="Axis" eventKey="1"><TableInstance fundName="Axis"/></Panel>
            <Panel header="Hdfc" eventKey="2"><TableInstance fundName="Hdfc"/></Panel>
        </PanelGroup>
    );
}

var sampleProfile = {
    InvestorDetails: {
        Name: 'Dhaya',
        JointHolder: 'dhaya1',
        EmailId: 'dhayanithims@gmail.com',
        MobileNo: '+919791231740',
        Address: 'No 123, 3rd cross street, xyz nagar, abc city, TN - 600000',
        DOB: '19-May-1990'
    },
    BankDetails: {
        BankName: 'Hdfc',
        IFSC: 'HDFC0000123',
        AcctNo: '04412340943',
        Branch: 'Velachery/Chennai',
        AcctType: 'Savings'
    },
    NomineeDetails: {
        Nominee1: 'father',
        Nominee2: 'Mother'
    },
    KycDetails: {
        PAN: 'abcde1234f',
        ADHAR: '9791231740',
        KycStatus: 'Verified',
    }
};

const investmentObj = [
    {
        FundName: "Axis",
        SchemeName: "Moderate risk",
        FundType: "ELSS",
        Cost: "50000",
        MarketValue: "59000",
        UnitValue: "590",
        UnitCount: "100",
        AnnualXIRR: "34%"
    },
    {
        FundName: "HDFC",
        SchemeName: "Low risk",
        FundType: "ELSS",
        Cost: "35000",
        MarketValue: "38000",
        UnitValue: "380",
        UnitCount: "100",
        AnnualXIRR: "16%"
    }
]

const HomeTabsInstance = () => {
    return (
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" animation={false}>
            <Tab eventKey={1} title="Dashboard"><DashBoardFormInstance investmentObj={investmentObj}/></Tab>
            <Tab eventKey={2} title="Fund houses"><FundsPanelInstance /></Tab>
            <Tab eventKey={3} title="eKYC"><KycFormInstance stateObj={{ isValid: true }}/></Tab>
            <Tab eventKey={4} title="My Profile"><ProfileFormInstance profileObj={sampleProfile}/></Tab>
        </Tabs>
    );
}