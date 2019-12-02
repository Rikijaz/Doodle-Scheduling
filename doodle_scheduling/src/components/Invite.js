import React, { useEffect } from "react";
import { db } from "./firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Invite(props) {
    const [open, setOpen] = React.useState(props.open);
    const [currentUser] = React.useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );

    const [personEmail, setPersonEmail] = React.useState([]);

    const [emails, setEmails] = React.useState([]);

    //this is because personEmail will be empty on first render
    //since useState callback 
    const [fix, setFix] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        props.refresh();
    };

    /**
     * 
     * @param {*} n an email that user selected
     * @return {array} array with user included or not included
     */
    const handleChange = n => {
        if (!personEmail.includes(n)) {
            setPersonEmail([...personEmail, n]);
        }
        else{
            setPersonEmail(personEmail.filter((email) => email !== n))
        }
    };

    useEffect(() => {
        db.collection("users")
            .doc(currentUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    let temp = doc.data().contacts.map(c => {
                        return c.email;
                    });
                    setEmails(temp); 
                }
            });
        db.collection("events")
            .doc(props.id)
            .get()
            .then(doc => {
                setPersonEmail(doc.data().invitees); //this will finish after next useEffect
                setFix(true); //so you need this line
            });
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (fix) {
            db.collection("events")
                .doc(props.id)
                .update({
                    invitees: personEmail
                });
        }
        // eslint-disable-next-line
    }, [personEmail]);

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
                <DialogTitle>{"Invite More"}</DialogTitle>
                <DialogContent>
                    {emails.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox
                                checked={personEmail.indexOf(name) > -1}
                                onChange={() => handleChange(name)}
                            />
                            <ListItemText primary={name} />
                        </MenuItem>
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
