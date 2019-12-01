import React, { Component } from "react";
//import Select from 'react-select'
import Dropdown from 'react-dropdown'

export class NotificationsButton extends Component {
    /* previous code for Select */
    // state = {
    //     selectedOption: null,
    //   };
    //   handleChange = selectedOption => {
    //     this.setState(
    //       { selectedOption },
    //       () => console.log(`Option selected:`, this.state.selectedOption)
    //     );
    //   };

    //   render() {
    //     const { selectedOption } = this.state;
    //     var options = [   // populate select options
    //         { value: 'chocolate', label: 'Chocolate' },
    //         { value: 'strawberry', label: 'Strawberry' },
    //         { value: 'vanilla', label: 'Vanilla' }
    //       ]

    //     options.push({value: 'tasty', label: 'best tasting'});  // add notifications to select options
    
    //     return (
    //       <Dropdown   //Select
    //         value={selectedOption}
    //         onChange={this.handleChange}
    //         options={options}
    //       >
    //       </Dropdown>
    //     );
    //   }

    // render() {

    //     return (
    //         <Dropdown>
    //             <Dropdown.Toggle variant="success" id="dropdown-basic">
    //                 Dropdown Button
    //             </Dropdown.Toggle>

    //             <Dropdown.Menu>
    //                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //             </Dropdown.Menu>
    //         </Dropdown>
    //     )

    // }


    render() {
        const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two', className: 'myOptionClassName' }
            // {
            //  type: 'group', name: 'Notifications', items: [
            //    { value: 'three', label: 'Three', className: 'myOptionClassName' },
            //    { value: 'four', label: 'Four' }
            //  ]
            // }
          ]

          options.push({value: 'tasty', label: 'best tasting'});  // add notifications to select options

          // able to delete notifications 

          const defaultOption = "Notifications"

          return (
            <Dropdown options={options} placeholder="Select an option" />  // value={defaultOption} onChange={this._onSelect}
          )
    }



    // const btnStyle = {
    //     textAlign: "left"
    // };

    // return (
    //     <div>
    //         <div style={btnStyle}>
    //             <Select
    //                 variant="contained"
    //                 color="primary"
    //                 size="small"
    //             >
    //                 Notifications
    //                 <option>A</option>
    //                 <option>B</option>
    //                 <option>C</option>
    //             </Select>
    //         </div>
    //     </div>
    // );
}

export default NotificationsButton;
