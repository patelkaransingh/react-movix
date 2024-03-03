import React from "react";
import ReactPlayer from "react-player/youtube";

import "./videoPopup.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const urlPrefix = "https://www.youtube.com/watch?v=";

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`${urlPrefix}${videoId}`}
          controls
          width="100%"
          height="100%"
          playing={true}
        />
        <span className="msg">
          Click outside video to close or use close button.
        </span>
      </div>
    </div>
  );
};

export default VideoPopup;
