import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

export class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  //functions
  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
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
   * When checkbox clicked, renders invite box
   * to enter in users' emails
   */
  renderInvite = () => {
    if (this.state.checked) {
      return <div>woot</div>
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
