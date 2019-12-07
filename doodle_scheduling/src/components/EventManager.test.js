import React from 'react';
import {mount} from 'enzyme';
import EventManager from './EventManager'

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
    const componentWrapper   = mount(<EventManager/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const homePage = true;
    const editingEvent = false;
    const idOfEditEvent = "test idOfEditEvent";
    const joinEvent = false;

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedHomePage = homePage;
    const expectedEditingEvent = editingEvent;
    const expectedIdOfEditEvent = {idOfEditEvent: idOfEditEvent};
    const expectedJoinEvent = joinEvent;

    /* initializing this.state. */
    componentWrapper.instance().state.homePage = homePage;
    componentWrapper.instance().state.editingEvent = editingEvent;
    componentWrapper.instance().state.idOfEditEvent = idOfEditEvent;
    componentWrapper.instance().state.joinEvent = joinEvent;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.homePage).toBe(expectedHomePage);
    expect(componentWrapper.instance().state.editingEvent).toBe(expectedEditingEvent);
    expect(componentWrapper.instance().state.idOfEditEvent).toBe(expectedIdOfEditEvent.idOfEditEvent);
    expect(componentWrapper.instance().state.joinEvent).toBe(expectedJoinEvent);
});