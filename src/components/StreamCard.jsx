import { useState } from 'react'
import VideoPlayer from './VideoPlayer'

export default function StreamCard({ stream, isFullscreen = false, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false)
  const date = new Date(stream.date)

  if (isFullscreen) {
    return (
      <article className="watch-session">
        <div className="watch-player"><VideoPlayer url={stream.cloudinaryUrl} /></div>
        <div className="watch-meta">
          <span>EP.{String(stream.episode).padStart(2, '0')}</span>
          <h1>{stream.artist}</h1>
          <time>{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
        </div>
      </article>
    )
  }

  return (
    <button className="session-card" onClick={() => onSelect?.(stream)} aria-label={'Play episode ' + stream.episode + ', ' + stream.artist}>
      <div className={'session-image ' + (imageFailed ? 'image-fallback' : '')}>
        {!imageFailed && <img src={stream.thumbnail} alt="" loading="lazy" onError={() => setImageFailed(true)} />}
        <div className="fallback-type" aria-hidden="true"><span>RNR</span><span>{String(stream.episode).padStart(2, '0')}</span></div>
        <span className="episode-number">EP.{String(stream.episode).padStart(2, '0')}</span>
        <span className="card-play">↗</span>
      </div>
      <div className="session-info">
        <h3>{stream.artist}</h3>
        <div><time>{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</time><span>Session</span></div>
      </div>
    </button>
  )
}
