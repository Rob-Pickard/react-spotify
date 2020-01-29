import React from 'react';

const Player = (props) => (
  <div>
    <TrackInfo
      updatePlaybackData={props.updatePlaybackData}
      playbackData={props.playbackData}
    />
  </div>
)

const TrackInfo = (props) => {
  const playbackData = props.playbackData

  if (playbackData === '') {
    return (
      <div>
        <h2>No track playing</h2>
        <UpdateButton
          handleClick={props.updatePlaybackData}
        />
      </div>
    )
  } else {
    const item = playbackData.item
    return (
      <div>
        <h3>Listening on {playbackData.device.name}</h3>
          <img src={item.album.images[0].url} alt={item.album.name}/>
        <h3>{item.name}, by {item.artists[0].name}</h3>
        <UpdateButton
          handleClick={props.updatePlaybackData}
        />
      </div>
    )
  }
}

const UpdateButton = (props) => (
  <button
    onClick={props.handleClick}
  >
    Update
  </button>
)

export default Player
