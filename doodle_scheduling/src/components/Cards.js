import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import Collapse from "@material-ui/core/Collapse";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    render() {
        const handleExpandClick = () => {
            this.setState({ expanded: !this.state.expanded });
        };
        const { data, isShared } = this.props;
        let invitees = data.invitees ? data.invitees.join("\n") : "";
        let shareStatus = isShared ? "Shared event" : "Made by me";
        let deleteButton = !isShared ? (
            <IconButton
                aria-label="delete"
                onClick={() => this.props.deleteEvent(data.id)}
            >
                <DeleteIcon />
            </IconButton>
        ) : null;
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {shareStatus}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography>{data.description}</Typography>
                    <Typography>{data.date}</Typography>
                    <Typography>{data.time}</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => this.props.editEvent(data.id)}
                    >
                        edit
                    </Button>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {deleteButton}
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            Owners: {data.owners}
                            <br/>
                            Invitees: {invitees}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}
export default Cards;