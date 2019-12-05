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
import { db } from "./firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function useForceUpdate() {
    const [value, setValue] = React.useState(0); 
    return () => setValue(value => ++value); // update the state to force render
}

export default function ViewContacts() {
    const [open, setOpen] = React.useState(false);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [c, setListofContacts] = React.useState([]);

    const btnStyle = {
        textAlign: "left"
    };

    useEffect(() => {
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
        console.log("deleteContact email: " + deletedContact.email);
        console.log("deleteContact name: " + deletedContact.displayName);
        console.log("deleteContact picURL: " + deletedContact.pictureURL);
        console.log("currentUser: " + currentUser);
        let docRef = db.collection("users").doc(currentUser);
        docRef.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
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
        return (false);
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
