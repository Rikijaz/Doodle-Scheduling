import React from 'react';
import {mount} from 'enzyme';
import AddThirdPage from './AddThirdPage'

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
    const componentWrapper   = mount(<AddThirdPage/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const checked = false;
    const invite_list = ["test end date"];

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedChecked = checked;
    const expectedInvite_List = {invite_list: invite_list};

    /* initializing this.state. */
    componentWrapper.instance().state.checked = checked;
    componentWrapper.instance().state.invite_list = invite_list;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.checked).toBe(expectedChecked);
    expect(componentWrapper.instance().state.invite_list).toBe(expectedInvite_List.invite_list);
});