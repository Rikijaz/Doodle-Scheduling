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

  export class NotificationTesting2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          events: [],
          colours: {}
        };
      }

    // create events
    componentDidMount() {
        this.setState({
          events: [
            {id: 'event1', name: 'Event1'},
            {id: 'event2', name: 'Event 2'},
            {id: 'event3', name: 'Event 3'},
            {id: 'event4', name: 'Event 4'}
          ]
        });
      }
    
    removeElements(events, id) {
        console.log("id name: " + id);
        console.trace();

        for( var j = 0; j < events.length; j++){ 
            console.log("j: " + j);
            if (events[j].id === id) {  //events[i].id
              events.splice(j, 1);
              console.log("spliced");
            }
         }

         this.setState({events});   // trying to update events in componentDidMount
    }

    render() {
        const { events } = this.state;

        var eventList = [];
        for (var i = 0; i < events.length; i++)
        {
            console.log("id: " + events[i].id);
            eventList.push(<MenuItem id = {events[i].id} key={i} onSelect={() => alert("event1")} onClick = {() => this.removeElements(events, events[i].id)}>Event1</MenuItem>);
        }

        // let eventList = events.length > 0
        //     && events.map((item, i) => { return (
        //         //<option key={i} value={item.id}>{item.name}</option>
        //         // need to have unique id, id is not changing rn
        //         <MenuItem id = {i} onSelect={() => alert("event1")} onClick = {() => this.removeElements(events, i)}>Event1</MenuItem>
        //     )
        // }, this);

        return (
            <Menu>
              <MenuButton>
                Actions <span aria-hidden>▾</span>
              </MenuButton>
              <MenuList>
                  {eventList}
              </MenuList>
            </Menu>
        );
    }
}

{/* <MenuItem id = "event1" onSelect={() => alert("Event1")}>Event1</MenuItem>
<MenuItem onSelect={() => alert("Event2")}>Event2</MenuItem>
<MenuItem onSelect={() => alert("Event3")}>Event3</MenuItem> */}

export default NotificationTesting2;