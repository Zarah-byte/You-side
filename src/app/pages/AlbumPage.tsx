import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { mockAlbums } from '../data/albums';
import { AudioPlayer } from '../components/AudioPlayer';

export function AlbumPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const album = mockAlbums.find((a) => a.id === albumId);

  if (!album) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-2xl mb-4"
            style={{
              fontFamily: 'Cakra, sans-serif',
              color: '#f5f1e8',
            }}
          >
            Album not found
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm underline opacity-60 hover:opacity-100"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              color: '#f5f1e8',
            }}
          >
            Back to archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header with back button */}
      <header className="border-b border-[#222] sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
            style={{
              fontFamily: 'Cakra, sans-serif',
              color: '#f5f1e8',
              fontWeight: 400,
            }}
          >
            <ArrowLeft size={16} />
            Back to archive
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-[400px,1fr] gap-12">
          {/* Left: Vinyl visual */}
          <div>
            <div className="sticky top-32">
              {/* Large vinyl */}
              <div className="relative w-full aspect-square mb-8">
                <div
                  className="absolute inset-0 rounded-full shadow-2xl"
                  style={{
                    backgroundColor: album.vinylColor,
                    background: `radial-gradient(circle at center, ${album.vinylColor} 0%, #000000 100%)`,
                  }}
                >
                  {/* Grooves */}
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border-black/20"
                      style={{
                        top: `${4 + i * 2}%`,
                        left: `${4 + i * 2}%`,
                        right: `${4 + i * 2}%`,
                        bottom: `${4 + i * 2}%`,
                        borderWidth: '1px',
                      }}
                    />
                  ))}

                  {/* Label */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      width: '45%',
                      height: '45%',
                      backgroundColor: album.labelColor,
                    }}
                  >
                    {/* Center hole */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: '15%',
                        height: '15%',
                        backgroundColor: '#000000',
                        boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8)',
                      }}
                    />

                    {/* Label info */}
                    <div className="relative z-10 space-y-2">
                      <div
                        className="text-xs font-mono uppercase tracking-widest opacity-70"
                        style={{ color: '#000000' }}
                      >
                        Side A
                      </div>
                      <h2
                        className="text-xl font-bold leading-tight"
                        style={{
                          fontFamily: 'Cakra, sans-serif',
                          color: '#000000',
                        }}
                      >
                        {album.title}
                      </h2>
                      <p
                        className="text-xs opacity-80 uppercase tracking-wider"
                        style={{
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          color: '#000000',
                        }}
                      >
                        {album.creator}
                      </p>
                    </div>
                  </div>

                  {/* Shine */}
                  <div
                    className="absolute inset-0 rounded-full opacity-10 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, transparent 0%, white 45%, white 55%, transparent 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-2 text-sm">
                {album.genre && (
                  <div
                    className="flex justify-between"
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      color: '#f5f1e8',
                    }}
                  >
                    <span className="opacity-50">Genre</span>
                    <span>{album.genre}</span>
                  </div>
                )}
                {album.date && (
                  <div
                    className="flex justify-between"
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      color: '#f5f1e8',
                    }}
                  >
                    <span className="opacity-50">Date</span>
                    <span>{album.date}</span>
                  </div>
                )}
                <div
                  className="flex justify-between"
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#f5f1e8',
                  }}
                >
                  <span className="opacity-50">Tracks</span>
                  <span>{album.tracks.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Album info and player */}
          <div className="space-y-8">
            {/* Album note */}
            <div>
              <h3
                className="text-xs uppercase tracking-wider mb-4 font-mono opacity-50"
                style={{ color: album.labelColor }}
              >
                Album Note
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: '#f5f1e8',
                }}
              >
                {album.albumNote}
              </p>
            </div>

            {/* Divider */}
            <div
              className="h-px opacity-20"
              style={{ backgroundColor: album.labelColor }}
            />

            {/* Tracklist */}
            <div>
              <h3
                className="text-xs uppercase tracking-wider mb-4 font-mono opacity-50"
                style={{ color: album.labelColor }}
              >
                Tracklist
              </h3>
              <div className="space-y-3">
                {album.tracks.map((track, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start py-2 border-b border-[#222] hover:border-[#333] transition-colors"
                  >
                    <span
                      className="text-sm font-mono w-8 pt-1"
                      style={{ color: album.labelColor }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div
                        className="font-medium mb-1"
                        style={{
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          color: '#f5f1e8',
                        }}
                      >
                        {track.title}
                      </div>
                      <div
                        className="text-sm opacity-60"
                        style={{
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          color: '#f5f1e8',
                        }}
                      >
                        {track.artist}
                      </div>
                    </div>
                    <div
                      className="text-sm font-mono pt-1 opacity-50"
                      style={{ color: '#f5f1e8' }}
                    >
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px opacity-20"
              style={{ backgroundColor: album.labelColor }}
            />

            {/* Audio player */}
            <div>
              <h3
                className="text-xs uppercase tracking-wider mb-4 font-mono opacity-50"
                style={{ color: album.labelColor }}
              >
                Now Playing
              </h3>
              <AudioPlayer tracks={album.tracks} accentColor={album.labelColor} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}