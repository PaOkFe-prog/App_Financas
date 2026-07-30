import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-40" />
      </div>
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-72 w-full rounded-xl" />
    </div>
  );
}
