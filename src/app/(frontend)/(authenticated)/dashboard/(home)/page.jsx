"use client";

import NewVideos from "./_components/NewVideos";
import TrendingVideos from "./_components/TrendingVideos";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <NewVideos />
      <TrendingVideos />
    </div>
  );
}
