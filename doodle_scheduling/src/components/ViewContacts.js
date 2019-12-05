import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
//import { Button, IconButton } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { db, firebase } from "./firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
/*
function useForceUpdate() {
    const [value, setValue] = React.useState(0); 
    return () => setValue(value => ++value); // update the state to force render
}
*/
export default function ViewContacts() {
    const [open, setOpen] = React.useState(false);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [c, setListofContacts] = React.useState([]);
    //const [contactEmail, setContactEmail] = React.useState([]);
    //const [contactName, setContactName] = React.useState([]);
    //const [contactURL, setContactURL] = React.useState([]);

    const btnStyle = {
        textAlign: "left"
    };

    useEffect(() => {
        // grab current user data
        let docRef = db.collection("users").doc(currentUser);
        docRef
            .get()
            .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                //store current user's contacts
                const userContacts = doc.data().contacts;

                console.log("userContacts[0].email: " + userContacts[0].email);
                console.log("userContacts.length: " + userContacts.length);
                //userContacts.forEach((contact, index) => {
                //var existingContacts = [];

                // loop through each contact to update info
                for (let i = 0; i < userContacts.length; i++) {
                    var contactEmail = "";
                    var contactName = "";
                    var contactURL = "";
                    console.log("i: " + i);
                    console.log("userContacts[i].email: " + userContacts[i].email);
                    db.collection("users")
                        .doc(userContacts[i].email)
                        .get()
                        .then(docUserInContact => {
                            if (docUserInContact.exists) {
                                contactEmail = (docUserInContact
                                    .data().email);
                                contactName = (docUserInContact
                                    .data().displayName);
                                contactURL = (docUserInContact
                                    .data().pictureURL);
                                //
                                console.log("UserInContact[" + i + "] email: " + contactEmail);
                                console.log("UserInContact[" + i + "] name: " + contactName);
                                console.log("UserInContact[" + i + "] url: " + contactURL);
                                
                                // to do: delete the current contact in loop from db
                                //const userContacts = doc.data().contacts

                                // filter the contacts array
                                const newContacts = userContacts.filter(
                                    contact => contact.email !== contactEmail
                                )

                                // update the doc with the filtered contacts
                                db.collection("users")
                                    .doc(currentUser)
                                    .update({
                                        contacts: newContacts
                                    })
                                // rewrite the current contact in loop to db
                                db.collection("users")
                                    .doc(currentUser)
                                    .update({
                                    contacts: firebase.firestore.FieldValue.arrayUnion(
                                        {
                                            displayName: contactName,
                                            email: contactEmail,
                                            pictureURL: contactURL,
                                        }
                                    )
                                });
                            } else {
                                console.log('No such document!');
                            }
                        });
                    //
                    console.log("loop finishes: " + (i + 1) + " times");
                }
            }
        })
            .catch(err => {
                console.log('handleUpdatedContact: Error getting document', err);
            });
        //
        console.log("finishes updating contacts");//
        db.collection("users")
            .doc(currentUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setListofContacts(doc.data().contacts);
                }
            });
         
        //eslint-disable-next-line
    }, []);

    /**
     * Handles deleted contact
     */

    function handleDeleteContact(deletedContact) {
        //console.log("deleteContact email: " + deletedContact.email);
        //console.log("deleteContact name: " + deletedContact.displayName);
        //console.log("deleteContact picURL: " + deletedContact.pictureURL);
        let docRef = db.collection("users").doc(currentUser);
        docRef.get().then(doc => {
            if (!doc.exists) {
                //console.log('No such document!');
            } else {
                const userContacts = doc.data().contacts

                // filter the contacts array
                const newContacts = userContacts.filter(
                    contact => contact.email !== deletedContact.email
                )

                // update the doc with the filtered contacts
                db.collection("users")
                    .doc(currentUser)
                    .update({
                    contacts: newContacts
                })
            }
        })
            .catch(err => {
                console.log('handleDeleteContact: Error getting document', err);
            });
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const listOfContacts = c.map((contact, index) => (
        <li key={index} style={{ listStyleType: "none" }}>
            <br />
            <img
                src={contact.pictureURL}
                alt="Profile"
                vertical-align="middle"
                width="30px"
                height="30px"
            />
            {"    "}{contact.displayName}{"    "}
            <br />
            {contact.email}
            <br />
            <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to="/profile">
                View
            </Button>
            {"    "}
            <Button
                variant="contained"
                color="primary"
                margin="theme.spacing(1)"
                size="small"
                startIcon={<DeleteIcon />}
                value={contact.email}
                onClick={() => { handleDeleteContact(contact) }} >
                Delete
            </Button>
        </li>
    ));

    return (
        <div>
            <div style={btnStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleClickOpen}
                >
                    View Contacts
                </Button>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {"List of your Contacts"}
                </DialogTitle>
                <DialogContent>
                    {listOfContacts}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
