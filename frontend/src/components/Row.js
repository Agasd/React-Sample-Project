import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import React, {Component} from "react";
import {Link} from "react-router-dom";

import './Row.css';

export class Row extends Component {
    constructor(props){
        super(props);
        this.state = {
            dismissed: false
        };
        this.handleDismiss = this.handleDismiss.bind(this);
    }
    handleDismiss() {
        const url = this.props.url;
        const dismissFunction = this.props.dismissClick;
        this.setState({
            dismissed: true
         });
        setTimeout(function(){
            dismissFunction(url);
        }, 200);
    }
    render(){
        return(
            <Grid item
                  className="item"
                  sm={12}
                  lg={6}
            >
                <Slide direction="left" in={!this.state.dismissed}>
                    <Paper>
                        <Grid container className="container"
                            direction="row"
                        >
                            <Grid item className="imageContainer"
                                  sm={12}
                                  lg={3}
                            >
                                <img className="contentImage" alt="contentImage" src={this.props.imgSrc}/>
                            </Grid>
                            <Grid item
                                sm={12}
                                lg={5}
                            >
                                <ul className="contentText">
                                    <li>
                                        <h2>
                                            {this.props.title}
                                        </h2>
                                    </li>
                                    <li>
                                        <a href={this.props.url}>{this.props.url}</a>
                                    </li>
                                </ul>
                             </Grid>
                            <Grid item  className="buttonContainer"
                                  sm={12}
                                  lg={4}
                            >
                                <Link to={{
                                    pathname: '/schedule',
                                    state: {
                                        url: this.props.url
                                    }
                                }}>
                                    <Button variant="contained" color="primary" className="buttonSchedule">
                                        Schedule
                                    </Button>
                                </Link>
                                <Button variant="contained" className="buttonDismiss" onClick={this.handleDismiss}>
                                     Dismiss
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Slide>
            </Grid>

        )}
}