// import React from 'react';
// import {mount} from 'enzyme';
// import firebase from './firebase'

// /* need this in .test.js files */
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// const enzyme = require("enzyme");
// //const Adapter = require("enzyme-adapter-react-16");
// enzyme.configure({ adapter: new Adapter() });
// // configure({ adapter: new Adapter() });


// it('should test handler', () => {
//     //const componentWrapper   = mount(<MyComponent/>);
//     //const component          = componentWrapper.get(0);
//     const componentWrapper   = mount(<firebase/>);
//     const component          = componentWrapper.get(0);

//     /* this.state */
//     //const fileContents       = 'file contents';
//     const startDate = "test start date";
//     const endDate = "test end date";
//     const calendar = "test default";

//     /* expected final */
//     //const expectedFinalState = {fileContents: fileContents};
//     const expectedStartDate = {startDate: startDate};
//     const expectedEndDate = {endDate: endDate};
//     const expectedCalendar = {calendar: calendar};

//     /* initializing this.state. */
//     componentWrapper.instance().state.startDate = startDate;
//     componentWrapper.instance().state.endDate = endDate;
//     componentWrapper.instance().state.calendar = calendar;

//     /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
//     expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.startDate);
//     expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.endDate);
//     expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.calendar);
// });