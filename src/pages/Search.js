/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      loading: false,
      albums: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.fetchArtists();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  fetchArtists = async () => {
    // e.preventDefault();
    const { bandName } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(bandName);
    this.setState({
      loading: false,
      albums,
      searchTerm: bandName,
      bandName: '',
    });
  };

  render() {
    const { bandName, loading, albums, searchTerm } = this.state;
    const buttonLimit = 2;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search" className="search-page">
        <Header />
        <div className="second-box">
          <div className="search-artist-box">
            <form action="">
              <label htmlFor="bandName">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="bandName"
                  onChange={ this.handleChange }
                  value={ bandName }
                  className="artist-name-input"
                  placeholder="Digite o nome do artista"
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ bandName.length < buttonLimit }
                onClick={ this.fetchArtists }
                className="search-button"
              >
                Pesquisar

              </button>
            </form>
          </div>
          <h2
            className="result-artist-name"
          >
            {`Resultado de álbuns de: ${searchTerm}`}

          </h2>
          <div className="result-artists-box">
            {albums.length === 0
              ? <p className="no-album-search">
                Nenhum álbum foi pesquisado

              </p>
              : albums.map((album, index) => (
                <div key={ index } className="album">
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                  />
                  <div className="album-information">
                    <p className="album-collection-name">{album.collectionName}</p>
                    <p>{album.artistName}</p>
                    <p>{album.collectionPrice}</p>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      Acessar Album
                    </Link>
                  </div>
                </div>

              ))}
          </div>
        </div>
      </div>

    );
  }
}

export default Search;
