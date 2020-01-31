import React from 'react';
import TrackProgressIndicator from './progress_bar.js'

import blankAlbumArt from '../assets/spinning-record.gif'
import pauseIcon from '../assets/icons/pause-icon.png'
import playIcon from '../assets/icons/play-icon.png'
import nextIcon from '../assets/icons/next-icon.png'
import previousIcon from '../assets/icons/previous-icon.png'

const PlayingConditional = (props) => {
  if(props.playbackData === '') {
    return (
      <div className="player-wrapper">
        <BlankPlayer/>
      </div>
    )
  }
  return (
    <div className="player-wrapper">
      <Player
        {...props}
      />
      <PlayerFooter
        deviceName={props.playbackData.device.name}
      />
    </div>
  )
}

const BlankPlayer = () => (
  <div className="center-media-wrapper">
    <div className="blank-player center-media">
      <img
        src={blankAlbumArt}
        alt="spinning record illustration- animation"
        className="blank-album-art album-art"
      />
      <h2>Start some music playing with Spotify on another device</h2>
    </div>
  </div>
)

const Player = (props) => (
  <div className="center-media-wrapper">
    <div className="center-media">
      <TrackInfo
        updatePlaybackData={props.updatePlaybackData}
        playbackData={props.playbackData}
      />
      <TrackProgressIndicator
        playbackData={props.playbackData}
      />
      <TrackControls
        isPlaying={props.playbackData.is_playing}
        handlePlayPauseButtonClick={props.handlePlayPauseButtonClick}
        handleNextButtonClick={props.handleNextButtonClick}
        handlePrevButtonClick={props.handlePrevButtonClick}
      />
      <UpdateButton
        handleClick={props.updatePlaybackData}
      />
    </div>
  </div>
)


// Memoize
const TrackInfo = (props) => {
  const item = props.playbackData.item
  return (
    <div className="track-info">
      <h1>{item.artists[0].name}</h1>
      <h2>{item.name}</h2>
      <a  href={item.album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="album-art-a-container">
        <img  src={item.album.images[0].url}
              alt={`${item.album.name}, album art`}
              className="album-art"/>
      </a>
    </div>
  )
}

// Memoize
const TrackControls = (props) => {
  return (
    <div className="track-controls">
      <img
        src={previousIcon}
        alt="previous track button"
        onClick={props.handlePrevButtonClick}
        className="track-controls-button"
        />
      <img
        src={props.isPlaying ? pauseIcon : playIcon}
        alt="play/pause track button"
        onClick={props.handlePlayPauseButtonClick}
        className={`track-controls-button ${props.isPlaying ? "track-controls-button-pause" : "track-controls-button-play"}`}
        />
      <img
        src={nextIcon}
        alt="next track button"
        onClick={props.handleNextButtonClick}
        className="track-controls-button"
        />
    </div>
  )
}

const UpdateButton = (props) => (
  <button
    onClick={props.handleClick}
  >
    Update
  </button>
)

const PlayerFooter = (props) => {
  return (
    <div className="player-footer">
      <p>Listening on {props.deviceName}</p>
    </div>
  )
}

export default PlayingConditional;
