import React from "react";
import * as dateFns from 'date-fns';
import Modal from "../Modal/Modal";
import "./EventCalendar.css";
import moment from "moment";

export class EventCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: null,
            show: false,
            title: "",
            description: "",
            startDate: "",
            endDate: ""
        };
    }

    showModal = (eventTitle, eventDescription, startDate, endDate) => {
        this.title = eventTitle;
        this.description = eventDescription;
        this.startDate = startDate;
        this.endDate = endDate;

        this.setState({
          show: !this.state.show,
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
        });
      };

    renderHeader() {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
          </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "iiii";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {

        var areThereEvents = !(
            this.props.events === null ||
            this.props.events === undefined || 
            this.props.events.length === 0);
        
        var areThereSharedEvents = !(
            this.props.sharedEvents === null ||
            this.props.sharedEvents === undefined ||
            this.props.sharedEvents.length === 0);

            if (areThereEvents || areThereSharedEvents) {
            const { currentMonth, selectedDate } = this.state;
            const monthStart = dateFns.startOfMonth(currentMonth);
            const monthEnd = dateFns.endOfMonth(monthStart);
            const startDate = dateFns.startOfWeek(monthStart);
            const endDate = dateFns.endOfWeek(monthEnd);

            const dateFormat = "d";
            const rows = [];

            let days = [];
            let day = startDate;
            let formattedDate = "";

            let eventData = [];
            if (areThereEvents) {
                for (let i = 0; i < this.props.events.length; ++i) {
                    if (moment(this.props.events[i].startDate).format("L").split('/')[0] == dateFns.getMonth(currentMonth) + 1) {
                        var data = {
                            date: this.props.events[i].date,
                            title: this.props.events[i].title,
                            description: this.props.events[i].description,
                            startDate: this.props.events[i].startDate,
                            endDate: this.props.events[i].endDate,
                        }
        
                        eventData.push(data)
                    }
                }
            }
            
            if (areThereSharedEvents) {
                for (let i = 0; i < this.props.sharedEvents.length; ++i) {

                    if (moment(this.props.sharedEvents[i].startDate).format('L').split('/')[0]== dateFns.getMonth(currentMonth) + 1) {
                        var data = {
                            date: this.props.sharedEvents[i].date,
                            title: this.props.sharedEvents[i].title,
                            description: this.props.sharedEvents[i].description,
                            startDate: this.props.sharedEvents[i].startDate,
                            endDate: this.props.sharedEvents[i].endDate,
                        }
        
                        eventData.push(data)
                    }
                }
            }


            console.log(Object.prototype.toString.call(day).match(/^\[object\s(.*)\]$/)[1]);

            while (day <= endDate) {
                for (let i = 0; i < 7; i++) {
                    formattedDate = dateFns.format(day, dateFormat);
                    const cloneDay = day;
                    
                    var isEvent = false;

                    for (let i = 0; i < eventData.length && !isEvent; ++i) {
                        var eventTitle = eventData[i].title;

                        if (moment(eventData[i].startDate).format('L').split('/')[1] == dateFns.getDate(day) &&
                            moment(eventData[i].startDate).format('L').split('/')[0] == dateFns.getMonth(day) + 1) {
                            days.push(
                                <div
                                    className={`col cell ${
                                        !dateFns.isSameMonth(day, monthStart)
                                            ? "disabled"
                                            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                                        }`}
                                    key={day}
                                    // onClick={() => this.onDateClick(dateFns.toDate(cloneDay))}
                                    onClick={e => {
                                    this.showModal(
                                        eventData[i].title, 
                                        eventData[i].description,
                                        eventData[i].startDate,
                                        eventData[i].endDate);
                                    }}
                                >
                                    <span className="number">{formattedDate}</span>
                                    <span className="bg">{formattedDate}</span>
                                    <span className="title">{eventTitle}</span>
                                </div>
                            );

                            isEvent = true;
                        }   
                    }

                    if(!isEvent) {
                        days.push(
                            <div
                                className={`col cell ${
                                    !dateFns.isSameMonth(day, monthStart)
                                        ? "disabled"
                                        : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                                    }`}
                                key={day}
                            >
                                <span className="number">{formattedDate}</span>
                                <span className="bg">{formattedDate}</span>
                            </div>
                        );
                    }

                    // days.push(
                    //     <div
                    //         className={`col cell ${
                    //             !dateFns.isSameMonth(day, monthStart)
                    //                 ? "disabled"
                    //                 : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                    //             }`}
                    //         key={day}
                    //         // onClick={() => this.onDateClick(dateFns.toDate(cloneDay))}
                    //         onClick={e => {
                    //           this.showModal(e);
                    //         }}
                    //     >
                    //         <span className="number">{formattedDate}</span>
                    //         <span className="bg">{formattedDate}</span>

                    //         <span>bla</span> 
                    //     </div>
                    // );
                    day = dateFns.addDays(day, 1);
                }
                rows.push(
                    <div className="row" key={day}>
                        {days}
                    </div>
                );
                days = [];
            }
            return <div className="body">{rows}</div>;
        }
            
    }

    onDateClick = day => {
        this.setState({
            selectedDate: "day"
        });
        
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
          <div id="parent">
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
            <div className="modal">
              <Modal 
              onClose={this.showModal} 
              show={this.state.show}
              title={this.title}
              description={this.description}
              startDate={this.startDate}
              endDate={this.endDate}
              >
              </Modal>
            </div>
          </div>
        );
    }
}

export default EventCalendar;