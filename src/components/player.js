import React from 'react';

const Player = (props) => (
  <div>
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
        <h3>Listening on {playbackData.device.name}</h3>
          <img
            src={item.album.images[0].url}
            alt={item.album.name}
            className="album-art"
          />
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

export default Player
