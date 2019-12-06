import React, { Component } from "react";
import AddEvent from "./AddEvent";
import EventHome from "./EventHome";
import Header from "./header";
import { db } from "./firebase";
import Join from "./Join";

export class EventManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homePage: true,
            editingEvent: false,
            idOfEditEvent: "",
            joinEvent: false
        };
    }

    /**
     * Starts the process of adding a new event
     * @return sets home page to false
     * @return clears localStorage of event details
     */
    beginAddEvent = () => {
        //have to account for them refreshing
        localStorage.removeItem("saved_title");
        localStorage.removeItem("saved_description");
        localStorage.removeItem("saved_start_date");
        localStorage.removeItem("saved_end_date");
        localStorage.removeItem("saved_category");
        this.setAdd();
    };

    beginJoinEvent = () => {
        this.setState({ joinEvent: !this.state.joinEvent });
    };

    /**
     * @param id id of event that is being edited
     * @param viewShared if we are editing shared event
     * or normal event
     *
     */
    editEvent = (id, viewShared) => {
        //accessing shared event collections
        // if (viewShared) {
        //     //db.collection("shared_events").doc(id)
        // }
        // //accessing normal event collections
        // else {
        //     // db.collection("events")
        //     //     .doc(id)
        //     //     .get()
        //     //     .then(doc => {
        //     //         if (doc.exists) {
        //     //             localStorage.setItem(
        //     //                 "saved_title",
        //     //                 JSON.stringify(doc.data().title)
        //     //             );
        //     //             localStorage.setItem(
        //     //                 "saved_description",
        //     //                 JSON.stringify(doc.data().description)
        //     //             );
        //     //             localStorage.setItem(
        //     //                 "saved_category",
        //     //                 JSON.stringify(doc.data().category)
        //     //             );
        //     //             localStorage.setItem(
        //     //                 "saved_start_date",
        //     //                 JSON.stringify(doc.data().startDate)
        //     //             );
        //     //             localStorage.setItem(
        //     //                 "saved_end_date",
        //     //                 JSON.stringify(doc.data().endDate)
        //     //             );
        //     //         }
        //     //     });
        // }
        db.collection("events")
                .doc(id)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        console.log("GO")
                        localStorage.setItem(
                            "saved_title",
                            JSON.stringify(doc.data().title)
                        );
                        localStorage.setItem(
                            "saved_description",
                            JSON.stringify(doc.data().description)
                        );
                        localStorage.setItem(
                            "saved_category",
                            JSON.stringify(doc.data().category)
                        );
                        localStorage.setItem(
                            "saved_start_date",
                            JSON.stringify(doc.data().startDate)
                        );
                        localStorage.setItem(
                            "saved_end_date",
                            JSON.stringify(doc.data().endDate)
                        );
                        this.setState(
                            {
                                editingEvent: true,
                                idOfEditEvent: id
                            },
                            this.setAdd()
                        );
                    }
                });
    };

    /**
     * @param id takes in the id of the event to be deleted
     * @return {array} returns the updated array with
     * event removed to the database
     * @todo delete either shared or personal events
     */

    /**
     * Cancels the process of event creation
     * @return Return back to the home page
     */
    cancelEvent = () => {
        // localStorage.removeItem("saved_title");
        // localStorage.removeItem("saved_description");
        // localStorage.removeItem("saved_time");
        // localStorage.removeItem("saved_date");
        this.setHomePage();
    };

    /**
     * function to start add/edit event
     * @return sets home page to false
     */
    setAdd = () => {
        this.setState({ homePage: false });
    };

    /**
     * Sets view back to home page
     * @return Home Page
     */
    setHomePage = () => {
        this.setState({
            homePage: true,
            editingEvent: false,
            idOfEditEvent: ""
        });
    };

    /**
     * Decides what to render, between the
     * home page and event creation page
     */
    render() {
        let joinDialog = this.state.joinEvent ? (
            <Join open={true} beginJoinEvent={() => this.beginJoinEvent()} />
        ) : null;
        return (
            <div>
                <Header />
                {this.state.homePage && (
                    <EventHome
                        beginAddEvent={this.beginAddEvent}
                        beginJoinEvent={this.beginJoinEvent}
                        editEvent={this.editEvent}
                        deleteEvent={this.deleteEvent}
                    />
                )}
                {!this.state.homePage && (
                    <AddEvent
                        cancelEvent={this.cancelEvent}
                        setHomePage={() => this.setHomePage()}
                        editingEvent={this.state.editingEvent}
                        idOfEditEvent={this.state.idOfEditEvent}
                    />
                )}
                {joinDialog}
            </div>
        );
    }
}

export default EventManager;
