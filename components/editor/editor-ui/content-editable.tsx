import { JSX } from "react";
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";

type Props = {
  readonly placeholder: string;
  readonly className?: string;
  readonly placeholderClassName?: string;
};

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        className ??
        `ContentEditable__root relative block min-h-full overflow-auto px-3 py-2 focus:outline-none bg-transparent box-border text-base md:text-sm selection:bg-primary selection:text-primary-foreground`
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-3 py-2 text-ellipsis select-none text-base md:text-sm`
          }
        >
          {placeholder}
        </div>
      }
    />
  );
}
