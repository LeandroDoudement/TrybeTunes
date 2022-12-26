import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongsRequest = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favoriteSongsRequest,
    });
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="favorites-page">
        <Header />
        <div data-testid="page-favorites" className="second-box">
          <div className="page-title-box">
            <span className="page-title">Musicas Favoritas</span>
          </div>
          <div className="favorite-songs-box">
            {favoriteSongs.map((music, index) => (
              <MusicCard
                key={ index }
                musics={ favoriteSongs }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
