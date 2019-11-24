import React, { Component } from "react";
import AddEvent from "./AddEvent";
import EventHome from "./EventHome";
import Header from "./header";
import uuid from "uuid";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";
import { db, firebase } from "./firebase";

let doc = JSON.parse(localStorage.getItem("currentUser"))
    ? db
          .collection("users")
          .doc(JSON.parse(localStorage.getItem("currentUser")))
    : undefined;

export class EventManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],

            currentEventTitle: "",
            currentEventDescription: "",

            errorMessageOpen: false,
            message: "",
            successMessageOpen: false,

            nextPage: false,
            homePage: true,

            editingEvent: false,
            indexOfEditEvent: 0
        };
    }

    componentDidMount() {
        doc = db
            .collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")));

        doc.get().then(data => {
            if (data.exists) {
                this.setState({ events: data.data().events });
            } else {
                //console.log("Sad toot");
            }
        });
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
            db.collection("users")
                .doc(JSON.parse(localStorage.getItem("currentUser")))
                .update({
                    events: firebase.firestore.FieldValue.arrayUnion(newEvent)
                });
            this.setState({ successMessageOpen: true });
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

            db.collection("users")
                .doc(JSON.parse(localStorage.getItem("currentUser")))
                .update({
                    events: newEvents
                });
            this.setState({ editingEvent: false });
            this.finishAddEvent();
        }
    };

    finishAddEvent = () => {
        //change this to localstorage.clear later
        doc.get().then(data => {
            if (data.exists) {
                this.setState({ events: data.data().events });
            } else {
                //console.log("Sad toot");
            }
        });
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");
        this.setState({
            homePage: !this.state.homePage
        });
    };

    addFirst = async (t, d, des) => {
        if (t !== "") {
            this.setState({ currentEventTitle: t });
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
        localStorage.removeItem("saved_title");
        localStorage.removeItem("saved_description");
        localStorage.removeItem("saved_time");
        localStorage.removeItem("saved_date");
        this.setAdd();
    };

    beginEditEvent = () => {
        this.setAdd();
    };

    editEvent = (id,events) => {
        const editedEvent = events.find(event => {
            return event.id === id;
        });
        console.log(editedEvent);
        const editedFirstPage = {
            title: editedEvent.title,
            description: editedEvent.description
        };
        const editedSecondPage = {
            date: editedEvent.date,
            time: editedEvent.time
        };
        for (let i = 0; i < events.length; i++) {
            if (events[i].id === editedEvent.id) {
                this.setState({
                    indexOfEditEvent: i,
                    editingEvent: true
                });
                break;
            }
        }
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
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .update({
                events: [...this.state.events.filter(event => event.id !== id)]
            });

        doc.get().then(data => {
            if (data.exists) {
                this.setState({ events: data.data().events });
            } else {
                //console.log("Sad toot");
            }
        });
    };

    cancelEvent = () => {
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");
        this.setHomePage();
    };

    setAdd = () => {
        this.setState({ nextPage: false, homePage: false });
    };

    setHomePage = () => {
        this.setState({ homePage: true, nextPage: false });
    };

    render() {
        return (
            <div>
                <Header />
                {this.state.homePage && (
                    <EventHome
                        beginAddEvent={this.beginAddEvent}
                        editEvent={this.editEvent}
                        deleteEvent={this.deleteEvent}
                    />
                )}
                {!this.state.nextPage && !this.state.homePage && (
                    <AddEvent 
                    cancelEvent={this.cancelEvent} 
                    setHomePage={() => this.setHomePage()}
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
