import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//database
import { db, firebase } from "./firebase";

export default function AddContact() {
    const [open, setOpen] = React.useState(false);
    const [userInput, setUserInput] = React.useState("");
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddContact = () => {
        // console.log(userInput);
        // console.log(contacts);
        // console.log(currentUser);
        db.collection("users").doc(currentUser).update({
            contacts: firebase.firestore.FieldValue.arrayUnion(userInput)
        });
        handleClose();
    };
    const handleInput = t => {
        setUserInput(t.target.value);
    };
    const btnStyle = {
        textAlign: "left"
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
        </div>
    );
}
