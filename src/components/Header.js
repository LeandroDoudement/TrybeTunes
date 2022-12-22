import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';
import logo from '../images/logo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      username: user.name,
    });
  };

  render() {
    const { loading, username } = this.state;
    if (loading === true) {
      return <Loading />;
    }
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
