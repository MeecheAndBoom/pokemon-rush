"use client";

import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/layout/SearchBox";

/**
 * The listing hero's search field, seeded from `?q=` so a shared or refreshed
 * search URL still shows the term.
 */
export function ShopSearch({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  return <SearchBox defaultValue={searchParams.get("q") ?? ""} placeholder={placeholder} />;
}
