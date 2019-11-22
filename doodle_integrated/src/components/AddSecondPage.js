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
            calendar: "default"
        };
    }
    onChangeTime = t => this.setState({ time: t.target.value });
    onSubmit = t => {
        t.preventDefault();
        this.props.addEvent(
            this.props.title,
            this.props.description,
            this.props.date,
            this.state.time
        );
    };

    componentWillUnmount() {
        localStorage.setItem(
            "saved_current_event_time",
            JSON.stringify(this.state)
        );
    }
    componentDidMount() {
        const saved_current_time = JSON.parse(
            localStorage.getItem("saved_current_event_time")
        );
        this.setState(saved_current_time);
    }

    // eric's stuff //
    changeCalendar = calendar => {
        this.setState({ calendar });
    };
    
    onEventSubmitted(eventData) {
        var i;
        for (i = 0; i < eventData.length; i++) {
            console.log(
                "Event created from " +
                    eventData[i].start.format("LLLL") +
                    " to " +
                    eventData[i].end.format("LLLL") +
                    "\n"
            );
        }

        // this.props.date = 
        // this.state.time =
        
        // https://momentjs.com/docs/#/parsing/string-format/ if you are looking for a different time format
    }

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
                <DoodleCalendar parentMethod={this.onEventSubmitted}>
                    {this.props.children}
                </DoodleCalendar>
            </div>
        );

        //eric's shit

        return (
            <div>
                {renderCalendar}

                <form onSubmit={t => this.onSubmit(t)}>
                    {/* {title}
                    <br />
                    {description}
                    <br />
                    <TextField
                        variant="outlined"
                        id="time"
                        label="Event Time"
                        type="time"
                        value={this.state.time}
                        margin="normal"
                        onChange={(t) => this.onChangeTime(t)}
                    />
                    <br /> */}
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
