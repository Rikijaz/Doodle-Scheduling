import React, { Component } from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import FormGroup from "@material-ui/core/FormGroup";
import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InviteContacts from "./InviteContacts";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./styling/AddThirdPage.css";

export class AddThirdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            invite_list: []
        };
    }

    render() {
        return (
            <div>
                {this.renderOptions()}
                <br />
                {this.renderButtons()}
            </div>
        );
    }

    //functions

    /**
     * toggles check of checkbox
     */
    handleCheckbox = () => {
        this.setState({ checked: !this.state.checked });
    };

    /**
     * Rendering invite options
     */
    renderOptions = () => {
        return (
            <div>
                <FormGroup className="checkrow" row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checked}
                                value={this.state.checked}
                                onChange={() => this.handleCheckbox()}
                            />
                        }
                        label="Make this event shareable"
                    />
                </FormGroup>
                {this.renderContactDropdown()}
            </div>
        );
    };

    renderContactDropdown = () => {
        if (this.state.checked) {
            return (
                <InviteContacts setSharedEvent={l => this.setSharedEvent(l)} />
            );
        }
    };

    setSharedEvent = list => {
        this.setState({ invite_list: list });
    };

    //We are rendering buttons separately from options
    /**
     * Rendering buttons
     */
    renderButtons = () => {
        return (
            <div>
                <div className="right">
                    <IconButton
                        className="button"
                        aria-label="back"
                        onClick={this.props.goToSecondPage}
                        color="primary"
                        size="medium"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={e =>
                            this.props.submitEvent(e, this.state.invite_list)
                        }
                    >
                        Submit Event
                    </Button>
                </div>
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
