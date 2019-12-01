import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Button from 'react-bootstrap/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

var numNotifications = 3;

export class NotificationsUI extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         checking:false
      };
        this.NotificationsDropdown = this.NotificationsDropdown.bind(this);
  }

  classesHERE = this.classeshereStyles();
  
    NotificationsDropdown = () => {
        //const classesHERE = useStyles();
        //const classesHERE = this.classeshereStyles();
        console.log("in notificationsDropdown");
        return (
            <div id={classesHERE.root}>
                <Paper className={classesHERE.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography noWrap>{message}</Typography>
                    </Grid>
                    </Grid>
                </Paper>
                <Paper className={classesHERE.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography noWrap>{message}</Typography>
                    </Grid>
                    </Grid>
                </Paper>
                <Paper className={classesHERE.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>W</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography>{message}</Typography>
                    </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

    render() {
        return (
            <Button variant="primary" onClick={() => this.NotificationsDropdown()}>Primary</Button>
        )
    }
}

export default NotificationsUI;

//export default NotificationsUI;

// export default function AutoGridNoWrap() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <Grid container wrap="nowrap" spacing={2}>
//           <Grid item>
//             <Avatar>W</Avatar>
//           </Grid>
//           <Grid item xs zeroMinWidth>
//             <Typography noWrap>{message}</Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper className={classes.paper}>
//         <Grid container wrap="nowrap" spacing={2}>
//           <Grid item>
//             <Avatar>W</Avatar>
//           </Grid>
//           <Grid item xs>
//             <Typography noWrap>{message}</Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper className={classes.paper}>
//         <Grid container wrap="nowrap" spacing={2}>
//           <Grid item>
//             <Avatar>W</Avatar>
//           </Grid>
//           <Grid item xs>
//             <Typography>{message}</Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   );
// }