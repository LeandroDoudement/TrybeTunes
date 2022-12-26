/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import PortraitPlaceholder from '../images/Portrait_Placeholder.png';
import '../styles/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
      newImage: '',
      newUsername: '',
      newEmail: '',
      newDescription: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  fetchUser = async () => {
    const username = await getUser();
    this.setState({
      loading: false,
      user: username,
    });
  };

  saveProfileChange = async () => {
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    const { newImage,
      newUsername,
      newEmail,
      newDescription } = this.state;

    const newProfileInformations = {
      name: newUsername,
      email: newEmail,
      image: newImage,
      description: newDescription,
    };
    updateUser(newProfileInformations);
    this.setState({
      loading: false,
    });
    history.push('/profile');
  };

  render() {
    const { loading, user, newImage, newEmail } = this.state;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile-edit" className="profile-edit-page">
        <Header />
        <div className="second-box">
          <div className="profile-img-box">
            <img
              src={ newImage || PortraitPlaceholder || user.image }
              alt="Imagem não encontrada"
              className="profile-img"
            />
          </div>
          <div className="edit-form-box">
            <form action="" className="edit-form">
              <label htmlFor="profile-picture" className="edit-title">
                Imagem de perfil:
                <input
                  type="text"
                  name="newImage"
                  onChange={ (event) => this.handleChange(event) }
                  placeholder={ user.image || 'URL da imagem' }
                  className="edit-input"
                />
              </label>
              <label htmlFor="username" className="edit-title">
                Username:
                <input
                  type="text"
                  name="newUsername"
                  placeholder={ user.name || 'Seu usuário' }
                  onChange={ (event) => this.handleChange(event) }
                  className="edit-input"
                />
              </label>
              <label htmlFor="email" className="edit-title">
                Email:
                <span
                  className="email-warning"
                >
                  Para conseguir salvar, deve ser um email válido.
                </span>
                <input
                  type="email"
                  name="newEmail"
                  placeholder={ user.email || 'Seu email' }
                  onChange={ (event) => this.handleChange(event) }
                  className="edit-input"
                />
              </label>
              <label htmlFor="description" className="edit-title">
                Descrição:
                <input
                  type="text"
                  name="newDescription"
                  onChange={ (event) => this.handleChange(event) }
                  placeholder={ user.description || 'Sua descrição' }
                  className="edit-input"
                />
              </label>
              <input
                type="submit"
                onClick={ this.saveProfileChange }
                className="save-change-button"
                disabled={ !emailRegex.test(newEmail) }
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileEdit);
