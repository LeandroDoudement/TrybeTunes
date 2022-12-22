import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { username } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: username });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  render() {
    const { username, loading } = this.state;
    const disableLimit = 3;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login" className="login-white-box">
        <form action="">
          <img src={ logo } alt="TrybeTunes logo" width="150px" className="login-logo" />
          <label htmlFor="inputName">
            <input
              type="text"
              data-testid="login-name-input"
              name="username"
              onChange={ this.handleChange }
              placeholder="Usuário"
              className="login-username"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ username.length < disableLimit }
            onClick={ this.handleClick }
            className="login-button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
