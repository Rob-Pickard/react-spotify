import React from 'react';
import blankAlbumArt from '../assets/spinning-record.gif'
import ipodIcon from '../assets/icons/ipod.png'

const PlayingConditional = (props) => {
  if(props.playbackData === '') {
    return (
      <div className="player-wrapper">
        <BlankPlayer
        />
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
      <TrackControls
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

const TrackInfo = (props) => {
  const playbackData = props.playbackData

  if (playbackData === '') {
    return (
      <BlankTrackInfo/>
    )
  } else {
    const item = playbackData.item
    return (
      <div>
        <a
          href={item.album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={item.album.images[0].url}
            alt={`${item.album.name}, album art`}
            className="album-art"
          />
        </a>
        <h3>{item.name}, by {item.artists[0].name}</h3>
      </div>
    )
  }
}

const TrackControls = (props) => (
  <div>
    <button onClick={props.handlePrevButtonClick}>
      Prev
    </button>
    <button onClick={props.handlePlayPauseButtonClick}>
      Play/Pause
    </button>
    <button onClick={props.handleNextButtonClick}>
      Next
    </button>
  </div>
)

const BlankTrackInfo = () => (
  <h3>No track playing</h3>
)

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
      <h3>Listening on {props.deviceName}</h3>
      <img
        src={ipodIcon}
        alt="ipod classic icon"
        id="ipod-icon"
      />
    </div>
  )
}

export default PlayingConditional
