type Callback = (chunks: Blob[]) => void;

export const record = async (preview: HTMLVideoElement, cb: Callback) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  preview.srcObject = stream;

  await new Promise(resolve => preview.onplaying = resolve);

  const recorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];
  recorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };
  recorder.start();
  recorder.onstop = () => {
    cb(chunks);
  };
};

export const onStop = (recordingElement: HTMLVideoElement, chunks: Blob[]) => {
  const recording = new Blob(chunks, { type: "video/webm" });
  const recordingUrl = URL.createObjectURL(recording);
  recordingElement.src = recordingUrl;
  return recordingUrl;
};

export const createDownloadButton = (downloadButton: HTMLAnchorElement, recordingUrl: string, filename: string) => {
  downloadButton.href = recordingUrl;
  downloadButton.download = `${filename}.webm`;
};

export const stopRecording = (preview: HTMLVideoElement) => {
  const recorder = preview.srcObject as MediaStream;
  recorder.getTracks().forEach(track => track.stop());
  recorder.getTracks().forEach(track => track.stop());
  preview.srcObject = null;
};
