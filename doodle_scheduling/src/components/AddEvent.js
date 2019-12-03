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
import { db } from "./firebase";
import uuid from "uuid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const categories = Object.freeze({
    Hobbies: "Hobbies",
    Social: "Social",
    Health: "Health",
    Errands: "Errands",
    Projects: "Projects",
    Miscellaneous: "Miscellaneous",
});

export class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //event variables
            title: JSON.parse(localStorage.getItem("saved_title")) || "",
            description:
                JSON.parse(localStorage.getItem("saved_description")) || "",
            startDate: JSON.parse(localStorage.getItem("saved_start_date")) || "",
            endDate: JSON.parse(localStorage.getItem("saved_end_date")) || "",
            category: JSON.parse(localStorage.getItem("saved_category")) || "",
            calendar: "default",

            //variables to keep track of pages & state
            firstPage: true,
            secondPage: false,
            thirdPage: false,

            //for social aspect
            //invitees and owners will be emails
            owners: [JSON.parse(localStorage.getItem("currentUser"))], //every time event created, user will be owner
            shared: false, //if this is being shared
            invitees: [], //this only if being shared

            //snackbar errors
            errorMessageOpen: false,
            message: "",
            successMessageOpen: false,

            // Category
            anchorEl: null,
            openMenu: false,
            selectedCategory: "Category"
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
            localStorage.setItem(
                "saved_category",
                JSON.stringify(this.state.selectedCategory)
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
     * @param {string=} startDate Takes in start date from eric's calendar
     * @param {string=} endDate Takes in end date from eric's calendar
     * @param {*} e Takes in event of hitting button to go to next page
     * @return Sets date and time in state
     * @return error message if date & time are null
     */
    goToThirdPage = (startDate, endDate, e) => {
        e.preventDefault();
        if (startDate !== null && startDate !== "" && endDate !== null && endDate !== "") {
            this.setState({
                startDate: startDate,
                endDate: endDate,
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

    handleCategoryMenuClick = category => {
        this.handleClose();
        this.setState({ selectedCategory: category });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, openMenu: !this.state.openMenu });
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
     * When creating/editing event, it adds/edits it to the database./
     * If the event is going to be shared, it will add it to the
     * shared event collection
     * @param {*} e takes in event of hitting submit event
     * @return saves to firestore database and goes back to home page
     * @todo fix edit event
     */
    submitEvent = (e, invitees) => {
        e.preventDefault();
        let code = this.makeCode(5);
        const { idOfEditEvent, editingEvent } = this.props;
        const id = uuid.v4();
        
        if (!editingEvent) {
            //add new event
            db.collection("events")
                .doc(id)
                .set({
                    id: id,
                    code: code,
                    title: this.state.title,
                    description: this.state.description,
                    category: this.state.selectedCategory,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    owners: this.state.owners,
                    accepted_invitees: [],
                    declined_invitees: [],
                    invitees: invitees
                });
        } else {
            //editing event
            db.collection("events")
                .doc(idOfEditEvent)
                .update({
                    title: this.state.title,
                    description: this.state.description,
                    category: this.state.selectedCategory,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    invitees: invitees
                });
        }
        this.props.setHomePage();
    };

    makeCode = length => {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    /**
     * @param {boolean} check if checkbox is clicked to make event shareable
     * @param {Array} list populatex invitees with contacts' emails
     * @todo this list will be populated with people outside the contact list
     */

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
                            {/* <div style={this.getBtnStyle()}> */}
                            <Button
                                variant="contained"
                                color="primary"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={e => this.handleClick(e)}
                            >
                                {this.state.selectedCategory}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.openMenu}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Hobbies)}>
                                {categories.Hobbies}
                                </MenuItem>
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Social)}>
                                {categories.Social}
                                </MenuItem>
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Errands)}>
                                {categories.Errands}
                                </MenuItem>
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Health)}>
                                {categories.Health}
                                </MenuItem>
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Projects)}>
                                {categories.Projects}
                                </MenuItem>
                                <MenuItem onClick={() => this.handleCategoryMenuClick(categories.Miscellaneous)}>
                                {categories.Miscellaneous}
                                </MenuItem>
                            </Menu>
                            {/* </div> */}
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
                        goToThirdPage={(startDate, endDate, e) =>
                            this.goToThirdPage(startDate, endDate, e)
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
                        submitEvent={(e, invitees) =>
                            this.submitEvent(e, invitees)
                        }
                    />
                </div>
            );
        }
    };
}

export default AddEvent;
