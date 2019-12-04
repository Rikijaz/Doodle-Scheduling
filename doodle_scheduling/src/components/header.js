import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddContact from "./AddContact";
import ViewContacts from "./ViewContacts";
import firebase from "firebase";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { db } from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import Notifications from "./Notifcations"

const headerStyle = {
    background: "#7FDBFF",
    color: "white",
    textAlign: "center",
    padding: "2px",
    fontSize: "24px",
    fontFamily: "Simplifica"
};

const headButtonStyle = {
  textAlign: "left"
};

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      addContactsPrompt: false,
      unreadNotifications: 0,
      notifications: [],
      displayNotifications: false
    };
  }

  //localStorage is to access database document
  /**
   * when header mounts, it updates user data
   * @return user data from the database
   */
  componentDidMount() {
    db.collection("users")
      .doc(JSON.parse(localStorage.getItem("currentUser")))
      .get()
      .then(data => {
        if (data.exists) {
          this.setState({ user: data.data() });
        } else {
          //console.log("Sad toot");
        }
      });
    db.collection("notifications")
      .where("user", "==", JSON.parse(localStorage.getItem("currentUser")))
      .onSnapshot(data => {
        let tempNotifications = [];
        let activeNotificationCount = 0;
        data.forEach(doc => {
          if (!doc.data().seen) {
            activeNotificationCount++;
          }
          tempNotifications.push(doc.data());
        });
        this.setState({
          unreadNotifications: activeNotificationCount,
          notifications: tempNotifications
        });
      });
  }
  handleClick  = () =>{
    if(this.state.displayNotifications === true){
            let batch  = db.batch();
              for(let i = 0; i< this.state.notifications.length; i++){
                let tempDoc = db.collection("notifications").doc(this.state.notifications[i].id);
                batch.update(tempDoc, {"seen": true});
              }
              batch.commit().catch(err => console.log(err));
          }
      this.setState({displayNotifications: !this.state.displayNotifications});
      
    //  
  }
  handleDelete = (id) =>{
    db.collection("notifications").doc(id).delete()
  }
  NotificationBar = () =>{
      const {notifications} = this.state
      if(notifications.length !== 0){
        console.log(notifications)
      return notifications.map((notification, index) =>(
         <Notifications key = {index} data = {notification} handleDelete = {id => this.handleDelete(id)}/>
      ))}
      else{
        console.log("xdxd")
        return <h3>No notifications to be shown</h3>
      }
  }
  /**
   * Renders the buttons to view/add contacts and
   * sign out button and name of user
   */
  render() {
    return (
      <div>
        <header style={headerStyle}>
          <div>
            <header>
              <img src={logo} height="117px" width="150px" alt="Schedule It" />
            </header>
          </div>
          <Badge
            badgeContent={this.state.unreadNotifications}
            color="secondary"
          >
            <IconButton onClick = { () => this.handleClick()}>
              <NotificationsIcon />
            </IconButton>
            
          </Badge>
          {this.state.displayNotifications && (this.NotificationBar())}
          {this.state.user && (
            <div>
              <div style={headButtonStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  component={Link}
                  to="/profile"
                >
                  Profile
                </Button>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  component={Link}
                  to="/home"
                >
                  Events
                </Button>
              </div>
            </div>
          )}
          <h1>Schedule It!</h1>
            <AddContact/>
            <ViewContacts/>
        </header>
      </div>
    );
  }
}

export default Header;
