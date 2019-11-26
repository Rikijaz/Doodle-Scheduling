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
            sharedEvents: [],
            editingEvent: false,
            indexOfEditEvent: 0
        };
    }

    // /**
    //  * When this component is mounted, it syncs events with
    //  * database events
    //  * @return set event state to database's events
    //  */
    // componentDidMount() {
    //     let tempObject = {temp:[]};

    //     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //     console.log(currentUser);
    //     db.collection("events")
    //     .where("owners", "array-contains", currentUser).get()
    //     .then(data =>{
    //         tempObject.temp = []
    //         data.forEach(doc=>{
    //             //temp.push(doc.data());
    //             tempObject.temp.push(doc.data());
    //         })
    //         this.setState({events: tempObject.temp})
            
    //     })
    //     .catch(error=>{
    //         console.error(error);
    //     })
    //     db.collection("events")
    //     .where("invitees", "array-contains", currentUser).get()
    //     .then(data=>{
    //         tempObject.temp = [];
    //         data.forEach(doc=>{
    //             tempObject.temp.push(doc.data());
    //             console.log(doc.data())
    //             //temp.push(doc.data());
    //         })
    //         this.setState({sharedEvents: tempObject.temp})
    //     })
    //     .catch(err=> console.error(err));
    //     console.log(tempObject.temp);
    //     //this.setState({events: tempObject.temp});
        
    //     // db.collection("events")
    //     //     .doc(JSON.parse(localStorage.getItem("currentUser")))
    //     //     .onSnapshot(doc => {
    //     //         if (doc.exists) {
    //     //             this.setState({ events: doc.data().events });
    //     //         }
    //     //     });
    // }

    /**
     * Starts the process of adding a new event
     * @return sets home page to false
     * @return clears localStorage of event details
     */
    beginAddEvent = () => {
        //have to account for them refreshing
        localStorage.removeItem("saved_title");
        localStorage.removeItem("saved_description");
        localStorage.removeItem("saved_time");
        localStorage.removeItem("saved_date");
        this.setAdd();
    };

    /**
     * @param id id of event that is being edited
     * 
     * 
     */
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

    /**
     * @param id takes in the id of the event to be deleted
     * @return {array} returns the updated array with 
     * event removed to the database
     */
    deleteEvent = (id)=> {
        doc.update({
            events: [...this.state.events.filter(event => event.id !== id)]
        });
    };

    /**
     * Cancels the process of event creation
     * @return Return back to the home page
     */
    cancelEvent = () => {
        localStorage.removeItem("saved_title");
        localStorage.removeItem("saved_description");
        localStorage.removeItem("saved_time");
        localStorage.removeItem("saved_date");
        this.setHomePage();
    };

    /**
     * function to start add/edit event
     * @return sets home page to false
     */
    setAdd = () => {
        this.setState({homePage: false });
    };

    /**
     * Sets view back to home page
     * @return Home Page
     */
    setHomePage = () => {
        this.setState({
            homePage: true,
            editingEvent: false,
            indexOfEditEvent: 0
        });
    };

    /**
     * Decides what to render, between the 
     * home page and event creation page
     */
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
