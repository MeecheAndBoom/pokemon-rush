import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  const width =
    size === "narrow"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-[1400px]"
        : "max-w-6xl";
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", width, className)}>{children}</div>
  );
}
