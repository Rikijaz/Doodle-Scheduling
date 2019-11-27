import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Form from "./Form";
import { db } from "./firebase";

export class EventHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openMenu: false,
            showForm: false,
            showShared: false,
            events: [],
            sharedEvents: [],
        };
    }

    sendEmail = () => {
        this.setState({ showForm: true });
    };

    switchEventView = () => {
        this.setState({ showShared: !this.state.showShared });
    };

    /**
     * Displays event table
     * @return Header saying no events or Table of Events
     */
    showEvents = () => {
        if (
            (this.state.events === null || this.state.events === undefined) &&
            (this.state.sharedEvents === null ||
                this.state.sharedEvents === undefined)
        ) {
            return <h2>No events</h2>;
        } else if (
            this.state.events.length === 0 &&
            this.state.sharedEvents.length === 0
        ) {
            return <h2>No events</h2>;
        } else {
            let data = [];
            this.state.showShared
                ? (data = this.state.sharedEvents)
                : (data = this.state.events);
            return (
                <div>
                    <ReactTable
                        defaultPageSize={5}
                        data={data}
                        columns={[
                            {
                                Header: "Events",
                                columns: [
                                    {
                                        Header: "Title",
                                        accessor: "title"
                                    },
                                    {
                                        Header: "Description",
                                        accessor: "description"
                                    },
                                    {
                                        Header: "Date",
                                        accessor: "date"
                                    },
                                    {
                                        Header: "Time",
                                        accessor: "time"
                                    }
                                ]
                            },
                            {
                                Header: "Actions",
                                columns: [
                                    {
                                        Header: "Send",
                                        Cell: row => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.sendEmail()}
                                            >
                                                Send
                                            </Button>
                                        )
                                    },
                                    {
                                        Header: "Edit",
                                        Cell: row => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    this.props.editEvent(
                                                        row.original.id,
                                                        this.state.showShared
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                        )
                                    },
                                    {
                                        Header: "Delete",
                                        Cell: row => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    this.deleteEvent(
                                                        row.original.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        )
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            );
        }
    };

    getBtnStyle = () => {
        return {
            textAlign: "right",
            padding: "10px"
        };
    };

    getMainStyle = () => {
        return {
            textAlign: "center",
            padding: "5px"
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
     * closes drop down menu
     */
    handleClose = () => {
        this.setState({ anchorEl: null, openMenu: !this.state.openMenu });
    };

    /**
     * Clicks add event option and starts adding event
     */
    handleAddEventMenu = () => {
        this.handleClose();
        this.props.beginAddEvent();
    };

    /**
     * this shows form for inviting others
     */
    handleDisplay = () => {
        this.setState({ showForm: false });
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
                        Create
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.openMenu}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleAddEventMenu}>
                            Event
                        </MenuItem>
                    </Menu>
                </div>
                <div style={this.getMainStyle()}>
                    <Button onClick={() => this.switchEventView()}>
                        Switch
                    </Button>
                    {this.showEvents()}
                    {/* where calendar would go from eric */}
                </div>
            </div>
        );
    }

    /**
     * Delete Event
     */
    deleteEvent = id => {
        db.collection("events").doc(id).delete();
    };

    /**
     * @return events that current user made that are not shared
     * @return shared events which are events current user shared(invited people)
     */
    componentDidMount() {
        let tempObject = { temp: [] };

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        db.collection("events")
            .where("owners", "array-contains", currentUser)
            .get()
            .then(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    //temp.push(doc.data());
                    tempObject.temp.push(doc.data());
                });
                this.setState({ events: tempObject.temp });
            })
            .catch(error => {
                console.error(error);
            });
        db.collection("shared_events")
            .where("invitees", "array-contains", currentUser)
            .get()
            .then(data => {
                tempObject.temp = [];
                data.forEach(doc => {
                    tempObject.temp.push(doc.data());
                    //console.log(doc.data());
                    //temp.push(doc.data());
                });
                this.setState({ sharedEvents: tempObject.temp });
            })
            .catch(err => console.error(err));
        //console.log(tempObject.temp);
    }
}

export default EventHome;
