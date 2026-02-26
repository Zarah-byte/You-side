import { motion } from 'motion/react';
import { Album } from '../data/albums';

interface VinylWithCoverProps {
  album: Album;
  onClick: () => void;
  rotation: number;
  position: { x: number; y: number };
}

export function VinylWithCover({ album, onClick, rotation, position }: VinylWithCoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.3 }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        width: '280px',
        height: '280px',
      }}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Album cover/sleeve */}
        <div
          className="absolute left-0 top-0 w-[280px] h-[280px] shadow-2xl z-10"
          style={{
            backgroundColor: album.labelColor,
            backgroundImage: `linear-gradient(135deg, ${album.labelColor} 0%, ${album.labelColor}dd 100%)`,
          }}
        >
          {/* Cover content */}
          <div className="w-full h-full p-8 flex flex-col justify-between">
            <div>
              <h3
                className="text-2xl font-bold leading-tight mb-2"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#000000',
                  fontWeight: 700,
                }}
              >
                {album.title}
              </h3>
              <p
                className="text-sm uppercase tracking-wider opacity-80"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#000000',
                  fontWeight: 600,
                }}
              >
                {album.creator}
              </p>
            </div>
            <div
              className="text-xs opacity-60"
              style={{
                fontFamily: 'Cakra, sans-serif',
                color: '#000000',
                fontWeight: 400,
              }}
            >
              {album.genre}
            </div>
          </div>
        </div>

        {/* Vinyl record - partially visible */}
        <div
          className="absolute left-[200px] top-0 w-[280px] h-[280px] z-20"
          style={{
            transform: 'translateX(0)',
          }}
        >
          <div
            className="w-full h-full rounded-full shadow-2xl relative"
            style={{
              backgroundColor: album.vinylColor,
              background: `radial-gradient(circle at center, ${album.vinylColor} 0%, #000000 100%)`,
            }}
          >
            {/* Grooves */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-black/20"
                style={{
                  top: `${3 + i * 1.8}%`,
                  left: `${3 + i * 1.8}%`,
                  right: `${3 + i * 1.8}%`,
                  bottom: `${3 + i * 1.8}%`,
                  borderWidth: '0.5px',
                }}
              />
            ))}

            {/* Center label */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center p-6"
              style={{
                width: '35%',
                height: '35%',
                backgroundColor: album.labelColor,
              }}
            >
              {/* Center hole */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '20%',
                  height: '20%',
                  backgroundColor: '#000000',
                  boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8)',
                }}
              />
            </div>

            {/* Shine effect */}
            <div
              className="absolute inset-0 rounded-full opacity-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, transparent 0%, white 45%, white 55%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
