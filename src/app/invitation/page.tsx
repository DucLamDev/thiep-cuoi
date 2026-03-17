"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
const ShareInvitation = dynamic(() => import("@/components/ShareInvitation"));

function InvitationContent() {
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const name = searchParams.get("name") || "";
  const shortname = searchParams.get("shortname") || "";
  const relation = searchParams.get("relation") || "";

  const displayName = shortname || name.split(/\s+/).pop() || "";

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      {isLoaded && (
        <main className="relative">
          <PetalAnimation />
          <Hero guestName={displayName} relation={relation} />
          <ParentsInfo />
          <OurStory />
          <PhotoGallery />
          <WeddingEvent />
          <VideoSection />
          <RSVP />
          <ShareInvitation />
        </main>
      )}
    </>
  );
}

export default function InvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-wedding-cream">
          <div className="text-center">
            <span className="text-4xl block mb-3 animate-heart-beat">❤️</span>
            <p className="text-wedding-red font-playfair text-xl">
              Đang mở thiệp cưới...
            </p>
          </div>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
