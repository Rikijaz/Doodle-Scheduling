import React, { Component } from "react";
import { firebase, db } from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import Button from "@material-ui/core/Button";
import Header from "./header";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
            picURL: "",
            oldURL: "",
            nameDisplay: "",
            current_user_email: "",
            userName: "",
            bioDisplay: "",
            userBio: "",
            isUploading: false,
            progress: 0,
            profilePic: "",
            errorOpen: false,
            successOpen: false,
            message: ""
        };
    }

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
                this.setState({ oldURL: doc.data().pictureURL });
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    };

    handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ errorOpen: false });
    };
    handleSuccessClose = (event, reason) => {
        this.setState({ successOpen: false });
    };
    
    // handle profile pic upload to Storage
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({
            isUploading: false
        });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        this.setState({
            profilePic: filename,
            progress: 100,
            isUploading: false,
        });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ picURL: url }));
    };

    signOut = () => {
        firebase.auth().signOut();
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
            this.setState({
                successOpen: true,
                message: "Successfully saved changes"
            });
        }
        if (this.state.bioDisplay !== this.state.userBio) {
            db.collection("users")
                .doc(this.state.current_user_email)
                .update({
                    bio: this.state.bioDisplay
                });
            this.setState({
                successOpen: true,
                message: "Successfully saved changes"
            });
        }
        if (this.state.picURL !== this.state.oldURL) {
            db.collection("users")
                .doc(this.state.current_user_email)
                .update({
                    pictureURL: this.state.picURL
                });
            this.setState({
                successOpen: true,
                message: "Successfully saved changes"
            });
        }
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Header />
                <div style={logInStyle}>
                    <img
                        src={this.state.picURL}
                        alt="Profile"
                        vertical-align="middle"
                        width="100px"
                        height="100px"
                        border-radius="50%" />
                    <br />
                    <form onSubmit={this.updateDb}>
                        <label>
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
                                /><IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
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
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                            margin="theme.spacing(1)"
                            startIcon={<SaveIcon />}
                    >
                        Save
                        </Button>
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.errorOpen}
                        autoHideDuration={10}
                        onClose={this.state.handleErrorClose}
                    >
                        <MySnackbarContent
                            onClose={this.state.handleErrorClose}
                            variant="error"
                            message={this.state.message}
                        />
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.successOpen}
                        autoHideDuration={10}
                        onClose={this.state.handleSuccessClose}
                    >
                        <MySnackbarContent
                            onClose={this.state.handleSuccessClose}
                            variant="success"
                            message={this.state.message}
                        />
                    </Snackbar>
                </div>
            </div>
        );
    }
}

export default Profile;