import React, { Component } from "react";
import { firebase, db } from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import Button from "@material-ui/core/Button";
import Header from "./header";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";



const profileStyle = {
    textAlign: "center",
    top: "100%",
    background: "#fff",
    fontSize: "20px",
    position: "relative"
};

export class ViewContactProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactEmail: "",
            contactURL: "",
            contactName: "",
            contactBio: "",
            // user: null,
            // current_user_email: "",
        };
    }

    componentDidMount = () => {
        //JSON.parse(localStorage.getItem("currentUser"))
        let docRef = db.collection("users")
            .doc(JSON.parse(localStorage.getItem("selectedContact")));
        docRef.get().then(doc => {
            if (!doc.exists) {
                //console.log('No such document!');
            } else {
                //console.log('Document data:', doc.data());
                this.setState({ contactEmail: doc.data().email });
                this.setState({ contactURL: doc.data().pictureURL });
                this.setState({ contactBio: doc.data().bio});
                this.setState({ contactName: doc.data().displayName });
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div style={profileStyle}>
                    <br/>
                    <img
                        src={this.state.contactURL}
                        alt="Profile"
                        vertical-align="middle"
                        width="100px"
                        height="100px"
                        border-radius="50%" />
                    <br />
                    <label> email: </label>
                    {this.state.contactEmail}
                    <br />
                    <label> Name: </label>
                    {this.state.contactName}
                    <br />
                    <label> Biography: </label>
                    <br />
                    {this.state.contactBio}
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
            </div>
        );
    }
}

export default ViewContactProfile;