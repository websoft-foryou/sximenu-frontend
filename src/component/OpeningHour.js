import React, {Component} from "react";
import {Form} from "react-bootstrap";

class OpeningHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayIsOpen: null
    }
  }

  componentDidMount() {
    this.setState({dayIsOpen: this.props.dayIsOpen});
  }

  handleToggleOnOff = () => {
    this.setState({dayIsOpen: !this.state.dayIsOpen}, () => {
      //console.log('Hello', this.state.dayIsOpen);
    })
  };


  render() {
    const {day, startTime, endTime} = this.props;
    return (
      <div className="day">
        <div className="day-name">
          <span onClick={() => this.handleToggleOnOff()}>{day}</span>
        </div>
        <div className="day-actions">
          <Form.Check
            custom
            type="switch"
            id={`day${day}`}>
            <Form.Check.Input
              defaultChecked={this.props.dayIsOpen}/>

            <Form.Check.Label onClick={() => this.handleToggleOnOff()}>
              {this.state.dayIsOpen ? 'Open' : 'Close'}
            </Form.Check.Label>
          </Form.Check>
        </div>


        <div className="day-inputs">
          {this.state.dayIsOpen &&
          <>
            <label className="time-label start-hour">
              <input type="time" className="time-input timePicker" defaultValue={startTime} placeholder="Start hour"/>
            </label>

            <label className="time-label end-hour ml-3">
              <input type="time" className="time-input timePicker" defaultValue={endTime} placeholder="End hour"/>
            </label>
          </>}
        </div>
      </div>
    );
  }
}

export default OpeningHour;