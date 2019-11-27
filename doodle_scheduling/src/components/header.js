import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddContact from './AddContact'
import ViewContacts from './ViewContacts'
//import NotificationsButton from './NotificationsButton'
//import NotificationMessages from './NotificationMessages'
//import NotificationsMenuButton from './NotificationsMenuButton'
//import NotificationTesting from './NotificationTesting'
import NotificationTesting2 from './NotificationTesting2'
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
     * Signs out user, kicks them back to login page
     * @return Back to login page and clears localStorage
     */
    onClickSignOut = () => {
        firebase.auth().signOut();
        //localStorage.removeItem("currentUser");
        localStorage.clear();
    };

    /**
     * Renders the buttons to view/add contacts and
     * sign out button and name of user
     */
    render() {
        return (
            <div>
                <header style={headerStyle}>
                    <h1>Schedule It</h1>
                    <AddContact/>
                    <ViewContacts/>
                    <NotificationTesting2/>

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
