import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import moment from "moment";

export default class Modal extends React.Component {
  /**
   * Closes modal
   */
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  /**
   * Renders modal with event data
   */
  render() {
    if (!this.props.show) {
      return null;
    }

    var description = "";
    console.log(this.props.calendarEventDayData.events);

    for (let i = 0; i < this.props.calendarEventDayData.events.length; ++i) {
      var startTime = moment(this.props.calendarEventDayData.events[i].startDate).format("LT");
      var endTime = moment(this.props.calendarEventDayData.events[i].endDate).format("LT");
      var header = startTime + " - " + endTime + ": " + this.props.calendarEventDayData.events[i].title;

      description += header + "\n" + this.props.calendarEventDayData.events[i].description + "\n";
    }

    return (
      <div className="modal" id="modal">
        <h2>{moment(this.props.calendarEventDayData.date).format("dddd" + " "+ "L")}</h2>
        <div className="content">
        {description.split("\n").map((i,key) => { return <div key={key}>{i}</div>; })}
        </div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};