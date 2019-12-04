import React, { Component } from "react";
import { firebase, db } from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import { Button } from "@material-ui/core";
import Header from "./header";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";
//import logo from "./logo.png";
//import { textAlign } from "@material-ui/system";

const logInStyle = {
    textAlign: "center",
    top: "100%",
    background: "#fff",
    fontSize: "20px",
    position: "relative"
};

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            //
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
        let docRef = db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")));
        docRef.get().then(doc => {
            if (!doc.exists) {
                //console.log('No such document!');
            } else {
                //console.log('Document data:', doc.data());
                this.setState({ user: doc.data() });
                this.setState({ picURL: doc.data().pictureURL });
                this.setState({ nameDisplay: doc.data().displayName });
                this.setState({ userName: doc.data().displayName });
                this.setState({ current_user_email: doc.data().email });
                this.setState({ bioDisplay: doc.data().bio });
                this.setState({ userBio: doc.data().bio });
                this.setState({ current_user_email: doc.data().email });
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    };

    signOut = () => {
        firebase.auth().signOut();
        this.setState({ isSignedIn: false });
        localStorage.clear();
    };

    //update profile info in db
    updateDb = e => {
        if (this.state.nameDisplay !== this.state.userName) {
            db.collection("users")
                .doc(this.state.current_user_email)
                .update({
                    displayName: this.state.nameDisplay,
                });
        }
        if (this.state.bioDisplay !== this.state.userBio) {
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
                <div style={logInStyle}>
                    <img src={this.state.picURL} alt="Profile" vertical-align="middle" width="100px" height="100px" border-radius="50%" />
                    <br />
                    <form onSubmit={this.updateDb}>
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        <label
                            style={{
                                backgroundColor: '#3f51b5',
                                color: 'white',
                                padding: '5px',
                                borderRadius: 4,
                                fontSize: 18,
                                cursor: 'pointer'
                            }}>
                            Upload profile picture
                                <FileUploader
                                hidden
                                accept="image/*"
                                name="Profile Picture"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </label>
                        <br />
                        <label style={{
                            fontSize: 18
                        }}>
                            {this.state.current_user_email}
                        </label>
                        <br />
                        <label style={{
                            fontSize: 18,
                        }}>
                            Name
                            </label>
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
                        <label style={{
                            fontSize: 18,
                        }}>
                            Biography
                            </label>
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
                        <br />
                        <button type="submit">Save changes</button>
                    </form>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.signOut()}
                        size="small"
                        component={Link}
                        to="/"
                    >
                        Sign Out
                        </Button>
                </div>
            </div>
        );
    }
}

export default Profile;