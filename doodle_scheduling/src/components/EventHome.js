import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Form from "./Form";

export class EventHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openMenu: false,
            showForm: false
        };
    }

    sendEmail = () => {
        this.setState({ showForm: true });
    };

    /**
     * Displays event table
     * @return Header saying no events or Table of Events
     */
    showEvents = () => {
        if (this.props.events === null || this.props.events === undefined) {
            return <h2>No events</h2>;
        } else if (this.props.events.length === 0) {
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
                                                        row.original.id,
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
                    {this.showEvents()}
                    {/* where calendar would go from eric */}
                </div>
            </div>
        );
    }
}

export default EventHome;
