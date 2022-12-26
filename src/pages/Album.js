import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      loading: true,
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const albums = await getMusics(id);
    const musics = [...albums];
    musics.shift();
    this.setState({
      loading: false,
      albums,
      musics,
    });
  };

  render() {
    const { loading, albums, musics } = this.state;
    if (loading) {
      return <Loading />;
    }
    const { collectionName, artistName, artworkUrl100 } = albums[0];
    return (
      <div className="album-page">
        <Header />
        <div data-testid="page-album" className="second-box">
          <div className="album-informations">
            <img src={ artworkUrl100 } alt={ collectionName } className="album-img" />
            <div className="album-artist-box">
              <span className="album-name">{collectionName}</span>
              <span data-testid="album-name" className="artist-name">{artistName}</span>
            </div>
          </div>
          <div className="album-songs">
            {musics.map((music, index) => (
              <MusicCard
                key={ index }
                musics={ musics }
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
