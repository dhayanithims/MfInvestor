import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail, Image } from 'react-bootstrap';
import { Table, Col, Row, Grid,Label } from 'react-bootstrap';



export const DashBoardFormInstance = (props) => {
    let totalObj = preprocessInvestObj(props.investmentObj);
    let totalTableObj = <TableFromArray tableData={[totalObj]} />;
    let investTableObj = <TableFromArray tableData={props.investmentObj} />;
    return (<div>{investTableObj}{totalTableObj}</div>);
}

function preprocessInvestObj(investObj) {
    let totalObj = {TotalCost:0, TotalMarketValue:0, AnnualXIRR:0,TotalAppreciation:0};
    for (let i = 0; i < investObj.length; i++) {
        investObj[i]["Appreciation"] = investObj[i].MarketValue - investObj[i].Cost;
        totalObj.TotalCost = parseFloat(totalObj.TotalCost) + parseFloat(investObj[i].Cost);
        totalObj.TotalMarketValue = parseFloat(totalObj.TotalMarketValue) + parseFloat(investObj[i].MarketValue);
        totalObj.TotalAppreciation = parseFloat(totalObj.TotalAppreciation) + parseFloat(investObj[i].Appreciation);
        totalObj.AnnualXIRR = parseFloat(totalObj.AnnualXIRR)+parseFloat(investObj[i].AnnualXIRR);
    }
    return totalObj;
}

const TableFromArray = (props) => {
    let tableData = props.tableData;
    var bodyRows = [], bodyCols = [], headerRow=[], headerCols=[];
    for (let i = 0; i < tableData.length; i++) {
        bodyCols = [];
        for (var key in tableData[i]) {
            if (tableData[i].hasOwnProperty(key)) {
                bodyCols.push(<td>{tableData[i][key]}</td>);
                if (i == 0) {
                    headerCols.push(<th>{key}</th>);
                }
            }
        }
        bodyRows.push(<tr>{bodyCols}</tr>);
    }
    headerRow.push(<tr className="bs-custom-green">{headerCols}</tr>);
    return (
        <Table bordered condensed hover className="tableElement">
            <thead>{headerRow}</thead>
            <tbody>{bodyRows}</tbody>
        </Table>
    );
}