import React, { Component } from "react";
import AddEvent from "./AddEvent";
import EventHome from "./EventHome";
import Header from "./header";
import { db } from "./firebase";

let doc = JSON.parse(localStorage.getItem("currentUser"))
    ? db
          .collection("users")
          .doc(JSON.parse(localStorage.getItem("currentUser")))
    : undefined;

export class EventManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homePage: true,
            events: [],
            editingEvent: false,
            indexOfEditEvent: 0
        };
    }

    componentDidMount() {
        db.collection("users")
            .doc(JSON.parse(localStorage.getItem("currentUser")))
            .onSnapshot(doc => {
                if (doc.exists) {
                    this.setState({ events: doc.data().events });
                }
            });
    }

    beginAddEvent = () => {
        //have to account for them refreshing
        localStorage.removeItem("saved_title");
        localStorage.removeItem("saved_description");
        localStorage.removeItem("saved_time");
        localStorage.removeItem("saved_date");
        this.setAdd();
    };

    editEvent = (id) => {
        const editedEvent = this.state.events.find(event => {
            return event.id === id;
        });
        localStorage.setItem("saved_title", JSON.stringify(editedEvent.title));
        localStorage.setItem(
            "saved_description",
            JSON.stringify(editedEvent.description)
        );
        localStorage.setItem("saved_date", JSON.stringify(editedEvent.date));
        localStorage.setItem("saved_time", JSON.stringify(editedEvent.time));
        for (let i = 0; i < this.state.events.length; i++) {
            if (this.state.events[i].id === editedEvent.id) {
                this.setState({
                    indexOfEditEvent: i,
                    editingEvent: true
                });
                break;
            }
        }
        this.setAdd();
    };

    deleteEvent = (id)=> {
        doc.update({
            events: [...this.state.events.filter(event => event.id !== id)]
        });
    };

    cancelEvent = () => {
        localStorage.removeItem("saved_current_event");
        localStorage.removeItem("saved_current_event_time");
        this.setHomePage();
    };

    setAdd = () => {
        this.setState({homePage: false });
    };

    setHomePage = () => {
        this.setState({
            homePage: true,
            editingEvent: false,
            indexOfEditEvent: 0
        });
    };

    render() {
        return (
            <div>
                <Header />
                {this.state.homePage && (
                    <EventHome
                        events={this.state.events}
                        beginAddEvent={this.beginAddEvent}
                        editEvent={this.editEvent}
                        deleteEvent={this.deleteEvent}
                    />
                )}
                {!this.state.homePage && (
                    <AddEvent
                        cancelEvent={this.cancelEvent}
                        setHomePage={() => this.setHomePage()}
                        editingEvent={this.state.editingEvent}
                        indexOfEditEvent={this.state.indexOfEditEvent}
                    />
                )}
            </div>
        );
    }
}

export default EventManager;
