import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { db } from "./firebase";
import Button from "@material-ui/core/Button";
//eslint-disable-next-line
import InviteContacts from './InviteContacts'

export class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      invite_list: [],
      input: ""
    };
  }

  //functions
  /**
   * Sets checkbox state from clicked/unclicked
   */
  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  };

  /**
   * Displays what user typed in textbox
   */
  handleInput = i => {
    this.setState({ input: i.target.value });
  };

  /**
   * When user hits enter, it adds name to invite list
   * @todo check if email entered is a valid email
   */
  handleSubmitInvite = e => {
    e.preventDefault();
    let new_invite_list = this.state.invite_list;
    new_invite_list.push(this.state.input);
    this.setState({ invite_list: new_invite_list, input: "" });
  };

  handleSave = () => {
    this.props.setSharedEvent(this.state.checked, this.state.invite_list);
  };

  render() {
    return (
      <div>
        {this.renderCheckbox()}
        {this.renderInvite()}
      </div>
    );
  }

  /**
   * When checkbox clicked, renders contact
   * list and invites those people
   * @todo have a text box option for entering email
   * @todo checkboxes to pick which contacts to add
   */
  renderInvite = () => {
    if (this.state.checked) {
      db.collection("users")
        .doc(JSON.parse(localStorage.getItem("currentUser")))
        .get()
        .then(doc => {
          if (doc.exists) {
            let temp = doc.data().contacts.map(c => {
              return c.email;
            });
            this.setState({ invite_list: temp });
          }
        });
      return (
        <div>
          <InviteContacts
            handleSave={this.handleSave}
            />
          <br/>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => this.handleSave()}
          >
            Save
          </Button>
          <br />
        </div>
      );
    }
  };

  renderCheckbox = () => {
    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked}
                value={this.state.checked}
                onChange={() => this.handleCheck()}
              />
            }
            label="Make this event shareable"
          />
        </FormGroup>
      </div>
    );
  };
}

export default Invite;
