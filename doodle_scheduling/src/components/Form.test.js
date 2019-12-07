import React from 'react';
import {mount} from 'enzyme';
import Form from './Form'

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
    const componentWrapper   = mount(<Form/>);
    const component          = componentWrapper.get(0);

    /* this.state */
	//const fileContents       = 'file contents';
    const contentList = ["test contentList"];
    const emailList = ["test emailList"];

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedContentList = {contentList: contentList};
    const expectedEmailList = {emailList: emailList};

    /* initializing this.state. */
    componentWrapper.instance().state.contentList = contentList;
	componentWrapper.instance().state.emailList = emailList;
	
    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.contentList).toBe(expectedContentList.contentList);
    expect(componentWrapper.instance().state.emailList).toBe(expectedEmailList.emailList);
});