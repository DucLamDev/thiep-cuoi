"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

const PetalAnimation = dynamic(() => import("@/components/PetalAnimation"), {
  ssr: false,
});
const ParentsInfo = dynamic(() => import("@/components/ParentsInfo"));
const OurStory = dynamic(() => import("@/components/OurStory"));
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"));
const WeddingEvent = dynamic(() => import("@/components/WeddingEvent"));
const VideoSection = dynamic(() => import("@/components/VideoSection"));
const RSVP = dynamic(() => import("@/components/RSVP"));
const PhotoShowcase = dynamic(() => import("@/components/PhotoShowcase"));
const ShareInvitation = dynamic(() => import("@/components/ShareInvitation"));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      {isLoaded && (
        <main className="relative">
          <PetalAnimation />
          <Hero />
          <ParentsInfo />
          <OurStory />
          <PhotoGallery />
          <WeddingEvent />
          <VideoSection />
          <PhotoShowcase />
          <RSVP />
          <ShareInvitation />
        </main>
      )}
    </>
  );
}
