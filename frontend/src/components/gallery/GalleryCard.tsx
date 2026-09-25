import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { StyleBadge } from '@/components/ui/StyleBadge';
import type { GalleryRoom } from '@/types';

interface GalleryCardProps {
  room: GalleryRoom;
  onClick: () => void;
}

export function GalleryCard({ room, onClick }: GalleryCardProps) {
  const latest = room.latestConcept;
  const hasMultiple = room.conceptCount > 1;

  if (!latest) return null;

  const dateStr = new Date(room.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className="group text-left overflow-hidden rounded-2xl bg-surface border border-border-warm hover:shadow-warm-md hover:border-ink-300 transition-all duration-200 active:scale-[0.98]"
    >
      <div className="relative overflow-hidden">
        <img
          src={latest.resultImage}
          alt={room.id}
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <StyleBadge styleId={latest.styleId} className="bg-white/90 backdrop-blur-sm" />
        </div>
        {hasMultiple && (
          <span className="absolute top-2 right-2 rounded-full bg-sage/90 text-white text-xs font-medium px-2.5 py-0.5 backdrop-blur-sm">
            {room.conceptCount} styles
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-ink-500">{dateStr}</p>
      </div>
    </button>
  );
}
