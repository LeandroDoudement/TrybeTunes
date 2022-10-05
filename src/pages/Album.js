import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

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
      <>
        <Header />
        <div data-testid="page-album">
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{`${collectionName} - ${artistName}`}</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
          {musics.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      </>
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
