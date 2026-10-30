import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap uppercase outline-none select-none transition-[background-color,color,box-shadow,transform] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "cut-sm bg-primary text-primary-foreground hover:bg-(--red-2)",
        outline: "bg-transparent text-foreground shadow-[inset_0_0_0_1.5px_var(--foreground)] hover:bg-foreground hover:text-background",
        mini: "border border-line-2 bg-transparent text-muted-foreground hover:border-primary hover:text-foreground",
        icon: "border border-line-2 bg-transparent text-muted-foreground hover:border-primary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 gap-2.5 px-6 font-heading text-[15px] font-bold tracking-[.14em]",
        sm: "h-10 gap-2 px-4 font-heading text-[14px] font-bold tracking-[.14em]",
        mini: "h-8 px-2.5 font-mono text-[11px] tracking-[.14em]",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
