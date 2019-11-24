import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CancelIcon from '@material-ui/icons/Cancel';
import { Container } from '@material-ui/core';


export class AddFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            description: '',
        }
    }
    onChangeTitle = (n) => this.setState({ title: n.target.value });
    onChangeDescription = (des) =>
        this.setState({ description: des.target.value });

    onChangeDate = (d) => this.setState({ date: d.target.value });

    onSubmit = (n, des, d) => {
        n.preventDefault();
        this.props.addFirst(
            this.state.title, this.state.date, this.state.description
        );
    }
    componentWillUnmount() {
        localStorage.setItem('saved_current_event', JSON.stringify(this.state))
    }
    componentDidMount() {
        const saved_current_data = JSON.parse(localStorage.getItem('saved_current_event'));
        this.setState(saved_current_data);
    }
    render() {
        return (
            <Container maxWidth="sm">
                <form onSubmit={(n, des, d) => this.onSubmit(n, des, d)}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Event Name"
                        fullWidth
                        value={this.state.title}
                        margin="normal"
                        onChange={(n) => this.onChangeTitle(n)}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Event Description ... Optional"
                        fullWidth
                        value={this.state.description}
                        margin="normal"
                        onChange={(des) => this.onChangeDescription(des)}

                    />
                    <br />
                    <Button
                        type="submit"
                        className="userContinueButton"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={(n, des, d) => this.onSubmit(n, des, d)}
                    >
                        Continue
                    </Button>
                    <br />
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
        );
    }
}

export default AddFirstPage
