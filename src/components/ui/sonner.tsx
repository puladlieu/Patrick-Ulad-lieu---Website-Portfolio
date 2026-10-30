import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    icons={{
      success: <CircleCheckIcon className="size-4 text-ok" />,
      info: <InfoIcon className="size-4" />,
      warning: <TriangleAlertIcon className="size-4" />,
      error: <OctagonXIcon className="size-4 text-primary" />,
      loading: <Loader2Icon className="size-4 animate-spin" />,
    }}
    style={
      {
        "--normal-bg": "#0b0b0c",
        "--normal-text": "#f4f4f2",
        "--normal-border": "#e3141b",
        "--border-radius": "0px",
      } as React.CSSProperties
    }
    toastOptions={{ classNames: { toast: "font-mono! tracking-[.04em]" } }}
    {...props}
  />
)

export { Toaster }
