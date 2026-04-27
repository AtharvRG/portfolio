"use client";

import { useLoad } from "@/context/LoadContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useLoad();

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}