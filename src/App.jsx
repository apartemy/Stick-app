import { useState, useEffect } from 'react'
import StreamCard from './components/StreamCard'
import './App.css'

function App() {
  const [streams, setStreams] = useState([])
  const [selectedStream, setSelectedStream] = useState(null)

  useEffect(() => {
    const mockStreams = [
      {
        id: 1,
        episode: 11,
        date: '2024-09-10',
        artist: 'SGT Pepper\'s Theory',
        duration: 3600,
        cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v123/rnr-11.mp4',
        thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v123/rnr-11.jpg',
      },
      {
        id: 2,
        episode: 12,
        date: '2024-09-17',
        artist: 'Alain Kuipers',
        duration: 3600,
        cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v124/rnr-12.mp4',
        thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v124/rnr-12.jpg',
      },
      {
        id: 3,
        episode: 13,
        date: '2024-09-24',
        artist: 'A Team',
        duration: 3600,
        cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v125/rnr-13.mp4',
        thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v125/rnr-13.jpg',
      },
    ]
    setStreams(mockStreams)
  }, [])

  return (
    <div className="min-h-screen bg-rnr-dark">
      <header className="bg-rnr-red py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="rnr-text text-5xl md:text-6xl font-black text-white">RNR Archive</h1>
          <p className="text-white mt-2 opacity-90">Radio Zeedijk</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {selectedStream ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedStream(null)}
              className="text-rnr-red hover:text-white transition-colors font-semibold"
            >
              ← Back to Gallery
            </button>
            <StreamCard stream={selectedStream} isFullscreen={true} />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {streams.map((stream) => (
                <div
                  key={stream.id}
                  onClick={() => setSelectedStream(stream)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <StreamCard stream={stream} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
