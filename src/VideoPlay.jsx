import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlay = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch(
        `https://www.googleapis.com/youtube/v3/search?path=snippet&key=${process.env.REACT_APP_API_KEY}&type=video&q=nature&maxResults=50`
      );
      const data = await api.json();
      setVideos(data.items);
    };

    fetchData();
  }, []);

  if (!videos.length) return <div>Loading...</div>;
  return (
    <div className="video-player d-flex half">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videos[currentVideo].id.videoId}`}
        width={window.innerWidth < 480 ? "100%" : "56%"}
        height="100%"
        objectFit="fill"
        playing={true}
      />

      <div className="buttons d-flex align-items-center justify-content-center ml-5">
        <button
          className="btn btn-outline-warning btn-lg ml-5 "
          onClick={() => setCurrentVideo(currentVideo - 1)}
          disabled={currentVideo === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-success btn-lg ml-2 "
          onClick={() => setCurrentVideo(currentVideo + 1)}
          disabled={currentVideo === videos.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoPlay;
