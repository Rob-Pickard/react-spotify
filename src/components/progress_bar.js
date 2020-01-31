import React from 'react';

const millisToMinutesAndSeconds = (millis)=> {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const TrackProgressIndicator = (props) => {
  const progressPercent = (props.playbackData.progress_ms/ props.playbackData.item.duration_ms) * 100

  const durationHumanized = millisToMinutesAndSeconds(props.playbackData.item.duration_ms)
  const progressHumanized = millisToMinutesAndSeconds(props.playbackData.progress_ms)

  return (
    <div className="track-progress-holder">
      <p>{progressHumanized}</p>
      <div className="track-duration-indicator">
        <TrackProgressBar
          progressPercent={progressPercent}
        />
      </div>
      <p>{durationHumanized}</p>
    </div>
  )
}

const TrackProgressBar = (props) => {
  return (
    <div
      className="track-progress-indicator-bar"
      style={{width: `${props.progressPercent}%`}}>
    </div>
  )
}

export default TrackProgressIndicator;
