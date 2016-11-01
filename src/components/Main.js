import React from 'react';

import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import DateTime from 'grommet/components/DateTime';
import RadioButton from 'grommet/components/RadioButton';
import { headers, buildQuery, processStatus } from 'grommet/utils/Rest';


export default class Main extends React.Component {

    constructor(props) {
      super(props);
      this.register = this.register.bind(this);
      this.state = { user : {name: '', email: '', birthdate: '', gender: '', username: '', password: ''} };
      this.onChangeInput = this.onChangeInput.bind(this);
      this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
      this.onChangeGender = this.onChangeGender.bind(this);
      this.changeUser = this.changeUser.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    changeUser(changedValue) {
      let newUser = Object.assign({}, this.state.user, changedValue);
      let newState = Object.assign({}, this.state, { user: newUser });
      this.setState(newState);
    }

    onChangeInput(evt) {
      let changedValue = {};
      changedValue[evt.target.name] = evt.target.value;
      this.changeUser(changedValue);
    }

    onChangeBirthdate(date) {
      this.changeUser({birthdate: date});
    }

    onChangeGender(evt) {
      this.changeUser({gender: evt.target.name === 'notinformed' ? "" : evt.target.name});
    }

    onSubmit(evt) {
      let config =
        { headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        , method: 'POST'
        , body: JSON.stringify(this.state.user)
      }
      fetch("/api/users/add", config)
        .then(processStatus)
        .then(response => window.alert('SUCESSO!'))
        .then(error => window.alert('ERRO!'))
    }

    login() {
        return (
          <div></div>
        )
    }

    register() {
      return (
        <Form onSubmit={this.submitForm} style={{padding: "50px"}}>
          <Header>
            <h1>NinjaScript</h1>
          </Header>
          <FormFields>
            <fieldset>
              <FormField label="Name" htmlFor="aufname">
                <input id="aufname" name="name" value={this.state.user.name} type="text" onChange={this.onChangeInput}/>
              </FormField>
              <FormField label="Email" htmlFor="email">
                <input id="email" name="email" value={this.state.user.email} type="text" onChange={this.onChangeInput}/>
              </FormField>
              <FormField label="Birthdate" htmlFor="birthdate">
                <DateTime id="birthdate" name="birthdate" format="DD/MM/YYYY" value={this.state.user.birthdate} onChange={this.onChangeBirthdate} />
              </FormField>
              <FormField label="Gender" htmlFor="gender">
                <div id="gender" style={{padding: "10px", paddingLeft: "20px"}}>
                  <RadioButton id="male" name='male' label="Male" checked={this.state.user.gender === 'male'} onChange={this.onChangeGender} />
                  <RadioButton id="female" name="female" label="Female" checked={this.state.user.gender === 'female'} onChange={this.onChangeGender} />
                  <RadioButton id="na" name="notinformed" label="Not informed" checked={this.state.user.gender === ''} onChange={this.onChangeGender} />
                </div>
              </FormField>
              <FormField label="Username" htmlFor="username">
                <input id="username" name="username" value={this.state.user.username} type="text" onChange={this.onChangeInput}/>
              </FormField>
              <FormField label="Password" htmlFor="password">
                <input id="password" name="password" value={this.state.user.password} type="password" onChange={this.onChangeInput}/>
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad={{vertical: 'medium'}}>
            <Button label="Register" primary onClick={this.onSubmit} />
          </Footer>
        </Form>
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
