import React from 'react';
import {mount} from 'enzyme';
import EventHome from './EventHome'

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
    const componentWrapper   = mount(<EventHome/>);
    const component          = componentWrapper.get(0);

    //expect(componentWrapper.declineInvite("adaf")).toBe(/*return value form function here*/);

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
    const expectedOpenMenu = openMenu;
    const expectedAnchorEl2 = anchorEl2;
    const expectedOpenMenu2 = openMenu2;
    const expectedAnchorEl3 = anchorEl3;
    const expectedOpenMenu3 = openMenu3;
    const expectedShowForm = showForm;
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
    expect(componentWrapper.instance().state.openMenu).toBe(expectedOpenMenu);
    expect(componentWrapper.instance().state.anchorEl2).toBe(expectedAnchorEl2);
    expect(componentWrapper.instance().state.openMenu2).toBe(expectedOpenMenu2);
    expect(componentWrapper.instance().state.anchorEl3).toBe(expectedAnchorEl3);
    expect(componentWrapper.instance().state.openMenu3).toBe(expectedOpenMenu3);
    expect(componentWrapper.instance().state.showForm).toBe(expectedShowForm);
    expect(componentWrapper.instance().state.showShared).toBe(expectedShowShared.showShared);
    expect(componentWrapper.instance().state.events).toBe(expectedEvents.events);
    expect(componentWrapper.instance().state.sharedEvents).toBe(expectedSharedEvents.sharedEvents);
    expect(componentWrapper.instance().state.acceptedEvents).toBe(expectedAcceptedEvents.acceptedEvents);
    expect(componentWrapper.instance().state.filteredEvents).toBe(expectedFilteredEvents.filteredEvents);
    expect(componentWrapper.instance().state.filteredSharedEvents).toBe(expectedFilteredSharedEvents.filteredSharedEvents);
    expect(componentWrapper.instance().state.filteredAcceptedEvents).toBe(expectedFilteredAcceptedEvents.filteredAcceptedEvents);
    expect(componentWrapper.instance().state.eventSortOrder).toBe(expectedEventSortOrder.eventSortOrder);
    expect(componentWrapper.instance().state.search).toBe(expectedSearch.search);
});