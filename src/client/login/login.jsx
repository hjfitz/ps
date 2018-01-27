import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

import 'materialize-css/dist/css/materialize.css';

import '../styles/login.css';


const hash = word => SHA256(word).toString(CryptoJS.enc.Base64);

const Button = ({
  text, classes, link, onClick,
}) => (
  <a href={link} className={`waves-effect waves-light btn ${classes}`} onClick={onClick}>
    {text}
  </a>
);

const Input = ({
  type, text, inputRef, className, inputType,
}) => (
  <div className={`input-field col s12 ${className}`}>
    <input ref={inputRef} id={type} type={inputType} className="validate" />
    <label htmlFor={type}>{text}</label>
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { pageType: 'login' };
    this.toggleForm = this.toggleForm.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.hitEndpoint = this.hitEndpoint.bind(this);
  }

  toggleForm() {
    console.log('clicku');
    if (this.state.pageType === 'login') {
      this.setState({ pageType: 'register' });
    } else {
      this.setState({ pageType: 'login' });
    }
  }

  async hitEndpoint() {
    if (this.state.pageType === 'login') {
      await this.login();
    } else {
      await this.register();
    }
  }

  // TODO: Error handling with modals
  async login() {
    const user = this.user.value;
    const pass = hash(this.pass.value);
    const { data } = await axios.post('/api/login/info', { user, pass });
    const { loggedin, reason } = data;
    if (loggedin) {
      window.location.href = `${window.location.origin}/`;
    }
  }

  // TODO: Error handling with modals
  async register() {
    const user = this.user.value;
    const pass = hash(this.pass.value);
    const passConf = hash(this.newPassConf.value);
    const resp = await axios.post('/api/login/create', { user, pass, passConf });
    console.log(resp);
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
          <Button text={title} link="#!" onClick={this.hitEndpoint} classes="light-blue darken-2" />
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


ReactDOM.render(<Login />, document.getElementById('react'));
