import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrackInput {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const [albumTitle, setAlbumTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [albumNote, setAlbumNote] = useState('');
  const [genre, setGenre] = useState('');
  const [tracks, setTracks] = useState<TrackInput[]>([
    { id: '1', title: '', artist: '', duration: '' },
  ]);
  const [selectedColor, setSelectedColor] = useState('#FF006E');

  const colors = ['#FF006E', '#00D9FF', '#7209B7', '#FFBE0B', '#00F5D4', '#F72585'];

  const addTrack = () => {
    setTracks([
      ...tracks,
      { id: Date.now().toString(), title: '', artist: '', duration: '' },
    ]);
  };

  const removeTrack = (id: string) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter((t) => t.id !== id));
    }
  };

  const updateTrack = (id: string, field: keyof TrackInput, value: string) => {
    setTracks(tracks.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to database
    console.log('Submitting album:', {
      albumTitle,
      creatorName,
      albumNote,
      genre,
      tracks,
      selectedColor,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-2 z-50 p-8"
            style={{
              borderColor: selectedColor,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity"
              style={{ color: '#f5f1e8' }}
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2
                className="text-3xl font-bold mb-2"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: selectedColor,
                  fontWeight: 700,
                }}
              >
                Add Your Album
              </h2>
              <p
                className="text-sm opacity-60"
                style={{
                  fontFamily: 'Cakra, sans-serif',
                  color: '#f5f1e8',
                  fontWeight: 400,
                }}
              >
                Share your sonic identity with the community
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Album info */}
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2 font-mono"
                    style={{ color: '#f5f1e8', opacity: 0.7 }}
                  >
                    Album Title *
                  </label>
                  <input
                    type="text"
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] text-[#f5f1e8] border-2 border-[#333] focus:border-[#666] outline-none transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    placeholder="e.g., Midnight Radio"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2 font-mono"
                    style={{ color: '#f5f1e8', opacity: 0.7 }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] text-[#f5f1e8] border-2 border-[#333] focus:border-[#666] outline-none transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    placeholder="e.g., Alex Chen"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2 font-mono"
                    style={{ color: '#f5f1e8', opacity: 0.7 }}
                  >
                    Album Note *
                  </label>
                  <textarea
                    value={albumNote}
                    onChange={(e) => setAlbumNote(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[#1a1a1a] text-[#f5f1e8] border-2 border-[#333] focus:border-[#666] outline-none transition-colors resize-none"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    placeholder="What does this collection say about you? What feeling or moment does it capture?"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2 font-mono"
                    style={{ color: '#f5f1e8', opacity: 0.7 }}
                  >
                    Genre (optional)
                  </label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1a1a] text-[#f5f1e8] border-2 border-[#333] focus:border-[#666] outline-none transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    placeholder="e.g., Electronic / Ambient"
                  />
                </div>
              </div>

              {/* Vinyl color selection */}
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-3 font-mono"
                  style={{ color: '#f5f1e8', opacity: 0.7 }}
                >
                  Label Color
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className="w-12 h-12 rounded-full transition-transform hover:scale-110"
                      style={{
                        backgroundColor: color,
                        border: selectedColor === color ? '3px solid #f5f1e8' : '2px solid #333',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tracks */}
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-3 font-mono"
                  style={{ color: '#f5f1e8', opacity: 0.7 }}
                >
                  Tracklist *
                </label>
                <div className="space-y-3">
                  {tracks.map((track, index) => (
                    <div key={track.id} className="flex gap-2 items-start">
                      <span
                        className="text-xs font-mono pt-3 w-8"
                        style={{ color: selectedColor }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={track.title}
                          onChange={(e) => updateTrack(track.id, 'title', e.target.value)}
                          required
                          className="col-span-2 px-3 py-2 bg-[#1a1a1a] text-[#f5f1e8] border border-[#333] focus:border-[#666] outline-none text-sm"
                          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                          placeholder="Track title"
                        />
                        <input
                          type="text"
                          value={track.duration}
                          onChange={(e) => updateTrack(track.id, 'duration', e.target.value)}
                          required
                          className="px-3 py-2 bg-[#1a1a1a] text-[#f5f1e8] border border-[#333] focus:border-[#666] outline-none text-sm font-mono"
                          placeholder="4:23"
                        />
                      </div>
                      <input
                        type="text"
                        value={track.artist}
                        onChange={(e) => updateTrack(track.id, 'artist', e.target.value)}
                        required
                        className="flex-1 px-3 py-2 bg-[#1a1a1a] text-[#f5f1e8] border border-[#333] focus:border-[#666] outline-none text-sm"
                        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                        placeholder="Artist"
                      />
                      {tracks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTrack(track.id)}
                          className="p-2 hover:opacity-70 transition-opacity"
                          style={{ color: '#f5f1e8' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addTrack}
                  className="mt-3 flex items-center gap-2 px-4 py-2 text-sm hover:opacity-70 transition-opacity"
                  style={{
                    color: selectedColor,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                  }}
                >
                  <Plus size={16} />
                  Add Track
                </button>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: selectedColor,
                    color: '#000000',
                    fontFamily: 'Cakra, sans-serif',
                  }}
                >
                  Submit Album
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 transition-opacity hover:opacity-70"
                  style={{
                    borderColor: '#333',
                    color: '#f5f1e8',
                    fontFamily: 'Cakra, sans-serif',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}