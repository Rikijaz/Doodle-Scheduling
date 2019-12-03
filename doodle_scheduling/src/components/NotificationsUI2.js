import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AddSecondPage from "./AddSecondPage";
import AddThirdPage from "./AddThirdPage";
import { db, firebase } from "./firebase";

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

 /* populates the events for the notification button */
 // needs to be linked to the events

  // var numberOfNotificationsForUser = 4;
  // var drop_list = '<div className={classes.root}>';

  // for (var i = 0; i < numberOfNotificationsForUser; i++)
  // {
  //   drop_list += '<Paper className={classes.paper}>';
  //   drop_list += '<Grid container wrap="nowrap" spacing={2}>';
  //   drop_list += '<Grid item>';
  //   drop_list += '<Avatar>W</Avatar>';
  //   drop_list += '</Grid>';
  //   drop_list += 'Grid item xs zeroMinWidth>';
  //   drop_list += 'Typography noWarp>{message}</Typography>';
  //   drop_list += '</Grid>';
  //   drop_list += '</Grid>';
  //   drop_list += '</Paper>';
  // }

  // drop_list += '</div>'

  export default function NotificationsUI2() {
    const classes = useStyles();
  
    // trying to get data from db but idk what data i need to display in notifications
    // maybe loop through all the events, and if the current user's name shows up in the invitee list, add that to the notification dropdown?
    // db.collection("events").doc(id).get().then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Document data: ", doc.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // })

  return (
    // drop_list

    //non-dynamic notification dropdown
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
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