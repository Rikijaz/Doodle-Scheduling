import React, { Component } from "react";
//import { TextField } from '@material-ui/core';
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DoodleCalendar from "./DoodleCalendar";
import "react-week-calendar/dist/style.css";
import moment from "moment";

export class AddSecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // time: JSON.parse(localStorage.getItem("saved_time")),
            // date: JSON.parse(localStorage.getItem("saved_date")),
            startDate: JSON.parse(localStorage.getItem("saved_start_date")),
            endDate: JSON.parse(localStorage.getItem("saved_end_date")),
            calendar: "default"
        };
    }

    // eric's stuff //
    changeCalendar = calendar => {
        this.setState({ calendar });
    };

    onEventSubmitted = eventData => {
        var eventStartDate = eventData[0].start.format();
        var eventEndDate = eventData[0].end.format();
        this.setState({ startDate: eventStartDate, endDate: eventEndDate });

        localStorage.setItem("saved_start_date", JSON.stringify(eventStartDate));
        localStorage.setItem("saved_end_date", JSON.stringify(eventEndDate));
        // https://momentjs.com/docs/#/parsing/string-format/ if you are looking for a different time format
    };

    // eric's stuff //

    render() {
        //eric's shit

        //eslint-disable-next-line
        const calendar = this.state.calendar;
        //let renderCalendar = null;

        return (
            <div>
                {this.renderCalendar()}
                {this.renderButtons()}
            </div>
        );
    }
    renderCalendar = () => {
        return (
            <div>
                <h3>Choose your time!</h3>
                <DoodleCalendar parentMethod={e => this.onEventSubmitted(e)}>
                    {this.props.children}
                </DoodleCalendar>
            </div>
        );
    };

    renderButtons = () => {
        return (
            <div>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.props.goToFirstPage}
                >
                    Back
                </Button>
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={e =>
                        this.props.goToThirdPage(
                            this.state.endDate,
                            this.state.startDate,
                            e
                        )
                    }
                >
                    Next
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

export default AddSecondPage;
/*  
    Eric's Stuff that was added in:
        renderCalendar
        calendar
        DoodleCalendar
        onEventSubmitted
        changeCalendar
        calendar in state
        DoodleCalendar.js



*/
