import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollTitle: "",
            //selectedDays: undefined
            selectedDays: []
        };
    }

    onChangePollTitle = p => this.setState({ pollTitle: p.target.value });

    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    };

    onSubmit = () => {
        this.props.addPoll(this.state.pollTitle, this.state.selectedDays);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Poll Name"
                        fullWidth
                        value={this.state.pollTitle}
                        margin="normal"
                        onChange={p => this.onChangePollTitle(p)}
                    />

                    <h1>Please Select Days</h1>

                    <DayPicker
                        onDayClick={(day, selected) =>
                            this.handleDayClick(day, selected)
                        }
                        selectedDays={this.state.selectedDays}
                    />

                    <br />

                    <Button
                        className="userSubmitButton"
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => this.onSubmit()}
                    >
                        Submit
                    </Button>

                    <br />

                    <Button
                        className="userCancelButton"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<CancelIcon />}
                        onClick={this.props.cancelPoll}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}

export default Poll;
