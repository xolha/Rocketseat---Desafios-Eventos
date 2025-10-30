import type {ComponentProps} from "react"

interface BadgesProps extends ComponentProps<'span'> {
}

export function Badges({className, ...props}: BadgesProps) {
    return (
        <span className="px-3 py-1 font-mono rounded-lg border text-sm font-semibold bg-zinc-800 text-zinc-100" {...props}
        />
    )
}