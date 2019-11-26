import React, { Component } from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Invite from './Invite'

export class AddThirdPage extends Component {
  
  render() {
    return (
      <div>
        {this.renderOptions()}
        {this.renderButtons()}
      </div>
    );
  }

  /**
   * Rendering invite options
   */
  renderOptions = () => {
      return (<div><Invite/></div>);
  };

  //We are rendering buttons separately from options
  /**
   * Rendering buttons
   */
  renderButtons = () => {
    return (
      <div>
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          onClick={this.props.goToSecondPage}
        >
          Back
        </Button>
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          onClick={e => this.props.submitEvent(e)}
        >
          Submit Event
        </Button>
        <br />
        <Button
          type="button"
          className="userCancelButton"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<CancelIcon />}
          onClick={this.props.cancelEvent}
        >
          Cancel
        </Button>
      </div>
    );
  };
}

export default AddThirdPage;
