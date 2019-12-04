import React, { Component } from "react";
import { firebase, db } from "./firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect, Link } from "react-router-dom";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import { textAlign } from "@material-ui/system";

var CLIENT_ID = "YOUR_OAUTH_CLIENT_ID";

const logInStyle = {
    textAlign: "center",
    top: "100%",
    background: "#fff",
    fontSize: "20px",
    position: "relative"
};
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will use Google and email as auth providers.
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
            isSignedIn: false,
            current_user_email: "",
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    //isSignedIn: !!user
                    isSignedIn: true
                });
                //locally store current user's email
                localStorage.setItem("currentUser", JSON.stringify(user.email));

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
                            pictureURL: user.photoURL,
                            bio: ""
                        });
                    }
                });

                let docRef = db.collection('users').doc(user.email);
                docRef.get().then(doc => {
                    if (!doc.exists) {
                        //console.log('No such document!');
                    } else {
                        //console.log('Document data:', doc.data());
                        this.setState({ picURL: doc.data().pictureURL });
                        this.setState({ nameDisplay: doc.data().displayName });
                        this.setState({ userName: doc.data().displayName });
                        this.setState({ current_user_email: doc.data().email });
                        this.setState({ bioDisplay: doc.data().bio });
                        this.setState({ userBio: doc.data().bio });
                    }
                })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
            }
            else {
                this.setState({ isSignedIn: false })
            }
      });
    };
    
    render() {
        return (
            <div style={{
                textAlign: "center",
                backgroundColor: 'white',
                height: '250px',
                width: '300px',
                margin: '0 auto'
            }}>
                <img
                    src={logo}
                    height="117px"
                    width="150px"
                    alt="Schedule It" />
                <br />
                {this.state.isSignedIn ? (
                    <div>
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            component={Link}
                            to="/home"
                        >
                            Home
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