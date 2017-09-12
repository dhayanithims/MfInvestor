import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { ButtonGroup, Dropdown, MenuItem, Button, DropdownButton, Nav, NavItem, Navbar, Thumbnail,Image} from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { LoginFormInstance } from './Login.js'
import {RegnFormInstance } from './Registration.js'

const baseUrl = 'http://localhost:55561';

const stateTypes = {
    LoggedOut: 0, // shows home screen with login page
    LoggedIn: 1, // shows home screen without login page
    Registration: 2 // shows registration page
};

const Welcome = ({ onSubmit }) => {
    let usernameInput;
    return (
        <div>
            <p>Enter your Twitter name and start chatting!</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(usernameInput.value);
            }}>
                <input type="text" placeholder="Enter Twitter handle here" ref={node => {
                    usernameInput = node;
                }}/>
                <input type="submit" value="Join the chat" />
            </form>
        </div>
    );
};


//ReactDOM.render(<LoginFormInstance />, document.getElementById("rightBar"));
const NavBars = () => {
    return (
        <Navbar >
            <Navbar.Header>
                <Navbar.Brand>
                    <Image src="MyInvestorApp/assets/images/logo.png" responsive />
                    </Navbar.Brand>
                </Navbar.Header>
           
        <Nav bsStyle="tabs" activeKey={1} >
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} href="#">Services</NavItem>
            <NavItem eventKey={3} title="#">About Us</NavItem>
            <NavItem eventKey={4} >Referral Scheme</NavItem>
        </Nav>
        </Navbar>
    );
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

const RegistrationWrapper = (props) => {
    return (
    <div>
        <div>
            <NavBars />
        </div>
        <div className="main">
            <div className="left">
                <div>
                    test
                            </div>
            </div>
            <div id="rightBar" className="right"><RegnFormInstance stateObj={props.stateObj}
                    onSubmitHandler={props.onSubmit}/></div>
        </div>
    </div>
    );
}
const App = React.createClass({
    getInitialState() {
        this.handleLoginSubmit = this.handleLoginSubmit.bind(null,this);
        return {
            stateType: stateTypes.LoggedOut,
            stateObj: { isValid: true },
            sessionObj: {userName:"",userId:"",sessionKey:""}
        }
    },

    handleLoginSubmit(e, uName, pwd) {
        if (uName == pwd) {
            this.setState({ stateType: stateTypes.LoggedIn, sessionObj: { userName: uName,userId:123,sessionKey:"abfds143"}});
        } else {
            this.setState({ stateType: stateTypes.LoggedOut, stateObj: {isValid: false}});
        }
    },
    handleRegistrationSubmit() {

    },
    handleRegistrationClick() {
        this.setState({ stateType: stateTypes.Registration, stateObj: { isValid: true }});
    },
    sendMessage(messageText) {
        axios
            .post(`${baseUrl}/api/messages`, {
                text: messageText,
                authorTwitterHandle: this.state.authorTwitterHandle
            })
            .catch(() => alert('Something went wrong :('));
    },

    //componentDidMount() {
    //    if (this.state.stateType === stateTypes.LoggedIn) {
    //        ReactDOM.render(<NavBars />, document.getElementById("navbars"));
    //        ReactDOM.render(<h3>Welcome {this.state.sessionObj.userName} !!</h3>, document.getElementById("leftBar"));
    //        ReactDOM.unmountComponentAtNode(document.getElementById("rightBar"));

    //    } else {
    //        ReactDOM.render(<NavBars />, document.getElementById("navbars"));
    //        ReactDOM.render(<LoginFormInstance stateObj={this.state.stateObj} onSubmitHandler={this.handleLoginSubmit} />, document.getElementById("rightBar"));
    //    }
    //},

    render() {
        if (this.state.stateType === stateTypes.LoggedIn) {
            return (
                <div>
                    <div>
                        <NavBars />
                    </div>
                    <div className="main">
                        <div className="left">
                            <div>
                                <h3>Welcome {this.state.sessionObj.userName} !!</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.stateType === stateTypes.Registration) {
            return <RegistrationWrapper onSubmit={this.handleRegistrationSubmit} stateObj={this.state.stateObj}/>
        } else {
            return (
                <div>
                    <div>
                        <NavBars />
                    </div>
                    <div className="main">
                        <div className="left">
                            <div>
                                test
                            </div>
                        </div>
                        <div id="rightBar" className="right"><LoginFormInstance stateObj={this.state.stateObj}
                            onSubmitHandler={this.handleLoginSubmit} onRegistrationClickHandler={this.handleRegistrationClick} /></div>
                    </div>
                </div>
            );
        }
    }
});

ReactDOM.render(<App />, document.getElementById("root"));