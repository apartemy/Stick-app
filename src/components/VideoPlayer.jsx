import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    playerRef.current = new Plyr(videoRef.current, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'captions',
        'pip',
        'fullscreen'
      ],
      settings: ['quality', 'speed', 'loop'],
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        crossOrigin="anonymous"
        className="w-full h-full"
      >
        <source src={url} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>
    </div>
  )
}
