import React from 'react';
import {mount} from 'enzyme';
import AddEvent from './AddEvent'

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
    const componentWrapper   = mount(<AddEvent/>);
    const component          = componentWrapper.get(0);

    /* this.state */
    //const fileContents       = 'file contents';
    const title = "test title";
    const description = "test description";
    const startDate = "test start date";
    const endDate = "test end date";
    const category = "test category";
    const calendar = "test default";
    
    const firstPage = true;   // not sure how to test yet
    const secondPage = false;   // not sure how to test yet
    const thirdPage = false;   // not sure how to test yet

    const owners = "test current user";
    const shared = false;   // not sure how to test yet
    const invitees = ["test invitees"];

    const errorMessageOpen = false;   // not sure how to test yet
    const message = "test message";
    const successMessageOpen = false;   // not sure how to test yet

    const anchorEl = null;   // not sure how to test yet
    const openMenu = false;   // not sure how to test yet

    /* expected final */
    //const expectedFinalState = {fileContents: fileContents};
    const expectedTitle = {title: title};
    const expectedDescription = {description: description};
    const expectedStartDate = {startDate: startDate};
    const expectedEndDate = {endDate: endDate};
    const expectedCategory = {category: category};
    const expectedCalendar = {calendar: calendar};
    
    const expectedFirstPage = true;   // not sure how to test yet
    const expectedSecondPage = false;   // not sure how to test yet
    const expectedThirdPage = false;   // not sure how to test yet

    const expectedOwners = {owners: owners};
    const expectedShared = false;   // not sure how to test yet
    const expectedInvitees = {invitees: invitees};

    const expectedErrorMessageOpen = false;   // not sure how to test yet
    const expectedMessage = {message: message};
    const expectedSuccessMessageOpen = false;   // not sure how to test yet

    const expectedAnchorEl = null;   // not sure how to test yet
    const expectedOpenMenu = false;   // not sure how to test yet

    /* initializing this.state. */
    componentWrapper.instance().state.title = title;
    componentWrapper.instance().state.description = description;
    componentWrapper.instance().state.startDate = startDate;
    componentWrapper.instance().state.endDate = endDate;
    componentWrapper.instance().state.category = category;
    componentWrapper.instance().state.calendar = calendar;

    componentWrapper.instance().state.firstPage = firstPage;
    componentWrapper.instance().state.secondPage = secondPage;
    componentWrapper.instance().state.thirdPage = thirdPage;

    componentWrapper.instance().state.owners = owners;
    componentWrapper.instance().state.shared = shared;
    componentWrapper.instance().state.invitees = invitees;

    componentWrapper.instance().state.errorMessageOpen = errorMessageOpen;
    componentWrapper.instance().state.message = message;
    componentWrapper.instance().state.successMessageOpen = successMessageOpen;

    componentWrapper.instance().state.anchorEl = anchorEl;
    componentWrapper.instance().state.openMenu = openMenu;

    /* testing this.state. */   //FIXME: testing does not work with booleans?? below commented tests return boolean values
    expect(componentWrapper.instance().state.title).toBe(expectedTitle.title);
    expect(componentWrapper.instance().state.description).toBe(expectedDescription.description);
    expect(componentWrapper.instance().state.startDate).toBe(expectedStartDate.startDate);
    expect(componentWrapper.instance().state.endDate).toBe(expectedEndDate.endDate);
    expect(componentWrapper.instance().state.category).toBe(expectedCategory.category);
    expect(componentWrapper.instance().state.calendar).toBe(expectedCalendar.calendar);

    expect(componentWrapper.instance().state.firstPage).toBe(expectedFirstPage);
    expect(componentWrapper.instance().state.secondPage).toBe(expectedSecondPage);
    expect(componentWrapper.instance().state.thirdPage).toBe(expectedThirdPage);

    expect(componentWrapper.instance().state.owners).toBe(expectedOwners.owners);
    expect(componentWrapper.instance().state.shared).toBe(expectedShared);
    expect(componentWrapper.instance().state.invitees).toBe(expectedInvitees.invitees);

    expect(componentWrapper.instance().state.errorMessageOpen).toBe(expectedErrorMessageOpen);
    expect(componentWrapper.instance().state.message).toBe(expectedMessage.message);
    expect(componentWrapper.instance().state.successMessageOpen).toBe(expectedSuccessMessageOpen);

    expect(componentWrapper.instance().state.anchorEl).toBe(expectedAnchorEl);
    expect(componentWrapper.instance().state.openMenu).toBe(expectedOpenMenu);

    /* Blob */
    // // const file               = new Blob([fileContents], {type : 'text/plain'});
    // const fileTitle               = new Blob([title], {type : 'text/plain'});
    // const fileDescription               = new Blob([description], {type : 'text/plain'});
    // const fileStartDate               = new Blob([startDate], {type : 'text/plain'});
    // const fileEndDate               = new Blob([endDate], {type : 'text/plain'});
    // const fileCategory               = new Blob([category], {type : 'text/plain'});
    // const fileCalendar               = new Blob([calendar], {type : 'text/plain'});

    // //const fileFirstPage              = new Blob([firstPage], {type : 'text/plain'});
    // //const fileSecondPage               = new Blob([secondPage], {type : 'text/plain'});
    // //const fileThirdPage               = new Blob([thirdPage], {type : 'text/plain'});

    // const fileOwners               = new Blob([owners], {type : 'text/plain'});
    // //const fileShared               = new Blob([shared], {type : 'text/plain'});
    // const fileInvitees               = new Blob([invitees], {type : 'text/plain'});

    // //const fileErrorMessageOpen               = new Blob([errorMessageOpen], {type : 'text/plain'});
    // const fileMessage               = new Blob([message], {type : 'text/plain'});
    // //const fileSuccessMessageOpen               = new Blob([successMessageOpen], {type : 'text/plain'});

    // //const fileAnchorEl               = new Blob([anchorEl], {type : 'text/plain'});
    // //const fileOpenMenu               = new Blob([openMenu], {type : 'text/plain'});

    // /* jest */
    // //const readAsText         = jest.fn();
    // //const addEventListener   = jest.fn((_, evtHandler) => { evtHandler(); });
    // const readAsText         = jest.fn();
    // const addEventListener   = jest.fn((_, evtHandler) => { evtHandler(); });

    // /* file reader */
    // //const dummyFileReader    = {addEventListener, readAsText, result: fileContents};
    // const dummyFileReaderTitle    = {addEventListener, readAsText, result: title};
    // const dummyFileReaderDescription    = {addEventListener, readAsText, result: description};
    // const dummyFileReaderStartDate    = {addEventListener, readAsText, result: startDate};
    // const dummyFileReaderEndDate    = {addEventListener, readAsText, result: endDate};
    // const dummyFileReaderCategory    = {addEventListener, readAsText, result: category};
    // const dummyFileReaderCalendar    = {addEventListener, readAsText, result: calendar};

    // //const dummyFileReaderFirstPage    = {addEventListener, readAsText, result: firstPage};
    // //const dummyFileReaderSecondPage    = {addEventListener, readAsText, result: secondPage};
    // //const dummyFileReaderThirdPage    = {addEventListener, readAsText, result: thirdPage};

    // const dummyFileReaderOwners    = {addEventListener, readAsText, result: owners};
    // //const dummyFileReaderShared    = {addEventListener, readAsText, result: shared};
    // const dummyFileReaderInvitees    = {addEventListener, readAsText, result: invitees};

    // //const dummyFileReaderErrorMessageOpen    = {addEventListener, readAsText, result: errorMessageOpen};
    // const dummyFileReaderMessage    = {addEventListener, readAsText, result: message};
    // //const dummyFileReaderSuccessMessageOpen    = {addEventListener, readAsText, result: successMessageOpen};

    // //const dummyFileReaderAnchorEl    = {addEventListener, readAsText, result: anchorEl};
    // //const dummyFileReaderOpenMenu    = {addEventListener, readAsText, result: openMenu};

    // /* jest file reader */
    // //window.FileReader        = jest.fn(() => dummyFileReader);
    // window.FileReader        = jest.fn(() => dummyFileReaderTitle);
    // window.FileReader        = jest.fn(() => dummyFileReaderDescription);
    // window.FileReader        = jest.fn(() => dummyFileReaderStartDate);
    // window.FileReader        = jest.fn(() => dummyFileReaderEndDate);
    // window.FileReader        = jest.fn(() => dummyFileReaderCategory);
    // window.FileReader        = jest.fn(() => dummyFileReaderCalendar);

    // //window.FileReader        = jest.fn(() => dummyFileReaderFirstPage);
    // //window.FileReader        = jest.fn(() => dummyFileReaderSecondPage);
    // //window.FileReader        = jest.fn(() => dummyFileReaderThirdPage);

    // window.FileReader        = jest.fn(() => dummyFileReaderOwners);
    // //window.FileReader        = jest.fn(() => dummyFileReaderShared);
    // window.FileReader        = jest.fn(() => dummyFileReaderInvitees);

    // //window.FileReader        = jest.fn(() => dummyFileReaderErrorMessageOpen);
    // window.FileReader        = jest.fn(() => dummyFileReaderMessage);
    // //window.FileReader        = jest.fn(() => dummyFileReaderSuccessMessageOpen);

    // //window.FileReader        = jest.fn(() => dummyFileReaderAnchorEl);
    // //window.FileReader        = jest.fn(() => dummyFileReaderOpenMenu);

    // /* spyOn */
    // // spyOn(component, 'setState').and.callThrough();
    // // // spyOn(component, 'changeHandler').and.callThrough(); // not yet working

    // //spyOn(component, 'componentWrapper.invoke').and.callThrough();  //FIXME: method does not exist

    //     /* replacement for spyOn, rest of commented code below is not needed */
    //     componentWrapper.instance().state.title = "test title";
    //     expect(componentWrapper.instance().state.title).toBe("test title");
    

    // /* simulate component */
    // //componentWrapper.find('input').simulate('change', {target: {files: [file]}});
    // componentWrapper.find('div').simulate('change', {target: {files: [fileTitle, fileDescription, fileStartDate, fileEndDate, fileCategory, fileCalendar, fileOwners, fileInvitees, fileMessage]}});

    // /* expect */
    // //expect(FileReader        ).toHaveBeenCalled    (                             );  // 1
    // //expect(addEventListener  ).toHaveBeenCalledWith('load', jasmine.any(Function));  // 2
    // //expect(readAsText        ).toHaveBeenCalledWith(file                         );  // 3
    // //expect(component.setState).toHaveBeenCalledWith(expectedFinalState           );  // 4
    // //expect(component.state   ).toEqual             (expectedFinalState           );  // 5
    // // expect(component.changeHandler).toHaveBeenCalled(); // not yet working          // 6
    // expect(FileReader        ).toHaveBeenCalled    (                             );  // 1
    // expect(addEventListener  ).toHaveBeenCalledWith('load', jasmine.any(Function));  // 2

    // expect(readAsText        ).toHaveBeenCalledWith(fileTitle                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileDescription                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileStartDate                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileEndDate                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileCategory                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileCalendar                         );  // 3

    // //expect(readAsText        ).toHaveBeenCalledWith(fileFirstPage                         );  // 3
    // //expect(readAsText        ).toHaveBeenCalledWith(fileSecondPage                         );  // 3
    // //expect(readAsText        ).toHaveBeenCalledWith(fileThirdPage                         );  // 3

    // expect(readAsText        ).toHaveBeenCalledWith(fileOwners                         );  // 3
    // //expect(readAsText        ).toHaveBeenCalledWith(fileShared                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileInvitees                         );  // 3

    // //expect(readAsText        ).toHaveBeenCalledWith(fileErrorMessageOpen                         );  // 3
    // expect(readAsText        ).toHaveBeenCalledWith(fileMessage                         );  // 3
    // //expect(readAsText        ).toHaveBeenCalledWith(fileSuccessMessageOpen                         );  // 3

    // //expect(readAsText        ).toHaveBeenCalledWith(fileAnchorEl                         );  // 3
    // //expect(readAsText        ).toHaveBeenCalledWith(fileOpenMenu                         );  // 3

    // expect(component.setState).toHaveBeenCalledWith(expectedTitle           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedDescription           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedStartDate           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedEndDate           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedCategory           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedCalendar           );  // 4

    // //expect(component.setState).toHaveBeenCalledWith(expectedFirstPage           );  // 4
    // //expect(component.setState).toHaveBeenCalledWith(expectedSecondPage           );  // 4
    // //expect(component.setState).toHaveBeenCalledWith(expectedThirdPage          );  // 4

    // expect(component.setState).toHaveBeenCalledWith(expectedOwners           );  // 4
    // //expect(component.setState).toHaveBeenCalledWith(expectedShared           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedInvitees          );  // 4

    // //expect(component.setState).toHaveBeenCalledWith(expectedErrorMessageOpen           );  // 4
    // expect(component.setState).toHaveBeenCalledWith(expectedMessage           );  // 4
    // //expect(component.setState).toHaveBeenCalledWith(expectedSuccessMessageOpen          );  // 4

    // //expect(component.setState).toHaveBeenCalledWith(expectedAnchorEl           );  // 4
    // //expect(component.setState).toHaveBeenCalledWith(expectedOpenMenu           );  // 4

    // expect(component.state   ).toEqual             (expectedFinalState           );  // 5
    // expect(component.setState).toEqual             (expectedTitle           );  // 5
    // expect(component.setState).toEqual             (expectedDescription           );  // 5
    // expect(component.setState).toEqual             (expectedStartDate           );  // 5
    // expect(component.setState).toEqual             (expectedEndDate           );  // 5
    // expect(component.setState).toEqual             (expectedCategory           );  // 5
    // expect(component.setState).toEqual             (expectedCalendar           );  // 5

    // //expect(component.setState).toEqual             (expectedFirstPage           );  // 5
    // //expect(component.setState).toEqual             (expectedSecondPage           );  // 5
    // //expect(component.setState).toEqual             (expectedThirdPage          );  // 5

    // expect(component.setState).toEqual             (expectedOwners           );  // 5
    // //expect(component.setState).toEqual             (expectedShared           );  // 5
    // expect(component.setState).toEqual             (expectedInvitees          );  // 5

    // //expect(component.setState).toEqual             (expectedErrorMessageOpen           );  // 5
    // expect(component.setState).toEqual             (expectedMessage           );  // 5
    // //expect(component.setState).toEqual             (expectedSuccessMessageOpen          );  // 5

    // //expect(component.setState).toEqual             (expectedAnchorEl           );  // 5
    // //expect(component.setState).toEqual             (expectedOpenMenu           );  // 5
});

// onUpdateProperty = (key, value) => {
//     this.state.formData[key] = value;
//   }

it('submitEvent input should update invitees', function () 
{
    const componentWrapper = mount(<AddEvent/>);
    const spy = spyOn(componentWrapper.instance(), 'submitEvent');

    expect(spy).not.toHaveBeenCalled();

    const nameInput = componentWrapper.find('[e="e"]');   // FIXME
    nameInput.simulate('change', {
        target: { name: ["testEvent1"], invitees: ["testinvitee1"] },   // replace name with e?
    });

    componentWrapper.update();

    // expect(spy).toHaveBeenCalledWith('name', 'v1');
    expect(spy).toHaveBeenCalled();
});  