import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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
    if (loading === true) {
      return <Loading />;
    }
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <label htmlFor="bandName">
              <input
                type="text"
                data-testid="search-artist-input"
                name="bandName"
                onChange={ this.handleChange }
                value={ bandName }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ bandName.length < buttonLimit }
              onClick={ this.fetchArtists }
            >
              Pesquisar

            </button>
            <h2>{`Resultado de álbuns de: ${searchTerm}`}</h2>
            {albums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
              : albums.map((album, index) => (
                <div key={ index }>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <p>{album.collectionName}</p>
                  <p>{album.artistName}</p>
                  <p>{album.collectionPrice}</p>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    Album
                  </Link>
                </div>

              ))}
          </form>
        </div>
      </>
    );
  }
}

export default Search;
