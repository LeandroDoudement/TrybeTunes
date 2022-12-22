import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner" />
      </div>

    );
  }
}

export default Loading;
