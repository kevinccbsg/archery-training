import './App.css'
import VideoRecorder from './components/VideoRecorder/VideoRecorder'

function App() {
  return (
    <div className="container">
      <h1>Archery training</h1>
      <h2>Webcam recording</h2>
      <p>Click the start button to start recording. Click the stop button to stop recording. Click the download button to download the recording.</p>
      <VideoRecorder />
    </div>
  )
}

export default App
