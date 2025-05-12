import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import Video from "../Asset/videos/video.mkv"
const VideoPlayer = () => {
    const videoRef = useRef();

    useEffect(() => {
        const video = videoRef.current;
        const hls = new Hls();
        hls.loadSource("../Asset/videos/playlist.m3u8");
        hls.attachMedia(video);

        return () => {
            hls.destroy();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: "100%", maxWidth: "600px" }}
        />
    );
};

export default VideoPlayer;
