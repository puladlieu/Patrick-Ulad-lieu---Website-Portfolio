import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[130px] resize-y py-3 w-full min-w-0 border border-line-2 bg-field px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-dim focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_var(--red-dim)] aria-invalid:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
