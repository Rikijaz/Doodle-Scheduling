import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddContact from "./AddContact";
import ViewContacts from "./ViewContacts";
import firebase from "firebase";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { db } from "./firebase";
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const headerStyle = {
    background: "#7FDBFF",
    color: "white",
    textAlign: "center",
    padding: "2px",
    fontSize: "24px",
    fontFamily: "Simplifica"
};

const headButtonStyle = {
    textAlign: "left"
};

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            addContactsPrompt: false
        };
    }

    //localStorage is to access database document
    /**
     * when header mounts, it updates user data
     * @return user data from the database
     */
    
    componentDidMount() {
        /*
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .get()
            .then(data => {
                if (data.exists) {
                    this.setState({ user: data.data() });
                } else {
                    //console.log("Sad toot");
                }
            });
            */
        let docRef = db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")));
        docRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                this.setState({ user: doc.data() });
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
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
                    {this.state.user && (
                        <div>
                            <div style={headButtonStyle}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component={Link}
                                    to="/profile"
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
                    <h1>Schedule It!</h1>
                    <AddContact />
                    <ViewContacts />
                </header>
            </div>
        );
    }
}

export default Header;
