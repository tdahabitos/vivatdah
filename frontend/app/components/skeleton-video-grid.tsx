export default function SkeletonVideoGrid({
  cols,
  withoutGrid,
}: {
  cols: number
  withoutGrid?: boolean
}) {
  const Grid = () =>
    Array.from({ length: cols }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="w-full aspect-video bg-orange-50 animate-pulse rounded-lg" />
        <div className="w-full h-6 bg-orange-50 animate-pulse rounded-lg" />
        <div className="w-1/2 h-4 bg-orange-50 animate-pulse rounded-lg" />
      </div>
    ))

  if (withoutGrid) {
    return <Grid />
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Grid />
    </div>
  )
}
