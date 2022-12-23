import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      username: user.name,
    });
  };

  render() {
    const { username } = this.state;
    return (
      <header data-testid="header-component">
        <img src={ logo } alt="TrybeTunes logo" width="100px" />
        <div className="header-links">
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
        <span data-testid="header-user-name">{username}</span>
      </header>
    );
  }
}

export default Header;
