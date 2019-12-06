import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PieChart from 'react-minimal-pie-chart';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Invite from "./Invite";
import moment from "moment";
import { green } from '@material-ui/core/colors';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            startShare: false
        };
    }

    render() {
        const handleExpandClick = () => {
            this.setState({ expanded: !this.state.expanded });
        };
        const { data, isShared, hasAccepted } = this.props;

        const dataInvitees = data.invitees.map((invitee) =>
            <li>{invitee}{"\n"}</li>
        );
        const acceptedInvitees = data.accepted_invitees.map((acceptedInvitee) =>
            <li>{acceptedInvitee}{"\n"}</li>
        );
        const declinedInvitees = data.declined_invitees.map((declinedInvitee) =>
            <li>{declinedInvitee}{"\n"}</li>
        );
        const Owners = data.owners.map((owner) =>
            <li>{owner}{"\n"}</li>
        );
        
        

        let invitees = data.invitees ? data.invitees.join("\n") : "";
        let shareStatus = isShared ? "Shared event" : "Made by me";
        let invitePeople = this.state.startShare ? (
            <Invite id={data.id} open={this.state.startShare} title = {data.title} />
        ) : null;
        let editButton = !isShared ? (
            <Button
                size="small"
                color="primary"
                onClick={() => this.props.editEvent(data.id)}
            >
                edit
            </Button>
        ) : null;
        let deleteButton = !isShared ? (
            <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => this.props.deleteEvent(data.id)}
            >
                <DeleteIcon />
            </IconButton>
        ) : null;

        let acceptIcon = (isShared && !hasAccepted)? (
            <div>
                <IconButton onClick = {() => this.props.acceptInvite(data.id)}>
                <CheckIcon  style={{ color: green[500] }}/>
            </IconButton>
            <IconButton onClick = {() => this.props.declineInvite(data.id)}>
                <ClearIcon color="secondary"/>
            </IconButton>
            </div>
        ) : null;

        return (
            <div>
                <Card>
                    <CardContent>
                    <Typography variant="h6" component="h2" color="primary">
                            {data.category}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {shareStatus}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {data.title}
                        </Typography>
                        <Typography>{data.description}</Typography>
                        <Typography>{moment(data.startDate).format("LLLL")+ " - " + moment(data.endDate).format("LT")}</Typography>
                    </CardContent>
                    <CardActions>
                        {editButton}
                        <IconButton
                            aria-label="share"
                            onClick={() => this.handleShareEvent()}
                        >
                            <ShareIcon color="primary"/>
                        </IconButton>
                        {deleteButton}
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        {acceptIcon}
                    </CardActions>
                    <Collapse
                        in={this.state.expanded}
                        timeout="auto"
                        unmountOnExit
                    >
                        <CardContent>
                            
                            <PieChart data = {[
                                {title: "People confirmed going", value: data.owners.length + data.accepted_invitees.length, color : "#00e676"},
                                {title: "People who might go", value: data.invitees.length, color : "#fff59d"},
                                {title: "People who won't go", value: data.declined_invitees.length, color : "#78909c"}
                            ]} radius = {50} style={{
                                height: '125px',
                                marginBottom: '2em',
                                marginTop : '0',
                                display: 'flex'

                              }}/>
                            <Typography>
                                Owners: <ul style={{ listStyleType: "none" }}>{Owners}</ul>
                                Invitees: <ul style={{ listStyleType: "none" }}>{dataInvitees}</ul>
                                Accepted Invitees: <ul style={{ listStyleType: "none" }}>{acceptedInvitees}</ul>
                                Declined Invitees: <ul style={{ listStyleType: "none" }}>{ declinedInvitees }</ul>
                            </Typography>
                            <Typography color="primary" gutterBottom="true">Invite Code: {data.code}</Typography>
                            
                        </CardContent>
                    </Collapse>
                </Card>
                {invitePeople}
            </div>
        );
    }

    /**
     * @param id id of event to be shared with others
     * @return pop up with checkboxes like the third page, select
     * people to invite from contacts
     */
    handleShareEvent = () => {
        this.setState({ startShare: !this.state.startShare });
    };
}
export default Cards;
