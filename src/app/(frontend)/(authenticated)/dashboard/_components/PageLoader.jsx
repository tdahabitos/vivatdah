"use client";
import { Loader, Skeleton } from "@mantine/core";

export default function PageLoader({ variant }) {
  switch (variant) {
    case "simple":
      return (
        <div className="flex justify-center p-4">
          <Loader />
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-6">
          <Skeleton w={350} h={35} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex flex-col gap-4">
                <Skeleton height={176} radius="md" />
              </div>
            ))}
          </div>
        </div>
      );
  }
}
