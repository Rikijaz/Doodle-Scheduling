import React from "react";
import { db } from "./firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewContacts() {
    const [open, setOpen] = React.useState(false);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    let docReference = db.collection("users").doc(currentUser);
    const [c, setListofContacts] = React.useState([]);

    const btnStyle = {
        textAlign: "left"
    };

    const handleClickOpen = () => {
        docReference.get().then(doc => {
            if (doc.exists) {
                setListofContacts(doc.data().contacts);
            }
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const listOfContacts = c.map((contact, index) => (
        <li key={index}>{contact}</li>
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
