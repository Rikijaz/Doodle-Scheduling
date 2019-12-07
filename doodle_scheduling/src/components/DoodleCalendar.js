import React from "react";
import moment from "moment";
import WeekCalendar from "react-week-calendar";
import { db, firebase } from "./firebase";

// garbage text for testing pull requests to dev

export default class DoodleCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUid: 1,
            selectedIntervals: [
                // {
                //   uid: 1,
                //   start: moment({h: 6, m: 30}),
                //   end: moment({h: 7, m: 59}),
                //   value: "CS150 exam"
                // },
            ]
        };

        // this.displayCurrentEvents();
    }

    handleEventRemove = event => {
        const { selectedIntervals } = this.state;
        //console.log('Removing event');

        const index = selectedIntervals.findIndex(interval => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals.splice(index, 1);
            this.setState({ selectedIntervals });
        }
    };

    handleEventUpdate = event => {
        const { selectedIntervals } = this.state;
        //console.log('Updating event');

        const index = selectedIntervals.findIndex(interval => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals[index] = event;
            this.setState({ selectedIntervals });
        }
    };

    handleSelect = newIntervals => {
        const { lastUid, selectedIntervals } = this.state;
        const intervals = newIntervals.map((interval, index) => {
            return {
                ...interval,
                uid: lastUid + index
            };
        });

        this.setState({
            selectedIntervals: selectedIntervals.concat(intervals),
            lastUid: lastUid + newIntervals.length
        });

        console.log(selectedIntervals);

        this.props.parentMethod(intervals);
    };

    displayCurrentEvents() {
        let currentEvents = [];

        let i = 0;

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        db.collection("events")
            .where("owners", "array-contains", currentUser)
            .onSnapshot(data => {
                data.forEach(doc => {
                    i++;
                    var eventData = {
                        end: moment(doc.data().endDate),
                        start: moment(doc.data().startDate),
                        value: doc.data().title,
                        uid: i
                    };

                    currentEvents.push(eventData);
                });
                this.setState({ selectedIntervals: currentEvents });
            });

        db.collection("events")
            .where("invitees", "array-contains", currentUser)
            .onSnapshot(data => {
                data.forEach(doc => {
                    i++;
                    var eventData = {
                        end: moment(doc.data().endDate),
                        start: moment(doc.data().startDate),
                        value: doc.data().title,
                        uid: i
                    };

                    currentEvents.push(eventData);
                });
                this.setState({ selectedIntervals: currentEvents });
            });

        db.collection("events")
            .where("accepted_invitees", "array-contains", currentUser)
            .onSnapshot(data => {
                data.forEach(doc => {
                    i++;
                    var eventData = {
                        end: moment(doc.data().endDate),
                        start: moment(doc.data().startDate),
                        value: doc.data().title,
                        uid: i
                    };

                    currentEvents.push(eventData);
                });
                this.setState({ selectedIntervals: currentEvents });
            });
    }

    getCalendarStyle = () => {
        return {
            padding: "45px"
        };
    };

    render() {
        return (
            <div style={this.getCalendarStyle()}>
                <WeekCalendar
                    dayFormat={"dddd, MM.DD"}
                    startTime={moment({ h: 8, m: 0 })}
                    endTime={moment({ h: 20, m: 50 })}
                    scaleFormat={"hh:mm a"}
                    numberOfDays={7}
                    selectedIntervals={this.state.selectedIntervals}
                    onIntervalSelect={this.handleSelect}
                    onIntervalUpdate={this.handleEventUpdate}
                    onIntervalRemove={this.handleEventRemove}
                    useModal={true}
                />
            </div>
        );
    }
}
