import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Main extends React.Component {

    constructor(props) {
      super(props);
      this.register = this.register.bind(this);
      this.state = { value : '' };
    }

    register() {
        return (
            <Card>
                <CardTitle title="New User"/>
                <CardText>
                    <TextField hintText="Type your desired username" floatingLabelText="Username" floatingLabelFixed={true}/><br/>
                    <TextField hintText="Type your email" floatingLabelText="Password" type="password" floatingLabelFixed={true}/><br/>
                    <TextField hintText="Type your email" floatingLabelText="Password" type="password" floatingLabelFixed={true}/><br/>
                    <DropDownMenu value={this.state.value} onChange={(evt, date) => { this.setState({value: date}); }}>
                      <MenuItem value={1} primaryText="Never" />
                      <MenuItem value={2} primaryText="Every Night" />
                      <MenuItem value={3} primaryText="Weeknights" />
                      <MenuItem value={4} primaryText="Weekends" />
                      <MenuItem value={5} primaryText="Weekly" />
                    </DropDownMenu>
                </CardText>
                <CardActions>
                    <FlatButton label="Register" secondary={true} />
                    <FlatButton label="Sign in"/>
                </CardActions>
            </Card>
        )
    }

    login() {
      return (
        <Card>
            <CardTitle title="Login"/>
            <CardText>
                <TextField hintText="Type your name" floatingLabelText="Username" floatingLabelFixed={true}/><br/>
                <TextField hintText="Type your email" floatingLabelText="Password" type="password" floatingLabelFixed={true}/><br/>
            </CardText>
            <CardActions>
                <FlatButton label="Register" secondary={true} />
                <FlatButton label="Sign in"/>
            </CardActions>
        </Card>
      )
    }

    loggedContent() {
        return (
            <div>
                <AppBar title="NinjaScript"></AppBar>
                <RaisedButton label="default"/>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.register()}
            </div>
        )
    }
}
