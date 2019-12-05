import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import { db, firebase } from "./firebase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewContacts() {
    const [open, setOpen] = React.useState(false);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [c, setListofContacts] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    const btnStyle = {
        textAlign: "left"
    };

    useEffect(() => {
        let xd = [];
        db.collection("users")
            .doc(currentUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    doc.data().contacts.forEach(o => {
                        db.collection("users")
                            .doc(o.email)
                            .get()
                            .then(doc => {
                                if (doc.exists) {
                                    let obj = {
                                        displayName: doc.data().displayName,
                                        pictureURL: doc.data().pictureURL,
                                        email: doc.data().email
                                    };
                                    xd.push(obj);
                                    setListofContacts([...xd]);
                                }
                            });
                    });
                    //setListofContacts(xd);
                }
            });
        //eslint-disable-next-line
    }, [refresh]);

    /**
     * Handles deleted contact
     */

    const handleClickOpen = () => {
        setOpen(true);
        setRefresh(!refresh)
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleViewProfile(contactEmail) {
        localStorage.setItem("selectedContact", JSON.stringify(contactEmail));
        console.log("handleViewProfile - contactEmail: " + contactEmail);
    }

    const handleDelete = index => {
        c.splice(index, 1);
        db.collection("users")
            .doc(currentUser)
            .update({
                contacts: c
            });
        setRefresh(!refresh)
    };

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
                <DialogTitle>{"List of your Contacts"}</DialogTitle>
                <DialogContent>
                    {c.map((contact, index) => (
                        <li key={index} style={{ listStyleType: "none" }}>
                            <br />
                            <img
                                src={contact.pictureURL}
                                alt="Profile"
                                vertical-align="middle"
                                width="30px"
                                height="30px"
                            />
                            {"    "}
                            {contact.displayName}
                            {"    "}
                            <br />
                            {contact.email}
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    handleViewProfile(contact.email);
                                }}
                                component={Link}
                                to="/contact"
                            >
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
                                onClick={() => {
                                    handleDelete(index);
                                }}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
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
