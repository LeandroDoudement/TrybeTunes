import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="inputName">
            <input
              type="text"
              data-testid="login-name-input"
              name="username"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ username.length < disableLimit }
            onClick={ this.handleClick }
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
