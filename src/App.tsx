import VideoRecorder from './components/VideoRecorder/VideoRecorder';
import logo from './assets/bullseye.png';

function App() {
  return (
    <div>
      <header className="bg-primary text-white p-4 flex items-center justify-between">
        <img src={logo} alt="Archery target" className="w-16 h-16" />
        <h1 className="text-3xl font-bold">Tiro con arco</h1>
      </header>
      <main className="w-11/12 max-w-2xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Grabando tu tiro</h2>
        <p className="mb-4 primary">Haz click en "Grabar un nuevo tiro" para empezar una nueva grabación. Cuanto termines le puedes dar a parar y revisar tu tiro directamente o puedes descargar tu tiro más abajo.</p>
        <VideoRecorder />
      </main>
    </div>
  )
}

export default App
