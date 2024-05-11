import { useState } from "react";
import { createDownloadButton, onStop, record, stopRecording } from "../utils/recorder";

const VideoRecorder = () => {
  const [recorded, setRecorded] = useState(false);
  const [recording, setRecording] = useState(false);
  const startRecording = async () => {
    setRecording(true);
    setRecorded(false);
    const preview = document.getElementById("preview") as HTMLVideoElement;
    await record(preview, (chunks) => {
      const recordingElement = document.getElementById("recording") as HTMLVideoElement;
      const recordingUrl = onStop(recordingElement, chunks);
      const downloadButton = document.getElementById("downloadButton") as HTMLAnchorElement;
      createDownloadButton(downloadButton, recordingUrl, "recording");
      setRecording(false);
    });
  };

  const handleStop = () => {
    setRecorded(true);
    const preview = document.getElementById("preview") as HTMLVideoElement;
    stopRecording(preview);
  };

  return (
    <div>
      <div className="preview">
        <h2>Preview</h2>
        {recording ? (
          <button id="stopButton" className="button" onClick={handleStop}>
            Stop
          </button>
        ) : (
          <button id="startButton" className="button" onClick={startRecording}>
            New clip
          </button>
        )}
      </div>
      {recorded ? (
        <div className="recording">
          <video id="recording" width="160" height="120" controls></video>
          <a id="downloadButton" className="button">
            Download
          </a>
        </div>
      ) : (
        <video id="preview" width="160" height="120" autoPlay muted></video>
      )}
    </div>
  );
};

export default VideoRecorder;
