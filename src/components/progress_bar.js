import React from 'react';

const TrackProgressIndicator = (props) => {
  const millisToMinutesAndSeconds = (millis)=> {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  const duration = millisToMinutesAndSeconds(props.playbackData.item.duration_ms)
  const progress = millisToMinutesAndSeconds(props.playbackData.progress_ms)

  return (
    <div className="track-progress-indicator">
      <p>{progress}</p>
      <div className="track-progress-indicator-bar">

      </div>
      <p>{duration}</p>
    </div>
  )
}

export default TrackProgressIndicator;
