import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import {Row} from './Row'
import {AutoUpdateMenu} from "./AutoUpdateMenu";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            success: true,
            allowUpdate: false,
            updateMessage: ""
        };
        this.handleDismissClick = this.handleDismissClick.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.update = this.update.bind(this);

    }
    componentDidMount() {
        const axios = require('axios');
        axios.post('/getAll')
            .then(resp => {
                this.setState({
                    rows: resp.data.content,
                    success: true
                });
            })
            .catch(
                () => {
                    this.setState({
                      success: false
                    })
                }
            );
        setInterval(() =>{
                this.update(false);
            },
            10000
        );
    }

    handleDismissClick(url) {
        let tempArr = this.state.rows.slice();
        this.setState({
            rows:tempArr.filter(function(el) {
                return el.url !== url;
            })
        });
    }
    handleUpdateChange(state) {
        this.setState({
            allowUpdate: state
        })
    }
    update(clickSource = true) {
        const axios = require('axios');
        if(this.state.allowUpdate || clickSource) {
            axios.post('/update')
                .then(resp => {
                    if (0 < resp.data.content.length) {
                        this.setState(
                            {
                                rows: resp.data.content.concat(this.state.rows)
                            }
                        );
                    }
                    if(resp.data.content.length  === 1) {
                        this.setState({
                            updateMessage: "Content updated: 1 new entry"
                        });
                    }
                    else {
                        this.setState({
                            updateMessage: "Content updated: (" + resp.data.content.length + ") new entries"
                        });

                    }

                    setTimeout(
                        () => {
                            this.setState({
                                updateMessage: ""
                            })
                        },
                        4000
                    )

                })
                .catch(
                    () => {
                    }
                );
        }
    }
    render() {
        const rows = this.state.rows.map((item, i) =>
            <React.Fragment key={item.url+item.title}>
                <Grid item
                      className="spacer"
                      xs={false}
                      sm={3}
                >
                </Grid>
                <Row title={item.title} url={item.url} imgSrc={item.img} dismissClick={this.handleDismissClick}/>
                <Grid item
                      className="spacer"
                      xs={false}
                      sm={3}
                >
                </Grid>
            </React.Fragment>
        );
        if(!this.state.success) {
            return(
                <Typography variant="h6" gutterBottom align="center">
                    Couldn't connect to the server
                </Typography>
            )

        }
        return (
            <React.Fragment>
                <AutoUpdateMenu clickHandler={this.update} updateHandler={this.handleUpdateChange} updateMessage = {this.state.updateMessage}/>
                <Grid container className="container"
                      direction="row"
                      alignItems="center"
                >
                    {rows}
                </Grid>
            </React.Fragment>
        );
    }
}

