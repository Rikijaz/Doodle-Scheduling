import React from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';

// garbage text for testing pull requests to dev

export default class DoodleCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: [
        // {
        //   uid: 1,
        //   start: moment({h: 6, m: 30}),
        //   end: moment({h: 7, m: 59}),
        //   value: "CS150 exam"
        // },
      ]
    }
  }

  handleEventRemove = (event) => {
    const {selectedIntervals} = this.state;
    //console.log('Removing event');

    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({selectedIntervals});
    }

  }

  handleEventUpdate = (event) => {
    const {selectedIntervals} = this.state;
    //console.log('Updating event');

    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({selectedIntervals});
    }
  }

  handleSelect = (newIntervals) => {
    const {lastUid, selectedIntervals} = this.state;
    const intervals = newIntervals.map( (interval, index) => {

      return {
        ...interval,
        uid: lastUid + index
      }
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    })

    this.props.parentMethod(intervals);
  }

  render() {
    return <WeekCalendar
      dayFormat = {'dddd, MM.DD'}
      startTime = {moment({h: 0, m: 0})}
      endTime = {moment({h: 23, m: 50})}
      scaleFormat = {'hh:mm a'}
      numberOfDays= {7}
      selectedIntervals = {this.state.selectedIntervals}
      onIntervalSelect = {this.handleSelect}
      onIntervalUpdate = {this.handleEventUpdate}
      onIntervalRemove = {this.handleEventRemove}
      useModal = {false}
      />
  }
}