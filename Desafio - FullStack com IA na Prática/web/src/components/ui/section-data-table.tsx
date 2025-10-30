import type { ComponentProps } from "react"

interface SectionTitleProps extends ComponentProps<'div'> {
    data: Array<{ key: string, value: string}>
}

export function SectionDataTable({ className, data, ...props }: SectionTitleProps) {
    return (
        <div className="overflow-hidden rounded-lg boder border-zinc-700" {...props}>
            <table className="w-full">
                {data.map(item => {
                    return (
                        <tr key={item.key} className="border-b border-zinc-700 last:border-0">
                            <td className="p-3 text-sm font-medium text-zinc-400 bg-zinc-800/50 border-r border-zinc-500">
                                {item.key}
                            </td>
                            <td className="p-3 text-sm font-mono text-zinc-300">
                                {item.value}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}