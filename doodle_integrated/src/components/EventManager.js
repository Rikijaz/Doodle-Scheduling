import React, { Component } from "react";
import AddSecondPage from "./AddSecondPage";
import Poll from "./Poll";
import EventHome from "./EventHome";
import Header from "./header";
import uuid from "uuid";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";
import AddFirstPage from "./AddFirstPage";

export class EventManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: JSON.parse(localStorage.getItem("events")),

            polls: JSON.parse(localStorage.getItem("polls")),

            currentEventTitle: "",
            currentEventDate: "",
            currentEventDescription: "",

            errorMessageOpen: false,
            message: "",
            successMessageOpen: false,

            nextPage: false,
            homePage: true,
            pollPage: false,

            editingEvent: false,
            indexOfEditEvent: ""
        };
    }

    addEvent = async (title, description, date, time) => {
        if (time === "") {
            this.setState({ errorMessageOpen: true, message: "Missing Time!" });
        } else if (time !== "" && !this.state.editingEvent) {
            const newEvent = {
                id: uuid.v4(),
                title: title,
                completed: false,
                description: description,
                date: date,
                time: time
            };
            if (this.state.events !== null) {
                this.setState({
                    events: [...this.state.events, newEvent],
                    successMessageOpen: true
                });
            } else {
                //needed to add this, cant call this.state.events if it is null
                const newEventArray = [];
                newEventArray.push(newEvent);
                this.setState({
                    events: newEventArray,
                    successMessageOpen: true
                });
            }
            this.finishAddEvent();
        } else if (time !== "" && this.state.editingEvent) {
            const newEvent = {
                id: uuid.v4(),
                title: title,
                completed: false,
                description: description,
                date: date,
                time: time
            };
            const newEvents = this.state.events;
            newEvents.splice(this.state.indexOfEditEvent, 1, newEvent);
            this.setState({
                events: newEvents,
                indexOfEditEvent: "",
                editingEvent: false
            });
            this.finishAddEvent();
        }
    };

    addFirst = async (t, d, des) => {
        if (t !== "") {
            this.setState({ currentEventTitle: t });
            this.setState({ currentEventDate: d });
            this.setState({ currentEventDescription: des });
            this.goToNext();
        } else if (t === "") {
            this.setState({
                errorMessageOpen: true,
                message: "Missing title!"
            });
        } 
    };

    goToPrevious = () => {
        this.setState({ nextPage: !this.state.nextPage });
    };
    goToNext = () => {
        this.setState({ nextPage: !this.state.nextPage });
    };
    finishAddEvent = () => {
        //componentDidUpdate can handle this
        //localStorage.setItem("events", JSON.stringify(this.state.events));

        //change this to localstorage.clear later
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");

        this.setState({ homePage: !this.state.homePage });
    };

    handleErrorClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ errorMessageOpen: false });
    };
    handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ successMessageOpen: false });
    };

    beginAddEvent = () => {
        //have to account for them refreshing
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");
        this.setAdd();
    };

    beginEditEvent = () => {
        this.setAdd();
    };

    editEvent = id => {
        const editedEvent = this.state.events.find(event => {
            return event.id === id;
        });
        const editedFirstPage = {
            title: editedEvent.title,
            date: editedEvent.date,
            description: editedEvent.description
        };
        const editedSecondPage = {
            time: editedEvent.time
        };
        this.setState({
            editingEvent: true,
            indexOfEditEvent: this.state.events.findIndex(
                event => event.id === id
            )
        });
        localStorage.setItem(
            "saved_current_event",
            JSON.stringify(editedFirstPage)
        );
        localStorage.setItem(
            "saved_current_event_time",
            JSON.stringify(editedSecondPage)
        );
        this.beginEditEvent();
    };

    deleteEvent = id => {
        this.setState({
            events: [...this.state.events.filter(event => event.id !== id)]
        });
    };

    cancelEvent = () => {
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");
        this.setHomePage();
    };

    cancelPoll = () => {
        this.setHomePage();
    };

    beginAddPoll = () => {
        this.setPollPage();
    };

    componentDidUpdate() {
        localStorage.setItem("events", JSON.stringify(this.state.events));
        localStorage.setItem("polls", JSON.stringify(this.state.polls));
    }

    setAdd = () => {
        this.setState({ nextPage: false, homePage: false, pollPage: false });
    };

    setHomePage = () => {
        this.setState({ homePage: true, nextPage: false, pollPage: false });
    };

    setPollPage = () => {
        this.setState({ homePage: false, nextPage: false, pollPage: true });
    };

    addPoll = (pollTitle, selectedDays) => {
        if (pollTitle === "" && selectedDays.length === 0) {
            this.setState({
                errorMessageOpen: true,
                message: "Missing Title and Dates!"
            });
        } else if (pollTitle === "") {
            this.setState({
                errorMessageOpen: true,
                message: "Missing Title!"
            });
        } else if (selectedDays.length === 0) {
            this.setState({
                errorMessageOpen: true,
                message: "Missing Dates!"
            });
        } else {
            const newPoll = {
                title: pollTitle,
                selectedDays: selectedDays
            };
            if (this.state.polls === null) {
                const newPolls = [];
                newPolls.push(newPoll);
                this.setState({ polls: newPolls });
            } else {
                this.setState({ polls: [...this.state.polls, newPoll] });
            }
            this.setHomePage();
        }
    };

    render() {
        return (
            <div>
                <Header />
                {this.state.homePage && (
                    <EventHome
                        events={this.state.events}
                        polls={this.state.polls}
                        archivedEvents={this.state.archivedEvents}
                        beginAddEvent={this.beginAddEvent}
                        editEvent={this.editEvent}
                        deleteEvent={this.deleteEvent}
                        beginAddPoll={this.beginAddPoll}
                    />
                )}
                {!this.state.nextPage &&
                    !this.state.homePage &&
                    !this.state.pollPage && (
                        <AddFirstPage
                            addFirst={this.addFirst}
                            goToNext={this.goToNext}
                            cancelEvent={this.cancelEvent}
                        />
                    )}
                {this.state.nextPage &&
                    !this.state.homePage &&
                    !this.state.pollPage && (
                        <AddSecondPage
                            goToPrevious={this.goToPrevious}
                            nextPage={this.state.nextPage}
                            addEvent={this.addEvent}
                            title={this.state.currentEventTitle}
                            description={this.state.currentEventDescription}
                            //date={this.state.currentEventDate}
                            cancelEvent={this.cancelEvent}
                        />
                    )}
                {this.state.pollPage &&
                    !this.state.nextPage &&
                    !this.state.homePage && (
                        <Poll
                            cancelPoll={this.cancelPoll}
                            addPoll={this.addPoll}
                        />
                    )}
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.errorMessageOpen}
                    autoHideDuration={6000}
                    onClose={this.handleErrorClose}
                >
                    <MySnackbarContent
                        onClose={this.handleErrorClose}
                        variant="error"
                        message={this.state.message}
                    />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.successMessageOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSuccessClose}
                >
                    <MySnackbarContent
                        onClose={this.handleSuccessClose}
                        variant="success"
                        message={"New event has been created"}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default EventManager;
