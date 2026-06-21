import { cn } from "@/lib/utils"
import { btnLime } from "@/lib/ui-classes"

type LandingButtonProps = React.ComponentProps<"button"> & {
  variant?: "lime"
  size?: "default" | "full"
}

export function LandingButton({
  className,
  variant = "lime",
  size = "default",
  ...props
}: LandingButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        variant === "lime" && btnLime,
        size === "full" && "w-full justify-center py-4 text-[1.05rem]",
        "disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}
