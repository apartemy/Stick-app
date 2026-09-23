import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    playerRef.current = new Plyr(videoRef.current, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'pip', 'fullscreen'],
      settings: ['speed', 'loop'],
      ratio: '16:9',
    })
    return () => playerRef.current?.destroy()
  }, [url])

  return (
    <div className="video-shell">
      <video ref={videoRef} controls playsInline crossOrigin="anonymous">
        <source src={url} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  )
}
