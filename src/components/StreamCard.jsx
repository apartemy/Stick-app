import VideoPlayer from './VideoPlayer'

export default function StreamCard({ stream, isFullscreen = false }) {
  if (isFullscreen) {
    return (
      <div className="space-y-4">
        <VideoPlayer url={stream.cloudinaryUrl} />
        <div className="space-y-2">
          <h2 className="rnr-text text-4xl font-black text-white">
            Episode {stream.episode}
          </h2>
          <p className="text-xl text-rnr-red font-bold">{stream.artist}</p>
          <p className="text-gray-400">{new Date(stream.date).toLocaleDateString()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-rnr-red relative overflow-hidden group cursor-pointer">
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={stream.thumbnail}
          alt={`Episode ${stream.episode}`}
          className="w-full h-full object-cover halftone group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
      </div>

      <div className="episode-badge">
        Episode {stream.episode}
      </div>

      <div className="p-6 space-y-3">
        <h3 className="rnr-text text-3xl font-black text-white leading-tight">
          {stream.artist.toUpperCase()}
        </h3>
        <p className="text-white/80 text-sm font-medium">
          {new Date(stream.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  )
}
