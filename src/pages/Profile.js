import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Profile.css';
import PortraitPlaceholder from '../images/Portrait_Placeholder.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const username = await getUser();
    this.setState({
      loading: false,
      user: username,
    });
  };

  render() {
    const { loading, user } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-profile" className="profile-page">
        <Header />
        <div className="second-box">
          <div className="profile-img-box">
            <img
              src={ user.image || PortraitPlaceholder }
              alt="Ocorreu um erro"
              className="profile-img"
            />
          </div>
          <div className="profile-informations">
            <div className="information">
              <span className="information-title">Nome:</span>
              <span>
                {user.name ? user.name : 'Sem usuário registrado'}
              </span>
            </div>
            <div className="information">
              <span className="information-title">Email:</span>
              <span>
                {user.email ? user.email : 'Sem email registrado'}
              </span>
            </div>
            <div className="information">
              <span className="information-title">Descrição:</span>
              <span>
                {user.description ? user.description : 'Sem descrição registrada'}
              </span>
            </div>
            <Link to="/profile/edit" className="edit-profile-button">Editar perfil</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
