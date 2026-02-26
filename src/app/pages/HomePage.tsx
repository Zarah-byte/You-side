import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { VinylWithCover } from '../components/VinylWithCover';
import { SubmissionModal } from '../components/SubmissionModal';
import { mockAlbums } from '../data/albums';

export function HomePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate random positions for vinyls across a large canvas
  const vinylPositions = useMemo(() => {
    const canvasWidth = 3000;
    const canvasHeight = 2500;
    const cols = 5;
    const rows = Math.ceil(mockAlbums.length / cols);
    const cellWidth = canvasWidth / cols;
    const cellHeight = canvasHeight / rows;

    return mockAlbums.map((album, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      // Base position in grid
      const baseX = col * cellWidth;
      const baseY = row * cellHeight;
      
      // Add random offset within cell
      const randomX = baseX + Math.random() * (cellWidth - 500) + 50;
      const randomY = baseY + Math.random() * (cellHeight - 350) + 50;
      
      return {
        x: randomX,
        y: randomY,
        rotation: Math.random() * 20 - 10, // Random rotation between -10 and 10 degrees
      };
    });
  }, []);

  return (
    <div className="h-screen w-screen overflow-auto bg-[#0a0a0a]">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-sm z-50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-4xl font-bold mb-1"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#f5f1e8',
                  fontWeight: 700,
                }}
              >
                The Archive
              </h1>
              <p
                className="text-sm opacity-60"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#f5f1e8',
                  fontWeight: 400,
                }}
              >
                A community listening library
              </p>
            </div>
            <div
              className="text-xs font-mono uppercase tracking-wider opacity-40"
              style={{ color: '#f5f1e8' }}
            >
              {mockAlbums.length} Albums
            </div>
          </div>
        </div>
      </header>

      {/* Large scrollable canvas */}
      <main
        className="relative"
        style={{
          width: '3000px',
          height: '2500px',
          marginTop: '100px',
        }}
      >
        {/* Vinyl records scattered across canvas */}
        {mockAlbums.map((album, index) => (
          <VinylWithCover
            key={album.id}
            album={album}
            onClick={() => navigate(`/album/${album.id}`)}
            rotation={vinylPositions[index].rotation}
            position={{
              x: vinylPositions[index].x,
              y: vinylPositions[index].y,
            }}
          />
        ))}
      </main>

      {/* Floating add button - fixed position */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-8 bottom-8 px-6 py-4 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl z-50 flex items-center gap-3"
        style={{
          backgroundColor: '#FF006E',
          color: '#000000',
        }}
      >
        <Plus size={20} />
        <span
          className="font-bold uppercase tracking-wide text-sm"
          style={{
            fontFamily: 'Cakra, sans-serif',
          }}
        >
          Add Your Album
        </span>
      </button>

      {/* Submission modal */}
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
