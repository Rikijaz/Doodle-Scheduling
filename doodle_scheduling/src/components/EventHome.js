import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "react-table/react-table.css";
import Form from "./Form";
import { db, firebase } from "./firebase";
import Cards from "./Cards";
import EventCalendar from "./EventCalendar/EventCalendar";

//let unsubscribe1, unsubscribe2, unsubscribe3;
export class EventHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        anchorEl: null,
        openMenu: false,
        anchorEl2 : null,
        openMenu2: false,
        showForm: false,
        showShared: "events",
        events: [],
        sharedEvents: [],
        acceptedEvents: []
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
    sendEmail = () => {
        this.setState({ showForm: true });
    };

    switchEventView = () => {
        this.setState({ showShared: !this.state.showShared });
    };

  viewForm = () => {
    if (this.state.showShared === "events") {
      return <div>{this.showEvents()}</div>;
    } else if (this.state.showShared === "shared") {
      return <div>{this.showSharedEvents()}</div>;
    }else if(this.state.showShared === "accepted") {
      return  <div>{this.showAcceptedEvents()}</div>
    }else if(this.state.showShared === "calendar"){
    return <div>{this.showCalendar()}</div>
    }
  };

  /**
   * Displays event table
   * @return Header saying no events or Table of Events
   */
  showEvents = () => {
    const { events } = this.state;
    if (this.areThereNoEvents()) {
      return <h2>No events</h2>;
    } else {
      return events.map((event, index) => (
        <Cards
          key={index}
          data={event}
          editEvent={id => this.props.editEvent(id)}
          deleteEvent={id => this.deleteEvent(id)}
        />
      ));
    }
  };
  showSharedEvents = () => {
    const { sharedEvents } = this.state;
    if (this.areThereNoSharedEvents()) {
      return <h2>No shared events</h2>;
    } else {
      console.log();
      return sharedEvents.map((event, index) => (
        <Cards
          key={index}
          data={event}
          isShared={true}
          hasAccepted={false}
          acceptInvite={id => this.acceptInvite(id)}
          declineInvite={id => this.declineInvite(id)}
        />
      ));
    }
  };
  showAcceptedEvents = () => {
    const { acceptedEvents } = this.state;
    if (this.areNoAcceptedEvents()) {
      return <h2>No accepted events</h2>;
    } else {
      return acceptedEvents.map((event, index) => (
        <Cards key={index} data={event} isShared={true} hasAccepted={true} />
      ));
    }
  };

  /**
   * Displays event calendar
   */
  showCalendar = () => {
    const { events } = this.state;
    const { sharedEvents, acceptedEvents } = this.state;

    if (!this.areThereNoEvents() || !this.areThereNoSharedEvents()) {
      return (
        <div className="App">
          <main>
            <EventCalendar
              events={events}
              sharedEvents={sharedEvents}
              acceptedEvents = {acceptedEvents}
            ></EventCalendar>
          </main>
        </div>
      );
    }
    else{
      return(<h2>There are no events to be displayed</h2>)
    }
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
  

  /**
   * closes drop down menu
   */
  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: !this.state.openMenu });
  };
  handleClose2 = () => {
    this.setState({ anchorEl2: null, openMenu2: !this.state.openMenu2});
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
      db.collection("events")
          .doc(id)
          .delete();
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
            <MenuItem onClick={this.handleAddEventMenu}>Create Event</MenuItem>
            <MenuItem onClick={this.handleJoinEventMenu}>Join Event</MenuItem>
          </Menu>
        </div>
        <div style={this.getMainStyle()}>
          <Button onClick={e => this.handleClick2(e)}>Switch</Button>
          <Menu 
          id = "simple-menu"
          anchorEl = {this.state.anchorEl2}
          open = {this.state.openMenu2}
          onClose = {this.handleClose2}
          >
            <MenuItem onClick={() => this.handleMenuClick("events")}>Show Own Events</MenuItem>
            <MenuItem onClick={() => this.handleMenuClick("shared")}>Show New Event Invites</MenuItem>
            <MenuItem onClick={() => this.handleMenuClick("accepted")}>Show Accepted Events</MenuItem>
            <MenuItem onClick={() => this.handleMenuClick("calendar")}>Show Event Calendar</MenuItem>  
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
  handleMenuClick = (text) =>{
    this.handleClose2();
    this.setState({showShared : text})
  }


  componentDidMount() {
      let tempObject = { temp: [] };
      

  



        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.unsubscribe1 = db
            .collection("events")
            .where("owners", "array-contains", currentUser)
            .onSnapshot(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    console.log("1");
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
