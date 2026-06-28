import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  size?: "sm" | "md";
}

const SIZE = {
  sm: "h-7",
  md: "h-9",
} as const;

export function Logo({ className, imageClassName, size = "md" }: LogoProps) {
  const h = SIZE[size];
  return (
    <Link href="/" className={cn("shrink-0", className)}>
      <Image
        src="/logo.svg"
        alt="iziship"
        width={0}
        height={0}
        priority
        className={cn("block w-auto dark:hidden", h, imageClassName)}
        style={{ width: "auto" }}
      />
      <Image
        src="/logo-dark.svg"
        alt="iziship"
        width={0}
        height={0}
        priority
        className={cn("hidden w-auto dark:block", h, imageClassName)}
        style={{ width: "auto" }}
      />
    </Link>
  );
}
