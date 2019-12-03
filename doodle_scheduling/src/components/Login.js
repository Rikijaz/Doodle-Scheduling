import React, { Component } from "react";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import Header from "./header";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";
import { firebase, db } from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import { textAlign } from "@material-ui/system";

var CLIENT_ID = "YOUR_OAUTH_CLIENT_ID";
/*
const logoStyle = {
    textAlign: "center"
};
*/
const logInStyle = {
    textAlign: "center",
    top: "100%",
    fontSize: "20px",
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
            isSignedIn: false,
            picURL: "",
            nameDisplay: "",
            current_user_email: "",
            userName: "",
            bioDisplay: "",
            userBio: "",
            isUploading: false,
            progress: 0,
            profilePic: ""
        };
    }

    // handle profile pic upload to Storage
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        this.setState({ profilePic: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ picURL: url }));
    };

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

    //update profile info in db
    updateName = e => {
        this.setState({
            nameDisplay: e.target.value
        });
    }
    
    updateBio = e => {
        this.setState({
            bioDisplay: e.target.value
        });
    }

    updateDb = e => {
        if (this.state.nameDisplay !== this.state.userName) {
            db.collection("users")
                .doc(this.state.current_user_email)
                .update({
                    displayName: this.state.nameDisplay,
                });
        }
        if (this.state.bioInput !== "") {
            db.collection("users")
                .doc(this.state.current_user_email)
                .update({
                    bio: this.state.bioDisplay
                });
        }
        db.collection("users")
            .doc(this.state.current_user_email)
            .update({
                pictureURL: this.state.picURL
            });
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Header />
                {this.state.isSignedIn ? (
                    <div style={logInStyle}>
                        <img src={this.state.picURL} alt="Profile" vertical-align="middle" width="100px" height="100px" border-radius="50%" />
                        <br />                        
                        <form onSubmit={this.updateDb}>
                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                            <FileUploader
                                accept="image/*"
                                name="Profile Picture"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                            <br />
                            <label>{firebase.auth().currentUser.email}</label>
                            <br />
                            <label>Name</label>
                            <br />
                            <input
                                type="text"
                                name="fullname"
                                size="26"
                                placeholder="Your name"
                                onChange={e => this.setState({ nameDisplay: e.target.value })}
                                value={this.state.nameDisplay}
                            />
                            <br />
                            <label>Biography</label>
                            <br />
                            <textarea
                                name="bioText"
                                rows="10"
                                cols="27"
                                placeholder="Biography"
                                value={this.state.bioDisplay}
                                onChange={e => this.setState({ bioDisplay: e.target.value })}
                            >
                            </textarea>
                            <br/>
                            <button type="submit">Save changes</button>
                        </form>
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
