import React from 'react';
import {mount} from 'enzyme';
import Profile from './Profile'

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
    const componentWrapper   = mount(<Profile/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const user = null;
    const picURL = "test picURL";
    const oldURL = "test oldURL";
    const nameDisplay = "test nameDisplay";
    const current_user_email = "test current_user_email";
    const userName = "test userName";
    const bioDisplay = "test bioDisplay";
    const progress = 0;
    const profilePic = "test profilePic";
    const userBio = "test userBio";
    const isUploading = false;
    const errorOpen = false;
    const successOpen = false;
    const message = "test message";
    

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedUser = user;
    const expectedPicURL = {picURL: picURL};
    const expectedOldURL = {oldURL: oldURL};
    const expectedNameDisplay = {nameDisplay: nameDisplay};
    const expectedCurrent_User_Email = {current_user_email: current_user_email};
    const expectedUserName = {userName: userName};
    const expectedBioDisplay = {bioDisplay: bioDisplay};
    const expectedProgress = progress;
    const expectedProfilePic = {profilePic: profilePic};
    const expectedUserBio = {userBio: userBio};
    const expectedIsUploading = isUploading;
    const expectedErrorOpen = errorOpen;
    const expectedSuccessOpen = successOpen;
    const expectedMessage = {message: message};

    /* initializing this.state. */
    componentWrapper.instance().state.user = user;
    componentWrapper.instance().state.picURL = picURL;
    componentWrapper.instance().state.oldURL = oldURL;
    componentWrapper.instance().state.nameDisplay = nameDisplay;
    componentWrapper.instance().state.current_user_email = current_user_email;
    componentWrapper.instance().state.userName = userName;
    componentWrapper.instance().state.bioDisplay = bioDisplay;
    componentWrapper.instance().state.progress = progress;
    componentWrapper.instance().state.profilePic = profilePic;
    componentWrapper.instance().state.userBio = userBio;
    componentWrapper.instance().state.isUploading = isUploading;
    componentWrapper.instance().state.errorOpen = errorOpen;
    componentWrapper.instance().state.successOpen = successOpen;
    componentWrapper.instance().state.message = message;
    

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.startDate).toBe(expectedUser);
    expect(componentWrapper.instance().state.endDate).toBe(expectedPicURL.picURL);
    expect(componentWrapper.instance().state.calendar).toBe(expectedOldURL.oldURL);
    expect(componentWrapper.instance().state.startDate).toBe(expectedNameDisplay.nameDisplay);
    expect(componentWrapper.instance().state.endDate).toBe(expectedCurrent_User_Email.current_user_email);
    expect(componentWrapper.instance().state.calendar).toBe(expectedUserName.userName);
    expect(componentWrapper.instance().state.startDate).toBe(expectedBioDisplay.bioDisplay);
    expect(componentWrapper.instance().state.endDate).toBe(expectedProgress);
    expect(componentWrapper.instance().state.calendar).toBe(expectedProfilePic.profilePic);
    expect(componentWrapper.instance().state.startDate).toBe(expectedUserBio.userBio);
    expect(componentWrapper.instance().state.endDate).toBe(expectedIsUploading);
    expect(componentWrapper.instance().state.calendar).toBe(expectedErrorOpenr);
    expect(componentWrapper.instance().state.startDate).toBe(expectedSuccessOpen);
    expect(componentWrapper.instance().state.endDate).toBe(expectedMessage.message);
});