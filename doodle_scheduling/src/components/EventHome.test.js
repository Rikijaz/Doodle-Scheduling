import React from 'react';
import {mount} from 'enzyme';
import AddSecondPage from './AddSecondPage'

/* need this in .test.js files */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const enzyme = require("enzyme");
//const Adapter = require("enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });
// configure({ adapter: new Adapter() });


it('should test handler', () => {
    //const componentWrapper   = mount(<MyComponent/>);
    //const component          = componentWrapper.get(0);
    const componentWrapper   = mount(<AddSecondPage/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const openMenu = false;
    const anchorEl2 = null;
    const openMenu2 = false;
    const anchorEl3 = null;
    const openMenu3 = false;
    const showForm = false;
    const showShared = "test showShared";
    const events = ["test events"];
    const sharedEvents = ["test sharedEvents"];
    const acceptedEvents = ["test acceptedEvents"];
    const filteredEvents = ["test filteredEvents"];
    const filteredSharedEvents = ["test filteredSharedEvents"];
    const filteredAcceptedEvents = ["test filteredAcceptedEvents"];
    const eventSortOrder = "test eventSortOrder";
    const search = "test search";

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedOpenMenu = {openMenu: openMenu};
    const expectedAnchorEl2 = {anchorEl2: anchorEl2};
    const expectedOpenMenu2 = {openMenu2: openMenu2};
    const expectedAnchorEl3 = {anchorEl3: anchorEl3};
    const expectedOpenMenu3 = {openMenu3: openMenu3};
    const expectedShowForm = {showForm: showForm};
    const expectedShowShared = {showShared: showShared};
    const expectedEvents = {events: events};
    const expectedSharedEvents = {sharedEvents: sharedEvents};
    const expectedAcceptedEvents = {acceptedEvents: acceptedEvents};
    const expectedFilteredEvents = {filteredEvents: filteredEvents};
    const expectedFilteredSharedEvents = {filteredSharedEvents: filteredSharedEvents};
    const expectedFilteredAcceptedEvents = {filteredAcceptedEvents: filteredAcceptedEvents};
    const expectedEventSortOrder = {eventSortOrder: eventSortOrder};
    const expectedSearch = {search: search};

    /* initializing this.state. */
    componentWrapper.instance().state.openMenu = openMenu;
    componentWrapper.instance().state.anchorEl2 = anchorEl2;
    componentWrapper.instance().state.openMenu2 = openMenu2;
    componentWrapper.instance().state.anchorEl3 = anchorEl3;
    componentWrapper.instance().state.openMenu3 = openMenu3;
    componentWrapper.instance().state.showForm = showForm;
    componentWrapper.instance().state.showShared = showShared;
    componentWrapper.instance().state.events = events;
    componentWrapper.instance().state.sharedEvents = sharedEvents;
    componentWrapper.instance().state.acceptedEvents = acceptedEvents;
    componentWrapper.instance().state.filteredEvents = filteredEvents;
    componentWrapper.instance().state.filteredSharedEvents = filteredSharedEvents;
    componentWrapper.instance().state.filteredAcceptedEvents = filteredAcceptedEvents;
    componentWrapper.instance().state.eventSortOrder = eventSortOrder;
    componentWrapper.instance().state.search = search;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.openMenu);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.anchorEl2);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.openMenu2);
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.anchorEl3);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.openMenu3);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.showForm);
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.showShared);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.events);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.sharedEvents);
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.acceptedEvents);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.filteredEvents);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.filteredSharedEvents);
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.filteredAcceptedEvents);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.eventSortOrder);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.search);
});