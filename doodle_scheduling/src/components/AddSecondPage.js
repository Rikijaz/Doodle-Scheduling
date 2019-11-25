import React, { Component } from "react";
//import { TextField } from '@material-ui/core';
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DoodleCalendar from "./DoodleCalendar";
import "react-week-calendar/dist/style.css";

export class AddSecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: JSON.parse(localStorage.getItem("saved_time")),
            date: JSON.parse(localStorage.getItem("saved_date")),
            calendar: "default"
        };
    }

    // eric's stuff //
    changeCalendar = calendar => {
        this.setState({ calendar });
    };

    onEventSubmitted = eventData => {
        // var i;
        // for (i = 0; i < eventData.length; i++) {
        //     let x = new Date(eventData[0].start.format("LLLL"));
        //     let y = new Date(eventData[0].end.format("LLLL"));
        //     let start =
        //         x.getHours().toString() + ":" + x.getMinutes().toString();
        //     let end = y.getHours().toString() + ":" + y.getMinutes().toString();
        //     let together = start + "-" + end;
        //     let date =
        //         (x.getMonth() + 1).toString() + "/" + x.getDate().toString();
        //     this.setState({ time: together, date: date });
        //     // console.log(
        //     //     "Event created from " +
        //     //         eventData[i].start.format("LLLL") +
        //     //         " to " +
        //     //         eventData[i].end.format("LLLL") +
        //     //         "\n"
        //     // );
        // }

        //right now it should only take in one date & one range of time
        let x = new Date(eventData[0].start.format("LLLL"));
        let y = new Date(eventData[0].end.format("LLLL"));
        let start = x.getHours().toString() + ":" + x.getMinutes().toString();
        let end = y.getHours().toString() + ":" + y.getMinutes().toString();
        let together = start + "-" + end;
        let date = (x.getMonth() + 1).toString() + "/" + x.getDate().toString();
        this.setState({ time: together, date: date });
        localStorage.setItem("saved_date", JSON.stringify(date));
        localStorage.setItem("saved_time", JSON.stringify(together));

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
                            this.state.date,
                            this.state.time,
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
