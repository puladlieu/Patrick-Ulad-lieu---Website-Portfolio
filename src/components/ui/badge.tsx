import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        // Skill chip: mono text with a small red square
        tag: "border border-line bg-chip px-2.5 py-1.5 font-mono text-[13px] leading-tight tracking-[.04em] text-text-2 whitespace-normal before:size-1 before:flex-none before:bg-primary before:content-[''] hover:border-primary hover:text-foreground",
        current: "bg-primary px-2 py-1 font-mono text-[11px] leading-none tracking-[.14em] text-white before:size-1.5 before:bg-white before:content-[''] before:animate-[blink_1.6s_steps(2,start)_infinite]",
        past: "bg-line px-2 py-1 font-mono text-[11px] leading-none tracking-[.14em] text-muted-foreground",
        outline: "border border-line-2 bg-card px-3.5 py-2 font-mono text-[12px] leading-snug tracking-[.12em] text-foreground uppercase",
      },
    },
    defaultVariants: { variant: "tag" },
  }
)

function Badge({
  className,
  variant = "tag",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: "badge", variant },
  })
}

export { Badge, badgeVariants }
