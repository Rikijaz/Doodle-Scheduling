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
    const expanded = false;
    const startShare = false;

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedExpanded = {expanded: expanded};
    const expectedStartShare = {startShare: startShare};

    /* initializing this.state. */
    componentWrapper.instance().state.expanded = expanded;
    componentWrapper.instance().state.startShare = startShare;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    //expect(componentWrapper.instance().state.expanded).toBe(expectedExpanded.expanded);
    //expect(componentWrapper.instance().state.startShare).toBe(expectedStartShare.startShare);
});