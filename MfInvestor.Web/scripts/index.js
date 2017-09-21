import React from "react";
import ReactDOM from "react-dom";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail,Image} from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, NavDropdown,Tabs,Tab } from 'react-bootstrap';
import { LoginFormInstance } from './Login.js'
import { RegnFormInstance } from './Registration.js'
import { HomeInstance } from './Home.js'
import { sendPost, sendGet} from './server.js'
const baseUrl = 'http://localhost:55561';

const stateTypes = {
    LoggedOut: 0, // shows home screen with login page
    LoggedIn: 1, // shows home screen without login page
    Registration: 2 // shows registration page
};

//ReactDOM.render(<LoginFormInstance />, document.getElementById("rightBar"));
const NavBars = (props) => {
    if (props.isLoggedOut === "true") {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src="assets/images/logo.png" responsive />
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav bsStyle="tabs" activeKey={1} >
                    <NavItem eventKey={1} href="#">Home</NavItem>
                    <NavItem eventKey={2} href="#">Why Mutual Funds</NavItem>
                    <NavItem eventKey={3} title="#">About Us</NavItem>
                    <NavItem eventKey={4} >Referral Scheme</NavItem>
                </Nav>
            </Navbar>
        );
    } else {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Image src="assets/images/logo.png" responsive />
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav bsStyle="tabs" activeKey={1} >
                    <NavItem eventKey={1} href="#">Home</NavItem>
                    <NavItem eventKey={2} href="#">Why Mutual Funds</NavItem>
                    <NavItem eventKey={3} title="#">About Us</NavItem>
                    <NavItem eventKey={4} >Referral Scheme</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown eventKey="5" title={'Welcome '+props.userName} id="nav-dropdown">
                        <MenuItem eventKey="5.1" onClick={props.onLogoutClick} bsStyle="">Logout</MenuItem>
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
                <NavBars isLoggedOut="true" />
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

const App = React.createClass({
    getInitialState() {
        return {
            stateType: stateTypes.LoggedOut,
            stateObj: { isValid: true },
            sessionObj: {userName:"",userId:"",sessionKey:""}
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
    
    handleLogoutCick() {
        this.setState({ stateType: stateTypes.LoggedOut, stateObj: { isValid: true } });
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
                        <NavBars isLoggedOut="false" onLogoutClick={this.handleLogoutCick} userName={this.state.sessionObj.userName}/>
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
            return <UserTabsInstance onLoginSubmit={this.handleLoginSubmit} onRegistrationSubmit={this.handleRegistrationSubmit} stateObj={this.state.stateObj} />
        }
    }
});

ReactDOM.render(<App />, document.getElementById("root"));