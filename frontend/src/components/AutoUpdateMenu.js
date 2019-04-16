import React, {Component} from "react";
import Switch from '@material-ui/core/Switch';
import './AutoUpdateMenu.css';

export class AutoUpdateMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange() {
        const checked = !this.state.checked;
        this.setState({
            checked: checked
        });
        this.props.updateHandler(checked);

    }
    render() {
        return(
            <React.Fragment>
                <span className="text">Auto update: </span>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    color="primary"
                />

                <span > | </span>

                <span
                    className="text updateBtn"
                    onClick={this.props.clickHandler}
                >
                    update now
                </span>
                <span class="text">{this.props.updateMessage}</span>
            </React.Fragment>
        )
    }

}