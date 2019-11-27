/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { db } from "./firebase";

// export class InviteContacts extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             invite_list: [],
//             contact_list: []
//         };
//     }

//     componentDidMount() {
//         db.collection("users")
//             .doc(JSON.parse(localStorage.getItem("currentUser")))
//             .get()
//             .then(doc => {
//                 if (doc.exists) {
//                     let temp = doc.data().contacts.map(c => {
//                         return c.email;
//                     });
//                     this.setState({ contact_list: temp });
//                 }
//             });
//     }
//     handleDisplay = () => {
//         if (this.state.contact_list.length === 0) {
//             return <div>Yeet</div>;
//         } else {
//             return (
//                 <div>
//                     {this.state.contact_list.map(email => {
//                         <MenuItem value={email} key={email}>
//                             <Checkbox />
//                             <ListItemText primary={email} />
//                         </MenuItem>;
//                     })}
//                 </div>
//             );
//         }
//     };
//     render() {
//         return (
//             <FormControl>
//                 <InputLabel>Select Contacts</InputLabel>
//                 <Select mutliple value={this.state.contact_list}>
//                     {/* {this.handleDisplay()} */}
//                     {this.state.contact_list.map(email => {
//                         <MenuItem value={email} key={email}>
//                             <Checkbox />
//                             <ListItemText primary={email} />
//                         </MenuItem>;
//                     })}
//                 </Select>
//             </FormControl>
//         );
//     }
// }

// export default InviteContacts;

export default function InviteContacts() {
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

    return (
        <div>
            <FormControl>
                <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
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
