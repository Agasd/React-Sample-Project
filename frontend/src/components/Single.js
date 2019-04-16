import React, {Component} from "react";

import Typography from "@material-ui/core/Typography";

export class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: {},
            success: true,
            errorMsg: ""
        };
    }
    componentDidMount() {
        const axios = require('axios');
        if(this.props.location.state != null) {
            axios.post('/getSingle',
                {
                    url: this.props.location.state.url
                }
            )
                .then(resp => {
                    console.log(resp.data.success);
                    if (resp.data.success) {
                        this.setState({
                            success: true,
                            row: resp.data.content
                        });
                    } else {
                        this.setState({
                            success: false,
                            errorMsg: "Content not found"
                        });
                    }
                })
                .catch(
                    () => {
                        this.setState({
                            success: false,
                            errorMsg: "Couldn't connect to the server"
                        })
                    }
                );
        }
        else {
            this.setState({
                success: false,
                errorMsg: "Invalid content"
            })
        }
    }
    render() {
        if(this.state.success) {
            return(
                <React.Fragment>
                    <Typography variant="h2" gutterBottom align="center">
                        {this.state.row.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        Scheduling function is under construction
                    </Typography>
                </React.Fragment>
            );
        }
        else {
            return(
                    <Typography variant="h6" gutterBottom align="center">
                        {this.state.errorMsg}
                    </Typography>
            );
        }
    }
}