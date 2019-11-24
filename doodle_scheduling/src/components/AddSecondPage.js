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
            time: "",
            date: "",
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

        // https://momentjs.com/docs/#/parsing/string-format/ if you are looking for a different time format
    };

    // eric's stuff //

    render() {
        //eslint-disable-next-line
        const { title, description } = this.props;

        //eric's shit

        //eslint-disable-next-line
        const calendar = this.state.calendar;
        let renderCalendar = null;
        renderCalendar = (
            <div>
                <h3>Choose your time!</h3>
                <DoodleCalendar parentMethod={e => this.onEventSubmitted(e)}>
                    {this.props.children}
                </DoodleCalendar>
            </div>
        );

        //eric's shit

        return (
            <div>
                {renderCalendar}

                <form onSubmit={t => this.onSubmit(t)}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.props.goToPrevious}
                    >
                        Back
                    </Button>
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={t => this.onSubmit(t)}
                    >
                        Submit Event
                    </Button>
                    <br />
                    <Button
                        className="userCancelButton"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<CancelIcon />}
                        onClick={this.props.cancelEvent}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
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
