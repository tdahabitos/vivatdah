import Skeleton from "./skeleton";

export default function SkeletonGrid({ cols }: { cols: number }) {
  return Array.from({ length: cols }).map((_, i) => <Skeleton key={i} />);
}
