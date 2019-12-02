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
            calendarEventDayData: null
        };
    }

    /**
     * Comparator for ordering events.
     * Used for days where there are multiple events.
     */
    compareEventStartDates(a, b) {
        if ( moment(a.startDate).valueOf() < moment(b.startDate).valueOf() ){
            return -1;
        }

        if ( moment(a.startDate).valueOf() > moment(b.startDate).valueOf() ){
            return 1;
        }

        return 0;
    }

    /**
     * Updates modal state to display the events data
     */
    showModal = (calendarEventDayData) => {
        this.calendarEventDayData = calendarEventDayData;

        this.setState({
          show: !this.state.show,
          calendarEventDayData: this.calendarEventDayData,
        });
      };

    /**
     * Calendar header
     */
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

    /**
     * Calendar week days
     */
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


    /**
     * Calendar days
     */
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


            let calendarEvents = [];

            for (let i = 0; i < eventData.length; ++i) {

                var duplicate = false;
                var  eventDate = moment(eventData[i].startDate).format('L');
                var calendarEventData = {
                    title: eventData[i].title, 
                    description: eventData[i].description,
                    startDate: eventData[i].startDate,
                    endDate: eventData[i].endDate
                }

                for (let j = 0; j < calendarEvents.length && !duplicate; ++j) {
                    if (calendarEvents[j].date === eventDate) {
                        duplicate = true;
                        
                        calendarEvents[j].events.push(calendarEventData)
                    }

                }

                if (!duplicate) {
                    var calendarData = {
                        date: eventDate,
                        events: [ calendarEventData ]
                    }

                    calendarEvents.push(calendarData)
                }
            }

            for (let i = 0; i < calendarEvents.length; ++i) {
                calendarEvents[i].events.sort(this.compareEventStartDates);
            }


            while (day <= endDate) {
                for (let i = 0; i < 7; i++) {
                    formattedDate = dateFns.format(day, dateFormat);
                    
                    var isEvent = false;

                    for (let i = 0; i < calendarEvents.length && !isEvent; ++i) {
                        var calendarEventDay = calendarEvents[i].date.split('/')[1].replace(/^0+/, '');
                        var calendarEventMonth = calendarEvents[i].date.split('/')[0].replace(/^0+/, '');

                        // eslint-disable-next-line eqeqeq
                        if ((calendarEventDay == dateFns.getDate(day).toString()) &&
                            // eslint-disable-next-line eqeqeq
                            (calendarEventMonth == (dateFns.getMonth(day) + 1))) {

                                if (calendarEvents[i].events.length > 1) {

                                    var multipleEventsTitle = (calendarEvents[i].events[0].title + " +" + (calendarEvents[i].events.length - 1)).toString();
                                    console.log(multipleEventsTitle);
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
                                                this.showModal(calendarEvents[i]);
                                                }}
                                        >
                                            <span className="number">{formattedDate}</span>
                                            <span className="bg">{formattedDate}</span>
                                            <span className="title">{multipleEventsTitle}</span>
                                        </div>
                                    );
                                }
                                else {
                                    var title = calendarEvents[i].events[0].title.toString();
                                    console.log(title);

                                    days.push(
                                        <div
                                            className={`col cell ${
                                                !dateFns.isSameMonth(day, monthStart)
                                                    ? "disabled"
                                                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                                                }`}
                                            key={day}
                                            onClick={e => {
                                                this.showModal(calendarEvents[i]);
                                                }}
                                        >
                                            <span className="number">{formattedDate}</span>
                                            <span className="bg">{formattedDate}</span>
                                            <span className="title">{title}</span>
                                        </div>
                                    );
                                }
                            

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


    /**
     * Set the current state to the selected day
     */
    onDateClick = day => {
        this.setState({
            selectedDate: "day"
        });
        
    };

    /**
     * Go to next month
     */
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    
    /**
     * Go to previous month
     */
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
              calendarEventDayData={this.calendarEventDayData}
              >
              </Modal>
            </div>
          </div>
        );
    }
}

export default EventCalendar;