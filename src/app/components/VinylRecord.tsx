import { motion } from 'motion/react';
import { Album } from '../data/albums';

interface VinylRecordProps {
  album: Album;
  onClick: () => void;
}

export function VinylRecord({ album, onClick }: VinylRecordProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <div className="relative w-full aspect-square">
        {/* Vinyl record */}
        <div
          className="absolute inset-0 rounded-full shadow-2xl"
          style={{
            backgroundColor: album.vinylColor,
            background: `radial-gradient(circle at center, ${album.vinylColor} 0%, #000000 100%)`,
          }}
        >
          {/* Grooves effect */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-black/20"
              style={{
                top: `${5 + i * 2.5}%`,
                left: `${5 + i * 2.5}%`,
                right: `${5 + i * 2.5}%`,
                bottom: `${5 + i * 2.5}%`,
                borderWidth: '1px',
              }}
            />
          ))}

          {/* Center label */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center p-6 text-center"
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
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8)',
              }}
            />

            {/* Label text */}
            <div className="relative z-10">
              <h3
                className="text-xs font-bold mb-1 leading-tight"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#000000',
                  fontSize: 'clamp(8px, 1.5vw, 14px)',
                  fontWeight: 700,
                }}
              >
                {album.title}
              </h3>
              <p
                className="text-[8px] opacity-80 uppercase tracking-wider"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#000000',
                  fontSize: 'clamp(6px, 1vw, 10px)',
                  fontWeight: 600,
                }}
              >
                {album.creator}
              </p>
            </div>
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

        {/* Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-full blur-xl opacity-50"
          style={{
            backgroundColor: '#000000',
          }}
        />
      </div>

      {/* Info below vinyl */}
      <div className="mt-4 text-center">
        <h3
          className="text-sm font-bold mb-1"
          style={{
            fontFamily: 'Cakra, sans-serif',
            color: '#f5f1e8',
          }}
        >
          {album.title}
        </h3>
        <p
          className="text-xs opacity-60"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#f5f1e8',
          }}
        >
          {album.creator}
        </p>
      </div>
    </motion.div>
  );
}