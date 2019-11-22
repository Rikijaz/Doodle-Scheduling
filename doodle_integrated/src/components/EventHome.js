import React, { Component } from "react";
import { Button } from "@material-ui/core";
//import EventItem from "./EventItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from "react-table";
import "react-table/react-table.css";

// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export class EventHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openMenu: false
        };
    }

    showEvents = () => {
        if (this.props.events === null || this.props.events.length === 0) {
            return <h2>No events</h2>;
        } else {
            return (
                <div>
                    <ReactTable
                        defaultPageSize={5}
                        data={this.props.events}
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
                                        Header: "Edit",
                                        Cell: row => (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    this.props.editEvent(
                                                        row.original.id
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
                                                    this.props.deleteEvent(
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

    showPolls = () => {
        if (this.props.polls === null || this.props.polls.length === 0) {
            return <h2>No Polls</h2>;
        } else {
            return (
                <div>
                    <h1>POLLS:</h1>
                    {/* {this.props.polls.map(x => (
                            <li>
                                {x.title} - {x.selectedDays}
                            </li>
                        ))} */}
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
            padding: "5px",
        }
    }

    handleClick = e => {
        this.setState({
            anchorEl: e.currentTarget,
            openMenu: !this.state.openMenu
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, openMenu: !this.state.openMenu });
    };

    handleAddEventMenu = () => {
        this.handleClose();
        this.props.beginAddEvent();
    };

    handleAddPoll = () => {
        this.handleClose();
        this.props.beginAddPoll();
    };

    render() {
        return (
            <div>
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
                        <MenuItem onClick={this.handleAddPoll}>Poll</MenuItem>
                    </Menu>
                </div>
                <div style={this.getMainStyle()}>
                    {this.showEvents()}
                    <br />
                    {this.showPolls()}
                </div>
            </div>
        );
    }
}

export default EventHome;
