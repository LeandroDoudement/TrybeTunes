import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { bandName } = this.state;
    const buttonLimit = 2;
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
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ bandName.length < buttonLimit }
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
