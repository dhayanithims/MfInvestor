import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail, Image } from 'react-bootstrap';
import { Table, Col, Row,Grid } from 'react-bootstrap';



export const ProfileFormInstance = (props) => {
    var headerObj, bodyObj, bodyRows = [], headerCols=[], bodyCols=[], headerRow;
    var investorDetails = props.profileObj.InvestorDetails;
    var customClass = "bs-custom-green";
    headerRow = <tr className={customClass}><th colSpan="2"> Investor Details</th></tr>
    bodyRows = getTableBodyRows(props.profileObj.InvestorDetails);
    var investorTableObj = <TableInstance headerObj={headerRow} bodyObj={bodyRows} />;

    headerRow = <tr className={customClass}><th colSpan="2"> KYC Details</th></tr>
    bodyRows = getTableBodyRows(props.profileObj.KycDetails);
    var kycTableObj = <TableInstance headerObj={headerRow} bodyObj={bodyRows} />;

    headerRow = <tr className={customClass}><th colSpan="2"> Bank Details</th></tr>
    bodyRows = getTableBodyRows(props.profileObj.BankDetails);
    var bankTableObj = <TableInstance headerObj={headerRow} bodyObj={bodyRows} />;

    headerRow = <tr className={customClass}><th colSpan="2"> Nominee Details</th></tr>
    bodyRows = getTableBodyRows(props.profileObj.NomineeDetails);
    var nomineeTableObj = <TableInstance headerObj={headerRow} bodyObj={bodyRows} />;


    var profieObj = (
        <div className="rightBar">
            
            <Row >
                <Col  smOffset={1} sm={7}>
                    {investorTableObj}
                </Col>
            </Row>
            <Row>
                <Col smOffset={1} sm={7}>
                    {kycTableObj}
                </Col>
            </Row>
            <Row>
                <Col smOffset={1} sm={7}>
                    {bankTableObj}
                </Col>
            </Row>
            <Row>
                <Col smOffset={1} sm={7}>
                    {nomineeTableObj}
                </Col>
            </Row>
    </div>);
    return profieObj;
}

function getTableBodyRows(bodyData) {
    var bodyRows = [], bodyCols = [];
    for (var key in bodyData) {
        if (bodyData.hasOwnProperty(key)) {
            bodyCols = [];
            bodyCols.push(<td>{key}</td>);
            bodyCols.push(<td>{bodyData[key]}</td>);
            bodyRows.push(<tr>{bodyCols}</tr>);
        }
    }
    return bodyRows;
}

const TableInstance = (props) => {
    let headerObj = props.headerObj;
    let bodyObj = props.bodyObj;
    return (
        <Table bordered condensed hover className="tableElement">
            <thead>{headerObj}</thead>
            <tbody>{bodyObj}</tbody>
        </Table>
    );
}
const TableRowInstance = (props) => {
    let rowObject = props.tableRow;
    return (
        <tr>{rowObject}</tr>
    );
}

const TableHeaderInstance = (props) => {
    let cellData = props.cellData;
    return (
            <th>{cellData}</th>
        );
}

const TableDataInstance = (props) => {
    let cellData = props.cellData;
    return (
        <td>{cellData}</td>
    );
}