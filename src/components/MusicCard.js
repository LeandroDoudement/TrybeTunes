import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      saved: false,
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const favoritesList = await getFavoriteSongs();
    if (!favoritesList) {
      this.setState({
        loading: false,
      });
    }
    const saved = favoritesList.find((element) => (
      element.trackId === trackId
    ));
    this.setState({
      saved: saved ? !!saved : false,
      loading: false,
    });
  };

  changeFavorite = async (event) => {
    const { checked } = event.target;
    const { musics, trackId } = this.props;
    const favoriteSong = musics.find((music) => music.trackId === trackId);
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(favoriteSong);
      this.setState({
        loading: false,
        saved: true,
      });
    } else {
      await removeSong(favoriteSong);
      this.setState({
        saved: false,
        loading: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { saved, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <div className="song-box">
          <span className="song-name">{trackName}</span>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
          </audio>
          <label htmlFor="favoriteSong">
            Favoritar
            <input
              type="checkbox"
              name="favoriteSong"
              onChange={ this.changeFavorite }
              checked={ saved }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
        <hr />
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musics: PropTypes.PropTypes.shape().isRequired,
};

export default MusicCard;
