import { Avatar as DefaultAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";

const avatarVariants = cva("block rounded-full overflow-hidden", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-8 ",
      lg: "size-9",
      xl: "size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export type Size = AvatarVariantProps["size"];

type Props = { isOnline?: boolean; onClick?: () => void } & AvatarVariantProps & Pick<ComponentProps<typeof AvatarImage>, "src" | "alt">;

export default function Avatar({ size, isOnline, onClick, src, alt }: Props) {
  return (
    <div className="relative inline-block size-fit">
      <DefaultAvatar className={cn(avatarVariants({ size }))} onClick={onClick}>
        <AvatarImage className="aspect-square size-full object-cover" src={src} alt={alt} />
        <AvatarFallback>
          <Image src="" alt="Avatar Placeholder Image" width={40} height={40} className="aspect-square size-full object-cover" />
        </AvatarFallback>
      </DefaultAvatar>
      {isOnline && <span className={cn("absolute bottom-0 right-0", "inline-block bg-green-400 rounded-full", "border border-white", size === "sm" || size === "md" ? "size-2" : "size-3")} data-testid='presence-indicator' />}
    </div>
  );
}
