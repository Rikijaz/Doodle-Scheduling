import React, { useEffect } from "react";
import { db } from "./firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const listOfContacts = c.map((contact, index) => (
        <li key={index} style={{ listStyleType: "none" }}>
            <img
                src={contact.pictureURL}
                alt="Profile"
                vertical-align="middle"
                width="30px"
                height="30px"
            />
            {"    "}{contact.displayName}
            <br />
            {contact.email}
            <br />
            <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to="/profile">
                View Profile
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
                <DialogTitle>{"List of your Contacts"}</DialogTitle>
                <DialogContent>{listOfContacts}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
