import React from 'react';
import {mount} from 'enzyme';
import Header from './header'

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
    const componentWrapper   = mount(<Header/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const user = null;
    const addContactsPrompt = false;
    const unreadNotifications = 1;
    const notifications = ["test start date"];
    const displayNotifications = false;

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedUser = user;
    const expectedAddContactsPrompt = addContactsPrompt;
    const expectedUnreadNotifications = unreadNotifications;
    const expectedNotifications = {notifications: notifications};
    const expectedDisplayNotifications = displayNotifications;

    /* initializing this.state. */
    componentWrapper.instance().state.user = user;
    componentWrapper.instance().state.addContactsPrompt = addContactsPrompt;
    componentWrapper.instance().state.unreadNotifications = unreadNotifications;
    componentWrapper.instance().state.notifications = notifications;
    componentWrapper.instance().state.displayNotifications = displayNotifications;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.user).toBe(expectedUser);
    expect(componentWrapper.instance().state.addContactsPrompt).toBe(expectedAddContactsPrompt);
    expect(componentWrapper.instance().state.unreadNotifications).toBe(expectedUnreadNotifications);
    expect(componentWrapper.instance().state.notifications).toBe(expectedNotifications.notifications);
    expect(componentWrapper.instance().state.displayNotifications).toBe(expectedDisplayNotifications);
});