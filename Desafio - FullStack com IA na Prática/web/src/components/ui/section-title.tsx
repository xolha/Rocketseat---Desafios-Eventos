import type { ComponentProps } from "react"

interface SectionTitleProps extends ComponentProps<'h3'> {}

export function SectionTitle({className, ...props }: SectionTitleProps) {
    return (
        <h3 className="text-base font-semibold text-zinc-100" {...props} />
    )
}