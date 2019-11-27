import React, { Component } from "react";
import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuPopover,
    MenuLink
  } from "@reach/menu-button";

export class NotificationsMenuButton extends Component {

    // delete notification from menu (later open link to specific event then delete notification from menu)
    deleteNotification(i) {   // i = id of menuItem
            console.log("entered deleteNotification");
            var idOfSelectedNotification = document.getElementById(i); 
            console.log("idOfSelectednotification: " + idOfSelectedNotification);
            // idOfSelectedNotification.parentNode.removeChild(idOfSelectedNotification);

            idOfSelectedNotification.remove();

            console.log("removed");
    }

    // to create menu items
    createNotifications(numberOfEvents) {
        const events = [];

        for (var i = 0; i < 4; i++)
        {
            events.push(<MenuItem id = {i} onSelect={() => alert(i)}></MenuItem>)
        }

        // pass a function to map
        // const map1 = array1.map(x => x * 2);
    }

    populateEvents(events, i) {
        console.log("creating menu item");
        return events[i];
    }
    
    render() {
        return (
            <Menu>
            <MenuButton>
                Actions <span aria-hidden>▾</span>
            </MenuButton>
            <MenuList onClick={createNotifications(3)}>
                <MenuItem id = "1" onSelect={() => this.createNotifications(3)}>Download</MenuItem>
                <MenuItem id = "2" onSelect={() => this.deleteNotification("2")}>Create a Copy</MenuItem>
                <MenuItem id = "3" onSelect={() => this.deleteNotification()}>Mark as Draft</MenuItem>
                <MenuItem id = "4" onSelect={() => alert("Delete")}>Delete</MenuItem>
            </MenuList>
            </Menu>
        )
    }
}

export default NotificationsMenuButton;