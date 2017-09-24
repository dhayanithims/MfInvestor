import React from "react";
import ReactDOM from "react-dom";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail,Image} from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, NavDropdown,Tabs,Tab } from 'react-bootstrap';
import { LoginFormInstance } from './Login.js'
import { RegnFormInstance } from './Registration.js'
import { HomeInstance } from './Home.js'
import { sendPost, sendGet } from './Server.js'
import { TransactHomeForm } from './Transact/TransactHome.js'
const baseUrl = 'http://localhost:55561';

const stateTypes = {
    LoggedOut: 0, // shows home screen with login page
    LoggedIn: 1, // shows home screen without login page
    Registration: 2, // shows registration page
    Transaction: 3
};

//ReactDOM.render(<LoginFormInstance />, document.getElementById("rightBar"));
const NavBars = (props) => {
    if (props.isLoggedOut === "true") {
        return (
            <Navbar className="bs-custom-green">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src="assets/images/logo.png" responsive />
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav bsStyle="pills" activeKey={props.activeKey} onSelect={props.onNavSelected}>
                    <NavItem eventKey={1} href="#">Home</NavItem>
                    <NavItem eventKey={2} href="#">Why Mutual Funds</NavItem>
                    <NavItem eventKey={3} title="#">About Us</NavItem>
                    <NavItem eventKey={4} >Referral Scheme</NavItem>
                </Nav>
            </Navbar>
        );
    } else {
        return (
            <Navbar bsSize="sm" className="bs-custom-green">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src="assets/images/logo.png" responsive />
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav bsStyle="pills" activeKey={props.activeKey} onSelect={props.onNavSelected}>
                    <NavItem eventKey={1} >My Account</NavItem>
                    <NavItem eventKey={2} href="#">Why Mutual Funds</NavItem>
                    <NavItem eventKey={3} title="#">About Us</NavItem>
                    <NavItem eventKey={4} >Referral Scheme</NavItem>
                    <NavItem eventKey={5} >Transact</NavItem>
                </Nav>
                <Nav pullRight onSelect={props.onNavSelected}>
                    <NavDropdown eventKey="6" title={'Welcome '+props.userName} id="nav-dropdown">
                        <MenuItem eventKey="6.1" bsStyle="">Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
};


const ButtonGroupInstance = ()=> {
    return (<ButtonGroup>
        <DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
            <MenuItem eventKey="1">Action</MenuItem>
        </DropdownButton>
        <Button bsStyle="info">Middle</Button>
        <Button bsStyle="info">Right</Button>
        
    </ButtonGroup>
);
};
const UserTabsInstance = (props) => {
    return (
        <div>
            <div>
                <NavBars isLoggedOut="true" activeKey={props.activeKey}/>
            </div>
            <div className="main">
                <div className="leftBar">
                    <div>
                        <HomeInstance isLoggedOut="true" />
                    </div>
                </div>
                <div id="rightBar" className="rightBar">
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Login"><LoginFormInstance onSubmitHandler={props.onLoginSubmit} stateObj={props.stateObj} /></Tab>
                        <Tab eventKey={2} title="Sign Up"> <RegnFormInstance onSubmitHandler={props.onRegistrationSubmit} stateObj={props.stateObj} /></Tab>
                    </Tabs>
                </div>
            </div>
        </div>
        
    );
}

const TransactHomeWrapper = (props) => {
    return (
        <div>
            <div>
                <NavBars isLoggedOut="false" onNavSelected={props.onNavSelected} userName={props.userName} activeKey={props.activeKey} />
            </div>
            <div className="main">
                <div className="mainBar">
                    <div>
                        <TransactHomeForm isLoggedOut="false" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const App = React.createClass({
    getInitialState() {
        return {
            stateType: stateTypes.LoggedOut,
            stateObj: { isValid: true },
            sessionObj: { userName: "", userId: "", sessionKey: "" },
            navKey: 1
        }
    },

    handleLoginSubmit(uName, pwd) {
        sendPost("/auth", { user: uName, pwd: pwd }, this.loginSuccessHandler, this.loginFailureHandler);
    },

    loginSuccessHandler(requestData, responseData) {
        this.setState({ stateType: stateTypes.LoggedIn, sessionObj: { userName: requestData.user, userId: "", sessionKey: responseData.sessionKey } });
        //alert(data);
    },

    loginFailureHandler(data) {
        alert(data);
        this.setState({ stateType: stateTypes.LoggedOut, stateObj: { isValid: false } });
    },

    handleRegistrationSubmit() {

    },
    handleNavSelect(selectedKey) {
        if (selectedKey == 1) {
            this.setState({ stateType: stateTypes.LoggedIn, navKey: selectedKey });
        } else if (selectedKey == 5) {
            this.setState({ stateType: stateTypes.Transaction, stateObj: { isValid: true }, navKey: selectedKey });
        } else if (selectedKey == 6.1) {
            this.setState({ stateType: stateTypes.LoggedOut, stateObj: { isValid: true }, navKey: 1 });
        }
    },
    handleLogoutCick() {
        this.setState({ stateType: stateTypes.LoggedOut, stateObj: { isValid: true } });
    },
    handleTransactCick() {
        this.setState({ stateType: stateTypes.Transaction, stateObj: { isValid: true } });
    },
    sendMessage(messageText) {
        axios
            .post(`${baseUrl}/api/messages`, {
                text: messageText,
                authorTwitterHandle: this.state.authorTwitterHandle
            })
            .catch(() => alert('Something went wrong :('));
    },

    render() {
        if (this.state.stateType === stateTypes.LoggedIn) {
            return (
                <div>
                    <div>
                        <NavBars isLoggedOut="false" onNavSelected={this.handleNavSelect} userName={this.state.sessionObj.userName} activeKey={this.state.navKey}/>
                    </div>
                    <div className="main">
                        <div className="mainBar">
                            <div>
                                <HomeInstance isLoggedOut="false" userName={this.state.sessionObj.userName}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.stateType === stateTypes.LoggedOut) {
            return <UserTabsInstance onLoginSubmit={this.handleLoginSubmit} onRegistrationSubmit={this.handleRegistrationSubmit}
                stateObj={this.state.stateObj} activeKey={this.state.navKey} />
        } else if (this.state.stateType === stateTypes.Transaction) {
            return <TransactHomeWrapper onNavSelected={this.handleNavSelect} activeKey={this.state.navKey} userName={this.state.sessionObj.userName}/>
        }
    }
});

ReactDOM.render(<App />, document.getElementById("root"));