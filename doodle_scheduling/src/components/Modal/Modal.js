import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
}
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <h2>{this.props.title} {this.props.time}</h2>
        <div className="content">{this.props.description}</div>
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