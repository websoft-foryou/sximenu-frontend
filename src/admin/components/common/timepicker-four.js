import React from 'react';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

class TimePickerFour extends React.Component {
    constructor(props) {
        super(props);
        const {  meridiem, focused, showTimezone, timezone } = props;
        let hour = '';
        let minute = '';
        this.state = {
            hour,
            minute,
            meridiem,
            focused,
            timezone,
            showTimezone,
        };

        this.onFocusChange = this.onFocusChange.bind(this);
        this.onFocusChange1 = this.onFocusChange1.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.handleFocusedChange = this.handleFocusedChange.bind(this);
    }

    onTimeChange(options) {
        const {
            hour,
            minute,
            meridiem
        } = options;

        this.setState({ hour, minute, meridiem });
        this.props.onValueChange(hour, minute);
    }

    onFocusChange(focused) {
        this.setState({ focused });
    }
    onFocusChange1(focused1) {
        this.setState({ focused1 });
    }

    handleFocusedChange() {
        const { focused } = this.state;
        this.setState({ focused: !focused });
    }

    get basicTrigger() {
        const { hour, minute } = this.state;
        return (
            <div
                onClick={this.handleFocusedChange}
                className="time_picker_trigger"
            >
                <div>
                    Click to open panel<br />
                    {hour}:{minute}
                </div>
            </div>
        );
    }

    get customTrigger() {
        return (
            <div
                onClick={this.handleFocusedChange}
                className="time_picker_trigger"
            >
            </div>
        );
    }

    get trigger() {
        const { customTriggerId } = this.props;
        const triggers = {
            0: (<div />),
            1: this.basicTrigger,
            2: this.customTrigger
        };
        return triggers[customTriggerId] || null;
    }

    render() {
        const { hour, minute, } = this.state;
        const {isDisabled, timeValue} = this.props;
        var time = hour && minute ? `${hour}:${minute}` : null;
        if (isDisabled) time = '--:--';

        return (
            // <div className="time_picker_wrapper">
                <TimePicker
                    trigger={this.trigger}
                    focused={false}
                    disabled={isDisabled}
                    colorPalette="light"
                    onFocusChange={this.onFocusChange}
                    theme="classic"
                    onTimeChange={this.onTimeChange}
                    showTimezone={true}
                    time={timeValue}
                />
            // </div>
        );
    }
}

export default TimePickerFour;
