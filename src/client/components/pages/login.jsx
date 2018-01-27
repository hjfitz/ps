import React, { Component } from 'react';
import { Button } from '../helper';

const Input = ({
  type, text, inputRef, className, inputType,
}) => (
  <div className={`input-field col s12 ${className}`}>
    <input ref={inputRef} id={type} type={inputType} className="validate" />
    <label htmlFor={type}>{text}</label>
  </div>
);

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { pageType: 'login' };
    this.toggleForm = this.toggleForm.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  toggleForm() {
    console.log('clicku');
    if (this.state.pageType === 'login') {
      this.setState({ pageType: 'register' });
    } else {
      this.setState({ pageType: 'login' });
    }
  }

  login() {
    const username = this.user.value;
    const password = this.pass.value;
    console.log(username);
    console.log(password);
  }

  register() {
    const username = this.user.value;
    const password = this.pass.value;
    const confPass = this.newPassConf.value;
    console.log(username, password, confPass);
  }

  render() {
    let confirmPassClass = 'collapsed';
    let title = 'Login';
    let optionButtonText = 'Need to register?';
    if (this.state.pageType === 'register') {
      confirmPassClass = '';
      title = 'Register';
      optionButtonText = 'Need to login?';
    }
    const formInner = (
      <form className="col s12">
        <div className="login-items">
          <div className="row">
            <Input inputRef={user => this.user = user} type="username" text="Username" inputType="text" />
          </div>
          <div className="row">
            <Input inputRef={pass => this.pass = pass} type="password" text="Password" inputType="password" />
          </div>
          <div className={`row optional ${confirmPassClass}`}>
            <Input
              inputRef={newPassConf => this.newPassConf = newPassConf}
              type="confirm_password"
              text="Confirm Password"
              inputType="password"
            />
          </div>
        </div>
        <div className="row">
          <Button text={title} link="#!" onClick={this.login} classes="light-blue darken-2" />
          <Button
            text={optionButtonText}
            link="#!"
            onClick={this.toggleForm}
            classes="light-blue darken-2"
          />
        </div>
      </form>
    );
    return (
      <div className="row login">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <span className="light-blue darken-2 white-text card-title big-title">{title}</span>
            <div className="card-content">
              <div className="row">
                {formInner}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
