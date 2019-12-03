import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddContact from './AddContact'
import ViewContacts from './ViewContacts'
import firebase from "firebase";
import logo from "./logo.png";
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";

import { db } from "./firebase";

const headerStyle = {
    background: "#fff",
    //color: "#5a769e",
    textAlign: "center",
    padding: "3px",
    //fontSize: "24px",
    //fontFamily: "Courier New",
    //fontStyle: "italic"
};

const headButtonStyle = {
    textAlign: "left"
};


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            addContactsPrompt: false,
        };
    }

    //localStorage is to access database document
    /**
     * when header mounts, it updates user data
     * @return user data from the database
     */
    componentDidMount() {
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .get()
            .then(data => {
                if (data.exists) {
                    this.setState({ user: data.data()});
                } else {
                    //console.log("Sad toot");
                }
            });
    }
    
    /**
     * Renders the buttons to view/add contacts and
     * sign out button and name of user
     */
    render() {
        return (
            <div>
                <header style={headerStyle}>
                    <div>
                        <header>
                            <img
                                src={logo}
                                height="117px"
                                width="150px"
                                alt="Schedule It" />
                        </header>
                    </div>
                    <AddContact/>
                    <ViewContacts/>

                    {this.state.user && (
                        <div>
                            <div style={headButtonStyle}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component={Link}
                                    to="/"
                                >
                                    Profile
                                </Button>
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component={Link}
                                    to="/home"
                                >
                                    Events
                                </Button>
                            </div>
                        </div>
                    )}
                </header>
            </div>
        );
    }
}

export default Header;
