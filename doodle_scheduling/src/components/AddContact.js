import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";

//database
import { db, firebase } from "./firebase";

export default function AddContact() {
    //----- states -----
    const [open, setOpen] = React.useState(false);
    const [userInput, setUserInput] = React.useState("");
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    //----- end of states -----

    //----- styles -----
    const btnStyle = {
        textAlign: "left"
    };
    //----- end of styles -----

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setErrorOpen(false);
    };
    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccessOpen(false);
    };

    /**
     * Adds contact by referencing database
     */
    const handleAddContact = () => {
        /*
            first it checks in database if userinput exists
            then it accesses the current user's doc, and updates
            their contact list with the user's input contact

            when you add the contact, it adds the name, email and 
            profile picture URL

            concerns: we did not use boolean variables to seperate the
            check from the database addition because it does not update 
            fast enough and the contact does not get added
        */

        if (userInput !== "") {
            db.collection("users")
                .doc(userInput)
                .get()
                .then(docSnapshot => {
                    if (docSnapshot.exists) {
                        let docRef = db.collection("users").doc(currentUser);
                        docRef.get().then(doc => {
                            const userContacts = doc.data().contacts
                            // filter the contacts array
                            const newContacts = userContacts.filter(
                                contact => contact.email !== userInput
                            )

                            // update the doc with the filtered contacts
                            db.collection("users")
                                .doc(currentUser)
                                .update({
                                    contacts: newContacts
                                })
                            /////
                            /*
                            db.collection("users")
                                .doc(currentUser)
                                .update({
                                    ['contacts.' + userInput]: firebase.firestore.FieldValue.delete()
                                });*/
                            db.collection("users")
                                .doc(currentUser)
                                .update({
                                    contacts: firebase.firestore.FieldValue.arrayUnion(
                                        {
                                            displayName: docSnapshot.data().displayName,
                                            email: userInput,
                                            pictureURL: docSnapshot.data().pictureURL,
                                        }
                                    )
                                });
                            handleClose();
                            setSuccessOpen(true);
                            setMessage("Successfully added contact!");
                        });
                    }
                    else {
                        setErrorOpen(true);
                        setMessage("Invalid contact!");
                    }
                })
                .catch(err => {
                    console.log('handleDeleteContact: Error getting document', err);
                });
        } else {
            setErrorOpen(true);
            setMessage("Invalid contact!");
        }

    };

    /**
     * Handles User Input when entering contact's
     * email
     * @param {*} t text that user types in
     */
    const handleInput = t => {
        setUserInput(t.target.value);
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
                    Add Contact
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adding Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a contact, please enter their email address.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddContact} color="primary">
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={errorOpen}
                autoHideDuration={6000}
                onClose={handleErrorClose}
            >
                <MySnackbarContent
                    onClose={handleErrorClose}
                    variant="error"
                    message={message}
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={successOpen}
                autoHideDuration={6000}
                onClose={handleSuccessClose}
            >
                <MySnackbarContent
                    onClose={handleSuccessClose}
                    variant="success"
                    message={message}
                />
            </Snackbar>
        </div>
    );
}
