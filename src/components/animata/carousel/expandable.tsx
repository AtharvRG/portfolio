import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";

import WaveReveal from "@/components/animata/wave-reveal";
import { cn } from "@/lib/utils";


interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string; description?: string; video?: string };
  index: number;
  activeItem: number;
}


interface ExpandableProps {
  list?: { image: string; title: string; description?: string; video?: string }[];
  autoPlay?: boolean;
  className?: string;
  onSectionHover?: (hoveredIndex: number, currentActive: number) => void;
}

const List = ({ item, className, index, activeItem, ...props }: ImageProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play/pause and transition handling when activeItem changes to avoid multiple videos decoding at once
  useEffect(() => {
    const el = videoRef.current;
    if (!item.video || !el) return;

    // If this card is active, try to play. Otherwise, start fade-out and pause after transition.
    if (index === activeItem) {
      const p = el.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          // ignore play rejection
        });
      }
      // Ensure video is ready to paint (browser will handle buffering)
      el.preload = 'auto';
    } else {
      // Reduce preload on inactive to save resources
      try {
        el.preload = 'metadata';
      } catch {}
      // Don't immediately pause — wait for fade-out to complete. We'll pause on transitionend listener.
    }

    // Pause after fade-out completes
    const onTransitionEnd = (ev: TransitionEvent) => {
      if (ev.propertyName !== 'opacity') return;
      if (index !== activeItem && videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    };

    el.addEventListener('transitionend', onTransitionEnd as any);
    return () => {
      el.removeEventListener('transitionend', onTransitionEnd as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem, index, item.video]);

  return (
    <div
      className={cn(
        "relative flex h-full w-20 min-w-10 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-300 ease-in-out",
        {
          "flex-grow": index === activeItem,
        },
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full bg-black">
        {item.video ? (
          // Render both image and video stacked so we can crossfade via opacity transition
          <>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={cn(
                "object-cover absolute inset-0 transition-opacity duration-500 ease-in-out z-0",
                {
                  'opacity-0': index === activeItem,
                  'opacity-100': index !== activeItem,
                  'blur-[2px]': index !== activeItem,
                },
              )}
              sizes="(max-width: 768px) 100vw, 33vw"
              draggable={false}
              priority={index === 0}
            />

            <video
              ref={(el) => {
                videoRef.current = el;
                return;
              }}
              src={item.video}
              className={cn(
                "object-cover absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out",
                {
                  'opacity-100 z-0': index === activeItem,
                  'opacity-0 z-0': index !== activeItem,
                },
              )}
              preload={index === activeItem ? 'auto' : 'metadata'}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              poster={item.image}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />

            {/* per-video tint removed; centralized tint will render below */}
          </>
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={cn("object-cover", {
              "blur-[2px]": index !== activeItem,
            })}
            sizes="(max-width: 768px) 100vw, 33vw"
            draggable={false}
            priority={index === 0}
          />
        )}

        {/* centralized tint overlay for expanded card (applies to both image & video) */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.35)] mix-blend-normal transition-opacity duration-500 z-10",
            {
              'opacity-100': index === activeItem,
              'opacity-0': index !== activeItem,
            },
          )}
        />

        {/* Bottom-to-top dark gradient so text is readable only on expanded card */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 z-20",
            {
              'opacity-100': index === activeItem,
              'opacity-0': index !== activeItem,
            },
          )}
        />
      </div>
      {index === activeItem && (
        <div className="absolute flex flex-col items-start justify-end left-8 bottom-8 gap-3 max-w-[80%] md:left-16 md:bottom-12 z-30">
          <WaveReveal
            duration="1000ms"
            className="items-start justify-start text-4xl sm:text-5xl md:text-7xl font-wistle italic font-bold drop-shadow-lg"
            text={item.title}
            direction="up"
          />
          {item.description && (
            <div
              className="text-base sm:text-lg md:text-sm font-gotham text-white drop-shadow-md animate-fadein-slideup"
              style={{ textShadow: '0 2px 8px #0008', animationDuration: '5000ms', animationTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            >
              {item.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Mountains",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Great Wall of China",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584968173934-bc0b588eb806?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Texture & Patterns",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];


function Expandable({ list = items, autoPlay = false, className, onSectionHover }: ExpandableProps) {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % list.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, list.length, isHovering]);

  return (
    <div className={cn("flex h-96 w-full gap-1", className)}>
      {list.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
            if (onSectionHover) onSectionHover(index, activeItem);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        />
      ))}
    </div>
  );
}

export default Expandable;
