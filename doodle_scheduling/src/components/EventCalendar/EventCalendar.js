import React from "react";
import * as dateFns from 'date-fns';
import Modal from "../Modal/Modal";
import "./EventCalendar.css";

export class EventCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: null,
            show: false,
            title: "",
            description: "",
            time: ""
        };
    }

    showModal = (eventTitle, eventDescription, time) => {
        this.title = eventTitle;
        this.description = eventDescription;
        this.time = time;

        console.log(this.title);
        console.log(this.description);

        this.setState({
          show: !this.state.show,
          title: this.title,
          description: this.description,
          time: this.time,
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
        
        console.log(areThereEvents);
        console.log(areThereSharedEvents);
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
                    // var dateString = '2019-' + this.props.events[i].date;
                    // var dateString = dateFns.parse(
                    //     this.props.events[i].date + '/2019',
                    //     'MM/dd/yyyy',
                    //     new Date()
                    // );
    
                    // var dateString = new Date('2019-' + this.props.events[i].date);
                    
                    console.log(this.props.events[i].date.split('/')[0]);
                    if (this.props.events[i].date.split('/')[0] == dateFns.getMonth(currentMonth) + 1) {
                        var data = {
                            // Date = toDate('2019-02-11T11:30:30')
                            // date: dateFns.toDate(dateString),
                            date: this.props.events[i].date,
                            title: this.props.events[i].title,
                            description: this.props.events[i].description,
                            time: this.props.events[i].time,
                        }
        
                        eventData.push(data)
                        console.log(data);
                        console.log(this.props.events[i]);
                    }
                }
            }
            
            if (areThereSharedEvents) {
                for (let i = 0; i < this.props.sharedEvents.length; ++i) {

                    if (this.props.sharedEvents[i].date.split('/')[0] == dateFns.getMonth(currentMonth) + 1) {
                        var data = {
                            date: this.props.sharedEvents[i].date,
                            title: this.props.sharedEvents[i].title,
                            description: this.props.sharedEvents[i].description,
                            time: this.props.sharedEvents[i].time,
                        }
        
                        eventData.push(data)
                    }
                    else {
                        console.log(this.props.sharedEvents[i].date.split('/')[0] );
                        console.log(dateFns.getMonth(currentMonth));
                    }
                    // var data = {
                    //     date: this.props.sharedEvents[i].date,
                    //     title: this.props.sharedEvents[i].title,
                    //     description: this.props.sharedEvents[i].description,
                    // }
    
                    // eventData.push(data)
                }
            }


            console.log(Object.prototype.toString.call(day).match(/^\[object\s(.*)\]$/)[1]);
            // console.log(Object.prototype.toString.call(eventData.date).match(/^\[object\s(.*)\]$/)[1]);
            // console.log(eventData[0].date);


            while (day <= endDate) {
                for (let i = 0; i < 7; i++) {
                    formattedDate = dateFns.format(day, dateFormat);
                    const cloneDay = day;
                    
                    var isEvent = false;

                    for (let i = 0; i < eventData.length && !isEvent; ++i) {
                        // console.log('day: ' + formattedDate + ' eventDate: ' + (eventData[i].date).substr(3));
                        
                        var eventTitle = eventData[i].title;

                        if ((eventData[i].date).substr(3) == dateFns.getDate(day) &&
                            eventData[i].date.split('/')[0] == dateFns.getMonth(day) + 1) {
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
                                        eventData[i].time);
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
      console.log(Object.prototype.toString.call(day).match(/\s\w+/)[0].trim());

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
              time={this.time}
              >
              </Modal>
            </div>
          </div>
        );
    }
}

export default EventCalendar;