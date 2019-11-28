import React, { Component } from "react";
import logo from "./logo.png";
import { Button } from "@material-ui/core";

// import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { Link } from "react-router-dom";

import { firebase, db } from "./firebase";

var CLIENT_ID = "YOUR_OAUTH_CLIENT_ID";
const logoStyle = {
    textAlign: "center"
};

const logInStyle = {
    textAlign: "center",
    top: "75%",
    fontSize: "40px",
    position: "relative"
};
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            authMethod: "https://accounts.google.com",
            // Required to enable ID token credentials for this provider.
            clientId: CLIENT_ID
        },
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isSignedIn: !!user
                });
                //lets contacts data persist
                let docReference = db.collection("users").doc(user.email);
                docReference.get().then(documentSnapshot => {
                    if (!documentSnapshot.exists) {
                        docReference.set({
                            displayName: user.displayName,
                            email: user.email,
                            contacts: [],
                            events: [],
                            polls: [],
                        });
                    }
                });

                //keep this so header can load the page
                localStorage.setItem("currentUser", JSON.stringify(user.email));
                //console.log("toot");
            }
        });
    };

    onClick = () => {
        firebase.auth().signOut();
        this.setState({ isSignedIn: false });
        localStorage.clear();
    };

    render() {
        return (
            <div>
                <div style={logoStyle}>
                    <header>
                        <img src={logo} alt="Schedule It" />
                    </header>
                </div>
                {this.state.isSignedIn ? (
                    <div style={logInStyle}>
                        <h3>
                            Signed in as{" "}
                            {firebase.auth().currentUser.displayName}.{" "}
                        </h3>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/home"
                        >
                            Go to Home Page
                        </Button>
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.onClick()}
                        >
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <StyledFirebaseAuth
                        uiCallback={ui => ui.disableAutoSignIn()}
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>
        );
    }
}

export default Login;
