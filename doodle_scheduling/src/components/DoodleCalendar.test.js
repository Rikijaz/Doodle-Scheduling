import React from 'react';
import {mount} from 'enzyme';
import DoodleCalendar from './DoodleCalendar'

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
    const componentWrapper   = mount(<DoodleCalendar/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const lastUid = 1;
    const selectedIntervals = ["test intervals"];

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedLastUid = lastUid;
    const expectedSelectedIntervals = {selectedIntervals: selectedIntervals};

    /* initializing this.state. */
    componentWrapper.instance().state.lastUid = lastUid;
    componentWrapper.instance().state.selectedIntervals = selectedIntervals;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.lastUid).toBe(expectedLastUid);
    expect(componentWrapper.instance().state.selectedIntervals).toBe(expectedSelectedIntervals.selectedIntervals);
});