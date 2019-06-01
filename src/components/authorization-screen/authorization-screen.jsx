import * as React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {Operation} from "../../reducer/user/user";

export class AuthorizationScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: ``,
      password: ``,
    };

    this._inputChangeHandle = this._inputChangeHandle.bind(this);
    this._submitHandle = this._submitHandle.bind(this);
  }

  render() {
    const {name, password} = this.state;

    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Необходима авторизация</h2>
        <p className="login__text">Представтесь!</p>
        <form
          className="login__form"
          onSubmit={this._submitHandle}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              className="login__input"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={this._inputChangeHandle}
            />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              className="login__input"
              type="text"
              name="password"
              id="password"
              required
              value={password}
              onChange={this._inputChangeHandle}
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
      </section>
    );
  }

  _inputChangeHandle(evt) {
    const {value, name} = evt.target;

    this.setState({
      [name]: value,
    });
  }

  _submitHandle(evt) {
    evt.preventDefault();

    const {name, password} = this.state;
    const {login} = this.props;

    login(name, password);
  }
}

AuthorizationScreen.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  login: Operation.login,
};

export default connect(null, mapDispatchToProps)(AuthorizationScreen);
