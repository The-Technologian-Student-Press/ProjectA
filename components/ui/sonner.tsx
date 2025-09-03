import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--toast-bg)",
          "--normal-text": "var(--toast-fg)",
          "--normal-border": "var(--toast-border)",
          "--success-bg": "var(--toast-success)",
          "--success-text": "white",
          "--error-bg": "var(--toast-error)",
          "--error-text": "white",
          "--warning-bg": "var(--toast-warning)",
          "--warning-text": "white",
          "--info-bg": "var(--toast-info)",
          "--info-text": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
