import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddContact from './AddContact'
import ViewContacts from './ViewContacts'
import firebase from "firebase";
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";

import { db } from "./firebase";

const headerStyle = {
    background: "#D0E6FF",
    color: "#5a769e",
    textAlign: "center",
    padding: "3px",
    fontSize: "24px",
    fontFamily: "Courier New",
    fontStyle: "italic"
};

const signOutStyle = {
    textAlign: "right"
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
    componentDidMount() {
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .get()
            .then(data => {
                if (data.exists) {
                    //console.log("glad toot");
                    this.setState({ user: data.data()});
                } else {
                    console.log("Sad toot");
                }
            });
    }

    onClickSignOut = () => {
        firebase.auth().signOut();
        localStorage.removeItem("currentUser");
    };

    render() {
        return (
            <div>
                <header style={headerStyle}>
                    <h1>Schedule It</h1>
                    <AddContact/>
                    <ViewContacts/>

                    {this.state.user && (
                        <div>
                            <div style={signOutStyle}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => this.onClickSignOut()}
                                    component={Link}
                                    to="/"
                                >
                                    {this.state.user.email}
                                </Button>
                            </div>
                            <div>Welcome {this.state.user.displayName}</div>
                        </div>
                    )}
                </header>
            </div>
        );
    }
}

export default Header;
