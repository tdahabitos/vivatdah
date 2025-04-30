import { cn } from "~/utils";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full aspect-video bg-orange-100 animate-pulse rounded-lg",
        className
      )}
    />
  );
}
