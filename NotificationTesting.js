import React, { Component } from 'react';

class NotificationTesting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      colours: {}
    };
  }

  componentDidMount() {
    this.setState({
      events: [
        {id: 'event1', name: 'Event1'},
        {id: 'event2', name: 'Event 2'},
        {id: 'event3', name: 'Event 3'}
      ]
    });
  }


  render () {
    const { events } = this.state;

    let eventsList = events.length > 0
    	&& events.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div>
        <select>
          {eventsList}
        </select>
      </div>
    );
  }
}

export default NotificationTesting;