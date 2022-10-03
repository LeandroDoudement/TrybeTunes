import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
        <h1 data-testid="header-user-name">{username}</h1>

      </header>
    );
  }
}

export default Header;
