"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface LoaderContextType {
  isLoading: boolean;
  hasLoaded: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// All assets to preload (images and videos from the site)
const PRELOAD_IMAGES = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
  '/Side.png',
  '/hero-bg.jpg',
  '/pic-bg.jpeg',
  '/music/SOS.jpg',
  '/music/agalloch.jpg',
  '/music/alcest.jpg',
  '/music/belakor.jpg',
  '/music/belakor2.jpg',
  '/music/c418.jpg',
  '/music/goodbooks.jpg',
  '/music/happy.jpg',
  '/music/molchat-doma.jpg',
  '/music/ne-obliviscaris.jpg',
  '/music/ne-obliviscaris2.jpg',
  '/music/portugal-the-man.jpg',
];

const PRELOAD_VIDEOS = [
  '/project/ArthShikshak-1.mp4',
  '/project/Fractal-1.mp4',
  '/project/FuelForge-1.mp4',
  '/project/Lemma-1.mp4',
  '/project/Revera-1.mp4',
];

const MINIMUM_DISPLAY_TIME = 3000; // 3 seconds minimum
const SESSION_KEY = 'portfolio_assets_loaded';

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  // Check if assets were already loaded in this session
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initRef = useRef(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyLoaded = sessionStorage.getItem(SESSION_KEY) === 'true';
      if (alreadyLoaded) {
        setHasLoaded(true);
        setIsLoading(false);
      }
    }
  }, []);

  // Preload all images
  const preloadImages = useCallback((): Promise<void[]> => {
    return Promise.all(
      PRELOAD_IMAGES.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't fail on error, just continue
          img.src = src;
        });
      })
    );
  }, []);

  // Preload all videos (just metadata, not full video)
  const preloadVideos = useCallback((): Promise<void[]> => {
    return Promise.all(
      PRELOAD_VIDEOS.map((src) => {
        return new Promise<void>((resolve) => {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.onloadedmetadata = () => resolve();
          video.onerror = () => resolve(); // Don't fail on error
          // Timeout fallback for videos
          setTimeout(() => resolve(), 5000);
          video.src = src;
        });
      })
    );
  }, []);

  // Main loading logic - runs only ONCE on initial page load
  useEffect(() => {
    // Skip if already processed
    if (initRef.current) return;
    initRef.current = true;

    // Skip if already loaded in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === 'true') {
      setHasLoaded(true);
      setIsLoading(false);
      return;
    }

    const loadEverything = async () => {
      console.log('[Loader] Starting to preload all assets...');
      const startTime = Date.now();

      // Load all assets in parallel
      await Promise.all([
        preloadImages(),
        preloadVideos(),
      ]);

      console.log('[Loader] All assets preloaded!');

      // Ensure minimum display time
      const elapsed = Date.now() - startTime;
      if (elapsed < MINIMUM_DISPLAY_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MINIMUM_DISPLAY_TIME - elapsed));
      }

      // Mark as loaded in session storage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, 'true');
      }

      setHasLoaded(true);
      setIsLoading(false);
      console.log('[Loader] Loading complete, hiding loader');
    };

    loadEverything();
  }, [preloadImages, preloadVideos]);

  return (
    <LoaderContext.Provider value={{ isLoading, hasLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
