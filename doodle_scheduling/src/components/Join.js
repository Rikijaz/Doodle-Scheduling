import React from "react";
import { db, firebase } from "./firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Join(props) {
    const [open, setOpen] = React.useState(props.open);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const [userInput, setUserInput] = React.useState("");

    // SNACKBAR
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

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

    //END OF SNACKBAR

    const handleInput = t => {
        setUserInput(t.target.value);
    };

    const handleClose = () => {
        setOpen(false);
        props.beginJoinEvent();
    };

    const handleJoinEvent = () => {
        db.collection("events")
            .where("code", "==", userInput)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        db.collection("events")
                            .doc(doc.data().id)
                            .update({
                                invitees: firebase.firestore.FieldValue.arrayUnion(
                                    currentUser
                                )
                            });
                        setSuccessOpen(true);
                        setMessage("Successfully joined event!");
                        handleClose();
                    });
                } else {
                    setErrorOpen(true);
                    setMessage("Invalid code!");
                }
            });
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Type in code in join event"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter in event's code:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Event Code"
                        type="email"
                        fullWidth
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleJoinEvent} color="primary">
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
