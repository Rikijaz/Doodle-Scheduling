import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CancelIcon from "@material-ui/icons/Cancel";
import { Container } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./Snackbar";
import AddSecondPage from "./AddSecondPage"

export class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //event variables
            title: JSON.parse(localStorage.getItem("saved_title")),
            description: JSON.parse(localStorage.getItem("saved_description")),
            date: "",
            time: "",
            calendar: "default",

            //variables to keep track of pages & state
            firstPage: true,
            secondPage: false,
            thirdPage: false,

            //for social aspect
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
    handleTitle = t => {
        this.setState({ title: t.target.value });
    };

    handleDescription = des => {
        this.setState({ description: des.target.value });
    };

    onSubmitFirstPage = () => {
        //when they go back from second page, the data still there
        if (this.state.title !== "" && this.state.title !== null ) {
            localStorage.setItem(
                "saved_title",
                JSON.stringify(this.state.title)
            );
            localStorage.setItem(
                "saved_description",
                JSON.stringify(this.state.description)
            );
            //going to second page & unrendering first page
            this.setState({ firstPage: false, secondPage: true,});
        } else {
            this.setState({errorMessageOpen: true, message: "Please input a title!"})
        }
    };
    //----- end of first page functions -----

    viewForm = () => {
        const btnStyle = {
            textAlign: "right"
        };

        //this will be the same as AddFirstPage
        //just grabbing title and description
        if (this.state.firstPage) {
            return (
                <div>
                    <h3>Create your Event!</h3>
                    <Container maxWidth="sm">
                        <form onSubmit={() => this.onSubmitFirstPage()}>
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
                                    onClick={() => this.onSubmitFirstPage()}
                                >
                                    Continue
                                </Button>
                            </div>
                            <Button
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
            return (<div><AddSecondPage/></div>);
        }
    };
}

export default AddEvent;
