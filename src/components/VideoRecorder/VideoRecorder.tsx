import { useState } from "react";
import { createDownloadButton, onStop, record, stopRecording } from "../utils/recorder";
import { Button } from "../../@shadcn/components/ui/button";

const VideoRecorder = () => {
  const [recorded, setRecorded] = useState(false);
  const [recording, setRecording] = useState(false);
  const startRecording = async () => {
    setRecorded(false);
    setRecording(true);
    const preview = document.getElementById("preview") as HTMLVideoElement;
    await record(preview, (chunks) => {
      const recordingElement = document.getElementById("recording") as HTMLVideoElement;
      const recordingUrl = onStop(recordingElement, chunks);
      const downloadButton = document.getElementById("downloadButton") as HTMLAnchorElement;
      createDownloadButton(downloadButton, recordingUrl, "recording");
      setRecording(false);
      const recording = document.getElementById("recording") as HTMLVideoElement;
      recording.play();
    });
  };

  const handleStop = () => {
    setRecorded(true);
    const preview = document.getElementById("preview") as HTMLVideoElement;
    stopRecording(preview);
  };

  return (
    <div>
      <div className="my-4">
        {recording ? (
          <Button id="stopButton" onClick={handleStop}>
            Parar grabación
          </Button>
        ) : (
          <Button id="startButton" onClick={startRecording}>
            Grabar un nuevo tiro
          </Button>
        )}
      </div>
      
      <div className="mb-4">
        {recorded ? (
          <>
            <video
              id="recording"
              controls
              muted
              className="w-full h-full object-cover rounded-md mb-4"
            />
            <div className="mb-4">
              <Button asChild>
                <a id="downloadButton">
                  Descargar grabación del tiro
                </a>
              </Button>
            </div>
          </>
        ) : (
          <video
            id="preview"
            autoPlay
            muted
            className="w-full h-full object-cover rounded-md mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
