import React from 'react';
import './AddFourthPage.css';
import CalendarEventView from "./CalendarEventView";
import { Button } from "@material-ui/core";

class AddFourthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return (
      <div className="App">
        <header>
          <div id ="logo">
            <span className="icon">
              date_range
            </span>
            <span>
              schedule<b>It</b>
            </span>
          </div>
        </header>
        <div>
        <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.props.goToSecondPage}
                >
                    Go BACK
        </Button>
        </div>
        <main>
          <CalendarEventView />
        </main>
      </div>
    )
  }
}

export default AddFourthPage;
