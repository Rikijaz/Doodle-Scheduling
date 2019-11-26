import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CancelIcon from "@material-ui/icons/Cancel";
import { Container } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";
import AddSecondPage from "./AddSecondPage";
import AddThirdPage from "./AddThirdPage";
import { db, firebase } from "./firebase";
import uuid from "uuid";

export class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //event variables
            title: JSON.parse(localStorage.getItem("saved_title")) || "",
            description:
                JSON.parse(localStorage.getItem("saved_description")) || "",
            date: JSON.parse(localStorage.getItem("saved_date")) || "",
            time: JSON.parse(localStorage.getItem("saved_time")) || "",
            calendar: "default",

            //variables to keep track of pages & state
            firstPage: false,
            secondPage: false,
            thirdPage: true,

            //for social aspect
            //invitees and owners will be emails
            owners: [JSON.parse(localStorage.getItem("currentUser"))], //every time event created, user will be owner
            shared: false, //if this is being shared
            invitees: [], //this only if being shared

            //snackbar errors
            errorMessageOpen: false,
            message: "",
            successMessageOpen: false
        };
    }

    //----- snackbar functions -----
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

    //----- end of snackbar functions -----

    render() {
        return (
            <div>
                {this.viewForm()}
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

    //----- first page functions -----
    /**
     * @param {*} t takes user input and sets it equal to title
     */
    handleTitle = t => {
        this.setState({ title: t.target.value });
    };

    /**
     * @param {*} des takes user input and sets it equal to description
     */
    handleDescription = des => {
        this.setState({ description: des.target.value });
    };

    /**
     * Submits user input of title and description
     * @param {*} e Takes in event of pressing button
     * @return sets state to go to second page and saves title 
     * and description to local storage
     */
    onSubmitFirstPage = e => {
        e.preventDefault();
        //when they go back from second page, the data still there
        if (this.state.title !== "" && this.state.title !== null) {
            localStorage.setItem(
                "saved_title",
                JSON.stringify(this.state.title)
            );
            localStorage.setItem(
                "saved_description",
                JSON.stringify(this.state.description)
            );
            //going to second page & unrendering first page
            this.setState({ firstPage: false, secondPage: true });
        } else {
            this.setState({
                errorMessageOpen: true,
                message: "Please input a title!"
            });
        }
    };
    //----- end of first page functions -----

    //----- second page functions -----
    /**
     * If you hit back on the second page, it goes back to first page
     */
    goToFirstPage = () => {
        this.setState({ firstPage: true, secondPage: false });
    };
    //redo error messages later when implementing another date and time picker
    /**
     * @param {string=} date Takes in date from eric's calendar
     * @param {string=} time Takes in time from eric's calendar
     * @param {*} e Takes in event of hitting button to go to next page
     * @return Sets date and time in state
     * @return error message if date & time are null
     */
    goToThirdPage = (date, time, e) => {
        e.preventDefault();
        if (date !== null && date !== "" && time !== null && time !== "") {
            this.setState({
                date: date,
                time: time,
                firstPage: false,
                secondPage: false,
                thirdPage: true
            });
        } else {
            this.setState({
                errorMessageOpen: true,
                message: "Please input a date and time!"
            });
        }
    };
    //----- end of second page functions -----

    //----- third page functions -----
    /**
     * Goes back to second page when hitting back on third page
     */
    goToSecondPage = () => {
        this.setState({ firstPage: false, secondPage: true, thirdPage: false });
    };

    /**
     * When creating/editing event, it adds/edits it to the database
     * @param {*} e takes in event of hitting submit event
     * @return saves to firestore database and goes back to home page
     */
    submitEvent = e => {
        e.preventDefault();
        const { indexOfEditEvent, editingEvent } = this.props;
        const newEvent = {
            id: uuid.v4(),
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            time: this.state.time,
            owners: this.state.owners,
            shared: this.state.shared,
            invitees: this.state.invitees
        };
        if (!editingEvent) { //add new event
            db.collection("users")
                .doc(JSON.parse(localStorage.getItem("currentUser")))
                .update({
                    events: firebase.firestore.FieldValue.arrayUnion(newEvent)
                });
        } else { //editing event
            let newEvents = [];
            db.collection("users")
                .doc(JSON.parse(localStorage.getItem("currentUser")))
                .get()
                .then(doc => {
                    if (doc.exists) {
                        newEvents = doc.data().events;
                        newEvents.splice(indexOfEditEvent, 1, newEvent);
                        db.collection("users")
                            .doc(
                                JSON.parse(localStorage.getItem("currentUser"))
                            )
                            .update({
                                events: newEvents
                            });
                    }
                });
        }
        this.props.setHomePage();
    };

    //----- end of third page functions -----

    /**
     * Decides what to display when adding event by
     * conditionally renders new pages
     */
    viewForm = () => {
        const btnStyle = {
            textAlign: "right"
        };

        //this will be the same as AddFirstPage
        //just grabbing title and description
        if (this.state.firstPage) {
            return (
                <div>
                    <Container maxWidth="sm">
                        <form onSubmit={e => this.onSubmitFirstPage(e)}>
                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Event Name"
                                fullWidth
                                value={this.state.title}
                                margin="normal"
                                onChange={title => this.handleTitle(title)}
                            />
                            <TextField
                                type="text"
                                variant="outlined"
                                placeholder="Event Description ... Optional"
                                fullWidth
                                value={this.state.description}
                                margin="normal"
                                onChange={des => this.handleDescription(des)}
                            />
                            <br />
                            <div style={btnStyle}>
                                <Button
                                    type="submit"
                                    className="userContinueButton"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={e => this.onSubmitFirstPage(e)}
                                >
                                    Continue
                                </Button>
                            </div>
                            <Button
                                type="button"
                                className="userCancelButton"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={<CancelIcon />}
                                onClick={this.props.cancelEvent}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Container>
                </div>
            );
        } else if (this.state.secondPage) {
            return (
                <div>
                    <AddSecondPage
                        cancelEvent={this.props.cancelEvent}
                        goToFirstPage={() => this.goToFirstPage()}
                        goToThirdPage={(date, time, e) =>
                            this.goToThirdPage(date, time, e)
                        }
                    />
                </div>
            );
        } else if (this.state.thirdPage) {
            return (
                <div>
                    <AddThirdPage
                        goToSecondPage={() => this.goToSecondPage()}
                        cancelEvent={this.props.cancelEvent}
                        submitEvent={e => this.submitEvent(e)}
                    />
                </div>
            );
        }
    };
}

export default AddEvent;
