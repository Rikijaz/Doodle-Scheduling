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
    const componentWrapper   = mount(<Login/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const isSignedIn = false;
    const current_user_email = "test current_user_email";

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedIsSignedIn = {isSignedIn: isSignedIn};
    const expectedCurrent_User_Email = {current_user_email: current_user_email};

    /* initializing this.state. */
    componentWrapper.instance().state.isSignedIn = isSignedIn;
    componentWrapper.instance().state.current_user_email = current_user_email;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.isSignedIn).toBe(expectedIsSignedIn.isSignedIn);
    expect(componentWrapper.instance().state.current_user_email).toBe(expectedCurrent_User_Email.current_user_email);
});