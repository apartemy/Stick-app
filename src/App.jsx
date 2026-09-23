import { useEffect, useMemo, useState } from 'react'
import StreamCard from './components/StreamCard'
import './App.css'

const mockStreams = [
  { id: 1, episode: 11, date: '2024-09-10', artist: "SGT Pepper's Theory", duration: 3600, cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v123/rnr-11.mp4', thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v123/rnr-11.jpg' },
  { id: 2, episode: 12, date: '2024-09-17', artist: 'Alain Kuipers', duration: 3600, cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v124/rnr-12.mp4', thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v124/rnr-12.jpg' },
  { id: 3, episode: 13, date: '2024-09-24', artist: 'A Team', duration: 3600, cloudinaryUrl: 'https://media.cloudinary.com/video/upload/v125/rnr-13.mp4', thumbnail: 'https://media.cloudinary.com/image/upload/c_crop,h_1080,w_1920,q_75/v125/rnr-13.jpg' },
]

function Arrow({ direction = 'right' }) {
  return <span aria-hidden="true">{direction === 'left' ? '←' : '↗'}</span>
}

function App() {
  const [streams] = useState(mockStreams)
  const [selectedStream, setSelectedStream] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const featured = streams[streams.length - 1]
  const archive = useMemo(() => [...streams].reverse(), [streams])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const openStream = (stream) => {
    setSelectedStream(stream)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToArchive = () => {
    setSelectedStream(null)
    setMenuOpen(false)
    requestAnimationFrame(() => document.querySelector('#archive')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => { setSelectedStream(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="RNR home">
          <span className="brand-mark">RNR</span>
          <span className="brand-copy">RADIO ZEEDIJK<br />SESSION ARCHIVE</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={scrollToArchive}>Archive</button>
          <a href="#about">About</a>
          <span className="live-pill"><i /> Amsterdam</span>
        </nav>

        <button className={'menu-button ' + (menuOpen ? 'is-open' : '')} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={'menu-panel ' + (menuOpen ? 'is-open' : '')}>
        <div className="menu-index">RNR / NAV</div>
        <nav>
          <button onClick={() => { setSelectedStream(null); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><span>01</span>Home</button>
          <button onClick={scrollToArchive}><span>02</span>Archive</button>
          <a href="#about" onClick={() => setMenuOpen(false)}><span>03</span>About</a>
        </nav>
        <p>Live sessions recorded in Amsterdam.<br />An archive by Radio Zeedijk.</p>
      </div>

      {selectedStream ? (
        <main className="watch-page">
          <button className="back-button" onClick={() => setSelectedStream(null)}><Arrow direction="left" /> Back to archive</button>
          <StreamCard stream={selectedStream} isFullscreen />
          <section className="watch-more">
            <div className="section-heading"><span>More sessions</span><span>{String(streams.length).padStart(2, '0')}</span></div>
            <div className="archive-grid">
              {archive.filter((s) => s.id !== selectedStream.id).map((stream) => <StreamCard key={stream.id} stream={stream} onSelect={openStream} />)}
            </div>
          </section>
        </main>
      ) : (
        <main>
          <section className="hero-section">
            <div className="hero-kicker"><span>Radio Zeedijk presents</span><span>Amsterdam · NL</span></div>
            <div className="hero-title-wrap">
              <h1>RNR<br /><span>Archive</span></h1>
              <p className="hero-intro">Unfiltered live sessions from Amsterdam. Recorded in the room, kept in the archive.</p>
            </div>

            <button className="featured-session" onClick={() => openStream(featured)}>
              <div className="featured-visual">
                <div className="signal-art" aria-hidden="true">
                  <span>R</span><span>N</span><span>R</span>
                </div>
                <span className="featured-tag">Latest session</span>
                <span className="play-orbit">Play <Arrow /></span>
              </div>
              <div className="featured-meta">
                <span>EP.{String(featured.episode).padStart(2, '0')}</span>
                <strong>{featured.artist}</strong>
                <time>{new Date(featured.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</time>
              </div>
            </button>

            <button className="scroll-cue" onClick={scrollToArchive}>Scroll to archive <span>↓</span></button>
          </section>

          <section className="archive-section" id="archive">
            <div className="section-heading"><span>All sessions</span><span>{String(streams.length).padStart(2, '0')} recordings</span></div>
            <div className="archive-grid">
              {archive.map((stream) => <StreamCard key={stream.id} stream={stream} onSelect={openStream} />)}
            </div>
          </section>

          <section className="about-section" id="about">
            <p className="eyebrow">About the archive</p>
            <div>
              <h2>Music happened.<br />We kept the tape.</h2>
              <p>RNR is a growing archive of live performances recorded at Radio Zeedijk. No algorithm. No endless feed. Just sessions worth returning to.</p>
            </div>
          </section>
        </main>
      )}

      <footer>
        <span>RNR Archive © {new Date().getFullYear()}</span>
        <span>Radio Zeedijk · Amsterdam</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </footer>
    </div>
  )
}

export default App
