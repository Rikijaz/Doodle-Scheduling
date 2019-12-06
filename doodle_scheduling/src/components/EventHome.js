import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "react-table/react-table.css";
import Form from "./Form";
import { db, firebase } from "./firebase";
import uuid from "uuid";
import Cards from "./Cards";
import EventCalendar from "./EventCalendar/EventCalendar";
import moment from "moment";
import { categories } from "./AddEvent";
import { TextField, Container } from "@material-ui/core";

export class EventHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openMenu: false,
            anchorEl2: null,
            openMenu2: false,
            anchorEl3: null,
            openMenu3: false,
            showForm: false,
            showShared: "events",
            events: [],
            sharedEvents: [],
            acceptedEvents: [],
            filteredEvents: [],
            filteredSharedEvents: [],
            filteredAcceptedEvents: [],
            eventSortOrder: "descending",
            search: ""
        };
    }

    areThereNoEvents() {
        return (
            this.state.events === null ||
            this.state.events === undefined ||
            this.state.events.length === 0
        );
    }

    areThereNoSharedEvents() {
        return (
            this.state.sharedEvents === null ||
            this.state.sharedEvents === undefined ||
            this.state.sharedEvents.length === 0
        );
    }
    areNoAcceptedEvents() {
        return (
            this.state.acceptedEvents === null ||
            this.state.acceptedEvents === undefined ||
            this.state.acceptedEvents.length === 0
        );
    }

    isSearching() {
        return this.state.search != "";
    }

    sendEmail = () => {
        this.setState({ showForm: true });
    };

    switchEventView = () => {
        this.setState({ showShared: !this.state.showShared });
    };

    setEventOrder = order => {
        this.handleClose3();
        this.setState({ eventSortOrder: order });
    };

    /**
     * Comparator for ordering events ascending
     */
    compareEventStartDatesAscending(a, b) {
        if (moment(a.startDate).valueOf() < moment(b.startDate).valueOf()) {
            return -1;
        }

        if (moment(a.startDate).valueOf() > moment(b.startDate).valueOf()) {
            return 1;
        }

        return 0;
    }

    /**
     * Comparator for ordering events descending
     */
    compareEventStartDatesDescending(a, b) {
        if (moment(a.startDate).valueOf() < moment(b.startDate).valueOf()) {
            return 1;
        }

        if (moment(a.startDate).valueOf() > moment(b.startDate).valueOf()) {
            return -1;
        }

        return 0;
    }

    /**
     * Comparator for ordering events by category
     */
    compareEventCategory(a, b) {
        const map = {};
        map[categories.None] = 0;
        map[categories.Hobbies] = 1;
        map[categories.Social] = 2;
        map[categories.Errands] = 3;
        map[categories.Projects] = 4;
        map[categories.Hobbies] = 5;

        if (map[a.category] < map[b.category]) {
            return -1;
        }

        if (map[a.category] > map[b.category]) {
            return 1;
        }

        return 0;
    }

    viewForm = () => {
        if (this.state.showShared === "events") {
            return <div>{this.showEvents()}</div>;
        } else if (this.state.showShared === "shared") {
            return <div>{this.showSharedEvents()}</div>;
        } else if (this.state.showShared === "accepted") {
            return <div>{this.showAcceptedEvents()}</div>;
        } else if (this.state.showShared === "calendar") {
            return <div>{this.showCalendar()}</div>;
        }
    };

    /**
     * Displays event table
     * @return Header saying no events or Table of Events
     */
    showEvents = () => {
        var displayedEvents = [];

        if (this.isSearching()) {
            displayedEvents = this.state.filteredEvents;
        } else {
            displayedEvents = this.state.events;
        }

        switch (this.state.eventSortOrder) {
            case "ascending": {
                displayedEvents.sort(this.compareEventStartDatesAscending);
                break;
            }
            case "descending": {
                displayedEvents.sort(this.compareEventStartDatesDescending);
                break;
            }
            case "category": {
                displayedEvents.sort(this.compareEventCategory);
                break;
            }
            default: {
                break;
            }
        }

        if (this.areThereNoEvents()) {
            return <h2>No events</h2>;
        } else {
            return displayedEvents.map((event, index) => (
                <Container maxWidth="xl">
                    <Cards
                        key={index}
                        data={event}
                        editEvent={id => this.props.editEvent(id)}
                        deleteEvent={id => this.deleteEvent(id)}
                    />
                </Container>
            ));
        }
    };

    showSharedEvents = () => {
        var displayedEvents = [];

        if (this.isSearching()) {
            displayedEvents = this.state.filteredSharedEvents;
        } else {
            displayedEvents = this.state.sharedEvents;
        }

        switch (this.state.eventSortOrder) {
            case "ascending": {
                displayedEvents.sort(this.compareEventStartDatesAscending);
                break;
            }
            case "descending": {
                displayedEvents.sort(this.compareEventStartDatesDescending);
                break;
            }
            case "category": {
                displayedEvents.sort(this.compareEventCategory);
                break;
            }
            default: {
                break;
            }
        }

        if (this.areThereNoSharedEvents()) {
            return <h2>No shared events</h2>;
        } else {
            console.log();
            return displayedEvents.map((event, index) => (
                <Container maxWidth="xl">
                    <Cards
                        key={index}
                        data={event}
                        isShared={true}
                        hasAccepted={false}
                        acceptInvite={id => this.acceptInvite(id)}
                        declineInvite={id => this.declineInvite(id)}
                    />
                </Container>
            ));
        }
    };

    showAcceptedEvents = () => {
        var displayedEvents = [];

        if (this.isSearching()) {
            displayedEvents = this.state.filteredAcceptedEvents;
        } else {
            displayedEvents = this.state.acceptedEvents;
        }

        switch (this.state.eventSortOrder) {
            case "ascending": {
                displayedEvents.sort(this.compareEventStartDatesAscending);
                break;
            }
            case "descending": {
                displayedEvents.sort(this.compareEventStartDatesDescending);
                break;
            }
            case "category": {
                displayedEvents.sort(this.compareEventCategory);
                break;
            }
            default: {
                break;
            }
        }

        if (this.areNoAcceptedEvents()) {
            return <h2>No accepted events</h2>;
        } else {
            return displayedEvents.map((event, index) => (
                <Container maxWidth="xl">
                    <Cards
                        key={index}
                        data={event}
                        isShared={true}
                        hasAccepted={true}
                    />
                </Container>
            ));
        }
    };

    /**
     * Displays event calendar
     */
    showCalendar = () => {
        const { events } = this.state;
        const { sharedEvents, acceptedEvents } = this.state;

        if (
            !this.areThereNoEvents() ||
            !this.areThereNoSharedEvents() ||
            !this.areNoAcceptedEvents()
        ) {
            return (
                <div className="App">
                    <main>
                        <EventCalendar
                            events={events}
                            sharedEvents={sharedEvents}
                            acceptedEvents={acceptedEvents}
                        ></EventCalendar>
                    </main>
                </div>
            );
        } else {
            return <h2>There are no events to be displayed</h2>;
        }
    };

    handleSearch = text => {
        this.setState({
            search: text.target.value,
            filteredEvents: this.filterEvents(this.state.events),
            filteredSharedEvents: this.filterEvents(this.state.sharedEvents),
            filteredAcceptedEvents: this.filterEvents(this.state.acceptedEvents)
        });
    };

    /**
     * Filters event by search input. Supports event title, description, category, and time
     * @param eventsToFilter Takes in events to filter
     * @return Filtered events by search input
     */
    filterEvents = eventsToFilter => {
        var filteredEvents = [];

        for (let i = 0; i < eventsToFilter.length; i++) {
            let searchLowerCase = this.state.search.toLowerCase();

            let accepted =
                eventsToFilter[i].title
                    .toLowerCase()
                    .includes(searchLowerCase) ||
                eventsToFilter[i].category
                    .toLowerCase()
                    .includes(searchLowerCase) ||
                eventsToFilter[i].description
                    .toLowerCase()
                    .includes(searchLowerCase) ||
                moment(eventsToFilter[i].startDate)
                    .format("LLLL")
                    .toLowerCase()
                    .includes(searchLowerCase);

            if (accepted) {
                filteredEvents.push(eventsToFilter[i]);
            }
        }

        return filteredEvents;
    };

    getMainStyle = () => {
        return {
            textAlign: "center",
            padding: "5px",
            background: "#fff"
        };
    };

    getBtnStyle = () => {
        return {
            textAlign: "right",
            padding: "10px",
            background: "#fff"
        };
    };

    /**
     * Opening drop down menu
     * @param e takes in event of clicking drop down menu
     * @return position of drop down menu
     * @return boolean to open menu
     */
    handleClick = e => {
        this.setState({
            anchorEl: e.currentTarget,
            openMenu: !this.state.openMenu
        });
    };

    /**
     * Clicks create event option and starts adding event
     */
    handleAddEventMenu = () => {
        this.handleClose();
        this.props.beginAddEvent();
    };
    /**
     * Opening drop down menu
     * @param e takes in event of clicking drop down menu
     * @return position of drop down menu
     * @return boolean to open menu
     */
    handleClick = e => {
        this.setState({
            anchorEl: e.currentTarget,
            openMenu: !this.state.openMenu
        });
    };
    handleClick2 = e => {
        this.setState({
            anchorEl2: e.currentTarget,
            openMenu2: !this.state.openMenu2
        });
    };
    handleClick3 = e => {
        this.setState({
            anchorEl3: e.currentTarget,
            openMenu3: !this.state.openMenu3
        });
    };

    /**
     * closes drop down menu
     */
    handleClose = () => {
        this.setState({ anchorEl: null, openMenu: !this.state.openMenu });
    };
    handleClose2 = () => {
        this.setState({ anchorEl2: null, openMenu2: !this.state.openMenu2 });
    };
    handleClose3 = () => {
        this.setState({ anchorEl3: null, openMenu3: !this.state.openMenu3 });
    };

    /**
     * Clicks join event option
     */
    handleJoinEventMenu = () => {
        this.handleClose();
        this.props.beginJoinEvent();
    };

    /**
     * Delete Event
     */
    deleteEvent = id => {
        let batch = db.batch();
        db.collection("events")
            .doc(id)
            .get()
            .then(doc => {
                if (doc.data().accepted_invitees) {
                    for (
                        let x = 0;
                        x < doc.data().accepted_invitees.length;
                        x++
                    ) {
                        const id2 = uuid.v4();
                        var temp = db.collection("notifications").doc(id2);
                        batch.set(temp, {
                            user: doc.data().accepted_invitees[x],
                            seen: false,
                            typeOf: 2,
                            eventTitle: doc.data().title,
                            id: id2
                        });
                    }
                }
                if (doc.data().invitees) {
                    for (let x = 0; x < doc.data().invitees.length; x++) {
                        const id2 = uuid.v4();
                        var temp = db.collection("notifications").doc(id2);
                        batch.set(temp, {
                            user: doc.data().invitees[x],
                            seen: false,
                            typeOf: 2,
                            eventTitle: doc.data().title,
                            id: id2
                        });
                    }
                }
                batch.commit();

                this.state.events.find(event => {
                    if (event.id === id) {
                        /* email notification */
                        var invitees = event.invitees;
                        var templateId = "yes";
                        var emailEvent = event.title;
                        var emailDescription = event.description;
                        var emailStartDate =
                            moment(event.startDate).format("LLLL") +
                            " - " +
                            moment(event.endDate).format("LT");
                        console.log("event categories: " + event.categories);
                        var emailCategory = event.category;
                        //var emailEndDate = event.endDate;

                        console.log("delete event");
                        console.log("invitees: " + invitees);
                        console.log("emailEvent: " + emailEvent);
                        console.log("emailDescription: " + emailDescription);
                        console.log("emailStartDate: " + emailStartDate);
                        //console.log("emailEndDate: " + emailEndDate);

                        window.emailjs
                            .send("gmail", templateId, {
                                send_to: [invitees],
                                subject: "An event has been deleted!",
                                emailEvent: emailEvent,
                                emailDescription: emailDescription,
                                emailStartDate: emailStartDate,
                                emailCategory: emailCategory
                            }) //, "emailEndDate": emailEndDate
                            .then(res => {
                                console.log("Email successfully sent!");
                                db.collection("events")
                                    .doc(id)
                                    .delete();
                            })
                            .catch(
                                db
                                    .collection("events")
                                    .doc(id)
                                    .delete()
                            );
                    }
                });

                // db.collection("events")
                // .doc(id)
                // .delete();
            })
            .catch(err => console.log(err));
    };
    acceptInvite = id => {
        const document = db.collection("events").doc(id);
        document
            .update({
                invitees: firebase.firestore.FieldValue.arrayRemove(
                    JSON.parse(localStorage.getItem("currentUser"))
                )
            })
            .catch(err => console.error(err));
        document
            .update({
                accepted_invitees: firebase.firestore.FieldValue.arrayUnion(
                    JSON.parse(localStorage.getItem("currentUser"))
                )
            })
            .catch(err => console.error(err));
    };
    declineInvite = id => {
        const document = db.collection("events").doc(id);
        document
            .update({
                invitees: firebase.firestore.FieldValue.arrayRemove(
                    JSON.parse(localStorage.getItem("currentUser"))
                )
            })
            .catch(err => console.error(err));
        document
            .update({
                declined_invitees: firebase.firestore.FieldValue.arrayUnion(
                    JSON.parse(localStorage.getItem("currentUser"))
                )
            })
            .catch(err => console.error(err));
    };

    /**
     * Renders table and buttons below the header.
     * @return Buttons
     * @return Event Table
     * @return Event Calendar(not implemented)
     */
    render() {
        return (
            <div>
                {this.state.showForm && (
                    <div>
                        <Form handleDisplay={this.handleDisplay}></Form>
                    </div>
                )}
                <div style={this.getBtnStyle()}>
                    <Button
                        variant="contained"
                        color="primary"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={e => this.handleClick(e)}
                    >
                        Create/Join Event
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.openMenu}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleAddEventMenu}>
                            Create Event
                        </MenuItem>
                        <MenuItem onClick={this.handleJoinEventMenu}>
                            Join Event
                        </MenuItem>
                    </Menu>
                </div>
                <div style={this.getBtnStyle()}>
                    <Button
                        variant="contained"
                        color="primary"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={e => this.handleClick3(e)}
                    >
                        Sort Event
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl3}
                        open={this.state.openMenu3}
                        onClose={this.handleClose3}
                    >
                        <MenuItem
                            onClick={() => this.setEventOrder("descending")}
                        >
                            Latest
                        </MenuItem>
                        <MenuItem
                            onClick={() => this.setEventOrder("ascending")}
                        >
                            Earliest
                        </MenuItem>
                        <MenuItem
                            onClick={() => this.setEventOrder("category")}
                        >
                            Category
                        </MenuItem>
                    </Menu>
                </div>
                <TextField
                    type="text"
                    variant="outlined"
                    inputProps={{ style: { textAlign: "center" } }}
                    placeholder="Search for title, description, category, date.."
                    fullWidth
                    value={this.state.search}
                    margin="normal"
                    onChange={search => this.handleSearch(search)}
                />
                <div style={this.getMainStyle()}>
                    <Button color="secondary" variant="outlined" onClick={e => this.handleClick2(e)}>Switch</Button>
                    <Menu
                        id="simple-menu-sort"
                        anchorEl={this.state.anchorEl2}
                        open={this.state.openMenu2}
                        onClose={this.handleClose2}
                    >
                        <MenuItem
                            onClick={() => this.handleMenuClick("events")}
                        >
                            Show Own Events
                        </MenuItem>
                        <MenuItem
                            onClick={() => this.handleMenuClick("shared")}
                        >
                            Show New Event Invites
                        </MenuItem>
                        <MenuItem
                            onClick={() => this.handleMenuClick("accepted")}
                        >
                            Show Accepted Events
                        </MenuItem>
                        <MenuItem
                            onClick={() => this.handleMenuClick("calendar")}
                        >
                            Show Event Calendar
                        </MenuItem>
                    </Menu>
                    {this.viewForm()}
                </div>
            </div>
        );
    }

    /**
     * this shows form for inviting others
     */
    handleDisplay = () => {
        this.setState({ showForm: false });
    };
    handleMenuClick = text => {
        this.handleClose2();
        this.setState({ showShared: text });
    };

    componentDidMount() {
        let tempObject = { temp: [] };

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.unsubscribe1 = db
            .collection("events")
            .where("owners", "array-contains", currentUser)
            .onSnapshot(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    tempObject.temp.push(doc.data());
                });
                this.setState({ events: tempObject.temp });
            });

        this.unsubscribe2 = db
            .collection("events")
            .where("invitees", "array-contains", currentUser)
            .onSnapshot(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    console.log("2");
                    tempObject.temp.push(doc.data());
                });
                this.setState({ sharedEvents: tempObject.temp });
            });

        this.unsubscribe3 = db
            .collection("events")
            .where("accepted_invitees", "array-contains", currentUser)
            .onSnapshot(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    console.log("3");
                    tempObject.temp.push(doc.data());
                });
                this.setState({ acceptedEvents: tempObject.temp });
            });
    }

    componentWillUnmount() {
        console.log("unsub");
        this.unsubscribe1();
        this.unsubscribe2();
        this.unsubscribe3();
    }
}
/**
 * @return events that current user made that are not shared
 * @return shared events which are events current user shared(invited people)
 */

export default EventHome;
