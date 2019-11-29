/* eslint-disable no-unused-expressions */
import React, { useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { db } from "./firebase";

export default function InviteContacts(props) {
    const [personEmail, setPersonEmail] = React.useState([]);

    const handleChange = event => {
        setPersonEmail(event.target.value);
        console.log(event.target.value);
    };

    const [emails, setEmails] = React.useState([]);

    useEffect(() => {
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .get()
            .then(doc => {
                if (doc.exists) {
                    let temp = doc.data().contacts.map(c => {
                        return c.email;
                    });
                    setEmails(temp);
                }
            });

    });

    useEffect(() => {
        props.setSharedEvent(true, personEmail);
    },[personEmail]);

    return (
        <div>
            <FormControl>
                <InputLabel id="demo-mutiple-checkbox-label">Select Contacts to Invite</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={personEmail}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={selected => selected.join(", ")}
                >
                    {emails.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox
                                checked={personEmail.indexOf(name) > -1}
                            />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
